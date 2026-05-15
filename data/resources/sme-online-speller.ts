import { LinkType } from "~types/resource.ts"
import { defineResource } from "~data/resources.ts"

export default defineResource("sme", {
  languages: ["se"],
  category: "spellers",
  links: [
    {
      type: LinkType.Normal,
      url: new URL(`https://divvun.uit.no/?lang=se`),
    },
  ],
})
