import { LinkType, Resource, ResourceType } from "~types/resource.ts"
import { getL10NLanguages, makeResourceTranslations } from "~data/resources.ts"

const id = "voisit-asr"
const resourceLang = "fao"
const halfLinks = [
  {
    type: LinkType.Normal,
    url: new URL("https://voisit.fo"),
  },
  {
    type: LinkType.AppleAppStore,
    url: new URL("https://apps.apple.com/dk/app/voisit/id6459887023?l=da"),
  },
  {
    type: LinkType.GooglePlayStore,
    url: new URL("https://play.google.com/store/apps/details?id=net.isolveit.voisit"),
  },
]

const l10nLanguages = getL10NLanguages(resourceLang)

const resource: Resource = {
  id,
  type: ResourceType.External,
  languages: ["fo"],
  category: "speech-recognition",
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
