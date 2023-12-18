import { LanguageSelect } from "~/_components/language-select.tsx"
import { SearchForm } from "~/_components/search-form.tsx"
import { TranslateFn } from "~plugins/fluent.ts"

export function Navbar(props: { url: string; t: TranslateFn; lang: string }) {
  return (
    <div className="header-nav-wrapper">
      <div className="header-gradient" />
      <nav className="nav-control">
        <div className="nav">
          <a className="logo" href="/">
            <img src="/static/images/borealium-small-logo.svg" alt="Borealium" />
          </a>
          {
            /* <div className="nav-items-wrapper">
          </div> */
          }
        </div>
        <div className="search-wrapper">
          <SearchForm />
          <div className="search-popover" hidden>
            <ul className="search-results" />
            <div className="search-see-more">
              <a className="search-see-more-button" href="#">{props.t("see-more-results")}</a>
            </div>
          </div>
        </div>
        <div className="language-wrapper">
          <LanguageSelect url={props.url} lang={props.lang} />
        </div>
      </nav>
    </div>
  )
}
