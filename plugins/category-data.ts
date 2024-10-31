import type { Plugin } from "lume/core.ts"
import { strings } from "~data/pahkat.ts"
import { getLanguageData } from "~plugins/language-data.ts"
import { categoriesList } from "~data/categories.ts"
import { fluentBundle, message } from "~plugins/fluent.ts"
import { CategoriesData, CategoryData, CategoryId } from "~types/category.ts"
import { LangTag } from "~types/language.ts"

const languageData = getLanguageData()

const categoriesData = categoriesList.reduce((data: CategoriesData, id: CategoryId) => {
  const categoryData = Object.keys(languageData.languages).reduce(
    (acc: Record<LangTag, CategoryData>, lang: LangTag) => {
      const bundle = fluentBundle("categories", lang)
      acc[lang] = {
        name: message(bundle, null, "~categories", id),
        description: message(bundle, null, "~categories", `${id}-description`),
      }
      return acc
    },
    {},
  )

  data[id] = categoryData
  return data
}, {})

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
