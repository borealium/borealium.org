import type { Plugin } from "lume/core.ts"

import { CategoriesData } from "~types/category.ts"
import { strings } from "~data/pahkat.ts"
import { getLanguageData, selectLocale } from "~plugins/language-data.ts"
import categoriesData from "~data/categories.ts"

const languageData = getLanguageData()

const pahkatCategoryIds = Object.keys(strings.en)

for (const id of pahkatCategoryIds) {
  categoriesData[id] = {}
  for (const lang of Object.keys(languageData.languages)) {
    if (strings[lang]?.[id] != null) {
      categoriesData[id][lang] = { name: strings[lang][id], description: "" }
    }
  }
}

export default function categoryData(): Plugin {
  return (site) => {
    const mergedKeys = site.scopedData.get("/")?.mergedKeys || {}
    mergedKeys["categories"] = "object"

    site.data("categories", categoriesData)
    site.data("mergedKeys", mergedKeys)
  }
}

export function getCategoryData(): CategoriesData {
  return categoriesData as CategoriesData
}

export function translateCategoryName(lang: string, categoryId: string): string {
  if (categoriesData[categoryId] == null) {
    return categoryId
  }
  return selectLocale(lang, categoriesData[categoryId])?.name ?? categoryId
}
