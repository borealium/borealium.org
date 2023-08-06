import { MenuItem } from "~/_templates/_components/menu-item.tsx"
import { LanguageSelect } from "~/_templates/_components/language-select.tsx"

export function Navbar() {
  return (
    <nav className="header-nav">
      <div className="nav primary md lg">
        <a className="logo" href="/">
          <img src="/static/images/divvun-logo.png" alt="divvun logo" />
        </a>
        <MenuItem text="Divvun" />
        <MenuItem text="Proofing tools" />
        <MenuItem text="Keyboards" />
        <MenuItem text="Dictionaries" />
      </div>
      <div className="nav primary xs sm">
        <div>Icon</div>
        <div>Borger</div>
      </div>
      <div className="nav search xs">
        <div>Ant burner</div>
      </div>
      <div className="nav search sm md lg">
        <label>
          <SearchIcon />
          <input type="text" placeholder="Search..." />
        </label>
      </div>
      <div className="nav tertiary md lg">
        <LanguageSelect />
      </div>
    </nav>
  )
}

function SearchIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="var(--color-brand)"
      width="24px"
      height="24px"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
      />
    </svg>
  )
}
