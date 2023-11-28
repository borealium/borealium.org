import { parse as tomlParse } from "std/toml/mod.ts"
import { getLanguageData } from "~plugins/language-data.ts"

const PAHKAT_URL = "https://pahkat.uit.no"

const GRAPHQL_API = `${PAHKAT_URL}/graphql`
const stringsUrl = (lang: string, repo: string) => `${PAHKAT_URL}/${repo}/strings/${lang}.toml`

const languageData = getLanguageData()

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
}

export type PahkatRelease = {
  version: string
  channel: null | "nightly" | "beta" | string
  authors: string[]
  license?: string
  licenseUrl?: URL
  target: Array<PahkatTarget>
}

export type PahkatRepo = {
  url: string
  name: Record<string, string>
  description: Record<string, string>
  packages: Array<PahkatPackage>
}

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

const queryTools = `query FetchAll {
  repo(id: "tools") {
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

async function downloadMainRepo() {
  const { data, errors } = await fetch(GRAPHQL_API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ query: queryMain }),
  }).then((r) => r.json())

  if (errors) {
    console.error(errors)
    Deno.exit(1)
  }

  return data.repo as PahkatRepo
}

async function downloadToolsRepo() {
  const { data, errors } = await fetch(GRAPHQL_API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ query: queryTools }),
  }).then((r) => r.json())

  if (errors) {
    console.error(errors)
    Deno.exit(1)
  }

  return data.repo as PahkatRepo
}

async function downloadStrings(repo: string) {
  const strings = (await Promise.all(
    Object.keys(languageData.languages).map((lang) => {
      return (async () => {
        const res = await fetch(stringsUrl(lang, repo))
        if (!res.ok) {
          return [lang, null]
        }
        const text = await res.text()
        return [lang, tomlParse(text)]
      })()
    }),
  )).filter(([_, value]) => value != null) as Array<[string, any]>

  const process = (input: any) => {
    const out: any = {}
    for (const [key, value] of Object.entries(input.tags)) {
      if (key.startsWith("cat:")) {
        out[key.slice(4)] = value
      }
    }
    return out
  }

  const out: Record<string, any> = {}

  for (const [lang, data] of strings) {
    out[lang] = process(data)
  }

  return out
}

console.log("Downloading Pahkat repo data...")

// export const strings = await downloadStrings("main")
// export const repo = await downloadMainRepo()

// Deno.writeTextFileSync("./dump.json", JSON.stringify({ strings, repo }, null, 2))
const raw = JSON.parse(Deno.readTextFileSync("./dump.json"))

export const strings: Record<string, any> = raw.strings
export const repo: PahkatRepo = raw.repo

console.log("Pahkat data loaded.")
