import { Categories } from "~utils/data-types.ts"

export const layout = `layouts/category.tsx`
export const renderOrder = 0 // render before pages that use search

import { parse as yamlParse } from "std/yaml/mod.ts"
const langs = yamlParse(await Deno.readTextFile("./src/_data/languages.yaml")) as Languages
const categories = yamlParse(await Deno.readTextFile("./src/_data/categories.yaml")) as Categories

export default function* () {
  const nordicLanguages = Object.keys(langs.languages)

  for (const [label, category] of Object.entries(categories)) {
    yield {
      url: `/category/${label}/`,
      id: label,
      title: category.name["en"],
      // description: category.description,
      category: "category",
      tool_category: category.label ?? label,
    }

    for (const lang of nordicLanguages) {
      yield {
        url: `/${lang}/category/${label}/`,
        lang,
        id: label,
        title: category.name[lang],
        // description: category.description,
        category: "category",
        tool_category: category.label ?? label,
      }
    }
  }
}
