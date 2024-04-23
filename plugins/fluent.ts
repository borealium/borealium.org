import { merge } from "lume/core/utils.ts"
import type { Logger, Plugin, Site } from "lume/core.ts"
import { FluentBundle, FluentResource, FluentVariable } from "@fluent/bundle"
import { existsSync, walkSync } from "std/fs/mod.ts"

import { dirname } from "std/path/mod.ts"
import { getLanguageData } from "~plugins/language-data.ts"
import { relative } from "lume/deps/path.ts"
import { LanguagesData } from "~types/language.ts"
import dedent from "dedent"
import { React } from "lume/deps/react.ts"
import { marked } from "marked"

const languages = getLanguageData()

export interface Options {
  extensions: string[]
}

const defaults: Options = {
  extensions: [".mdx", ".md", ".html", ".yml"],
}

export type TranslateFn = (key: string, args?: Record<string, FluentVariable>) => string

export type FluentPage = {
  lang: string
  t: TranslateFn
  tmd: TranslateFn
  fluentBundle: (lang: string, path: string) => TranslateFn
}

function downloadStringly() {
  console.log("Downloading stringly...")
  const cmd = new Deno.Command("cargo", {
    args: [
      "install",
      "--root",
      `${Deno.cwd()}/_cargo`,
      "--git",
      "https://github.com/necessary-nu/stringly",
    ],
    stdout: "piped",
  })
  const output = cmd.outputSync()
  if (!output.success) {
    console.error(new TextDecoder().decode(output.stderr))
    throw new Error("Failed to install stringly")
  }
}

let bundleTree: {
  [path: string]: {
    [lang: string]: FluentBundle
  }
} | null = null

export function fluentBundle(key: string, lang: string) {
  const fallbacks = makeFallbacks(lang, languages)
  const chunks = key === "" ? [] : key.split("/")

  while (chunks.length > 0) {
    const k = chunks.join("/")
    for (const l of fallbacks) {
      if (bundleTree?.[k]?.[l]) {
        return bundleTree[k][l]
      }
    }
    chunks.pop()
  }

  for (const l of fallbacks) {
    if (bundleTree?.[""]?.[l]) {
      return bundleTree[""][l]
    }
  }

  throw new Error(`Could not find any bundle for path '${key}'`)
}

function validateFtlFiles() {
  console.log("Validating .ftl files...")
  const cmd = new Deno.Command(`${Deno.cwd()}/_cargo/bin/stringly`, {
    args: ["validate", "-r", "-i", ".", "-f", "ftl"],
    stdout: "piped",
  })

  const output = cmd.outputSync()
  console.log(new TextDecoder().decode(output.stderr))
  if (!output.success) {
    throw new Error("Failed to validate .ftl files")
  }
}

function loadFluentFiles() {
  validateFtlFiles()

  const bundleTree = ftlBundleTree(`${Deno.cwd()}/src`, languages)
  console.log("Loaded Fluent files:")
  for (const k in bundleTree) {
    if (k == "") {
      console.log("  - index")
    } else {
      console.log(`  - ${k}`)
    }
  }
  return bundleTree
}

export function init() {
  if (!existsSync(`${Deno.cwd()}/_cargo/bin/stringly`)) {
    downloadStringly()
  }

  bundleTree = loadFluentFiles()
}

export default function fluent(userOptions?: Partial<Options>): Plugin {
  const options = merge(defaults, userOptions)

  return (site: Site) => {
    site.addEventListener("beforeUpdate", (event) => {
      if (Array.from(event.files).some((x) => x.endsWith(".ftl"))) {
        site.logger.log("Regenerating Fluent data...")
        bundleTree = loadFluentFiles()
      }
    })

    site.data(
      "fluentBundle",
      (lang: string, key: string) => {
        return _t(site, key, fluentBundle.bind(null, key, lang))
      },
    )

    site.preprocess(options.extensions, (page, pages) => {
      const lang = page.data.lang as string ?? "en"

      if (typeof page.data.url !== "string") {
        site.logger.warn("Page had no valid URL")
        return
      }

      const src = page.src.entry?.src ?? `${Deno.cwd()}/src`
      const ftlResKey = relative(`${Deno.cwd()}/src`, dirname(src ?? ""))

      const t = _t(site, page.data.url, fluentBundle.bind(null, ftlResKey, lang))

      pages.splice(
        pages.indexOf(page),
        1,
        page.duplicate(undefined, {
          ...page.data,
          t,
          tmd: (key: string, args?: Record<string, FluentVariable>) => {
            return React.createElement("div", {
              dangerouslySetInnerHTML: { __html: marked.parse(dedent(t(key, args))) },
            })
          },
        }),
      )
    })
  }
}

export function message(
  bundle: FluentBundle,
  logger: Logger | null,
  url: string,
  key: string,
  args?: Record<string, FluentVariable>,
): string {
  const message = bundle.getMessage(key)

  if (message != null) {
    const pattern = message.value

    if (pattern == null) {
      logger?.warn(`[${url}] Could not find Fluent expression for '${key}'; falling back to raw key.`)
      return key
    }

    if (args != null) {
      const errors: Error[] = []
      const result = bundle.formatPattern(pattern, args, errors)

      if (errors.length > 0) {
        logger?.warn(`[${url}] Could not format Fluent expression for '${key}'; falling back to raw key.`)
        logger?.warn(`<red>${errors[0].toString()}</red>`)
        return key
      }

      return result
    } else {
      return bundle.formatPattern(pattern)
    }
  } else {
    logger?.warn(`[${url}] Could not find Fluent expression for '${key}'; falling back to raw key.`)
    return key
  }
}

function _t(site: Site, url: string, bundleFn: () => FluentBundle) {
  const logger = site.logger
  const bundle = bundleFn()

  return message.bind(null, bundle, logger, url)
}

function* findFtlFiles(rootPath: string) {
  for (const item of walkSync(rootPath, { includeDirs: false, exts: ["ftl"] })) {
    const [name, lang] = item.name.split(".")

    const chunks = relative(rootPath, item.path).split("/")
    chunks.pop()
    if (name !== "index") {
      chunks.push(name)
    }

    console.log(name, lang, item.name, item.path, chunks)
    yield {
      name,
      lang,
      path: item.path,
      chunks,
      resource: new FluentResource(Deno.readTextFileSync(item.path)),
    }
  }
}

function ftlResourceTree(rootPath: string) {
  const tree: { [path: string]: { [lang: string]: FluentResource } } = {}

  for (const item of findFtlFiles(rootPath)) {
    const p = item.chunks.join("/")

    if (tree[p] == null) {
      tree[p] = {}
    }

    tree[p][item.lang] = item.resource
  }

  return tree
}

function makeFallbacks(lang: string, languages: LanguagesData) {
  return lang === "en" ? ["en"] : [lang, ...(languages.fallbacks[lang] ?? ["en"])]
}

function ftlBundleTree(rootPath: string, languages: LanguagesData) {
  const tree: { [path: string]: { [lang: string]: FluentBundle } } = {}
  const resources = ftlResourceTree(rootPath)
  const resKeys = Object.keys(resources)

  for (const k of resKeys) {
    const langs = Object.keys(languages.languages)
    const fallbacks = langs.reduce((acc, lang) => {
      acc[lang] = makeFallbacks(lang, languages)
      return acc
    }, {} as Record<string, string[]>)

    const bundles = langs.reduce((acc, lang) => {
      acc[lang] = new FluentBundle(lang)
      return acc
    }, {} as Record<string, FluentBundle>)

    const chunks = k.split("/")

    while (chunks.length > 0) {
      const p = chunks.join("/")
      const res = resources[p]

      if (res != null) {
        for (const lang of langs) {
          const bundle = bundles[lang]

          for (const l of fallbacks[lang]) {
            if (res[l] != null) {
              bundle.addResource(res[l])
            }
          }
        }
      }

      chunks.pop()
    }

    const res = resources[""]

    if (res != null) {
      for (const lang of langs) {
        const bundle = bundles[lang]

        for (const l of fallbacks[lang]) {
          if (res[l] != null) {
            bundle.addResource(res[l])
          }
        }
      }
    }

    tree[k] = bundles
  }

  return tree
}
