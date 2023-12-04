import { LinkType, Resource, ResourceType } from "~types/resource.ts"

const resource: Resource = {
  id: "voidit-asr",
  type: ResourceType.External,
  languages: ["fo"],
  category: "speech-recognition",
  name: {
    en: "VoisIT Speech Recognition",
  },
  description: {
    en: "Speech recognition for Faroese",
  },
  links: [
    {
      text: {
        en: "VoisIT ASR (in Faroese)",
      },
      url: new URL("https://voisit.fo"),
    },
    {
      type: LinkType.AppleAppStore,
      text: {
        en: "VoisIT",
      },
      url: new URL("https://apps.apple.com/dk/app/voisit/id6459887023?l=da"),
    },
    {
      type: LinkType.GooglePlayStore,
      text: {
        en: "VoisIT",
      },
      url: new URL("https://play.google.com/store/apps/details?id=net.isolveit.voisit"),
    },
  ],
}

export default resource
