import { LinkType, Resource, ResourceType } from "~types/resource.ts"
import { getL10NLanguages, makeResourceTranslations } from "~data/resources.ts"

const id = "gramdivvun"
const resourceLang = "mul"

const l10nLanguages = getL10NLanguages(resourceLang)

const halfLinks = [
  {
    type: LinkType.Normal,
    url: new URL("https://appsource.microsoft.com/nb-no/product/office/WA200001000?src=office&amp;tab=Overview"),
  },
  {
    type: LinkType.Normal,
    url: new URL("https://workspace.google.com/marketplace/app/divvun_grammar_checker/164222088507"),
  },
]

const resource: Resource = {
  id,
  type: ResourceType.External,
  languages: ["fo", "se", "sma", "smj", "smn"],
  category: "grammar-checkers",
  name: makeResourceTranslations(`${id}`, resourceLang, l10nLanguages),
  description: makeResourceTranslations(`${id}-description`, resourceLang, l10nLanguages),
  release: {
    platforms: ["macos", "windows", "mobile"],
    authors: [],
  },
  moreInfo: makeResourceTranslations(`${id}-more-info`, resourceLang, l10nLanguages),
  links: halfLinks.map((halfLink, index) => {
    return {
      ...halfLink,
      text: makeResourceTranslations(`${id}-links-${index}`, resourceLang, l10nLanguages),
    }
  }),
}

export default resource
