import type { Plugin } from "lume/core.ts"

import { strings } from "~data/pahkat.ts"
import categoriesData from "~data/categories.ts"
import { CategoryId } from "~types/category.ts"

const pahkatCategoryIds = Object.keys(strings.en)

for (const id of pahkatCategoryIds) {
  categoriesData.push(id)
}
export default function categoryData(): Plugin {
  return (site) => {
    const mergedKeys = site.scopedData.get("/")?.mergedKeys || {}
    mergedKeys["categories"] = "object"

    site.data("categories", categoriesData)
    site.data("mergedKeys", mergedKeys)
  }
}

export function getCategoryData(): CategoryId[] {
  return categoriesData as CategoryId[]
}
