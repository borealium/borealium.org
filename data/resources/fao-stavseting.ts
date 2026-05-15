import { LinkType } from "~types/resource.ts"
import { defineResource } from "~data/resources.ts"

export default defineResource("fao", {
  languages: ["fo"],
  category: "dictionaries",
  links: [
    {
      type: LinkType.Normal,
      url: new URL("https://malrad.fo/stavsetingarordabokin"),
    },
  ],
})
