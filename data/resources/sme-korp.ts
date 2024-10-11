import { Resource, ResourceType } from "~types/resource.ts"

const resource: Resource = {
  id: "sme-korp",
  type: ResourceType.External,
  languages: ["se"],
  category: "korp",
  name: {
    en: "Korp for North Sámi",
  },
  description: {
    en: "In Korp for North Sámi you can search North Sámi texts. The text corpus is gramatically annotated.",
  },
  links: [
    {
      text: {
        en: "Korp for North Sámi",
      },
      url: new URL("https://gtweb.uit.no/korp/#?lang=en"),
    },
  ],
}

export default resource
