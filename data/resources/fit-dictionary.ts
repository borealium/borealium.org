import { LinkType } from "~types/resource.ts"
import { defineResource } from "~data/resources.ts"

export default defineResource(import.meta.url, "fit", {
  languages: ["fit"],
  category: "dictionaries",
  links: [
    {
      type: LinkType.Normal,
      url: new URL("https://språk.isof.se/me%C3%A4nkieli/"),
    },
  ],
})
