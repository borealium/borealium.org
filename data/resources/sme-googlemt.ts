import { LinkType } from "~types/resource.ts"
import { defineResource } from "~data/resources.ts"

export default defineResource("sme", {
  languages: ["se"],
  category: "mt",
  links: [
    {
      type: LinkType.Normal,
      url: new URL("https://translate.google.com/?sl=se"),
    },
  ],
})
