import { LinkType, Resource, ResourceType } from "~types/resource.ts"

const resource: Resource = {
  id: "divvun-keyboard",
  type: ResourceType.External,
  languages: [],
  category: "examples",
  name: {
    en: "Divvun Keyboard",
  },
  description: {
    en: "Divvun Keyboard for iOS and Android",
  },
  links: [
    {
      type: LinkType.AppleAppStore,
      text: {
        en: "Stable",
      },
      url: new URL("https://apps.apple.com/app/divvun-keyboards/id948386025"),
    },
    {
      type: LinkType.GooglePlayStore,
      text: {
        en: "Stable",
      },
      url: new URL("https://play.google.com/store/apps/details?id=no.uit.giella.keyboards"),
    },
    {
      type: LinkType.AppleAppStore,
      text: {
        en: "Development",
      },
      url: new URL("https://apps.apple.com/us/app/divvun-dev-keyboards/id1518256662"),
    },
    {
      type: LinkType.GooglePlayStore,
      text: {
        en: "Development",
      },
      url: new URL("https://play.google.com/store/apps/details?id=no.uit.giella.keyboards.dev"),
    },
  ],
}

export default resource
