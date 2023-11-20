import type { Plugin } from "lume/core.ts"
import createSlugifier from "lume/core/slugifier.ts"
import { StringInfo } from "https://deno.land/x/imagemagick_deno@0.0.24/src/internal/string-info.ts"

const slugify = createSlugifier()

type TocNode = {
  id: string
  text: StringInfo
  level: number
  children: TocNode[]
  parent: TocNode
}

type TocData = {
  id: string
  text: string
  children: TocData[]
}

export default function outline(): Plugin {
  return (site) => {
    site.process([".html"], (page) => {
      const { document } = page

      if (document == null) {
        throw new Error("No document found")
      }

      const tocRoot = document.getElementById("toc") as unknown as HTMLOListElement | null
      if (tocRoot == null) {
        return
      }

      const contextEl = document.querySelector("[data-toc-context]") ?? document

      const elements: HTMLElement[] = Array.from(
        contextEl.querySelectorAll("h1, h2, h3, h4, h5, h6"),
      ) as unknown as HTMLElement[]
      const outline = generateOutlineData(elements)

      const rec = (node: TocData, parent: HTMLElement) => {
        for (const child of node.children) {
          const li = document.createElement("li") as unknown as HTMLLIElement
          const a: HTMLAnchorElement = document.createElement("a") as unknown as HTMLAnchorElement
          a.setAttribute("href", `#${child.id}`)
          a.textContent = child.text
          li.appendChild(a)

          if (child.children.length > 0) {
            const ol = document.createElement("ol") as unknown as HTMLOListElement
            li.appendChild(ol)
            rec(child, ol)
          }

          parent.appendChild(li)
        }
      }

      rec(outline, tocRoot)

      page.data.outline = outline
      page.data.toc = tocRoot
    })
  }
}

function generateOutlineData(elements: HTMLElement[]): TocData {
  const root: TocNode = {
    id: "",
    text: "",
    level: 0,
    children: [],
    parent: null!,
  }
  root.parent = root

  let cur = root

  for (const element of elements) {
    const text = element.textContent
    if (text == null || text.trim().length === 0) {
      continue
    }

    let id = element.getAttribute("id") || null
    if (id == null) {
      id = slugify(text).slice(0, 30)
      element.id = id
    }

    const headerLevel = parseInt(element.tagName.slice(1), 0)
    if (headerLevel > cur.level) {
      const newCur = {
        id,
        text,
        level: headerLevel,
        children: [],
        parent: cur,
      }
      cur.children.push(newCur)
      cur = newCur
    } else if (headerLevel <= cur.level) {
      let cand = cur
      while (cand.level > 0) {
        cand = cand.parent
        if (cand.level < headerLevel) {
          break
        }
      }
      const newCur = {
        id,
        text,
        level: headerLevel,
        children: [],
        parent: cand,
      }
      cand.children.push(newCur)
      cur = newCur
    }
  }

  const rec = (r: TocNode): TocData => {
    return {
      id: r.id,
      text: r.text.toString(),
      children: r.children.length === 0 ? [] : r.children
        .map(rec),
    }
  }
  const outline = rec(root)
  return outline
}
