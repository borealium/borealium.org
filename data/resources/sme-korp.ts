import { LinkType } from "~types/resource.ts"
import { defineResource } from "~data/resources.ts"

export default defineResource("sme", {
  languages: ["se"],
  category: "korp",
  links: [
    {
      type: LinkType.Normal,
      url: new URL("https://gtweb.uit.no/korp/"),
    },
  ],
})
