import lume from "lume/mod.ts"
import jsx from "lume/plugins/jsx.ts"
import mdx from "lume/plugins/mdx.ts"
import sass from "lume/plugins/sass.ts"
// import sitemap from "lume/plugins/sitemap.ts"
import { log } from "lume/core/utils/log.ts"
import esbuild from "lume/plugins/esbuild.ts"
import favicon from "lume/plugins/favicon.ts"
import nav from "lume/plugins/nav.ts"
import pagefind from "lume/plugins/pagefind.ts"
import search from "lume/plugins/search.ts"
import slugifyUrls from "lume/plugins/slugify_urls.ts"
import excerpt from "~plugins/excerpt.ts"
import fluent, { init as initFluent } from "~plugins/fluent.ts"
import multilanguage from "~plugins/multilang.ts"
import outline from "~plugins/outline.ts"
import sri from "~plugins/sri.ts"
import title from "~plugins/title.ts"

const site = lume({
  src: "./src",
})

if (Deno.env.get("CI")) {
  log.critical("In CI, building with CDN URLs!")
}

initFluent()

site.loadData([".yaml", ".yml"])

site.use(slugifyUrls())
site.use(favicon())
site.use(excerpt())
site.use(search())
site.use(jsx())
site.use(mdx())
site.use(sass())
site.use(nav())
site.use(multilanguage())
site.use(fluent())
site.use(outline())
site.use(title())
site.use(sri())
site.use(pagefind({
  indexing: {
    verbose: false,
  },
  ui: false,
}))
site.use(esbuild())

site.copy("_static", "static")

export default site
