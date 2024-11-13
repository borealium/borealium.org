import { Resource, ResourceType } from "~types/resource.ts"
import { getL10NLanguages, makeResourceTranslations } from "~data/resources.ts"

const id = "smj-kintelsmj"
const resourceLang = "smj"

const l10nLanguages = getL10NLanguages(resourceLang)

const halfLinks = [
  {
    url: new URL("https://gtweb.uit.no/old-webdict/ak/smj2nob/index.html"),
  },
  {
    url: new URL("https://gtweb.uit.no/old-webdict/lulesamisk_ordbok_offline.zip"),
  },
]

const resource: Resource = {
  id,
  type: ResourceType.External,
  languages: ["smj"],
  category: "dictionaries",
  name: makeResourceTranslations(`${id}`, resourceLang, l10nLanguages),
  description: makeResourceTranslations(`${id}-description`, resourceLang, l10nLanguages),
  moreInfo: makeResourceTranslations(`${id}-more-info`, resourceLang, l10nLanguages),
  links: halfLinks.map((halfLink, index) => {
    return {
      ...halfLink,
      text: makeResourceTranslations(`${id}-links-${index}`, resourceLang, l10nLanguages),
    }
  }),
}

export default resource
