import { LinkType, Resource, ResourceType } from "~types/resource.ts"

const resource: Resource = {
  id: "gramdivvun",
  type: ResourceType.External,
  languages: ["fo", "se", "sma", "smj", "smn"],
  category: "grammar-checkers",
  name: {
    en: "GramDivvun",
  },
  description: {
    en: "Divvun Grammar checkers",
  },
  release: {
    platforms: ["macos", "windows", "mobile"],
    authors: [],
  },
  moreInfo: {
    en: `
      GramDivvun is a grammar checker plugin for MS Office and Google Docs
      that provides grammar checker services in a number of languages.
    `,
  },
  links: [
    {
      type: LinkType.Normal,
      text: {
        en: "MS Office",
      },
      url: new URL("https://appsource.microsoft.com/nb-no/product/office/WA200001000?src=office&amp;tab=Overview"),
    },
    {
      type: LinkType.Normal,
      text: {
        en: "Google Docs",
      },
      url: new URL("https://workspace.google.com/marketplace/app/divvun_grammar_checker/164222088507"),
    },
  ],
}

export default resource
