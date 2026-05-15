import { LinkType } from "~types/resource.ts"
import { defineResource } from "~data/resources.ts"

export default defineResource("smn", {
  languages: ["smn"],
  category: "langlearning",
  links: [
    {
      type: LinkType.Normal,
      url: new URL("https://oahpa.no/aanaar/"),
    },
  ],
})
