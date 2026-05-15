import { LinkType } from "~types/resource.ts"
import { defineResource } from "~data/resources.ts"

export default defineResource("smn", {
  languages: ["smn"],
  category: "dictionaries",
  moreInfo: true,
  links: [
    {
      type: LinkType.Normal,
      url: new URL("https://saanih.oahpa.no"),
    },
  ],
})
