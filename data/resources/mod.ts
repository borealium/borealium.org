import { join } from "std/path/posix.ts"
import { Resource, ResourceRelease, ResourceType } from "~types/resource.ts"

import { PahkatRelease, repo } from "~data/pahkat.ts"
import { getLanguageData } from "~plugins/language-data.ts"
import { fluentBundle, message } from "~plugins/fluent.ts"
import { LangTag } from "~types/category.ts"

const externalResources: Resource[] = await Promise.all(
  Array.from(Deno.readDirSync("./data/resources"))
    .filter((x) => x.isFile && x.name.endsWith(".ts") && x.name !== "mod.ts")
    .map((x) => join("~data/resources", x.name))
    .map((x) => import(x).then((x) => x.default)),
)

function findStable(rels: PahkatRelease[]) {
  return rels.find((x) => x.channel === null)
}

function findNightly(rels: PahkatRelease[]) {
  return rels.find((x) => x.channel === "nightly")
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
  .filter((pkg) => pkg.release.length > 0)
  .map((pkg): Resource | null => {
    const stable = findStable(pkg.release)

    if (stable == null) {
      return null
    }

    return {
      id: pkg.id,
      type: ResourceType.Pahkat,
      languages: pkg.tags
        .filter((x) => x.startsWith("lang:") && x !== "lang:zxx")
        .map((x) => x.replace("lang:", "")),
      category: pkg
        .tags
        .find((x) => x.startsWith("cat:"))?.replace("cat:", "") ?? "",
      name: pkg.name,
      description: pkg.description,
      release: toResourceRelease(stable),
    }
  })
  .filter((x): x is Resource => x != null)
  .filter((x) =>
    x.languages.length === 0 ||
    x.languages.some((x) => languageKeys.includes(x))
  )

// Inject more info for specific cases
pahkatResources
  .filter((x) => x.category === "spellers")
  .forEach((x) => {
    if (x.moreInfo == null) {
      const moreInfo: Record<LangTag, string> = {}
      for (const lang of Object.keys(languages.languages)) {
        const bundle = fluentBundle("", lang)
        moreInfo[lang] = message(bundle, null, "~data/resources", "more-info-spellers")
      }
      x.moreInfo = moreInfo
    }
  })

pahkatResources
  .filter((x) => x.category === "keyboard-layouts")
  .forEach((x) => {
    if (x.moreInfo == null) {
      const moreInfo: Record<LangTag, string> = {}
      for (const lang of Object.keys(languages.languages)) {
        const bundle = fluentBundle("", lang)
        moreInfo[lang] = message(bundle, null, "~data/resources", "more-info-keyboards")
      }
      x.moreInfo = moreInfo
    }
  })

export default [...externalResources, ...pahkatResources]
