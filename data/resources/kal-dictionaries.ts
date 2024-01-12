import { LinkType, Resource, ResourceType } from "~types/resource.ts"

const resource: Resource = {
  id: "kaldict",
  type: ResourceType.External,
  languages: ["kl"],
  category: "dictionaries",
  name: {
    en: "Greenlandic Dictionaries",
    kl: "Kalaallisut Ordbogit",
    da: "Grønlandske Ordbøger",
  },
  description: {
    en: "Online dictionary resources for Greenlandic",
    da: "Grønlandske Ordbøger på net",
  },
  links: [
    {
      text: {
        en: "Greenlandic Dictionaries",
        kl: "Kalaallisut Ordbogit",
        da: "Grønlandske Ordbøger",
      },
      url: new URL("https://ordbog.gl"),
    },
  ],
}

export default resource
