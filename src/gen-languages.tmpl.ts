import { Languages } from "~utils/data-types.ts"

export const layout = `layouts/language.tsx`
export const renderOrder = 0 // render before pages that use search

import { parse as yamlParse } from "std/yaml/mod.ts"
const langs = yamlParse(await Deno.readTextFile("./src/_data/languages.yaml")) as Languages

export default function* () {
  for (const [label, { name, autonym }] of Object.entries(langs.languages)) {
    for (const lang of Object.keys(langs.languages)) {
      yield {
        url: `/languages/${label}/`,
        id: `lang/${label}`,
        lang,
        title: name,
        category: "language",
        lang_label: label,
      }
    }
  }
}
