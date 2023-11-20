import type { Plugin } from "lume/core.ts"

const RAW_DATA: LanguagesData = {
  languages: {
    "en": {
      name: "English",
      autonym: "English",
    },
    "sv": {
      name: "Swedish",
      autonym: "Svenska",
    },
    "nb": {
      name: "Norwegian (Bokmål)",
      autonym: "norsk bokmål",
    },
    "nn": {
      name: "Norwegian (Nynorsk)",
      autonym: "norsk nynorsk",
    },
    "fi": {
      name: "Finnish",
      autonym: "suomi",
    },
    "is": {
      name: "Icelandic",
      autonym: "íslenska",
    },
    "fo": {
      name: "Faroese",
      autonym: "føroyskt",
    },
    "se": {
      name: "Northern Sami",
      autonym: "davvisámegiella",
    },
    "smj": {
      name: "Lule Sami",
      autonym: "julevsámegiella",
      "regions": ["NO", "SE"],
    },
    "sma": {
      name: "Southern Sami",
      autonym: "åarjelsaemien gïele",
      "regions": ["NO", "SE"],
    },
    "sjd": {
      name: "Kildin Sami",
      autonym: "Кӣллт са̄мь кӣлл",
    },
    "sms": {
      name: "Skolt Sami",
      autonym: "nuõrttsääʹmǩiõll",
    },
    "smn": {
      name: "Inari Sami",
      autonym: "anarâškielâ",
    },
    "fkv": {
      name: "Kven",
      autonym: "kväänin kieli",
    },
    "sje": {
      name: "Pite Sami",
      autonym: "Bidumsámegiella",
    },
  },
  fallbacks: {
    "se": ["nb", "en"],
    "sma-SE": ["sv", "en"],
    "sma-NO": ["nb", "en"],
    "sms": ["fi", "en"],
    "smn": ["fi", "en"],
    "sje": ["sv", "en"],
    "fkv": ["sv", "en"],
    "smj-SE": ["sv", "en"],
    "smj-NO": ["nb", "en"],
    "nb": ["nn", "en"],
    "nn": ["nb", "en"],
  },
  uiOnly: ["en", "nb", "nn", "sv"],
}

type LanguageId = string
type RegionId = string
type LangTag = string

export type LanguagesData = {
  languages: Record<LanguageId, LanguageData>
  fallbacks: Record<LangTag, LangTag[]>
  uiOnly: LangTag[]
}

export type LanguageData = {
  name: string
  autonym: string
  regions?: RegionId[]
}

export default function languageData(): Plugin {
  return (site) => {
    const mergedKeys = site.scopedData.get("/")?.mergedKeys || {}
    mergedKeys["languages"] = "object"
    site.data("languages", RAW_DATA)
    site.data("mergedKeys", mergedKeys)
  }
}

export function getLanguageData(): LanguagesData {
  return RAW_DATA as LanguagesData
}

export function fallbackLocales(langId: LangTag): LangTag[] {
  return RAW_DATA.fallbacks[langId] ?? ["en"]
}

export function selectLocale<T>(langId: LangTag, input: Record<string, T>): T | undefined {
  if (input[langId] != null) {
    return input[langId]
  }

  for (const fallback of fallbackLocales(langId)) {
    if (input[fallback] != null) {
      return input[fallback]
    }
  }
}
