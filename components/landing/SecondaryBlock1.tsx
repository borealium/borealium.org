import type { LangTag } from "~types/language.ts"
import { CategoryLabel } from "../CategoryLabel.tsx"
import { DownloadButton } from "../DownloadButton.tsx"
import { createTranslator } from "../../lib/fluent.ts"

interface SecondaryBlock1Props {
  lang: LangTag
}

export function SecondaryBlock1({ lang }: SecondaryBlock1Props) {
  const t = createTranslator(lang, "_components/landing/SecondaryBlock1")
  const tIndex = createTranslator(lang, "")

  return (
    <>
      <CategoryLabel category={t("tag", { fallback: "Keyboards" })} />
      <h2>
        {t("title", { fallback: "Keyboards for mobile phones and tablets" })}
      </h2>
      <p>
        {t("description", {
          fallback:
            "The app Divvun Keyboards contains keyboards for Sami and other languages. For most languages the keyboard also includes a spelling checker.",
        })}
      </p>
      <div class="button-group">
        <DownloadButton
          title="Divvun Keyboards"
          description={tIndex("for-ios-and-android", {
            fallback: "for iOS and Android",
          })}
          href={`/${lang}/resource/divvun-keyboard`}
        />
      </div>
    </>
  )
}
