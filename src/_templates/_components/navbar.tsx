import { MenuItem } from "~/_templates/_components/menu-item.tsx"

export function Navbar() {
  return (
    <nav className="header-nav">
      <div className="nav primary md lg">
        <div>Icon</div>
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
        <div>Search</div>
      </div>
      <div className="nav tertiary md lg">
        <div>Language</div>
      </div>
    </nav>
  )
}
