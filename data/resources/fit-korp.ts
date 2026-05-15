import { LinkType } from "~types/resource.ts"
import { defineResource } from "~data/resources.ts"

export default defineResource("fit", {
  languages: ["fit"],
  category: "korp",
  links: [
    {
      type: LinkType.Normal,
      url: new URL("https://gtweb.uit.no/korp/fit"),
    },
  ],
})
