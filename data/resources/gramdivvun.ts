import { LinkType } from "~types/resource.ts"
import { defineResource } from "~data/resources.ts"

export default defineResource(import.meta.url, "mul", {
  languages: ["fo", "se", "sma", "smj", "smn"],
  category: "grammar-checkers",
  moreInfo: true,
  release: {
    platforms: ["macos", "windows", "mobile", "linux"],
    authors: [],
  },
  links: [
    {
      type: LinkType.Normal,
      url: new URL(
        "https://appsource.microsoft.com/nb-no/product/office/WA200001000?src=office&amp;tab=Overview",
      ),
    },
    {
      type: LinkType.Normal,
      url: new URL(
        "https://workspace.google.com/marketplace/app/divvun_grammar_checker/164222088507",
      ),
    },
  ],
})
