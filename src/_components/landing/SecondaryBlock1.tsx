import { Page } from "lume/core.ts"
import { DownloadButton } from "~/_components/download-button.tsx"
import { FluentPage } from "~plugins/fluent.ts"
import { CategoryLabel } from "~/_components/label.tsx"

export default function SecondaryBlock1(page: Page & FluentPage) {
  const t = page.fluentBundle(page.lang, "_components/landing/SecondaryBlock1")

  return (
    <>
      <CategoryLabel category={t("tag")} />
      <h2>{t("title")}</h2>
      <p>{t("description")}</p>
      <div className="button-group">
        <DownloadButton
          title="Divvun Keyboards"
          description="for iOS and Android"
          href="/resource/divvun-keyboard"
        />
      </div>
    </>
  )
}
