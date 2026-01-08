import { LinkType, Resource, ResourceType } from "~types/resource.ts"
import { getL10NLanguages, makeResourceTranslations } from "~data/resources.ts"

const id = "mul-newamigos"
const resourceLang = "mul"

const l10nLanguages = getL10NLanguages(resourceLang)

const halfLinks = [
  {
    type: LinkType.AppleAppStore,
    url: new URL("https://apps.apple.com/ua/app/new-amigos/id1496189775"),
  },
  {
    type: LinkType.GooglePlayStore,
    url: new URL("https://play.google.com/store/apps/details?id=com.newamigos"),
  },
  {
    type: LinkType.Normal,
    url: new URL("https://newamigos.com/"),
  },
]

const resource: Resource = {
  id,
  type: ResourceType.External,
  languages: ["fkv", "se", "sje", "sju", "sma", "smj", "sms"],
  category: "langlearning",
  name: makeResourceTranslations(`${id}`, resourceLang, l10nLanguages),
  description: makeResourceTranslations(
    `${id}-description`,
    resourceLang,
    l10nLanguages,
  ),
  moreInfo: makeResourceTranslations(
    `${id}-more-info`,
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
