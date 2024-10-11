import { Resource, ResourceType } from "~types/resource.ts"

const resource: Resource = {
  id: "nds-sjd",
  type: ResourceType.External,
  languages: ["sjd"],
  category: "dictionaries",
  name: {
    en: "NDS for Kildin Sámi",
  },
  description: {
    en: "Dictionary resources for Kildin Sámi",
  },
  moreInfo: {
    en: `
      NDS — Neahttadigisánit — for Kildin Sámi contains dictionaries translating to and from Kildin Sámi.
    `,
  },
  links: [
    {
      text: {
        en: "NDS Са̄мь",
      },
      url: new URL("https://sanj.oahpa.no"),
    },
  ],
}

export default resource
