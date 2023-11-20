import { join } from "std/path/posix.ts"
import { Resource, ResourceRelease, ResourceType } from "~types/resource.ts"

import { PahkatRelease, repo } from "~ext/pahkat.ts"
import { getLanguageData } from "~plugins/language-data.ts"

const externalResources: Resource[] = await Promise.all(
  Array.from(Deno.readDirSync("./ext/resources"))
    .filter((x) => x.isFile && x.name.endsWith(".ts") && x.name !== "mod.ts")
    .map((x) => join("~ext/resources", x.name))
    .map((x) => import(x).then((x) => x.default)),
)

function findStable(rels: PahkatRelease[]) {
  return rels.find((x) => x.channel === null)
}

function toResourceRelease(rel?: PahkatRelease): ResourceRelease | undefined {
  if (rel == null) {
    return undefined
  }

  return {
    version: rel.version,
    platforms: rel.target.map((x) => {
      if (x.arch != null) {
        return `${x.platform}/${x.arch}`
      } else {
        return x.platform
      }
    }),
    authors: rel.authors,
    license: rel.license,
    licenseUrl: rel.licenseUrl,
  }
}

const languages = getLanguageData()
const languageKeys = Object.keys(languages.languages)
  .filter((x) => !languages.uiOnly.includes(x))

const pahkatResources: Resource[] = repo.packages
  .map((pkg): Resource => {
    return {
      id: pkg.id,
      type: ResourceType.Pahkat,
      languages: pkg.tags
        .filter((x) => x.startsWith("lang:"))
        .map((x) => x.replace("lang:", "")),
      category: pkg
        .tags
        .find((x) => x.startsWith("cat:"))?.replace("cat:", "") ?? "",
      name: pkg.name,
      description: pkg.description,
      release: toResourceRelease(findStable(pkg.release)),
    }
  })
  .filter((x) =>
    x.languages.length === 0 ||
    x.languages.some((x) => languageKeys.includes(x))
  )

export default [...externalResources, ...pahkatResources]
