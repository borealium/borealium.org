import { Resource, ResourceType } from "~types/resource.ts"

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
        en: "Martha TTS (in English)",
      },
      url: new URL("https://oqaasileriffik.gl/en/langtech/martha/"),
    },
    {
      text: {
        kl: "Martha TTS (kalaallisut)",
        en: "Martha TTS (in Greenlandic)",
      },
      url: new URL("https://oqaasileriffik.gl/oqaaserpassualerineq/martha/"),
    },
    {
      text: {
        da: "Martha TTS (på dansk)",
        en: "Martha TTS (in Danish)",
      },
      url: new URL("https://oqaasileriffik.gl/da/sprogteknologi/martha/"),
    },
  ],
}

export default resource
