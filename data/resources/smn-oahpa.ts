import { Resource, ResourceType } from "~types/resource.ts"
import { getL10NLanguages, makeResourceTranslations } from "~data/resources.ts"

const id = "smn-oahpa"
const resourceLang = "smn"

const l10nLanguages = getL10NLanguages(resourceLang)

const halfLinks = [
  {
    url: new URL("https://oahpa.no/aanaar/"),
  },
]

const resource: Resource = {
  id,
  type: ResourceType.External,
  languages: ["smn"],
  category: "langlearning",
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