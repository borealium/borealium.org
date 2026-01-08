import { LinkType, Resource, ResourceType } from "~types/resource.ts"
import { getL10NLanguages, makeResourceTranslations } from "~data/resources.ts"

const id = "divvun-keyboard"
const resourceLang = "mul"

const l10nLanguages = getL10NLanguages(resourceLang)

const halfLinks = [
  {
    type: LinkType.AppleAppStore,
    url: new URL("https://apps.apple.com/app/divvun-keyboards/id948386025"),
  },
  {
    type: LinkType.GooglePlayStore,
    url: new URL(
      "https://play.google.com/store/apps/details?id=no.uit.giella.keyboards.Sami",
    ),
  },
  {
    type: LinkType.AppleAppStore,
    url: new URL(
      "https://apps.apple.com/us/app/divvun-dev-keyboards/id1518256662",
    ),
  },
  {
    type: LinkType.GooglePlayStore,
    url: new URL(
      "https://play.google.com/store/apps/details?id=no.uit.giella.keyboards.dev",
    ),
  },
]

const resource: Resource = {
  id,
  type: ResourceType.External,
  languages: [],
  category: "keyboard-layouts",
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
