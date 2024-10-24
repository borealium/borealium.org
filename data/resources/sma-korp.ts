import { Resource, ResourceType } from "~types/resource.ts"
import { getL10NLanguages, makeResourceTranslations } from "~data/resources.ts"

const id = "sma-korp"
const resourceLang = "sma"

const l10nLanguages = getL10NLanguages(resourceLang)

const halfLinks = [
  {
    text: {
      en: "Korp for South Sámi",
    },
    url: new URL("https://gtweb.uit.no/korp/?mode=sma#?lang=en"),
  },
]

const resource: Resource = {
  id,
  type: ResourceType.External,
  languages: ["sma"],
  category: "korp",
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
