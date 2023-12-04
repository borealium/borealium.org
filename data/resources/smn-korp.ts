import { LinkType, Resource, ResourceType } from "~types/resource.ts"

const resource: Resource = {
  id: "smn-korp",
  type: ResourceType.External,
  languages: ["smn"],
  category: "korp",
  name: {
    en: "Korp for Inari Sámi",
  },
  description: {
    en: "In Korp for Inari Sámi you can search Inari Sámi texts. The text corpus is gramatically annotated.",
  },
  links: [
    {
      text: {
        en: "Korp for Inari Sámi",
      },
      url: new URL("https://gtweb.uit.no/korp/?mode=smn#?lang=en"),
    },
  ],
}

export default resource
