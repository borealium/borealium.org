import { LinkType } from "~types/resource.ts"
import { defineResource } from "~data/resources.ts"

export default defineResource("kal", {
  languages: ["kl"],
  category: "mt",
  moreInfo: true,
  links: [
    {
      type: LinkType.Normal,
      url: new URL("https://nutserut.gl"),
    },
  ],
})
