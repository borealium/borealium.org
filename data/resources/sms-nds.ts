import { LinkType } from "~types/resource.ts"
import { defineResource } from "~data/resources.ts"

export default defineResource("sms", {
  languages: ["sms"],
  category: "dictionaries",
  moreInfo: true,
  links: [
    {
      type: LinkType.Normal,
      url: new URL("https://saan.oahpa.no"),
    },
  ],
})
