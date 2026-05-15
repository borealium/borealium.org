import { LinkType } from "~types/resource.ts"
import { defineResource } from "~data/resources.ts"

export default defineResource("mul", {
  languages: ["se", "sma", "smj", "smn", "sms", "sjd", "sje"],
  category: "mt",
  links: [
    {
      type: LinkType.Normal,
      url: new URL("https://neurotolge.ee"),
    },
  ],
})
