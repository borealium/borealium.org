const PAHKAT_API = "https://pahkat.uit.no/graphql"

const query = `query FetchAll {
    status {
      indexRef
    }
    
    repo(id: "main") {
      url
      name
      description
      packages {
        __typename
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
                ... on  TarballPackage{
                  url
                }
              }
            }
          }
        }
        ... on SynthDescriptor {
          id
          name
          releases {
            version
            channel
            targets {
              platform
              dependencies
              arch
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

await Deno.mkdir("./src/_data/tools", { recursive: true })
await Deno.writeTextFile("./src/_data/tools/status.json", JSON.stringify(data.status, null, 2))
await Deno.writeTextFile("./src/_data/tools/repo.json", JSON.stringify(data.repo, null, 2))
