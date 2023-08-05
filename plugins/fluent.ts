import { Page } from "lume/core/filesystem.ts"
import { isPlainObject, merge } from "lume/core/utils.ts"
import type { Logger, PageData, Plugin, Site } from "lume/core.ts"
import { FluentBundle, FluentResource } from "https://esm.sh/@fluent/bundle@0.18.0"
// import { parse } from "https://esm.sh/@fluent/syntax@0.19.0"

import { dirname, join } from "std/path/mod.ts"
import { LanguagesData } from "~plugins/language-data.ts"

export interface Options {
  extensions: string[]
}

const defaults: Options = {
  extensions: [".html"],
}

export default function fluent(languages: LanguagesData, userOptions?: Partial<Options>): Plugin {
  const options = merge(defaults, userOptions)

  return (site: Site) => {
    const mergedKeys = site.scopedData.get("/")?.mergedKeys || {}
    mergedKeys["fluentBundle"] = "object"
    site.data("mergedKeys", mergedKeys)
    // const mergedKeys = site.scopedData.get("/")?.mergedKeys || {}

    //     const enResource = new FluentResource(`
    // -brand-name = Divvun
    // welcome = Welcome to {-brand-name}!
    // `)

    //     const svResource = new FluentResource(`
    // -brand-name = Divvun
    // welcome = Välkomna till {-brand-name}!
    // `)

    //     const enBundle = new FluentBundle("en")
    //     enBundle.addResource(enResource)

    //     const svBundle = new FluentBundle("sv")
    //     svBundle.addResource(svResource)

    //     mergedKeys["fluentBundles"] = "object"

    //     site.data("fluentBundles", {
    //       en: enBundle,
    //       sv: svBundle,
    //     })
    //     site.data("mergedKeys", mergedKeys)

    site.preprocess(options.extensions, (page, pages) => {
      // console.log(page.data.url, page.data.lang)
      if (typeof page.data.lang !== "string") {
        return
      }

      if (typeof page.data.url !== "string") {
        return
      }

      const { src } = page.src.entry ?? {}

      if (src != null) {
        site.data(
          "fluentResource",
          tryLoadFltResource(site.logger, languages, page.data.lang, dirname(src), page.src.slug),
          page.data.url,
        )
      }
      // site.data("fluentBundle", fltBundle(site, page.data.lang, page.data.url), page.data.url)
      // console.log(site.scopedData)
      pages.splice(
        pages.indexOf(page),
        1,
        page.duplicate(undefined, { ...page.data, fluentBundle: fltBundle(site, page.data.lang, page.data.url) }),
      )

      // console.log(site.scopedData)
    })
  }
}

function pathChunks(path: string) {
  return path.replaceAll(/(^\/+|\/+$)/g, "").split("/")
}

function rebuildPath(chunks: string[]) {
  if (chunks.length === 0) {
    return "/"
  }
  return `/${chunks.join("/")}/`
}

function* ascendingScopes(site: Site, path: string) {
  const chunks = pathChunks(path)

  for (let i = 0; i <= chunks.length; i++) {
    const scopePath = rebuildPath(chunks.slice(0, i))
    const scopedData = site.scopedData.get(scopePath)
    const fluentData = scopedData?.["fluentResource"]

    if (fluentData != null) {
      yield fluentData
    }
  }
}

function fltBundle(
  site: Site,
  baseLang: string,
  url: string,
): FluentBundle {
  const bundle = new FluentBundle(baseLang)

  const fluentData = ascendingScopes(site, url)
  for (const resource of fluentData) {
    bundle.addResource(resource)
  }

  return bundle
}

function tryLoadFltResource(
  logger: Logger,
  languages: LanguagesData,
  baseLang: string,
  path: string,
  slug: string,
): FluentResource | null {
  const fallbacks = [baseLang, ...(languages.fallbacks[baseLang] ?? [])]

  for (const lang of fallbacks) {
    const p = join(path, `${slug}.${lang}.flt`)

    let fltText
    try {
      // console.log(p)
      fltText = Deno.readTextFileSync(p)
    } catch (e) {
      if (e.name !== "NotFound") {
        logger.warn(`Error loading ${slug}.${lang}.flt\n<red>${e}</red>`)
      }
      continue
    }

    let fltResource: FluentResource | null = null
    try {
      // parse(fltText, {})
      fltResource = new FluentResource(fltText)
    } catch (e) {
      logger.warn(`Could not load ${slug}.${lang}.flt <red>${e}</red>`)
      continue
    }

    const bundle = new FluentBundle("en")
    const errors = bundle.addResource(fltResource)
    return fltResource
  }

  return null
}
