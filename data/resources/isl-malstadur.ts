import { LinkType } from "~types/resource.ts"
import { defineResource } from "~data/resources.ts"

export default defineResource(import.meta.url, "isl", {
  languages: ["is"],
  category: "grammar-checkers",
  links: [
    {
      type: LinkType.Normal,
      url: new URL("https://malstadur.mideind.is/"),
    },
  ],
})
