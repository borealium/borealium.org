import { LinkType, Resource, ResourceType } from "~types/resource.ts"

const resource: Resource = {
  id: "fao-korp",
  type: ResourceType.External,
  languages: ["fo"],
  category: "korp",
  name: {
    en: "Korp for Faroese",
  },
  description: {
    en: "In Korp for Faroese, you can search for Faroese texts. The text corpus is gramatically annotated.",
  },
  links: [
    {
      text: {
        en: "Korp for Faroese",
      },
      url: new URL("https://gtweb.uit.no/f_korp/?mode=fao#?lang=en"),
    },
  ],
}

export default resource
