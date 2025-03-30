import { Data } from "lume/core/file.ts"
import resources from "~data/resources/mod.ts"
import { getLanguageData } from "~plugins/language-data.ts"

const languageData = getLanguageData()

export default function* (_page: Data) {
  for (const tag of Object.keys(languageData.languages)) {
    const filteredResources = resources
      .filter((resource) => resource.languages.includes(tag))

    yield {
      tag,
      url: `/language/${tag}/`,
      languageId: tag,
      language: languageData.languages[tag],
      resources: filteredResources,
      layout: "language-index.tsx",
    }
  }
}
