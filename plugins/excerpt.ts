import { Page } from "lume/core/file.ts"
import type { Plugin } from "lume/core/site.ts"

function processPage(page: Page, pages: Page[]) {
  const { document } = page

  if (document == null) {
    throw new Error("No document found")
  }

  const excerptNodes = Array.from(document.querySelectorAll("[data-excerpt-id]"))

  for (const excerptNode of excerptNodes) {
    const el = excerptNode as unknown as HTMLElement
    const id = el.getAttribute("data-excerpt-id")

    const targetPage = pages.find((targetPage) => targetPage.data.id === id && page.data.lang === targetPage.data.lang)
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
}

export default function excerpt(): Plugin {
  return (site) => {
    site.process([".html"], (filteredPages, pages) => {
      for (const page of filteredPages) {
        processPage(page, pages)
      }
    })
  }
}
