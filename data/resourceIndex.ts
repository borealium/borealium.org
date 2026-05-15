import type { Resource, ResourceRelease } from "~types/resource.ts"
import { ResourceType } from "~types/resource.ts"
import {
  getCachedPahkatRepo,
  type PahkatPackage,
  type PahkatRelease,
} from "./pahkat.ts"
import { buildResource, type ResourceDescriptor } from "./resources.ts"
import languagesData from "./languages.ts"

const resourceModules = import.meta.glob<{ default: ResourceDescriptor }>(
  "./resources/*.ts",
  { eager: true },
)

const allResources: Resource[] = Object.entries(resourceModules).map(
  ([path, m]) => {
    const id = path.split("/").pop()!.replace(/\.ts$/, "")
    return buildResource(id, m.default)
  },
)

const resourcesMap = new Map<string, Resource>()

// Populate the map
for (const resource of allResources) {
  resourcesMap.set(resource.id, resource)
}

/**
 * Get a resource by ID (checks both static and Pahkat resources)
 */
export function getResourceById(id: string): Resource | undefined {
  // Check static resources first
  const staticResource = resourcesMap.get(id)
  if (staticResource) { return staticResource }

  // Check Pahkat resources
  return getPahkatResources().find((r) => r.id === id)
}

/**
 * Get resources by category (includes Pahkat resources)
 */
export function getResourcesByCategory(category: string): Resource[] {
  return getAllResources().filter((r) => r.category === category)
}

/**
 * Get resources by language (includes Pahkat resources)
 */
export function getResourcesByLanguage(language: string): Resource[] {
  return getAllResources().filter((r) => r.languages.includes(language))
}

/**
 * Get all resource IDs
 */
export function getAllResourceIds(): string[] {
  return getAllResources().map((r) => r.id)
}

// --- Pahkat Integration ---

const languageKeys = Object.keys(languagesData.languages)
  .filter((x) => !languagesData.uiOnly.includes(x))

function findStableRelease(
  releases: PahkatRelease[],
): PahkatRelease | undefined {
  // Get all unique platform/arch combinations from all releases
  const targets = new Set(
    releases.flatMap((rel) =>
      rel.target.map((t) => (t.arch ? `${t.platform}/${t.arch}` : t.platform))
    ),
  )

  // Find the stable release (channel === null)
  const stable = releases.find((rel) => rel.channel === null)
  if (!stable) { return undefined }

  // Merge all targets into the stable release
  stable.target = Array.from(targets).map((x) => {
    const [platform, arch] = x.split("/")
    return { platform, arch: arch ?? null }
  })

  return stable
}

function toResourceRelease(rel?: PahkatRelease): ResourceRelease | undefined {
  if (!rel) { return undefined }

  return {
    version: rel.version,
    platforms: rel.target.map((
      t,
    ) => (t.arch ? `${t.platform}/${t.arch}` : t.platform)),
    authors: rel.authors,
    license: rel.license,
    licenseUrl: rel.licenseUrl ? new URL(rel.licenseUrl) : undefined,
  }
}

function pahkatPackageToResource(pkg: PahkatPackage): Resource | null {
  const stable = findStableRelease(pkg.release)
  if (!stable) { return null }

  const languages = pkg.tags
    .filter((t) => t.startsWith("lang:") && t !== "lang:zxx")
    .map((t) => t.replace("lang:", ""))

  const category =
    pkg.tags.find((t) => t.startsWith("cat:"))?.replace("cat:", "") ?? ""

  // Filter out packages that don't have any supported languages
  // (unless they have no language tags, meaning they're multi-language)
  if (
    languages.length > 0 && !languages.some((l) => languageKeys.includes(l))
  ) {
    return null
  }

  return {
    id: pkg.id,
    type: ResourceType.Pahkat,
    languages,
    category,
    name: pkg.name,
    description: pkg.description,
    release: toResourceRelease(stable),
  }
}

// Cached Pahkat resources
let pahkatResources: Resource[] | null = null

function getPahkatResources(): Resource[] {
  // Return cached if available
  if (pahkatResources !== null) {
    return pahkatResources
  }

  const repo = getCachedPahkatRepo()
  if (!repo) {
    return []
  }

  pahkatResources = repo.packages
    .filter((pkg) => pkg.release.length > 0)
    .map(pahkatPackageToResource)
    .filter((r): r is Resource => r !== null)

  console.log(
    `Converted ${pahkatResources.length} Pahkat packages to resources`,
  )
  return pahkatResources
}

/**
 * Clear the Pahkat resources cache (called when Pahkat data is refreshed)
 */
export function clearPahkatResourcesCache(): void {
  pahkatResources = null
}

/**
 * Get all resources including Pahkat packages
 */
export function getAllResources(): Resource[] {
  return [...allResources, ...getPahkatResources()]
}
