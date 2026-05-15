import { LinkType } from "~types/resource.ts"
import { defineResource } from "~data/resources.ts"

export default defineResource("yid", {
  languages: ["yi"],
  category: "dictionaries",
  links: [
    {
      type: LinkType.Normal,
      url: new URL("https://språk.isof.se/jiddisch/"),
    },
  ],
})
