import type { Plugin } from "lume/core/site.ts"
import languagesData from "~data/languages.ts"
import { LangTag, LanguagesData } from "~types/language.ts"

export default function languageData(): Plugin {
  return (site) => {
    const mergedKeys = site.scopedData.get("/")?.mergedKeys || {}
    mergedKeys["languages"] = "object"
    site.data("languages", languagesData)
    site.data("mergedKeys", mergedKeys)
  }
}

export function getLanguageData(): LanguagesData {
  return languagesData as LanguagesData
}

export function fallbackLocales(langId: LangTag): LangTag[] {
  return languagesData.fallbacks[langId] ?? ["en"]
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

export function autonym(tag: LangTag): string {
  return languagesData.languages[tag]?.autonym ?? tag
}
