import { Resource, ResourceType } from "~types/resource.ts"
import { getL10NLanguages, makeResourceTranslations } from "~data/resources.ts"

const id = "marthatts"
const resourceLang = "kal"
const halfLinks = [
  {
    url: new URL("https://oqaasileriffik.gl/en/langtech/martha/"),
  },
  {
    url: new URL("https://oqaasileriffik.gl/oqaaserpassualerineq/martha/"),
  },
  {
    url: new URL("https://oqaasileriffik.gl/da/sprogteknologi/martha/"),
  },
]

const l10nLanguages = getL10NLanguages(resourceLang)

const resource: Resource = {
  id,
  type: ResourceType.External,
  languages: ["kl"],
  category: "text-to-speech",
  category: "voices",
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
