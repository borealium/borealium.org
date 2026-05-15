import { LinkType } from "~types/resource.ts"
import { defineResource } from "~data/resources.ts"

export default defineResource(import.meta.url, "krl", {
  languages: ["krl"],
  category: "dictionaries",
  links: [
    {
      type: LinkType.Normal,
      url: new URL("https://kaino.kotus.fi/kks/"),
    },
    {
      type: LinkType.Normal,
      url: new URL("https://kotus.fi/sanakirjat/karjalan-kielen-sanakirja/"),
    },
  ],
})
