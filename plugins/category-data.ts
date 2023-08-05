import { isPlainObject, merge } from "lume/core/utils.ts"
import type { Logger, Plugin } from "lume/core.ts"

import { parse as yamlParse } from "std/yaml/mod.ts"

const RAW_DATA = yamlParse(await Deno.readTextFile("./categories.yaml")) as Record<string, unknown>

// console.log(RAW_DATA)

type CategoryId = string
type LangTag = string

export type CategoriesData = Record<CategoryId, Record<LangTag, CategoryData>>
export type CategoryData = {
  name: string
  description: string
}

export interface Options {
}

// Default options
export const defaults: Options = {}

// function isValidCategoriesData(logger: Logger, rawName: string, rawInput: unknown): rawInput is CategoriesData {

// }

// if isValidCategoriesDat() {
//   if (!isPlainObject(rawInput)) {
//     logger.warn(`Invalid category data for ${rawName} (got: ${JSON.stringify(rawInput)})`)
//     return false
//   }

//   if (typeof rawInput.name !== "string" || rawInput.name.length === 0) {
//     logger.warn(`Invalid category data for ${rawName}.name (got: ${JSON.stringify(rawInput.name)})`)
//     return false
//   }

//   if (typeof rawInput.description !== "string" || rawInput.description.length === 0) {
//     logger.warn(`Invalid category data for ${rawName}.description (got: ${JSON.stringify(rawInput.description)})`)
//     return false
//   }

//   return true
// }

export default function categoryData(userOptions?: Partial<Options>): Plugin {
  const options = merge(defaults, userOptions)

  return (site) => {
    const mergedKeys = site.scopedData.get("/")?.mergedKeys || {}
    mergedKeys["categories"] = "object"
    // const categoriesData: CategoriesData = {}

    // for (const [categoryId, records] of Object.entries(RAW_DATA)) {
    //   categoriesData[categor]
    //   for (const [rawLangTag, rawCategory] of Object.entries(RAW_DATA)) {
    //     if (!isRawCategory(site.logger, rawLangTag, rawCategory)) {
    //       continue
    //     }

    //     categoriesData[rawLangTag] = rawCategory
    //   }
    // }
    site.data("categories", RAW_DATA)
    site.data("mergedKeys", mergedKeys)
  }
}

export function getCategoryData(): CategoriesData {
  return RAW_DATA as CategoriesData
}
