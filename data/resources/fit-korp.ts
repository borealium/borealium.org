import { LinkType, Resource, ResourceType } from "~types/resource.ts"

const resource: Resource = {
  id: "fit-korp",
  type: ResourceType.External,
  languages: ["fit"],
  category: "korp",
  name: {
    en: "Korp for Meänkieli",
  },
  description: {
    en: "In Korp for Meänkieli, you can search for Meänkieli texts. The text corpus is gramatically annotated.",
  },
  links: [
    {
      text: {
        en: "Korp for Meänkieli",
      },
      url: new URL("https://gtweb.uit.no/f_korp/?mode=fit#?lang=en"),
    },
  ],
}

export default resource
