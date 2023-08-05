import { Languages, type ToolsRepo } from "~utils/data-types.ts"

import { parse as yamlParse } from "std/yaml/mod.ts"
const langs = yamlParse(await Deno.readTextFile("./src/_data/languages.yaml")) as Languages

import Repo from "./_data/tools/repo.json" assert { type: "json" }

export const layout = `layouts/tool.tsx`

export default function* () {
  const repo = Repo as ToolsRepo
  const nordicLanguages = Object.keys(langs.languages)

  for (const pkg of repo.packages) {
    const langCategory = pkg.tags.find((x) => x.startsWith("lang:"))?.split(":")[1]
    if (langCategory && !nordicLanguages.includes(langCategory)) continue

    for (const lang of Object.keys(pkg.name)) {
      yield {
        url: `/tools/${pkg.id}/`,
        id: pkg.id,
        lang,
        title: pkg.name[lang],
        description: pkg.description[lang],
        tags: pkg.tags,
        category: "tool",
      }
    }
  }
}
