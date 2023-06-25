import lume from "lume/mod.ts"
import jsx from "lume/plugins/jsx.ts"
import metas from "lume/plugins/metas.ts"
import multilanguage from "lume/plugins/multilanguage.ts"
import postcss from "lume/plugins/postcss.ts"
import sitemap from "lume/plugins/sitemap.ts"

const site = lume({
  src: "./src",
})

site.use(jsx())
site.use(metas())
site.use(multilanguage())
site.use(postcss())
site.use(sitemap())

export default site
