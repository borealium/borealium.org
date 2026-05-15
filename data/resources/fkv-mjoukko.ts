import { LinkType } from "~types/resource.ts"
import { defineResource } from "~data/resources.ts"

export default defineResource("fkv", {
  languages: ["fkv"],
  category: "langlearning",
  links: [
    {
      type: LinkType.Normal,
      url: new URL("https://kvensk.uit.no/"),
    },
  ],
})
