import { LinkType, Resource, ResourceType } from "~types/resource.ts"

const resource: Resource = {
  id: "nds-sme",
  type: ResourceType.External,
  languages: ["se"],
  category: "dictionary",
  name: {
    en: "NDS for North Sámi",
  },
  description: {
    en: "Dictionary resources for North Sámi",
  },
  moreInfo: {
    en: `
      NDS — Neahttadigisánit — for North Sámi contains dictionaries translating to and from North Sámi.
    `,
  },
  links: [
    {
      text: {
        en: "Stable",
      },
      url: new URL("https://sanit.oahpa.no"),
    },
  ],
}

export default resource
