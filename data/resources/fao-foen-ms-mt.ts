import { LinkType, Resource, ResourceType } from "~types/resource.ts"
import { getL10NLanguages, makeResourceTranslations } from "~data/resources.ts"

const id = "foenmsmt"
const resourceLang = "fao"

const l10nLanguages = getL10NLanguages(resourceLang)

const halfLinks = [
  {
    type: LinkType.Normal,
    url: new URL("https://www.bing.com/translator?to=fo&setlang=en"),
  },
  {
    type: LinkType.Normal,
    url: new URL("https://www.bing.com/translator?from=fo&to=en"),
  },
]

const resource: Resource = {
  id,
  type: ResourceType.External,
  languages: ["fo"],
  category: "mt",
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
