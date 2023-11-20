import { MenuItem } from "~/_templates/_components/menu-item.tsx"
import { LanguageSelect } from "~/_templates/_components/language-select.tsx"
import { SearchForm } from "~/_templates/_components/search-form.tsx"
import { Page } from "lume/core.ts"

export function Navbar(props: { url: string }) {
  // console.log("NAV", props.url)
  return (
    <div className="header-nav-wrapper">
      <div className="header-gradient" />
      <nav className="nav-control">
        <div className="nav">
          <a className="logo" href="/">
            <img src="/static/images/borealium-small-logo.svg" alt="" />
          </a>
          <div className="nav-items-wrapper">
          </div>
        </div>
        <div className="search-wrapper">
          <SearchForm />
          <div className="search-popover" hidden>
            <ul className="search-results" />
            <div className="search-see-more">
              <a className="search-see-more-button" href="#">See more results</a>
            </div>
          </div>
        </div>
        <div className="language-wrapper">
          <LanguageSelect url={props.url} />
        </div>
      </nav>
    </div>
  )
}

function HamburgerIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="42"
      height="42"
      fill="var(--color-text-secondary)"
      viewBox="0 0 16 16"
      display="var(--hamburger-display)"
    >
      <path
        fillRule="evenodd"
        d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
      />
    </svg>
  )
}
