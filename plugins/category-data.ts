import type { Plugin } from "lume/core.ts"

import { CategoriesData } from "~types/category.ts"
import { strings } from "~ext/pahkat.ts"

const EXT_DATA: CategoriesData = {
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

// TODO: iterate over all languages that the website supports.
for (const id of pahkatCategoryIds) {
  EXT_DATA[id] = {
    en: {
      name: strings.en[id],
      description: strings.en[id],
    },
    nb: {
      name: strings.nb[id],
      description: strings.nb[id],
    },
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

    site.data("categories", EXT_DATA)
    site.data("mergedKeys", mergedKeys)
  }
}

export function getCategoryData(): CategoriesData {
  return EXT_DATA as CategoriesData
}
