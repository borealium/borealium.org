import { LinkType, Resource, ResourceType } from "~types/resource.ts"

const resource: Resource = {
  id: "online-speller-others",
  type: ResourceType.External,
  languages: ["fo", "kl", "sje", "fkv", "fit"],
  category: "spellers",
  name: {
    en: "Online spellchecker",
  },
  description: {
    en: "Online spelling checker for many languages",
  },
  links: [
    {
      type: LinkType.Normal,
      text: {
        en: "Online speller",
      },
      url: new URL("https://divvun.org/proofing/online-speller.html"),
    },
  ],
}

export default resource
