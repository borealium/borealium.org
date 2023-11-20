import { Page } from "lume/core/filesystem.ts"
import type { PageData, Plugin } from "lume/core.ts"
import { LanguagesData } from "~plugins/language-data.ts"

const MULTILANG_GENERATED = Symbol("multilang-generated")

export default function multilanguage(languagesData: LanguagesData): Plugin {
  return (site) => {
    site.preprocess([".html", ".mdx", ".md"], (page) => {
      let [basePath, lang] = page.data.url ? page.data.url.split(".") : []

      if (lang != null) {
        // Langs with a region for some reason get a final slash...
        lang = lang.replace(/\/$/, "")

        const data: PageData & { [MULTILANG_GENERATED]?: boolean } = page.data
        const id: string = data.id || page.src.path.slice(1).split(".")[0]

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
    })

    site.preprocess([".html"], (page, pages) => {
      const data: PageData & { [MULTILANG_GENERATED]?: boolean } = page.data

      if (data[MULTILANG_GENERATED]) {
        return
      }

      const id: string = data.id || page.src.path.slice(1)

      const newPages = [
        page.duplicate(undefined, { ...data, id, layout: "lang-redir.tsx" }),
      ]

      const pageLanguages: string[] = []
      Object.entries(languagesData.languages).forEach(([langId, langData]) => {
        if (langData.regions != null) {
          Object.keys(langData.regions).forEach((regionId) => {
            pageLanguages.push(`${langId}-${regionId}`)
          })
        }

        pageLanguages.push(langId)
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
            const newData: PageData = {
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
          const newData: PageData = {
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
    })

    // Make relative links use the correct language references
    site.process([".html"], (page) => {
      const { document } = page
      const lang = page.data.lang as string | undefined

      if (!lang) {
        return
      }

      if (!document?.documentElement?.getAttribute("lang")) {
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
    })
  }
}

export function isMultilangGenerated(page: PageData & { [MULTILANG_GENERATED]?: boolean }): boolean {
  return page[MULTILANG_GENERATED] === true
}
