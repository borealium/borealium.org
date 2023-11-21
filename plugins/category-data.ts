import type { Plugin } from "lume/core.ts"

import { CategoriesData } from "~types/category.ts"
import { strings } from "~ext/pahkat.ts"
import { getLanguageData, selectLocale } from "~plugins/language-data.ts"

const languageData = getLanguageData()

const RAW_DATA: CategoriesData = {
  "package-management": {
    en: {
      name: "Package Management",
      description: "Tools for installing, uninstalling and updating packages on your computer.",
    },
  },
  // "proofing-tools": {
  //   "en": {
  //     "name": "Proofing tools",
  //     "description": "Tools for proofing",
  //   },
  // },
  // "keyboards": {
  //   "en": {
  //     "name": "Keyboard layouts",
  //     "description": "Keyboard layouts",
  //   },
  // },
  // "text-to-speech": {
  //   "en": {
  //     "name": "Text to speech",
  //     "description": "Text to speech",
  //   },
  // },
  // "language-learning": {
  //   "en": {
  //     "name": "Language learning",
  //     "description": "Language learning",
  //   },
  // },
  // "dictionaries": {
  //   "en": {
  //     "name": "Dictionaries",
  //     "description": "Dictionaries",
  //   },
  // },
  // "translation": {
  //   "en": {
  //     "name": "Translation",
  //     "description": "Translation",
  //   },
  // },
  // "examples": {
  //   "en": {
  //     "name": "Examples",
  //     "description": "Examples for Lume demo",
  //   },
  // },
}

const pahkatCategoryIds = Object.keys(strings.en)

for (const id of pahkatCategoryIds) {
  RAW_DATA[id] = {}
  for (const lang of Object.keys(languageData.languages)) {
    if (strings[lang]?.[id] != null) {
      RAW_DATA[id][lang] = { name: strings[lang][id], description: "" }
    }
  }
}

export type CategoryData = {
  name: string
  description: string
}

export default function categoryData(): Plugin {
  return (site) => {
    const mergedKeys = site.scopedData.get("/")?.mergedKeys || {}
    mergedKeys["categories"] = "object"

    site.data("categories", RAW_DATA)
    site.data("mergedKeys", mergedKeys)
  }
}

export function getCategoryData(): CategoriesData {
  return RAW_DATA as CategoriesData
}

export function translateCategoryName(lang: string, categoryId: string): string {
  if (RAW_DATA[categoryId] == null) {
    return categoryId
  }
  return selectLocale(lang, RAW_DATA[categoryId])?.name ?? categoryId
}
