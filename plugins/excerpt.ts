import type { PageData, Plugin } from "lume/core.ts"

export default function excerpt(): Plugin {
  return (site) => {
    // site.preprocess([".html"], (page, pages) => {
    //   page.data.hello = true
    // })
    site.process([".html"], (page, pages) => {
      const { document } = page

      if (document == null) {
        throw new Error("No document found")
      }

      const excerptNodes = Array.from(document.querySelectorAll("[data-excerpt-id]"))

      for (const excerptNode of excerptNodes) {
        const el = excerptNode as unknown as HTMLElement
        const id = el.getAttribute("data-excerpt-id")

        const targetPage = pages.find((targetPage) =>
          targetPage.data.id === id && page.data.lang === targetPage.data.lang
        )
        const targetDocument = targetPage?.document

        if (targetDocument == null) {
          throw new Error("No document found")
        }

        const excerptP = targetDocument.querySelector("p")
        if (excerptP == null) {
          continue
        }

        el.innerHTML = excerptP.innerHTML
      }
    })
  }
}
