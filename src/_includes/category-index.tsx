import { Page } from "lume/core.ts"
import { Resource } from "~types/resource.ts"
import { selectLocale } from "~plugins/language-data.ts"
import { CategoryLabel } from "~/_components/label.tsx"
import { LangTag } from "~types/category.ts"
import { FluentPage } from "~plugins/fluent.ts"

export const layout = "base.tsx"

type CategoryIndexProps = {
  resources: Resource[]
  category: Record<LangTag, { name: string; description: string }>
  categoryId: string
}

export default function CategoryIndexLayout(page: Page & CategoryIndexProps & FluentPage) {
  const { resources, lang, category, categoryId, t } = page

  const cat = selectLocale(lang, category) ?? category["en"]

  return (
    <div
      data-category={categoryId}
      data-type="category-index"
      data-pagefind-filter="type[data-type], category[data-category]"
      className="category-index"
    >
      <div className="content">
        <div>
          <CategoryLabel category={t("category")} />
          <h1>{cat.name}</h1>
          <p>
            {cat.description}
          </p>
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
            } else if (resource.type === "post" || resource.type === "doc") {
              cls = "tag-page"
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
