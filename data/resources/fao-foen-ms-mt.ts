import { LinkType } from "~types/resource.ts"
import { defineResource } from "~data/resources.ts"

export default defineResource(import.meta.url, "fao", {
  languages: ["fo"],
  category: "mt",
  links: [
    {
      type: LinkType.Normal,
      url: new URL("https://www.bing.com/translator?to=fo&setlang=en"),
    },
    {
      type: LinkType.Normal,
      url: new URL("https://www.bing.com/translator?from=fo&to=en"),
    },
  ],
})
