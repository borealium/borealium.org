import { LinkType, Resource, ResourceType } from "~types/resource.ts"

const resource: Resource = {
  id: "nds-sma",
  type: ResourceType.External,
  languages: ["sma"],
  category: "dictionaries",
  name: {
    en: "NDS for South Sámi",
  },
  description: {
    en: "Dictionary resources for South Sámi",
  },
  moreInfo: {
    en: `
      NDS — Nedtedigibaakoe — for South Sámi contains dictionaries translating to and from South Sámi.
    `,
  },
  links: [
    {
      text: {
        en: "NDS Åarjel",
      },
      url: new URL("https://baakoeh.oahpa.no"),
    },
  ],
}

export default resource
