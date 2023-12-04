import { LinkType, Resource, ResourceType } from "~types/resource.ts"

const resource: Resource = {
  id: "nds-smn",
  type: ResourceType.External,
  languages: ["smn"],
  category: "dictionaries",
  name: {
    en: "NDS for Inari Sámi",
  },
  description: {
    en: "Dictionary resources for Inari Sámi",
  },
  moreInfo: {
    en: `
      NDS — Nettidigisäänih — for Inari Sámi contains dictionaries translating to and from Inari Sámi.
    `,
  },
  links: [
    {
      text: {
        en: "NDS Anarâškielâ",
      },
      url: new URL("https://saanih.oahpa.no"),
    },
  ],
}

export default resource
