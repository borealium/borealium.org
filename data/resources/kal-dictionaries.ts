import { LinkType } from "~types/resource.ts"
import { defineResource } from "~data/resources.ts"

export default defineResource(import.meta.url, "kal", {
  languages: ["kl"],
  category: "dictionaries",
  links: [
    {
      type: LinkType.Normal,
      url: new URL("https://ordbog.gl"),
    },
  ],
})
