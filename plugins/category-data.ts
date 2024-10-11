import type { Plugin } from "lume/core.ts"
import { strings } from "~data/pahkat.ts"
import { getLanguageData, selectLocale } from "~plugins/language-data.ts"
import { categoriesList } from "~data/categories.ts"
import { fluentBundle, message } from "~plugins/fluent.ts"
import { CategoriesData } from "~types/category.ts"

const languageData = getLanguageData()

const categoriesData: CategoriesData = {}
for (const id of categoriesList) {
  categoriesData[id] = {}
  for (const lang of Object.keys(languageData.languages)) {
    const bundle = fluentBundle("categories", lang)
    categoriesData[id][lang] = {
      name: message(bundle, null, "~categories", id),
      description: message(bundle, null, "categories", `${id}-description`),
    }
  }
}

const pahkatCategoryIds = Object.keys(strings.en)

for (const id of pahkatCategoryIds) {
  categoriesData[id] = {}
  for (const lang of Object.keys(languageData.languages)) {
    if (strings[lang]?.[id] != null) {
      const bundle = fluentBundle("categories", lang)
      categoriesData[id][lang] = {
        name: message(bundle, null, "~categories", id),
        description: message(bundle, null, "categories", `${id}-description`),
      }
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
