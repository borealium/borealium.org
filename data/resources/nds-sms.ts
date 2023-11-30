import { LinkType, Resource, ResourceType } from "~types/resource.ts"

const resource: Resource = {
  id: "nds-sms",
  type: ResourceType.External,
  languages: ["sma"],
  category: "dictionaries",
  name: {
    en: "NDS for Skolt Sámi",
  },
  description: {
    en: "Dictionary resources for Skolt Sámi",
  },
  moreInfo: {
    en: `
      NDS — Neahttadigisánit — for Skolt Sámi contains dictionaries translating to and from Skolt Sámi.
    `,
  },
  links: [
    {
      text: {
        en: "NDS Nuõrtt-sääʹmǩiõll",
      },
      url: new URL("https://saan.oahpa.no"),
    },
  ],
}

export default resource
