import { LinkType, Resource, ResourceType } from "~types/resource.ts"

const resource: Resource = {
  id: "puki",
  type: ResourceType.External,
  languages: ["is"],
  category: "spellers",
  name: {
    en: "Púki spellchecker",
    is: "Púki ritvilluvörn",
  },
  description: {
    en: "Púki Icelandic spelling checker",
    is: "Púki ritvilluvörn fyrir PC og Mac",
  },
  links: [
    {
      type: LinkType.Normal,
      text: {
        en: "Púki",
      },
      url: new URL("https://puki.is"),
    },
  ],
}

export default resource
