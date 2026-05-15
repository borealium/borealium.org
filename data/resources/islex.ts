import { LinkType } from "~types/resource.ts"
import { defineResource } from "~data/resources.ts"

export default defineResource(import.meta.url, "mul", {
  languages: ["da", "fi", "fo", "is", "nb", "nn", "sv"],
  category: "dictionaries",
  links: [
    {
      type: LinkType.Normal,
      url: new URL("https://islex.arnastofnun.is/"),
    },
  ],
})
