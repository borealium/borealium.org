import { LinkType, Resource, ResourceType } from "~types/resource.ts"

const resource: Resource = {
  id: "fkv-korp",
  type: ResourceType.External,
  languages: ["fkv"],
  category: "korp",
  name: {
    en: "Korp for Kven",
  },
  description: {
    en: "In Korp for Kven, you can search for Kven texts. The text corpus is gramatically annotated.",
  },
  links: [
    {
      text: {
        en: "Korp for Kven",
      },
      url: new URL("https://gtweb.uit.no/f_korp/#?lang=en"),
    },
  ],
}

export default resource
