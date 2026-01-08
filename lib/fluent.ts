import { FluentBundle, FluentResource, FluentVariable } from "@fluent/bundle"
import { walk } from "@std/fs"
import { relative } from "@std/path"
import languagesData from "../data/languages.ts"
import type { LangTag, LanguagesData } from "../types/language.ts"

// Cache for loaded bundles
let bundleTree: {
  [path: string]: {
    [lang: string]: FluentBundle
  }
} | null = null

/**
 * Get the fallback chain for a language
 * Handles regional variants (sma-no) by including the base language (sma) in fallbacks
 */
export function makeFallbacks(
  lang: string,
  languages: LanguagesData,
): string[] {
  if (lang === "en") { return ["en"] }

  // Check for regional variant (e.g., sma-no, smj-se)
  const [base, region] = lang.split("-")

  if (region) {
    // Try to find fallbacks for the regional variant (case-insensitive)
    const regionalKey = `${base}-${region.toUpperCase()}`
    const regionalFallbacks = languages.fallbacks[regionalKey]

    if (regionalFallbacks) {
      // Regional fallbacks already include base language, just prepend the regional tag
      return [lang, ...regionalFallbacks]
    }

    // No specific regional fallbacks, use base language fallbacks
    const baseFallbacks = languages.fallbacks[base] ?? ["en"]
    return [lang, base, ...baseFallbacks]
  }

  // Base language
  return [lang, ...(languages.fallbacks[lang] ?? ["en"])]
}

/**
 * Get a FluentBundle for a given key and language
 */
export function getBundle(key: string, lang: string): FluentBundle {
  if (!bundleTree) {
    throw new Error("Fluent bundles not initialized. Call initFluent() first.")
  }

  const fallbacks = makeFallbacks(lang, languagesData)
  const chunks = key === "" ? [] : key.split("/")

  // Try to find a bundle matching the key path
  while (chunks.length > 0) {
    const k = chunks.join("/")
    for (const l of fallbacks) {
      if (bundleTree[k]?.[l]) {
        return bundleTree[k][l]
      }
    }
    chunks.pop()
  }

  // Fall back to root bundle
  for (const l of fallbacks) {
    if (bundleTree[""]?.[l]) {
      return bundleTree[""][l]
    }
  }

  throw new Error(
    `Could not find any bundle for path '${key}' and lang '${lang}'`,
  )
}

/**
 * Format a message from a FluentBundle
 */
export function formatMessage(
  bundle: FluentBundle,
  key: string,
  args?: Record<string, FluentVariable>,
  fallback?: string,
): string {
  const message = bundle.getMessage(key)

  if (message?.value) {
    if (args) {
      const errors: Error[] = []
      const result = bundle.formatPattern(message.value, args, errors)
      if (errors.length > 0) {
        console.warn(`Fluent format error for '${key}':`, errors[0])
        return fallback ?? key
      }
      return result
    }
    return bundle.formatPattern(message.value)
  }

  if (fallback !== undefined) {
    return fallback
  }

  console.warn(`Missing Fluent message: '${key}'`)
  return key
}

/**
 * Find all .ftl files in a directory
 */
async function* findFtlFiles(rootPath: string) {
  try {
    for await (const entry of walk(rootPath, { exts: ["ftl"] })) {
      if (entry.isFile) {
        const relPath = relative(rootPath, entry.path)
        const [lang, ...rest] = relPath.split("/")
        const filename = rest.pop() || ""

        // Parse the path chunks from filename (e.g., "about_slash_index.ftl")
        const chunks = filename.replace(".ftl", "").split("_slash_")
        const name = chunks.pop() ?? "index"

        if (name !== "index") {
          chunks.push(name)
        }

        const content = await Deno.readTextFile(entry.path)

        yield {
          lang,
          path: entry.path,
          chunks,
          resource: new FluentResource(content),
        }
      }
    }
  } catch (e) {
    if (!(e instanceof Deno.errors.NotFound)) {
      throw e
    }
  }
}

/**
 * Build a resource tree from .ftl files
 */
async function buildResourceTree(rootPath: string): Promise<{
  [path: string]: { [lang: string]: FluentResource }
}> {
  const tree: { [path: string]: { [lang: string]: FluentResource } } = {}

  for await (const item of findFtlFiles(rootPath)) {
    const p = item.chunks.join("/")

    if (!tree[p]) {
      tree[p] = {}
    }

    tree[p][item.lang] = item.resource
  }

  return tree
}

/**
 * Build bundle tree from resource trees
 */
function buildBundleTree(
  resources: { [path: string]: { [lang: string]: FluentResource } },
  languages: LanguagesData,
): { [path: string]: { [lang: string]: FluentBundle } } {
  const tree: { [path: string]: { [lang: string]: FluentBundle } } = {}
  const baseLangs = Object.keys(languages.languages)

  // Build list of all language variants (base + regional)
  const allLangs: string[] = [...baseLangs]
  for (const lang of baseLangs) {
    const langData = languages.languages[lang]
    if (langData?.regions) {
      for (const region of langData.regions) {
        // Add lowercase version for URL matching (sma-no)
        allLangs.push(`${lang}-${region.toLowerCase()}`)
      }
    }
  }

  for (const k of Object.keys(resources)) {
    const bundles: Record<string, FluentBundle> = {}

    for (const lang of allLangs) {
      const bundle = new FluentBundle(lang)
      const fallbacks = makeFallbacks(lang, languages)

      // Walk up the path hierarchy and add resources
      const chunks = k.split("/")

      while (chunks.length > 0) {
        const p = chunks.join("/")
        const res = resources[p]

        if (res) {
          for (const l of fallbacks) {
            // Try exact match first
            if (res[l]) {
              bundle.addResource(res[l])
            }
            // For regional variants, also try uppercase directory name (sma-SE)
            if (l.includes("-")) {
              const [base, region] = l.split("-")
              const upperKey = `${base}-${region.toUpperCase()}`
              if (res[upperKey]) {
                bundle.addResource(res[upperKey])
              }
            }
          }
        }

        chunks.pop()
      }

      // Also add root resources
      const rootRes = resources[""]
      if (rootRes) {
        for (const l of fallbacks) {
          if (rootRes[l]) {
            bundle.addResource(rootRes[l])
          }
          // For regional variants, also try uppercase directory name
          if (l.includes("-")) {
            const [base, region] = l.split("-")
            const upperKey = `${base}-${region.toUpperCase()}`
            if (rootRes[upperKey]) {
              bundle.addResource(rootRes[upperKey])
            }
          }
        }
      }

      bundles[lang] = bundle
    }

    tree[k] = bundles
  }

  return tree
}

/**
 * Initialize Fluent bundles from locale directories
 */
export async function initFluent(): Promise<void> {
  if (bundleTree) {
    return // Already initialized
  }

  const cwd = Deno.cwd()
  const rootPaths = [`${cwd}/locales`, `${cwd}/resources`]

  const allResources: { [path: string]: { [lang: string]: FluentResource } } =
    {}

  for (const rootPath of rootPaths) {
    const resources = await buildResourceTree(rootPath)
    for (const [path, langResources] of Object.entries(resources)) {
      if (!allResources[path]) {
        allResources[path] = {}
      }
      Object.assign(allResources[path], langResources)
    }
  }

  bundleTree = buildBundleTree(allResources, languagesData)

  console.log("Loaded Fluent bundles:", Object.keys(bundleTree).length)
}

/**
 * Check if Fluent has been initialized
 */
export function isFluentInitialized(): boolean {
  return bundleTree !== null
}

/**
 * Create a translator function for a specific language and path
 */
export function createTranslator(lang: LangTag, path: string = "") {
  return function t(
    key: string,
    opts?: { args?: Record<string, FluentVariable>; fallback?: string },
  ): string {
    try {
      const bundle = getBundle(path, lang)
      return formatMessage(bundle, key, opts?.args, opts?.fallback)
    } catch (e) {
      console.warn(`Translation error for '${key}':`, e)
      return opts?.fallback ?? key
    }
  }
}
