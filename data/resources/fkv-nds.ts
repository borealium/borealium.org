import { Resource, ResourceType } from "~types/resource.ts"

const resource: Resource = {
  id: "nds-fkv",
  type: ResourceType.External,
  languages: ["fkv"],
  category: "dictionaries",
  name: {
    en: "NDS for Kvääni",
  },
  description: {
    en: "Dictionary resources for Kvääni",
  },
  moreInfo: {
    en: `
      NDS — Nähttadigibáhko — for Kvääni contains dictionaries translating to and from Kvääni.
    `,
  },
  links: [
    {
      text: {
        en: "NDS Kvääni",
      },
      url: new URL("https://sanat.oahpa.no"),
    },
  ],
}

export default resource
