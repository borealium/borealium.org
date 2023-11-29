import { LinkType, Resource, ResourceType } from "~types/resource.ts"

const resource: Resource = {
  id: "nutimaordabok",
  type: ResourceType.External,
  languages: ["is"],
  category: "dictionaries",
  name: {
    en: "Icelandic modern dictionary",
    is: "Nútímamálsorðabók",
  },
  description: {
    en: "Online dictionary for modern Icelandic",
    is: "Íslensk nútímamálsorðabók á netinu",
  },
  links: [
    {
      text: {
        en: "Nútímamálsorðabók",
      },
      url: new URL("https://islenskordabok.arnastofnun.is"),
    },
  ],
}

export default resource
