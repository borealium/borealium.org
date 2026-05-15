import { LinkType } from "~types/resource.ts"
import { defineResource } from "~data/resources.ts"

export default defineResource(import.meta.url, "sme", {
  languages: ["se"],
  category: "mt",
  moreInfo: true,
  links: [
    {
      type: LinkType.Normal,
      url: new URL("https://jorgal.uit.no"),
    },
  ],
})
