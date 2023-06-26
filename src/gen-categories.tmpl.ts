import { Categories } from "../utils/data-types.ts"

export const layout = `layouts/category.tsx`
export const renderOrder = 0 // render before pages that use search

import { parse as yamlParse } from "std/yaml/mod.ts"
const categories = yamlParse(await Deno.readTextFile("./src/_data/categories.yaml")) as Categories

export default function* () {
  for (const [label, category] of Object.entries(categories)) {
    for (const lang of Object.keys(category.name)) {
      yield {
        url: `/categories/${label}/`,
        id: label,
        lang,
        title: category.name[lang],
        // description: category.description,
        category: "category",
        tool_category: category.label ?? label,
      }
    }
  }
}
