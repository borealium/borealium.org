import { Resource, ResourceType } from "~types/resource.ts"
import { getL10NLanguages, makeResourceTranslations } from "~data/resources.ts"

const id = "mtsme"
const resourceLang = "sme"

const l10nLanguages = getL10NLanguages(resourceLang)

const halfLinks = [
  {
    url: new URL("https://jorgal.uit.no"),
  },
]

const resource: Resource = {
  id,
  type: ResourceType.External,
  languages: ["se"],
  category: "mt",
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
