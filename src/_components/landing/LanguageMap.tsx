import { Page } from "lume/core/file.ts"
import { DownloadButton } from "~/_components/download-button.tsx"
import { FluentPage } from "~plugins/fluent.ts"
import { autonym, getLanguageData } from "~plugins/language-data.ts"

function script(text: string) {
  return <script dangerouslySetInnerHTML={{ __html: text }} />
}

function injectScript(url: string) {
  return script(`
    if (!document.querySelector('script[src="${url}"]')) {
      const script = document.createElement("script");
      script.src = "${url}";
      document.head.appendChild(script);
    }
  `)
}

const cdnUrl = (suffix: string) => {
  if (!Deno.env.get("CI")) {
    return suffix
  }
  return `https://cdn.borealium.org${suffix}`
}

export default function LanguageMap({ page }: { page: Page & FluentPage }) {
  const t = page.fluentBundle(page.lang, "_components/landing/MainBlock")
  const lang_t = page.fluentBundle(page.lang, "languages")
  const { languages, uiOnly } = getLanguageData()

  return (
    <>
      <script src={cdnUrl("/client/language-map.js")}></script>
      <brl-language-map
        baseNodes={`${
          JSON.stringify(
            Object.entries(languages)
              .filter(([code]) => !uiOnly.includes(code))
              .map(([code]) => {
                return { ...languages[code], code, title: lang_t(code) }
              }),
          )
        }`}
      >
        <noscript className="fallback">
          {Object.entries(languages)
            .filter(([code]) => !uiOnly.includes(code))
            .map(([code]) => {
              return (
                <DownloadButton
                  title={autonym(code)}
                  tooltip={lang_t(code)}
                  href={`/language/${code}`}
                />
              )
            })}
        </noscript>
      </brl-language-map>
      {script(`
        requestAnimationFrame(() => {
          if (!customElements.get("brl-language-map")) {
            const node = document.querySelector("brl-language-map .fallback");
            if (node) {
              const div = document.createElement("div");
              div.className = node.className;
              div.innerHTML = node.innerHTML;
              node.parentNode.replaceChild(div, node);
            }
          }
        })
      `)}
    </>
  )
}
