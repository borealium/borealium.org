import { LinkType, Resource, ResourceType } from "~types/resource.ts"
import { getL10NLanguages, makeResourceTranslations } from "~data/resources.ts"

const id = "divvunspell-libreoffice"
const resourceLang = "mul"

const l10nLanguages = getL10NLanguages(resourceLang)

const halfLinks = [
  {
    type: LinkType.MacOS,
    url: new URL("https://extensions.libreoffice.org/en/extensions/show/27383"),
  },
]

const resource: Resource = {
  id,
  type: ResourceType.External,
  languages: [],
  release: {
    platforms: ["macos"],
  },
  category: "speller-engines",
  name: makeResourceTranslations(`${id}`, resourceLang, l10nLanguages),
  description: makeResourceTranslations(`${id}-description`, resourceLang, l10nLanguages),
  // TODO: Fix multiline string
  moreInfo: {
    en: `
      On Windows, use Divvun Manager to install this plugin. It is installed automatically if you have LibreOffice on your computer.

      ### Installation on macOS

      * Install any relevant spellers with Divvun Manager
      * Download the .oxt file below
      * Import it into the Plugins in LibreOffice
      * Restart LibreOffice
      
      Now you can use spellchecking with the provided spellers.
    `,
  },
  links: halfLinks.map((halfLink, index) => {
    return {
      ...halfLink,
      text: makeResourceTranslations(`${id}-links-${index}`, resourceLang, l10nLanguages),
    }
  }),
}

export default resource
