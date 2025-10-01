import { LinkType, Resource, ResourceType } from "~types/resource.ts"
import { getL10NLanguages, makeResourceTranslations } from "~data/resources.ts"

const id = "skuolfi"
const resourceLang = "mul"

const l10nLanguages = getL10NLanguages(resourceLang)

const halfLinks = [
  {
    type: LinkType.Normal,
    url: new URL("https://satnegirji.skuolfi.org"),
  },
  {
    type: LinkType.Normal,
    url: new URL("https://github.com/guovza/satnegirji.www"),
  },
]

const resource: Resource = {
  id,
  type: ResourceType.External,
  languages: ["se", "fi"],
  category: "dictionaries",
  tags: ["skuolfi", "dictionary"],
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
