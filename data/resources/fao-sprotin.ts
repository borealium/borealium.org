import { Resource, ResourceType } from "~types/resource.ts"
import { getL10NLanguages, makeResourceTranslations } from "~data/resources.ts"

const id = "sprotin"
const resourceLang = "fao"

const l10nLanguages = getL10NLanguages(resourceLang)

const resource: Resource = {
  id,
  type: ResourceType.External,
  languages: ["fo"],
  category: "dictionaries",
  name: makeResourceTranslations(`${id}`, resourceLang, l10nLanguages),
  description: makeResourceTranslations(`${id}-description`, resourceLang, l10nLanguages),
  links: [{ url: new URL("https://sprotin.fo") }].map((halfLink, index) => {
    return {
      ...halfLink,
      text: makeResourceTranslations(`${id}-links-${index}`, resourceLang, l10nLanguages),
    }
  }),
}

export default resource
