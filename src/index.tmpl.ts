import { Languages } from "~utils/data-types.ts"

import { parse as yamlParse } from "std/yaml/mod.ts"
import { Page } from "lume/core.ts"
const langs = yamlParse(await Deno.readTextFile("./src/_data/languages.yaml")) as Languages

export const layout = `layouts/landing.tsx`

export default function* (_page: Page) {
  const nordicLanguages = Object.keys(langs.languages)

  // Generate landing pages
  // yield {
  //   url: "/",
  // }

  for (const lang of nordicLanguages) {
    yield {
      url: `/${lang}/`,
      lang,
    }
  }
}
