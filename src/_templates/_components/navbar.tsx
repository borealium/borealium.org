import { MenuItem } from "~/_templates/_components/menu-item.tsx"
import { LanguageSelect } from "~/_templates/_components/language-select.tsx"
import { SearchForm } from "~/_templates/_components/search-form.tsx"
import { Page } from "lume/core.ts"

export function Navbar(props: { url: string }) {
  // console.log("NAV", props.url)
  return (
    <nav className="header-nav">
      <div className="nav">
        <a className="logo" href="/">
          <img src="/static/images/divvun-logo.png" alt="divvun logo" />
        </a>
        <div className="nav-items-wrapper">
          <input type="checkbox" />
          <HamburgerIcon />
          <div className="nav-items">
            <MenuItem text="Divvun" />
            <a href="/category/spellers">
              <MenuItem text="Proofing" />
            </a>
            <a href="/category/keyboard-layouts/">
              <MenuItem text="Keyboards" />
            </a>
            <MenuItem text="Dictionaries" />
          </div>
        </div>
      </div>
      <div className="search-wrapper">
        <div id="search" />
      </div>
      <div className="language-wrapper">
        <LanguageSelect url={props.url} />
      </div>
    </nav>
  )
}

function HamburgerIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="42"
      height="42"
      fill="var(--color-brand)"
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
