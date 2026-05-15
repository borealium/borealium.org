import { parse as tomlParse } from "@std/toml"
import { createTranslator } from "~lib/fluent.ts"
import type { LangTag } from "~types/language.ts"
import type { CategoryId } from "~types/category.ts"
import {
  type LinkType,
  type Resource,
  type ResourceRelease,
  ResourceType,
} from "~types/resource.ts"

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

type DefineResourceConfig = {
  languages: LangTag[]
  category: CategoryId
  tags?: string[]
  moreInfo?: boolean
  release?: ResourceRelease
  documentationUrl?: string
  links?: Array<{ type: LinkType; url: URL }>
  type?: ResourceType
}

/**
 * Build a Resource from its module URL and a config. The id is derived from
 * the filename, so each resource file's source of truth for its id is its own
 * path on disk. Translation keys (`id`, `id-description`, `id-more-info`,
 * `id-links-N`) are constructed automatically.
 */
export function defineResource(
  url: string,
  resourceLang: string,
  config: DefineResourceConfig,
): Resource {
  const id = url.split("/").pop()!.replace(/\.ts$/, "")
  const l10nLanguages = getL10NLanguages(resourceLang)
  const tr = (key: string) =>
    makeResourceTranslations(key, resourceLang, l10nLanguages)

  const resource: Resource = {
    id,
    type: config.type ?? ResourceType.External,
    category: config.category,
    languages: config.languages,
    name: tr(id),
    description: tr(`${id}-description`),
  }
  if (config.tags) { resource.tags = config.tags }
  if (config.moreInfo) { resource.moreInfo = tr(`${id}-more-info`) }
  if (config.release) { resource.release = config.release }
  if (config.documentationUrl) {
    resource.documentationUrl = config.documentationUrl
  }
  if (config.links) {
    resource.links = config.links.map((link, index) => ({
      ...link,
      text: tr(`${id}-links-${index}`),
    }))
  }
  return resource
}
