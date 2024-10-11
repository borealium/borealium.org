import { Resource, ResourceType } from "~types/resource.ts"

const resource: Resource = {
  id: "sma-korp",
  type: ResourceType.External,
  languages: ["sma"],
  category: "korp",
  name: {
    en: "Korp for South Sámi",
  },
  description: {
    en: "In Korp for South Sámi you can search South Sámi texts. The text corpus is gramatically annotated.",
  },
  links: [
    {
      text: {
        en: "Korp for South Sámi",
      },
      url: new URL("https://gtweb.uit.no/korp/?mode=sma#?lang=en"),
    },
  ],
}

export default resource
