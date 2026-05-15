import { LinkType } from "~types/resource.ts"
import { defineResource } from "~data/resources.ts"

export default defineResource("sje", {
  languages: ["sje"],
  category: "dictionaries",
  moreInfo: true,
  links: [
    {
      type: LinkType.Normal,
      url: new URL("https://sjelex.keeleressursid.ee/"),
    },
  ],
})
