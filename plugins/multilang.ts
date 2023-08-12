import { Page } from "lume/core/filesystem.ts"
import { isPlainObject, merge } from "lume/core/utils.ts"
import type { PageData, Plugin } from "lume/core.ts"
import { LanguageData, LanguagesData } from "~plugins/language-data.ts"

const MULTILANG_GENERATED = Symbol("multilang-generated")

export default function multilanguage(languagesData: LanguagesData): Plugin {
  return (site) => {
    site.preprocess([".mdx", ".md", ".html"], (page, pages) => {
      const [basePath, lang] = page.data.url ? page.data.url.split(".") : []

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
        } else {
          data.url = `/${lang}/${basePath}`
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
        const newData: PageData = { ...data, lang, id, url: newUrl, [MULTILANG_GENERATED]: true }

        let newPage: Page | null = null
        for (const fallback of languagesData.fallbacks[lang] ?? []) {
          const fallbackPage = pages.find((p) => {
            if ((p.data.url as string)?.includes("boop") && newUrl.includes("boop")) {
              // console.log(p.data.id, id, p.data.lang, fallback)
            }
            return p.data.id === id && p.data.lang === fallback
          })

          // if (fallbackPage != null) {
          //   console.log(
          //     "Found fallback page for ",
          //     lang,
          //     ": ",
          //     fallbackPage.data.url,
          //     fallbackPage.data.lang,
          //     fallbackPage.content,
          //   )
          //   newPage = fallbackPage.duplicate(undefined, newData)
          //   break
          // }
        }

        if (newPage == null) {
          newPage = page.duplicate(undefined, newData)
        }

        newPages.push(newPage)
      }

      pages.splice(pages.indexOf(page), 1, ...newPages)
    })
  }
}
