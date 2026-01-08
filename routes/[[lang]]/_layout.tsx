import { define } from "../../utils.ts"
import { Navbar } from "../../components/Navbar.tsx"
import { Footer } from "../../components/Footer.tsx"

export default define.page(function LangLayout({ Component, state, url }) {
  const { lang, i18n } = state
  const { t } = i18n
  const searchQuery = url.searchParams.get("q") ?? ""

  return (
    <div class="wrapper">
      <Navbar lang={lang} url={url.pathname} t={t} searchQuery={searchQuery} />
      <div class="navbar-offset-wrapper">
        <Component />
      </div>
      <Footer lang={lang} t={t} />
    </div>
  )
})
