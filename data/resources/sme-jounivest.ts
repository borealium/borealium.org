import { LinkType } from "~types/resource.ts"
import { defineResource } from "~data/resources.ts"

export default defineResource("sme", {
  languages: ["se"],
  category: "dictionaries",
  moreInfo: true,
  links: [
    {
      type: LinkType.Normal,
      url: new URL(
        "https://dicts.uit.no/dicts/Jouni_A_Vest_nettisanakirja.html",
      ),
    },
  ],
})
