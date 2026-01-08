import { LinkType, Resource, ResourceType } from "~types/resource.ts"
import { getL10NLanguages, makeResourceTranslations } from "~data/resources.ts"

const id = "divvun-manager"
const resourceLang = "mul"

const l10nLanguages = getL10NLanguages(resourceLang)

const halfLinks = [
  {
    type: LinkType.Windows,
    url: new URL(
      "https://pahkat.uit.no/divvun-installer/download/divvun-installer?platform=windows",
    ),
  },
  {
    type: LinkType.MacOS,
    url: new URL(
      "https://pahkat.uit.no/divvun-installer/download/divvun-installer?platform=macos",
    ),
  },
]

const resource: Resource = {
  id,
  type: ResourceType.External,
  languages: [],
  category: "package-management",
  name: makeResourceTranslations(`${id}`, resourceLang, l10nLanguages),
  description: makeResourceTranslations(
    `${id}-description`,
    resourceLang,
    l10nLanguages,
  ),
  release: {
    platforms: ["windows", "macos"],
  },
  moreInfo: makeResourceTranslations(
    `${id}-more-info`,
    resourceLang,
    l10nLanguages,
  ),
  documentationUrl: "/doc/divvun-manager/",
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
