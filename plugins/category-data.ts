import { isPlainObject, merge } from "lume/core/utils.ts"
import type { Logger, Plugin } from "lume/core.ts"

import { parse as yamlParse } from "std/yaml/mod.ts"
import { CategoriesData } from "~types/category.ts"

const EXT_DATA: CategoriesData = yamlParse(await Deno.readTextFile("./categories.yaml")) as CategoriesData

import { strings } from "~ext/pahkat.ts"

const pahkatCategoryIds = Object.keys(strings.en)

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

// console.log(RAW_DATA)

export interface Options {
}

// Default options
export const defaults: Options = {}

export type CategoryData = {
  name: string
  description: string
}

export default function categoryData(userOptions?: Partial<Options>): Plugin {
  const options = merge(defaults, userOptions)

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
