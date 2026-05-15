import { LinkType } from "~types/resource.ts"
import { defineResource } from "~data/resources.ts"

export default defineResource("smj", {
  languages: ["smj"],
  category: "dictionaries",
  moreInfo: true,
  links: [
    {
      type: LinkType.Normal,
      url: new URL("https://gtweb.uit.no/old-webdict/ak/nob2smj/index.html"),
    },
    {
      type: LinkType.Normal,
      url: new URL(
        "https://gtweb.uit.no/old-webdict/lulesamisk_ordbok_offline.zip",
      ),
    },
  ],
})
