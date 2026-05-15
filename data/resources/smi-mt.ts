import { LinkType } from "~types/resource.ts"
import { defineResource } from "~data/resources.ts"

export default defineResource(import.meta.url, "mul", {
  languages: ["se", "sma", "smj", "smn"],
  category: "mt",
  moreInfo: true,
  links: [
    {
      type: LinkType.Normal,
      url: new URL("https://gtweb.uit.no/mt/"),
    },
  ],
})
