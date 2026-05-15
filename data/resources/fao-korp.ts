import { LinkType } from "~types/resource.ts"
import { defineResource } from "~data/resources.ts"

export default defineResource("fao", {
  languages: ["fo"],
  category: "korp",
  links: [
    {
      type: LinkType.Normal,
      url: new URL("https://gtweb.uit.no/korp/fao"),
    },
  ],
})
