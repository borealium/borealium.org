import React from "react"
import { Page } from "~utils/data-types.ts"
import { FluentBundle } from "npm:@fluent/bundle"

export const layout = "layouts/base.tsx"

function script(strings: TemplateStringsArray) {
  const text = strings[0]
  return (
    <script
      dangerouslySetInnerHTML={{ __html: text }}
    />
  )
}

export default function (page: Page & { showTableOfContents?: boolean }) {
  return (
    <>
      {script`
        (() => {
          const KEY = "divvun:language"
          const selectedLanguage = localStorage.getItem(KEY) || null

          if (selectedLanguage != null) {
            return location.replace(\`/\${selectedLanguage}\${location.pathname}\`)
          }

          const supportedLanguages = [
            "en",
            "sv",
            "nb",
          ]

          if (navigator.languages != null) {
            for (const item of navigator.languages) {
              if (supportedLanguages.includes(item)) {
                localStorage.setItem(KEY, item)
                return location.replace(\`/\${item}\${location.pathname}\`)
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
      `}
      <div>
        <h2>Pick a language, any language:</h2>
        <ul>
          <li>No</li>
        </ul>
      </div>
    </>
  )
}
