import React from "react"
import { Page, PageData, Site } from "lume/core.ts"
import { autonym, getLanguageData } from "~plugins/language-data.ts"

export const layout = "base.tsx"

export function script(string: string) {
  const text = string
  return <script type="module" dangerouslySetInnerHTML={{ __html: text }} />
}

const languages = getLanguageData()
const supportedLanguages = JSON.stringify(Object.keys(languages.languages))

const SCRIPT = `
(() => {
  const KEY = "borealium:language"
  const selectedLanguage = localStorage.getItem(KEY) || null

  if (selectedLanguage != null) {
    return location.replace(\`/\${selectedLanguage}\${location.pathname}\`)
  }

  const supportedLanguages = ${supportedLanguages};

  if (navigator.languages != null) {
    for (const item of navigator.languages) {
      const lang = item.split("-")[0]
      if (supportedLanguages.includes(lang)) {
        localStorage.setItem(KEY, lang)
        return location.replace(\`/\${lang}\${location.pathname}\`)
      }
    }
  } else {
    const item = navigator.language.split("-")[0]
    if (supportedLanguage.contains(lang)) {
      localStorage.setItem(KEY, item)
      return location.replace(\`/\${item}\${location.pathname}\`)
    }
  }
})()
`

export default function (page: PageData) {
  return (
    <>
      {script(SCRIPT)}
      <div className="app" data-pagefind-ignore>
        <noscript>
          <ul>
            {Object.entries(languages.languages).map(([key]) => {
              return (
                <li key={key}>
                  <a href={`/${key}${page.url}`}>{autonym(key)}</a>
                </li>
              )
            })}
          </ul>
        </noscript>
      </div>
      {script(`
        document.querySelector(".app").innerText = "Redirecting..."
      `)}
    </>
  )
}
