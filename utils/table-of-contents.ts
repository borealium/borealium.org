import { merge } from "lume/core/utils.ts"
import type { Plugin } from "lume/core.ts"
import { Element, Node } from "https://deno.land/x/deno_dom@v0.1.38/deno-dom-wasm.ts"

export interface Options {
  extensions: string[]
  dataAttribute: string
}

// Default options
export const defaults: Options = {
  extensions: [".html"],
  dataAttribute: "data-insert-toc",
}

export default function toc(userOptions?: Partial<Options>): Plugin {
  const options = merge(defaults, userOptions)

  const itsAnElementDontWorry = (node: Node): Element => node as unknown as Element

  return (site) => {
    site.process(options.extensions, (page) => {
      Array.from(page.document?.querySelectorAll(`[${options.dataAttribute}]`) ?? [])
        .map(itsAnElementDontWorry)
        .forEach((tocDiv) => {
          const toc: Element = tocDiv as unknown as Element
          const targetSelector = toc.getAttribute(options.dataAttribute)
          if (!targetSelector) {
            throw new Error(`The attribute "${options.dataAttribute}" is missing in the TOC element`)
          }
          const target = page.document?.querySelector(targetSelector)
          if (!target) {
            throw new Error(`The target element "${targetSelector}" is missing`)
          }

          const headlines = Array.from(target.querySelectorAll("h2, h3, h4"))
            .map(itsAnElementDontWorry)
            .map((elem) => {
              if (!elem.id) {
                elem.setAttribute("id", "toc-" + encodeURIComponent(elem.innerText.replace(/\s/g, "-").toLowerCase()))
              }
              return {
                id: elem.id,
                text: elem.innerText,
                level: Number(elem.nodeName.charAt(1)),
              }
            })

          const headlinesHtml = headlines.map((headline) =>
            `<li class="toc__item is-level-${headline.level}">
              <a href="#${headline.id}">${headline.text}</a>
            </li>`
          )

          toc.innerHTML = `<ul class="toc">${headlinesHtml.join("\n")}</ul>`
        })
    })
  }
}
