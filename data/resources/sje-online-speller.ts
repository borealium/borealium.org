import { LinkType } from "~types/resource.ts"
import { defineResource } from "~data/resources.ts"

export default defineResource("sje", {
  languages: ["sje"],
  category: "spellers",
  links: [
    {
      type: LinkType.Normal,
      url: new URL(
        `https://divvun.org/proofing/online-speller.html?lang=sje`,
      ),
    },
  ],
})
