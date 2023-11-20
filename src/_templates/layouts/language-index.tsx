import { Page } from "lume/core.ts"
import { Resource } from "~types/resource.ts"
import { ResourceSummary } from "~/_templates/_components/resource-summary.tsx"
import { selectLocale } from "~plugins/language-data.ts"
import { CategoryLabel } from "~/_templates/_components/label.tsx"

export const layout = "layouts/base.tsx"

type LanguageIndexProps = {
  resources: Resource[]
}

export default function LanguageIndexLayout(page: Page & LanguageIndexProps) {
  const { resources, lang, languageId, language, t } = page

  // console.log(category)
  // Deno.exit(1)

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
          {
            /* <p>
            {cat.description}
          </p> */
          }
        </div>
        <div className="search-page-results" data-pagefind-ignore>
          {resources.length === 0 && (
            <div>
              There are currently no resources in this category.
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
