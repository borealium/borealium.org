import { LinkType } from "~types/resource.ts"
import { defineResource } from "~data/resources.ts"

export default defineResource(import.meta.url, "isl", {
  languages: ["is"],
  category: "korp",
  links: [
    {
      type: LinkType.Normal,
      url: new URL("https://malheildir.arnastofnun.is/"),
    },
  ],
})
