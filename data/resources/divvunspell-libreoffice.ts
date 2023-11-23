import { LinkType, Resource, ResourceType } from "~types/resource.ts"

const resource: Resource = {
  id: "divvunspell-libreoffice",
  type: ResourceType.External,
  languages: [],
  release: {
    platforms: ["macos"],
  },
  category: "speller-engines",
  name: {
    en: "DivvunSpell for LibreOffice",
  },
  description: {
    en: "A plugin for LibreOffice that provides access to Divvun spellers.",
  },
  moreInfo: {
    en: `
      On Windows, use Divvun Manager to install this plugin.

      ### Installation on macOS

      * Install any relevant spellers with Divvun Manager
      * Download the .oxt file below
      * Import it into the Plugins in LibreOffice
      * Restart LibreOffice
      
      Now you can use spellchecking with the provided spellers.
    `,
  },
  links: [
    {
      type: LinkType.MacOS,
      text: {
        en: ".oxt",
      },
      url: new URL("https://extensions.libreoffice.org/en/extensions/show/27383"),
    },
  ],
}

export default resource
