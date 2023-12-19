import { LinkType, Resource, ResourceType } from "~types/resource.ts"

const resource: Resource = {
  id: "online-speller-sami",
  type: ResourceType.External,
  languages: ["se", "sma", "smj", "smn", "sms"],
  category: "spellers",
  name: {
    en: "Online Sámi spellchecker",
  },
  description: {
    en: "Online spelling checker for the Sámi languages",
  },
  links: [
    {
      type: LinkType.Normal,
      text: {
        en: "Online speller",
      },
      url: new URL("https://divvun.no/korrektur/speller-demo.html"),
    },
  ],
}

export default resource
