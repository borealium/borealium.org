import { LinkType, Resource, ResourceType } from "~types/resource.ts"
import { getL10NLanguages, makeResourceTranslations } from "~data/resources.ts"

const id = "divvunspell-libreoffice"
const resourceLang = "mul"

const l10nLanguages = getL10NLanguages(resourceLang)

const halfLinks = [
  {
    type: LinkType.MacOS,
    url: new URL("https://extensions.libreoffice.org/en/extensions/show/27383"),
  },
]

const resource: Resource = {
  id,
  type: ResourceType.External,
  languages: [],
  release: {
    platforms: ["macos"],
  },
  category: "speller-engines",
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
