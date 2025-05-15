import { Page } from "lume/core/file.ts"
import { CategoryLabel } from "~/_components/label.tsx"
import { FluentPage } from "~plugins/fluent.ts"
import LanguageMap from "./LanguageMap.tsx"

export default function LandingMainBlock(page: Page & FluentPage) {
  const bundle = page.fluentBundle(page.lang, "_components/landing/MainBlock")
  const t = (key: string) => {
    return <span className="ftl" data-ftl-key={`_components/landing/MainBlock/${key}`}>{bundle(key)}</span>
  }

  return (
    <>
      <div className="first-cell">
        <div className="text-group">
          <CategoryLabel category={bundle("welcome")} />
          <h2>{t("title")}</h2>
          <p>{t("description")}</p>
        </div>
      </div>
      <div className="second-cell">
        <h3>
          <img
            style={{ float: "left", marginTop: "-1px", marginRight: "8px" }}
            src="/static/images/tag-language.svg"
            alt=""
          />
          {t("subtitle")}
        </h3>
        <div className="language-group">
          <LanguageMap page={page} />
        </div>
      </div>
    </>
  )
}
