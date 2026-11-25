const PAHKAT_URL = "https://pahkat.uit.no"
const GRAPHQL_API = `${PAHKAT_URL}/graphql`
const FETCH_TIMEOUT = 1000 * 30
const REFRESH_INTERVAL = 1000 * 60 * 60
const MIN_RETRY_DELAY = 1000 * 5
const MAX_RETRY_DELAY = 1000 * 60 * 5

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

let repo: PahkatRepo | null = null

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
    signal: AbortSignal.timeout(FETCH_TIMEOUT),
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
 * A failed fetch keeps the last loaded data and retries with backoff, so one
 * failure at startup (cluster DNS not answering yet, say) can't leave the site
 * without Pahkat resources until the process restarts.
 */
async function refreshPahkatRepo(failures: number): Promise<void> {
  let delay = REFRESH_INTERVAL
  try {
    repo = await fetchPahkatRepo()
    failures = 0
  } catch (error) {
    failures += 1
    delay = Math.min(MIN_RETRY_DELAY * 2 ** (failures - 1), MAX_RETRY_DELAY)
    console.error(
      `Failed to fetch Pahkat data (attempt ${failures}), retrying in ${
        delay / 1000
      }s:`,
      error,
    )
  }
  Deno.unrefTimer(setTimeout(() => refreshPahkatRepo(failures), delay))
}

/**
 * Load Pahkat data on server startup and keep it refreshed
 */
export async function initPahkat(): Promise<void> {
  await refreshPahkatRepo(0)
}

/**
 * The most recently fetched repo, or null if no fetch has succeeded yet. A
 * refresh replaces the object, so callers can key derived data on its identity.
 */
export function getCachedPahkatRepo(): PahkatRepo | null {
  return repo
}
