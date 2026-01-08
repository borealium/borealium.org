import { LinkType, Resource, ResourceType } from "~types/resource.ts"
import { getL10NLanguages, makeResourceTranslations } from "~data/resources.ts"

const id = "kal-online-speller"
const resourceLang = "kal"

const l10nLanguages = getL10NLanguages(resourceLang)

const halfLinks = [
  {
    type: LinkType.Normal,
    url: new URL(`https://divvun.uit.no/?lang=kl`),
  },
]

const resource: Resource = {
  id,
  type: ResourceType.External,
  languages: ["kl"],
  category: "spellers",
  name: makeResourceTranslations(`${id}`, resourceLang, l10nLanguages),
  description: makeResourceTranslations(
    `${id}-description`,
    resourceLang,
    l10nLanguages,
  ),
  links: halfLinks.map((halfLink, index) => {
    return {
      ...halfLink,
      text: makeResourceTranslations(
        `${id}-links-${index}`,
        resourceLang,
        l10nLanguages,
      ),
    }
  }),
}

export default resource
