import { Site } from "lume/core.ts"

export const layout = `layouts/category.tsx`
export const renderOrder = 0 // render before pages that use search

export default function* (site: Site) {
  for (const [label, category] of Object.entries(site.categories)) {
    yield {
      url: `/category/${label}/`,
      id: label,
    }

    for (const lang of Object.keys(site.languages.languages)) {
      yield {
        url: `/${lang}/category/${label}/`,
        lang,
        id: label,
      }
    }
  }
}
