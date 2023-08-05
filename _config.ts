import lume from "lume/mod.ts"
import jsx from "lume/plugins/jsx.ts"
import metas from "lume/plugins/metas.ts"
import sass from "lume/plugins/sass.ts"
import sitemap from "lume/plugins/sitemap.ts"
import pagefind from "lume/plugins/pagefind.ts"
import nav from "lume/plugins/nav.ts"
import esbuild from "lume/plugins/esbuild.ts"
import mdx from "lume/plugins/mdx.ts"

import relatedTools from "~utils/related-tools.ts"
import toc from "~utils/table-of-contents.ts"
import multilanguage from "~utils/m12e.ts"
import { type Languages } from "~utils/data-types.ts"

import { parse as yamlParse } from "std/yaml/mod.ts"
const langs = yamlParse(await Deno.readTextFile("./src/_data/languages.yaml")) as Languages

const site = lume({
  src: "./src",
  includes: "_templates",
})

site.use(jsx())
site.use(mdx())
site.use(metas())
site.use(multilanguage({
  defaultLanguage: langs.default,
  languages: Object.keys(langs.languages),
  urlProcessor: (url, page) => `/${page.data.lang}${url}`,
}))
site.use(relatedTools())
site.use(sass())
site.use(nav())
site.use(sitemap())
site.use(pagefind())
site.use(toc())
site.use(esbuild({
  extensions: [".client.tsx"],
}))

site.copy("_static", "static")

export default site
