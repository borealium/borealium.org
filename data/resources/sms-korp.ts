import { LinkType, Resource, ResourceType } from "~types/resource.ts"

const resource: Resource = {
  id: "sms-korp",
  type: ResourceType.External,
  languages: ["sms"],
  category: "korp",
  name: {
    en: "Korp for Skolt Sámi",
  },
  description: {
    en: "In Korp for Skolt Sámi you can search Skolt Sámi texts. The text corpus is gramatically annotated.",
  },
  links: [
    {
      text: {
        en: "Korp for Skolt Sámi",
      },
      url: new URL("https://gtweb.uit.no/korp/?mode=sms#?lang=en"),
    },
  ],
}

export default resource
