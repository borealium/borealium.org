import { LinkType } from "~types/resource.ts"
import { defineResource } from "~data/resources.ts"

export default defineResource("smn", {
  languages: ["smn"],
  category: "korp",
  links: [
    {
      type: LinkType.Normal,
      url: new URL("https://gtweb.uit.no/korp/?mode=smn#?lang=en"),
    },
  ],
})
