import type { TtsVoice } from "~types/resource.ts"

export type TtsResourceConfig = {
  documentationUrl: string
  voices: TtsVoice[]
}

// Map Pahkat resource IDs to their TTS configurations
export const ttsConfig: Record<string, TtsResourceConfig> = {
  "voice-se-female": {
    documentationUrl: "/doc/tts/",
    voices: [{
      language: "se",
      name: "Biret",
      gender: "female",
      apiUrl: "https://api-giellalt.uit.no/tts/se/biret",
      sampleText:
        "Bures, mu namma lea Biret. Mun lean Divvuma davvisámi dahkujietna.",
    }],
  },
  "voice-se-male": {
    documentationUrl: "/doc/tts/",
    voices: [{
      language: "se",
      name: "Máhtte",
      gender: "male",
      apiUrl: "https://api-giellalt.uit.no/tts/se/mahtte",
      sampleText: "Bures, mu namma lea Máhtte.",
    }],
  },
  "voice-smj-male": {
    documentationUrl: "/doc/tts/",
    voices: [
      {
        language: "smj",
        name: "Nihkol",
        gender: "male",
        apiUrl: "https://api-giellalt.uit.no/tts/smj/nihkol",
        sampleText: "Buorre biejvve, mån lav Nihkol.",
      },
      {
        language: "smj",
        name: "Ábmut",
        gender: "male",
        apiUrl: "https://api-giellalt.uit.no/tts/smj/abmut",
        sampleText: "Buorre biejvve, mån lav Ábmut.",
      },
    ],
  },
  "voice-smj-female": {
    documentationUrl: "/doc/tts/",
    voices: [{
      language: "smj",
      name: "Siggá",
      gender: "female",
      apiUrl: "https://api-giellalt.uit.no/tts/smj/sigga",
      sampleText: "Buorre biejvve, mån lav Siggá.",
    }],
  },
  "voice-sma-female": {
    documentationUrl: "/doc/tts/",
    voices: [{
      language: "sma",
      name: "Aanna",
      gender: "female",
      apiUrl: "https://api-giellalt.uit.no/tts/sma/aanna",
      sampleText: "Buerie biejjie, mov nomme lea Aanna.",
    }],
  },
}

export function getTtsConfig(
  resourceId: string,
): TtsResourceConfig | undefined {
  return ttsConfig[resourceId]
}
