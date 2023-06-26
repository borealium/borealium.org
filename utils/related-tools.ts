import { Page } from "lume/core/filesystem.ts"
import { isPlainObject, merge } from "lume/core/utils.ts"
import type { PageData, Plugin } from "lume/core.ts"

export interface Options {
  /** The list of extensions used for this plugin */
  extensions: string[]
}

export const defaults: Options = {
  extensions: [".html"],
}

export type Related = Record<string, Set<PageData>>

export default function relatedTools(userOptions?: Partial<Options>): Plugin {
  const options = merge(defaults, userOptions)

  return (site) => {
    const taxonomies: Record<string, Record<string, string[]>> = {}

    // Collect all the tags from all the pages and create a taxonomy
    site.preprocessAll(options.extensions, (pages) => {
      pages.forEach((page) => {
        const tags: string[] = page.data?.tags ?? []
        tags.forEach((x) => {
          if (!x.includes(":")) return
          const [prefix, tag] = x.split(":")
          if (!taxonomies[prefix]) taxonomies[prefix] = {}
          if (!taxonomies[prefix][tag]) taxonomies[prefix][tag] = []
          taxonomies[prefix][tag].push(page.data.id)
        })
      })
    })

    // Add related pages to each page based on the taxonomy
    site.preprocess(options.extensions, (page, pages) => {
      const tags: string[] = page.data?.tags ?? []
      const related: Related = {}
      tags.forEach((x) => {
        if (!x.includes(":")) return
        const [prefix, tag] = x.split(":")
        if (!taxonomies[prefix]) return
        if (!taxonomies[prefix][tag]) return

        if (!related[prefix]) related[prefix] = new Set()
        taxonomies[prefix][tag].forEach((id) => {
          const relatedPage = pages.find((x) => x.data.id === id)
          if (!relatedPage) return

          related[prefix].add(relatedPage.data)
        })
      })
      page.data.related = related
    })
  }
}
