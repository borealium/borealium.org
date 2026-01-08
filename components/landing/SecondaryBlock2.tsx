import type { LangTag } from "~types/language.ts"
import { CategoryLabel } from "../CategoryLabel.tsx"
import { DownloadButton } from "../DownloadButton.tsx"
import { createTranslator } from "../../lib/fluent.ts"

interface SecondaryBlock2Props {
  lang: LangTag
}

export function SecondaryBlock2({ lang }: SecondaryBlock2Props) {
  const t = createTranslator(lang, "_components/landing/SecondaryBlock2")
  const tIndex = createTranslator(lang, "")

  return (
    <>
      <CategoryLabel category={t("tag", { fallback: "Manager" })} />
      <h2>
        {t("title", {
          fallback: "One download - the rest is handled automatically",
        })}
      </h2>
      <p>
        {t("description", {
          fallback:
            "Divvun Manager is used to install proofing tools, keyboards and more on Windows and macOS computers.",
        })}
      </p>
      <div class="button-group">
        <DownloadButton
          title={tIndex("dm-button-title", { fallback: "Divvun Manager" })}
          description={tIndex("dm-button-description", {
            fallback: "for Windows and macOS",
          })}
          href={`/${lang}/resource/divvun-manager`}
        />
      </div>
    </>
  )
}
