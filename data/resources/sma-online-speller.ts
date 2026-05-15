import { LinkType } from "~types/resource.ts"
import { defineResource } from "~data/resources.ts"

export default defineResource(import.meta.url, "sma", {
  languages: ["sma"],
  category: "spellers",
  links: [
    {
      type: LinkType.Normal,
      url: new URL(`https://divvun.uit.no/?lang=sma`),
    },
  ],
})
