import { parse as tomlParse } from "std/toml/mod.ts"

const PAHKAT_URL = "https://pahkat.uit.no"

const GRAPHQL_API = `${PAHKAT_URL}/graphql`
const stringsUrl = (lang: string) => `${PAHKAT_URL}/main/strings/${lang}.toml`

export type PahkatPackage = {
  id: string
  name: Record<string, string>
  description: Record<string, string>
  tags: string[]
  release: Array<PahkatRelease>
}

export type PahkatTarget = {
  platform: string
  arch: null | string
  dependencies: Record<string, string>
  payload: {
    __typename: "MacOSPackage" | "WindowsExecutable" | "TarballPackage"
    url: string
  }
}

export type PahkatRelease = {
  version: string
  channel: null | "nightly" | "beta" | string
  target: Array<PahkatTarget>
}

export type PahkatRepo = {
  url: string
  name: Record<string, string>
  description: Record<string, string>
  packages: Array<PahkatPackage>
}

const query = `query FetchAll {
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
          target {
            platform
            arch
            dependencies
            payload {
              __typename
              ... on MacOSPackage {
                url
              }
              ... on WindowsExecutable {
                url
              }
              ... on TarballPackage{
                url
              }
            }
          }
        }
      }
    }
  }
}`

async function downloadMainRepo() {
  const { data, errors } = await fetch(GRAPHQL_API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ query }),
  }).then((r) => r.json())

  if (errors) {
    console.error(errors)
    Deno.exit(1)
  }

  return data.repo as PahkatRepo
}

async function downloadStrings() {
  const [en, nb] = await Promise.all([
    fetch(stringsUrl("en")).then((r) => r.text()).then(tomlParse),
    fetch(stringsUrl("nb")).then((r) => r.text()).then(tomlParse),
  ])

  const process = (input: any) => {
    const out: any = {}
    for (const [key, value] of Object.entries(input.tags)) {
      if (key.startsWith("cat:")) {
        out[key.slice(4)] = value
      }
    }
    return out
  }

  return { en: process(en), nb: process(nb) }
}

console.log("Downloading Pahkat repo data...")

// export const strings = await downloadStrings()
// export const repo = await downloadMainRepo()

// Deno.writeTextFileSync("./dump.json", JSON.stringify({ strings, repo }, null, 2))

const raw = JSON.parse(Deno.readTextFileSync("./dump.json"))

export const strings = raw.strings
export const repo = raw.repo

console.log("Pahkat data loaded.")
