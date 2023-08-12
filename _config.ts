import lume from "lume/mod.ts"
import jsx from "lume/plugins/jsx.ts"
import metas from "lume/plugins/metas.ts"
import sass from "lume/plugins/sass.ts"
import sitemap from "lume/plugins/sitemap.ts"
import pagefind from "lume/plugins/pagefind.ts"
import nav from "lume/plugins/nav.ts"
import esbuild from "lume/plugins/esbuild.ts"
import mdx from "lume/plugins/mdx.ts"

import toc from "~utils/table-of-contents.ts"

import categoryData, { getCategoryData } from "~plugins/category-data.ts"
import languageData, { getLanguageData } from "~plugins/language-data.ts"
import multilanguage from "~plugins/multilang.ts"
import fluent from "~plugins/fluent.ts"

const site = lume({
  src: "./src",
  includes: "_templates",
})

site.loadData([".yaml", ".yml"])

site.use(categoryData())
site.use(languageData())

const languages = getLanguageData()

site.use(jsx())
site.use(mdx({}))
site.use(metas())
// site.use(relatedTools())
site.use(sass())
site.use(nav())
site.use(sitemap())
site.use(pagefind())
site.use(toc())
site.use(multilanguage(languages))
site.use(fluent(languages))
site.use(esbuild({
  extensions: [".client.tsx"],
}))

site.copy("_static", "static")

export default site
