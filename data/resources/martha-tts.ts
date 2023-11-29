import { LinkType, Resource, ResourceType } from "~types/resource.ts"

const resource: Resource = {
  id: "marthatts",
  type: ResourceType.External,
  languages: ["kl"],
  category: "text-to-speech",
  name: {
    en: "Martha Speech Synthesis",
  },
  description: {
    en: "Speech synthesis for Greenlandic",
  },
  links: [
    {
      text: {
        en: "Martha TTS (English)",
      },
      url: new URL("https://oqaasileriffik.gl/en/langtech/martha/"),
    },
    {
      text: {
        kl: "Martha TTS (kalaallisut)",
      },
      url: new URL("https://oqaasileriffik.gl/oqaaserpassualerineq/martha/"),
    },
    {
      text: {
        da: "Martha TTS (dansk)",
      },
      url: new URL("https://oqaasileriffik.gl/da/sprogteknologi/martha/"),
    },
  ],
}

export default resource

