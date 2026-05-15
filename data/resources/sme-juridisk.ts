import { LinkType } from "~types/resource.ts"
import { defineResource } from "~data/resources.ts"

export default defineResource("sme", {
  languages: ["se"],
  category: "dictionaries",
  moreInfo: true,
  links: [
    {
      type: LinkType.Normal,
      url: new URL("http://gtweb.uit.no/old-webdict/term/index.html"),
    },
  ],
})
