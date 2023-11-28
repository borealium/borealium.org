import { LinkType, Resource, ResourceType } from "~types/resource.ts"

const resource: Resource = {
  id: "sproting",
  type: ResourceType.External,
  languages: ["fo"],
  category: "dictionaries",
  name: {
    en: "Sprotin dictionaries",
    fo: "Sprotin netorðabøkur",
  },
  description: {
    en: "Online dictionary resources for Faroese",
    fo: "Føroyskar netorðabøkur",
  },
  links: [
    {
      text: {
        en: "Sprotin",
      },
      url: new URL("https://sprotin.fo"),
    },
  ],
}

export default resource
