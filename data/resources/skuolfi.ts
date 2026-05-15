import { LinkType } from "~types/resource.ts"
import { defineResource } from "~data/resources.ts"

export default defineResource("mul", {
  languages: ["se", "fi"],
  category: "dictionaries",
  tags: ["skuolfi", "dictionary"],
  moreInfo: true,
  links: [
    {
      type: LinkType.Normal,
      url: new URL("https://satnegirji.skuolfi.org"),
    },
    {
      type: LinkType.Normal,
      url: new URL("https://github.com/guovza/satnegirji.www"),
    },
  ],
})
