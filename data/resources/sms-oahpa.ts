import { LinkType } from "~types/resource.ts"
import { defineResource } from "~data/resources.ts"

export default defineResource("sms", {
  languages: ["sms"],
  category: "langlearning",
  links: [
    {
      type: LinkType.Normal,
      url: new URL("https://oahpa.no/nuorti/"),
    },
  ],
})
