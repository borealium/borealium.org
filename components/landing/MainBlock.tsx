import type { LangTag } from "~types/language.ts"
import { CategoryLabel } from "../CategoryLabel.tsx"
import { DownloadButton } from "../DownloadButton.tsx"
import { autonym, getAllLanguages, getLanguageTitle } from "../../lib/i18n.ts"
import { createTranslator } from "../../lib/fluent.ts"
import LanguageMap from "../../islands/LanguageMap.tsx"

interface MainBlockProps {
  lang: LangTag
}

export function MainBlock({ lang }: MainBlockProps) {
  const t = createTranslator(lang, "_components/landing/MainBlock")
  const tLang = createTranslator(lang, "languages")

  // Get languages that have coordinates (for display on map)
  // Note: hidden languages (like yi) still appear on map, only uiOnly are excluded
  const languages = getAllLanguages().filter(
    (l) => l.coordinates && !l.isUiOnly,
  )

  // Prepare baseNodes for the map
  const baseNodes = languages.map(({ tag, coordinates, labelPosition }) => ({
    autonym: autonym(tag),
    title: getLanguageTitle(tag, lang),
    code: tag,
    coordinates: coordinates as [number, number],
    labelPosition: (labelPosition ?? "top") as
      | "top"
      | "bottom"
      | "left"
      | "right",
  }))

  return (
    <>
      <div class="first-cell">
        <div class="text-group">
          <CategoryLabel category={t("welcome", { fallback: "Welcome" })} />
          <h2>
            {t("title", {
              fallback:
                "Borealium - tools for the small languages of the Nordic countries",
            })}
          </h2>
          <p>
            {t("description", {
              fallback:
                "Borealium gathers all tools and language support for small Nordic languages in one place.",
            })}
          </p>
        </div>
      </div>
      <div class="second-cell">
        <h3>
          <img
            style={{ float: "left", marginTop: "-1px", marginRight: "8px" }}
            src="/static/images/tag-language.svg"
            alt=""
          />
          {t("subtitle", {
            fallback: "Find resources for the languages below:",
          })}
        </h3>
        <div class="language-group">
          <LanguageMap baseNodes={baseNodes} lang={lang} />
        </div>
      </div>
    </>
  )
}
