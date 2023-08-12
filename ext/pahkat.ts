const PAHKAT_API = "https://pahkat.uit.no/graphql"

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

const { data, errors } = await fetch(PAHKAT_API, {
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

export const repo: PahkatRepo = data.repo

// await Deno.mkdir("./src/_data/tools", { recursive: true })
// await Deno.writeTextFile("./src/_data/tools/status.json", JSON.stringify(data.status, null, 2))
// await Deno.writeTextFile("./src/_data/tools/repo.json", JSON.stringify(data.repo, null, 2))
