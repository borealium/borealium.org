import { Page } from "lume/core/file.ts"
import { DownloadButton } from "~/_components/download-button.tsx"
import { CategoryLabel } from "~/_components/label.tsx"
import { FluentPage } from "~plugins/fluent.ts"

export default function SecondaryBlock1(page: Page & FluentPage) {
  const bundle = page.fluentBundle(page.lang, "_components/landing/SecondaryBlock1")
  const t = (key: string) => {
    return <span className="ftl" data-ftl-key={`_components/landing/SecondaryBlock1/${key}`}>{bundle(key)}</span>
  }

  return (
    <>
      <CategoryLabel category={bundle("tag")} />
      <h2>{t("title")}</h2>
      <p>{t("description")}</p>
      <div className="button-group">
        <DownloadButton
          title="Divvun Keyboards"
          description={bundle("for-ios-and-android")}
          href="/resource/divvun-keyboard"
        />
      </div>
    </>
  )
}
