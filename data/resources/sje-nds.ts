import { Resource, ResourceType } from "~types/resource.ts"

const resource: Resource = {
  id: "nds-sje",
  type: ResourceType.External,
  languages: ["sje"],
  category: "dictionaries",
  name: {
    en: "NDS for Pite Sámi",
  },
  description: {
    en: "Dictionary resources for Pite Sámi",
  },
  moreInfo: {
    en: `
      NDS — Nähttadigibáhko — for Pite Sámi contains dictionaries translating to and from Pite Sámi.
    `,
  },
  links: [
    {
      text: {
        en: "NDS Bidum-sámegiella",
      },
      url: new URL("https://bahkogirrje.oahpa.no"),
    },
  ],
}

export default resource
