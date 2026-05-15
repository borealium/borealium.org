import { LinkType } from "~types/resource.ts"
import { defineResource } from "~data/resources.ts"

export default defineResource("smn", {
  languages: ["smn"],
  category: "spellers",
  links: [
    {
      type: LinkType.Normal,
      url: new URL(`https://divvun.uit.no/?lang=smn`),
    },
  ],
})
