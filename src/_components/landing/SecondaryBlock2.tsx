import { Page } from "lume/core.ts"
import { CategoryLabel } from "~/_components/label.tsx"
import { FluentPage } from "~plugins/fluent.ts"

export default function (page: Page & FluentPage) {
  const t = page.fluentBundle(page.lang, "_components/landing/SecondaryBlock2")

  return (
    <>
      <CategoryLabel category={t("blah")} />
      <h2>{t("title")}</h2>
      <p>{t("description")}</p>
      <div className="button-group">
        {"Nothing"}
      </div>
    </>
  )
}
