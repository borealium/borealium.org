import { type Data, Page } from "lume/core/file.ts"
import type { Plugin } from "lume/core/site.ts"
import { log } from "lume/core/utils/log.ts"
import { getLanguageData } from "~plugins/language-data.ts"

const MULTILANG_GENERATED = Symbol("multilang-generated")

const languagesData = getLanguageData()

function processMultilingualPage(page: Page, pages: Page[]) {
  let [basePath, lang] = page.data.url ? page.data.url.split(".") : []

  if (lang != null) {
    // Langs with a region for some reason get a final slash...
    lang = lang.replace(/\/$/, "")

    const data: Data & { [MULTILANG_GENERATED]?: boolean } = page.data
    const id: string = data.id?.toString() || page.src.path.slice(1).split(".")[0]

    data.lang = lang
    data.id = id

    if (basePath.endsWith("/index")) {
      const chunks = basePath.split("/")
      chunks.pop()
      data.url = `/${lang.toLowerCase()}${chunks.join("/")}/`
      data.originalUrl = `${chunks.join("/")}/`
    } else {
      data.url = `/${lang.toLowerCase()}/${basePath}`
      data.originalUrl = `/${basePath}`
    }

    data[MULTILANG_GENERATED] = true
  }
}

function preprocessHtml(page: Page, pages: Page[]) {
  const data: Data & { [MULTILANG_GENERATED]?: boolean } = page.data

  if (data[MULTILANG_GENERATED]) {
    return
  }
  log.warn(`Processing page ${page.src.path}`)

  const id: string = data.id?.toString() || page.src.path.slice(1)

  const newPages = [
    page.duplicate(undefined, { ...data, id, layout: "lang-redir.tsx" }),
  ]

  const pageLanguages: string[] = []
  Object.entries(languagesData.languages)
    .filter(([x]) => !languagesData.excludeFromUi.includes(x))
    .forEach(([langId, langData]) => {
      if (langData.regions != null) {
        langData.regions.forEach((regionId) => {
          pageLanguages.push(`${langId}-${regionId}`)
        })
      } else {
        pageLanguages.push(langId)
      }
    })

  for (const lang of pageLanguages) {
    const newUrl = `/${lang.toLowerCase()}${data.url}`

    if (pages.find((p) => p.data.url === newUrl)) {
      continue
    }

    let newPage: Page | undefined
    const fallbacks = [lang, ...(languagesData.fallbacks[lang] ?? (lang === "en" ? [] : ["en"]))]

    for (const fallback of fallbacks) {
      const fallbackPage = pages.find((p) => {
        return p.data.originalUrl === data.url && p.data.lang === fallback
      })

      if (fallbackPage != null) {
        const newData: Data = {
          ...fallbackPage.data,
          lang,
          id,
          url: newUrl,
          originalUrl: data.url,
          fluentBundle: data.fluentBundle,
          t: data.t,
          [MULTILANG_GENERATED]: true,
        }
        newPage = fallbackPage.duplicate(undefined, newData)
        break
      }
    }

    if (newPage == null) {
      const newData: Data = {
        ...data,
        lang,
        id,
        url: newUrl,
        originalUrl: data.url,
        [MULTILANG_GENERATED]: true,
      }
      newPage = page.duplicate(undefined, newData)
    }

    newPages.push(newPage)
  }

  pages.splice(pages.indexOf(page), 1, ...newPages)
}

function postprocessHtml(page: Page) {
  const { document } = page
  const lang = page.data.lang as string | undefined

  if (!lang) {
    return
  }

  if (!document?.documentElement?.getAttribute("lang")) {
    // This will make the language tag lowercase for some reason after post-processing.
    document?.documentElement?.setAttribute("lang", lang)
  }

  const anchors = Array.from(
    document?.querySelectorAll("a:not([data-multilang])") ?? [],
  ) as unknown as HTMLAnchorElement[]
  for (const a of anchors) {
    const href = a.getAttribute("href")
    if (href != null && href.startsWith("/")) {
      a.setAttribute("href", `/${lang.toLowerCase()}${href}`)
    }
  }

  const forms = Array.from(
    document?.querySelectorAll("form:not([data-multilang])") ?? [],
  ) as unknown as HTMLAnchorElement[]
  for (const a of forms) {
    const href = a.getAttribute("action")
    if (href != null && href.startsWith("/")) {
      a.setAttribute("action", `/${lang.toLowerCase()}${href}`)
    }
  }
}

export default function multilanguage(): Plugin {
  return (site) => {
    site.preprocess([".html", ".mdx", ".md"], (filteredPages, allPages) => {
      for (const page of filteredPages) {
        processMultilingualPage(page, allPages)
      }
    })

    site.preprocess([".html"], (filteredPages, allPages) => {
      for (const page of filteredPages) {
        preprocessHtml(page, allPages)
      }
    })

    // Make relative links use the correct language references
    site.process([".html"], (filteredPages) => {
      for (const page of filteredPages) {
        postprocessHtml(page)
      }
    })
  }
}

export function isMultilangGenerated(page: Data & { [MULTILANG_GENERATED]?: boolean }): boolean {
  return page[MULTILANG_GENERATED] === true
}
