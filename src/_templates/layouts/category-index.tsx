import { Page } from "lume/core.ts"
import { Resource } from "~types/resource.ts"
import { ResourceSummary } from "~/_templates/_components/resource-summary.tsx"
import { selectLocale } from "~plugins/language-data.ts"
import { CategoryLabel } from "~/_templates/_components/label.tsx"

export const layout = "layouts/base.tsx"

type CategoryIndexProps = {
  resources: Resource[]
}

export default function CategoryIndexLayout(page: Page & CategoryIndexProps) {
  const { resources, lang, category, categoryId, t } = page

  const cat = selectLocale(lang, category)

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
