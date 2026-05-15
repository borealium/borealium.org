import { LinkType } from "~types/resource.ts"
import { defineResource } from "~data/resources.ts"

export default defineResource(import.meta.url, "mul", {
  languages: [],
  category: "speller-engines",
  moreInfo: true,
  release: {
    platforms: ["macos"],
  },
  links: [
    {
      type: LinkType.MacOS,
      url: new URL(
        "https://extensions.libreoffice.org/en/extensions/show/27383",
      ),
    },
  ],
})
