import { LinkType } from "~types/resource.ts"
import { defineResource } from "~data/resources.ts"

export default defineResource(import.meta.url, "mul", {
  languages: ["se", "sje", "sma", "smj", "smn", "sms"],
  category: "dictionaries",
  tags: ["satni", "baakoe"],
  moreInfo: true,
  links: [
    {
      type: LinkType.Normal,
      url: new URL("https://gtweb.uit.no/webdict/"),
    },
  ],
})
