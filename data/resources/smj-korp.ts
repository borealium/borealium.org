import { LinkType, Resource, ResourceType } from "~types/resource.ts"

const resource: Resource = {
  id: "smj-korp",
  type: ResourceType.External,
  languages: ["smj"],
  category: "korp",
  name: {
    en: "Korp for Lule Sámi",
  },
  description: {
    en: "In Korp for Lule Sámi you can search Lule Sámi texts. The text corpus is gramatically annotated.",
  },
  links: [
    {
      text: {
        en: "Korp for Lule Sámi",
      },
      url: new URL("https://gtweb.uit.no/korp/?mode=smj#?lang=en"),
    },
  ],
}

export default resource
