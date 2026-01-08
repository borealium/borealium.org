import languagesData from "./languages.ts"

const PAHKAT_URL = "https://pahkat.uit.no"
const GRAPHQL_API = `${PAHKAT_URL}/graphql`
const CACHE_TTL = 1000 * 60 * 60 // 1 hour

export type PahkatPackage = {
  id: string
  name: Record<string, string>
  description: Record<string, string>
  tags: string[]
  release: PahkatRelease[]
}

export type PahkatTarget = {
  platform: string
  arch: string | null
}

export type PahkatRelease = {
  version: string
  channel: string | null
  authors: string[]
  license?: string
  licenseUrl?: string
  target: PahkatTarget[]
}

export type PahkatRepo = {
  url: string
  name: Record<string, string>
  description: Record<string, string>
  packages: PahkatPackage[]
}

// Cache
let cache: { repo: PahkatRepo; timestamp: number } | null = null

const queryMain = `query FetchAll {
  repo(id: "main") {
    url
    name
    description
    packages {
      ... on PackageDescriptor {
        id
        name
        description
        tags
        release {
          version
          channel
          authors
          license
          licenseUrl
          target {
            platform
            arch
          }
        }
      }
    }
  }
}`

async function fetchPahkatRepo(): Promise<PahkatRepo> {
  console.log("Fetching Pahkat repo data...")

  const response = await fetch(GRAPHQL_API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ query: queryMain }),
  })

  if (!response.ok) {
    throw new Error(
      `Pahkat API error: ${response.status} ${response.statusText}`,
    )
  }

  const { data, errors } = await response.json()

  if (errors) {
    console.error("Pahkat GraphQL errors:", errors)
    throw new Error("Pahkat GraphQL query failed")
  }

  console.log(`Pahkat data loaded: ${data.repo.packages.length} packages`)
  return data.repo as PahkatRepo
}

/**
 * Get the Pahkat repo data, fetching if not cached or cache expired
 */
export async function getPahkatRepo(): Promise<PahkatRepo> {
  const now = Date.now()

  // Return cached data if valid
  if (cache && now - cache.timestamp < CACHE_TTL) {
    return cache.repo
  }

  // Fetch fresh data
  const repo = await fetchPahkatRepo()
  cache = { repo, timestamp: now }
  return repo
}

/**
 * Initialize Pahkat data on server startup
 */
export async function initPahkat(): Promise<void> {
  try {
    await getPahkatRepo()
  } catch (error) {
    console.error("Failed to initialize Pahkat data:", error)
    // Don't crash the server, just log the error
    // Resources will be available without Pahkat packages
  }
}

/**
 * Check if Pahkat data is loaded
 */
export function isPahkatLoaded(): boolean {
  return cache !== null
}

/**
 * Get cached repo without fetching (returns null if not cached)
 */
export function getCachedPahkatRepo(): PahkatRepo | null {
  return cache?.repo ?? null
}
