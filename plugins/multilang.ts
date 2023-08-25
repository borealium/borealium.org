import { Page } from "lume/core/filesystem.ts"
import type { PageData, Plugin } from "lume/core.ts"
import { LanguagesData } from "~plugins/language-data.ts"

const MULTILANG_GENERATED = Symbol("multilang-generated")

export default function multilanguage(languagesData: LanguagesData): Plugin {
  return (site) => {
    site.preprocess([".mdx", ".md", ".html"], (page, pages) => {
      const [basePath, lang] = page.data.url ? page.data.url.split(".") : []

      // console.log("basePath", basePath)

      if (lang != null) {
        // console.log(page.src, basePath, lang)
        const data: PageData & { [MULTILANG_GENERATED]?: boolean } = page.data
        const id: string = data.id || page.src.path.slice(1).split(".")[0]

        data.lang = lang
        data.id = id

        if (basePath.endsWith("/index")) {
          const chunks = basePath.split("/")
          chunks.pop()
          data.url = `/${lang}${chunks.join("/")}/`
          data.originalUrl = `${chunks.join("/")}/`
        } else {
          data.url = `/${lang}/${basePath}`
          data.originalUrl = `/${basePath}`
        }

        data[MULTILANG_GENERATED] = true
      }
    })

    site.preprocess([".html"], (page, pages) => {
      // console.log("??2", page.outputPath, page.data.id, page.data.url, page.data.lang)
      const data: PageData & { [MULTILANG_GENERATED]?: boolean } = page.data

      if (data[MULTILANG_GENERATED]) {
        return
      }

      const id: string = data.id || page.src.path.slice(1)
      // console.log("id", id)

      const newPages = [
        page.duplicate(undefined, { ...data, id, layout: "layouts/lang-redir.tsx" }),
      ]

      // let index = 1
      for (const lang of Object.keys(languagesData.languages)) {
        const newUrl = `/${lang}${data.url}`

        if (pages.find((p) => p.data.url === newUrl)) {
          // console.log("Page already set for lang " + lang)
          continue
        }

        // Find closest fallback

        // if (data.url.includes("beep-boop")) {
        //   console.log(data.url, newUrl, lang)
        // }

        let newPage: Page | undefined
        const fallbacks = [lang, ...(languagesData.fallbacks[lang] ?? (lang === "en" ? [] : ["en"]))]
        for (const fallback of fallbacks) {
          const fallbackPage = pages.find((p) => {
            return p.data.originalUrl === data.url && p.data.lang === fallback
          })

          // if (data.url.includes("beep-boop")) {
          //   console.log(fallbackPage)
          // }
          if (fallbackPage != null) {
            // console.log(
            //   "Found fallback page for ",
            //   lang,
            //   ": ",
            //   fallbackPage.data.url,
            //   fallbackPage.data.lang,
            //   fallbackPage.content,
            // )
            const newData: PageData = {
              ...fallbackPage.data,
              lang,
              id,
              url: newUrl,
              originalUrl: data.url,
              [MULTILANG_GENERATED]: true,
            }
            newPage = fallbackPage.duplicate(undefined, newData)
            console.log(newPage)
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
      // console.log(page)

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
          a.setAttribute("href", `/${lang}${href}`)
        }
      }
    })
  }
}

export function isMultilangGenerated(page: PageData & { [MULTILANG_GENERATED]?: boolean }): boolean {
  return page[MULTILANG_GENERATED] === true
}
