import { Page, PageData } from "lume/core.ts"
import { Resource } from "~types/resource.ts"
import { selectLocale } from "~plugins/language-data.ts"
import { CategoryLabel } from "~/_components/label.tsx"
import { FluentPage } from "~plugins/fluent.ts"

export const layout = "base.tsx"

type LanguageIndexProps = {
  resources: Resource[]
  language: { autonym: string }
  languageId: string
}

export default function LanguageIndexLayout(page: PageData & LanguageIndexProps & FluentPage) {
  const { resources, lang, languageId, language, t } = page

  return (
    <div
      data-language={languageId}
      data-type="language-index"
      data-pagefind-filter="type[data-type], language[data-language]"
      className="category-index"
    >
      <div className="content">
        <div>
          <CategoryLabel category={t("language")} />
          <h1>{language.autonym}</h1>
        </div>
        <div className="search-page-results" data-pagefind-ignore>
          {resources.length === 0 && (
            <div>
              {t("no-resources-in-category")}
            </div>
          )}
          {resources.map((resource) => {
            const resName = selectLocale(lang, resource.name)
            const resDescription = selectLocale(lang, resource.description)
            let cls = "tag-resource"
            if (resource.type === "resource") {
              cls = "tag-resource"
            } else if (resource.type === "category-index") {
              cls = "tag-category"
            } else if (resource.type === "language-index") {
              cls = "tag-language"
            } else if (resource.type === "post") {
              cls = "tag-post"
            }

            return (
              <li className="search-result">
                <a href={`/resource/${resource.id}`}>
                  <img src={"/static/images/" + cls + ".svg"} alt="" />
                  {resName}
                </a>
                {resDescription && (
                  <div className="description">
                    {resDescription}
                  </div>
                )}
              </li>
            )
          })}
        </div>
      </div>
    </div>
  )
}
