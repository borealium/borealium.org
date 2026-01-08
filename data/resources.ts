import { parse as tomlParse } from "@std/toml"
import { createTranslator } from "~lib/fluent.ts"
import type { LangTag } from "~types/language.ts"

interface L10nPath {
  reference: string
  l10n: string
  locales: string[]
}

interface L10nConfig {
  paths: L10nPath[]
}

// Cache for l10n configs
const l10nCache = new Map<string, string[]>()

/**
 * Get the list of languages that have translations for a resource language
 */
export function getL10NLanguages(resourceLang: string): string[] {
  // Check cache first
  if (l10nCache.has(resourceLang)) {
    return l10nCache.get(resourceLang)!
  }

  try {
    const tomlPath = `${Deno.cwd()}/resources/${resourceLang}-l10n.toml`
    const tomlContent = Deno.readTextFileSync(tomlPath)
    const config = tomlParse(tomlContent) as unknown as L10nConfig

    const locales = [...(config.paths[0]?.locales ?? []), "en"]
    l10nCache.set(resourceLang, locales)
    return locales
  } catch {
    // If no l10n file, default to English only
    const defaultLocales = ["en"]
    l10nCache.set(resourceLang, defaultLocales)
    return defaultLocales
  }
}

/**
 * Create translations for a resource key across multiple languages
 */
export function makeResourceTranslations(
  key: string,
  resourceLang: string,
  languages: LangTag[],
): Record<LangTag, string> {
  const result: Record<LangTag, string> = {}

  for (const lang of languages) {
    try {
      // Create a translator for this language using the resource-specific fluent path
      const t = createTranslator(lang, `${resourceLang}-resources`)
      result[lang] = t(key, { fallback: key })
    } catch {
      // Fallback to key if translation fails
      result[lang] = key
    }
  }

  return result
}

// Export type for Resource
export type { Resource } from "~types/resource.ts"
