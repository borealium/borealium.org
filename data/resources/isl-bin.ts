import { LinkType } from "~types/resource.ts"
import { defineResource } from "~data/resources.ts"

export default defineResource("isl", {
  languages: ["is"],
  category: "wordinfl",
  links: [
    {
      type: LinkType.Normal,
      url: new URL("https://bin.arnastofnun.is/"),
    },
  ],
})
