import { LinkType } from "~types/resource.ts"
import { defineResource } from "~data/resources.ts"

export default defineResource(import.meta.url, "smj", {
  languages: ["smj"],
  category: "dictionaries",
  moreInfo: true,
  links: [
    {
      type: LinkType.Normal,
      url: new URL("https://gtweb.uit.no/old-webdict/ak/smj2nob/index.html"),
    },
    {
      type: LinkType.Normal,
      url: new URL(
        "https://gtweb.uit.no/old-webdict/lulesamisk_ordbok_offline.zip",
      ),
    },
  ],
})
