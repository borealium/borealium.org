import { LinkType, Resource, ResourceType } from "~types/resource.ts"

const resource: Resource = {
  id: "satni",
  type: ResourceType.External,
  languages: ["se", "sma", "smj", "smn", "sms"],
  category: "dictionaries",
  name: {
    en: "Sátni.org",
  },
  description: {
    en: "Terminology and dictionaries fot the Sámi languages",
  },
  moreInfo: {
    en: `
      Sátni.org contains terminology from Giellagáldu, as well as a number of dictionaries fot the Sámi languages. All content can be searched at once in one place. One can filter on languages and dictionaries.
    `,
  },
  links: [
    {
      text: {
        en: "Sátni.org",
      },
      url: new URL("https://santi.org"),
    },
  ],
}

export default resource
