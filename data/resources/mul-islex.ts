import { Resource, ResourceType } from "~types/resource.ts"
import { getL10NLanguages, makeResourceTranslations } from "~data/resources.ts"

const id = "islex"
const resourceLang = "mul"
const halfLinks = [
  {
    url: new URL("https://islex.arnastofnun.is/"),
  },
]

const l10nLanguages = getL10NLanguages(resourceLang)

const resource: Resource = {
  id,
  type: ResourceType.External,
  languages: ["da", "fi", "fo", "is", "nb", "nn", "sv"],
  category: "dictionaries",
  name: makeResourceTranslations(`${id}`, resourceLang, l10nLanguages),
  description: makeResourceTranslations(`${id}-description`, resourceLang, l10nLanguages),
  links: halfLinks.map((halfLink, index) => {
    return {
      ...halfLink,
      text: makeResourceTranslations(`${id}-links-${index}`, resourceLang, l10nLanguages),
    }
  }),
}

export default resource
