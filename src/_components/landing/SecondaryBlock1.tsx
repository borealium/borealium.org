import { Page } from "lume/core/file.ts"
import { DownloadButton } from "~/_components/download-button.tsx"
import { CategoryLabel } from "~/_components/label.tsx"
import { FluentPage } from "~plugins/fluent.ts"

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
          description={t("for-ios-and-android")}
          href="/resource/divvun-keyboard"
        />
      </div>
    </>
  )
}
