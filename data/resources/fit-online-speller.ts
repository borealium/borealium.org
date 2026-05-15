import { LinkType } from "~types/resource.ts"
import { defineResource } from "~data/resources.ts"

export default defineResource(import.meta.url, "fit", {
  languages: ["fit"],
  category: "spellers",
  links: [
    {
      type: LinkType.Normal,
      url: new URL(
        `https://divvun.org/proofing/online-speller.html?lang=fit`,
      ),
    },
  ],
})
