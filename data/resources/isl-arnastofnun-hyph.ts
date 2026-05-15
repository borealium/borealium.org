import { LinkType } from "~types/resource.ts"
import { defineResource } from "~data/resources.ts"

export default defineResource(import.meta.url, "isl", {
  languages: ["is"],
  category: "hyphenators",
  links: [
    {
      type: LinkType.Normal,
      url: new URL("https://malvinnsla.arnastofnun.is"),
    },
  ],
})
