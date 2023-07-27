import { Page } from "~utils/data-types.ts"

export function Header({ languages, alternates }: Page) {
  return (
    <header className="header">
      <a className="header--page-title" href="/">
        <img src="/images/divvun-logo.png" alt="Divvun" />
      </a>
      <div id="search"></div>
      <nav className="language-switch">
        <span className="language-switch--label">Language</span>
        <ul className="language-switch--menu">
          {(alternates ?? []).map(({ url, title, lang }) => {
            if (!lang || Array.isArray(lang)) {
              throw new Error(`page '${title}': lang is not a string`)
            }
            if (!url) throw new Error(`page '${title}': has no url}`)

            return (
              <li key={lang}>
                <a href={url}>{languages.languages[lang].name}</a>
              </li>
            )
          })}
        </ul>
      </nav>
    </header>
  )
}
