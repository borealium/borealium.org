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
  ],
}

export default resource
