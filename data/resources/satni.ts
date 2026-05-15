import { LinkType } from "~types/resource.ts"
import { defineResource } from "~data/resources.ts"

export default defineResource("mul", {
  languages: ["se", "sma", "smj", "smn", "sms"],
  category: "dictionaries",
  tags: ["satni", "baakoe"],
  moreInfo: true,
  links: [
    {
      type: LinkType.Normal,
      url: new URL("https://satni.org"),
    },
  ],
})
