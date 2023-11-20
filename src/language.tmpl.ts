import resources from "~ext/resources/mod.ts"
import { PageData } from "lume/core.ts"
import { getLanguageData } from "~plugins/language-data.ts"

const languageData = getLanguageData()

export default function* (_page: PageData) {
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
