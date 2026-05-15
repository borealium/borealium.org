import { LinkType } from "~types/resource.ts"
import { defineResource } from "~data/resources.ts"

export default defineResource("sma", {
  languages: ["sma"],
  category: "langlearning",
  moreInfo: true,
  links: [
    {
      type: LinkType.Normal,
      url: new URL("https://gielese.no"),
    },
  ],
})
