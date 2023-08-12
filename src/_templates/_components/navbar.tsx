import { MenuItem } from "~/_templates/_components/menu-item.tsx"
import { LanguageSelect } from "~/_templates/_components/language-select.tsx"
import { Search } from "~/_templates/_components/search.tsx"

export function Navbar() {
  const icon = (
    <a className="logo" href="/">
      <img src="/static/images/divvun-logo.png" alt="divvun logo" />
    </a>
  )

  return (
    <nav className="header-nav">
      <div className="nav md lg">
        {icon}
        <MenuItem text="Divvun" />
        <MenuItem text="Proofing" />
        <MenuItem text="Keyboards" />
        <MenuItem text="Dictionaries" />
      </div>
      <div className="nav xs sm">
        {icon}
        <HamburgerIcon />
      </div>
      <div className="nav search-wrapper">
        <Search />
      </div>
      <div className="nav tertiary md lg">
        <LanguageSelect />
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
      fill="var(--color-brand"
      viewBox="0 0 16 16"
    >
      <path
        fill-rule="evenodd"
        d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
      />
    </svg>
  )
}
