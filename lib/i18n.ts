import type { FluentVariable } from "@fluent/bundle"
import { marked } from "marked"
import languagesData from "../data/languages.ts"
import type { LangTag } from "../types/language.ts"
import {
  createTranslator,
  formatMessage,
  getBundle,
  makeFallbacks,
} from "./fluent.ts"

export { createTranslator } from "./fluent.ts"

/**
 * Get the autonym (native name) for a language
 * For regional variants (sma-no), returns the base language autonym
 */
export function autonym(tag: LangTag): string {
  // Handle regional variants
  const [base] = tag.split("-")
  return languagesData.languages[base]?.autonym ?? tag
}

/**
 * Get the fallback locales for a language
 * Handles regional variants (sma-no) by looking up with uppercase region (sma-NO)
 */
export function fallbackLocales(langId: LangTag): LangTag[] {
  // Check for regional variant
  const [base, region] = langId.split("-")

  if (region) {
    // Try regional key with uppercase region
    const regionalKey = `${base}-${region.toUpperCase()}`
    if (languagesData.fallbacks[regionalKey]) {
      return languagesData.fallbacks[regionalKey] as LangTag[]
    }
    // Fall back to base language fallbacks
    return languagesData.fallbacks[base] ?? ["en"]
  }

  return languagesData.fallbacks[langId] ?? ["en"]
}

/**
 * Select the best value from a record based on language with fallbacks
 */
export function selectLocale<T>(
  langId: LangTag,
  input: Record<string, T>,
): T | undefined {
  if (input[langId] != null) {
    return input[langId]
  }

  for (const fallback of fallbackLocales(langId)) {
    if (input[fallback] != null) {
      return input[fallback]
    }
  }
}

/**
 * Get all website languages
 */
export function getWebsiteLanguages(): LangTag[] {
  return languagesData.websiteLanguages
}

/**
 * Check if a language tag is a valid website language
 * Accepts both base languages (sma, smj) and regional variants (sma-no, smj-se)
 */
export function isValidLanguage(lang: string): lang is LangTag {
  // Check base languages
  if (languagesData.websiteLanguages.includes(lang)) {
    return true
  }

  // Check regional variants (e.g., sma-no, smj-se)
  const [base, region] = lang.split("-")
  if (region && languagesData.websiteLanguages.includes(base)) {
    const langData = languagesData.languages[base]
    if (langData?.regions?.includes(region.toUpperCase())) {
      return true
    }
  }

  return false
}

/**
 * Get the default language
 */
export function getDefaultLanguage(): LangTag {
  return "nb"
}

/**
 * Parse Accept-Language header and return best matching language
 *
 * Supports regional variants for orthographic differences:
 * - Explicit regional variant (sma-NO, smj-SE) → use it
 * - Norwegian languages (nn, no, nb) → prefer NO variants
 * - Swedish/Finnish (sv, fi) → prefer SE variants
 */
export function parseAcceptLanguage(header: string | null): LangTag {
  if (!header) {
    return getDefaultLanguage()
  }

  const websiteLangs = new Set(getWebsiteLanguages())

  // Languages that have regional variants
  const languagesWithRegions = Object.entries(languagesData.languages)
    .filter(([_, data]) => data.regions && data.regions.length > 0)
    .map(([code]) => code)

  // Parse Accept-Language header, preserving region info
  const languages = header
    .split(",")
    .map((part) => {
      const [fullTag, qPart] = part.trim().split(";")
      const q = qPart ? parseFloat(qPart.split("=")[1]) : 1
      const [lang, region] = fullTag.toLowerCase().split("-")
      return { lang, region: region?.toUpperCase(), q }
    })
    .sort((a, b) => b.q - a.q)

  // Collect all base languages for heuristic detection
  const baseLangs = new Set(languages.map((l) => l.lang))

  // Infer preferred region from other languages in the header
  // Norwegian (nn, no, nb) → NO; Swedish/Finnish (sv, fi) → SE
  let inferredRegion: string | null = null
  if (baseLangs.has("nn") || baseLangs.has("no") || baseLangs.has("nb")) {
    inferredRegion = "NO"
  } else if (baseLangs.has("sv") || baseLangs.has("fi")) {
    inferredRegion = "SE"
  }

  // Find first matching language
  for (const { lang, region } of languages) {
    // Check for explicit regional variant first
    if (region && languagesWithRegions.includes(lang)) {
      const langData = languagesData.languages[lang]
      if (langData.regions?.includes(region)) {
        return `${lang}-${region.toLowerCase()}` as LangTag
      }
    }

    // Check if base language matches
    if (websiteLangs.has(lang)) {
      // If this language has regional variants and we inferred a region, use it
      if (languagesWithRegions.includes(lang) && inferredRegion) {
        const langData = languagesData.languages[lang]
        if (langData.regions?.includes(inferredRegion)) {
          return `${lang}-${inferredRegion.toLowerCase()}` as LangTag
        }
      }
      return lang
    }
  }

  return getDefaultLanguage()
}

/**
 * Translation context for use in components
 */
export interface TranslationContext {
  lang: LangTag
  t: (
    key: string,
    opts?: { args?: Record<string, FluentVariable>; fallback?: string },
  ) => string
  tmd: (
    key: string,
    opts?: { args?: Record<string, FluentVariable>; fallback?: string },
  ) => string
}

/**
 * Create a translation context for a language and path
 */
export function createTranslationContext(
  lang: LangTag,
  path: string = "",
): TranslationContext {
  const t = createTranslator(lang, path)

  const tmd = (
    key: string,
    opts?: { args?: Record<string, FluentVariable>; fallback?: string },
  ): string => {
    const text = t(key, opts)
    return marked.parse(text) as string
  }

  return { lang, t, tmd }
}

/**
 * Get language data for display
 */
export function getLanguageInfo(lang: LangTag) {
  const data = languagesData.languages[lang]
  return {
    tag: lang,
    autonym: data?.autonym ?? lang,
    coordinates: data?.coordinates,
    labelPosition: data?.labelPosition,
  }
}

/**
 * Get the translated title for a language in a given UI language
 */
export function getLanguageTitle(langTag: string, uiLang: LangTag): string {
  const t = createTranslator(uiLang, "languages")
  return t(langTag, { fallback: autonym(langTag) })
}

/**
 * Get all languages with their info
 */
export function getAllLanguages() {
  return Object.entries(languagesData.languages).map(([tag, data]) => ({
    tag,
    autonym: data.autonym,
    coordinates: data.coordinates,
    labelPosition: data.labelPosition,
    isWebsiteLanguage: languagesData.websiteLanguages.includes(tag),
    isUiOnly: languagesData.uiOnly.includes(tag),
    isHidden: languagesData.hidden.includes(tag),
  }))
}

/**
 * Get regions data
 */
export function getRegions() {
  return languagesData.regions
}
