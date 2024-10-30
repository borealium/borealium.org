import { PageData } from "lume/core.ts"
import { Resource } from "~types/resource.ts"
import { autonym, selectLocale } from "~plugins/language-data.ts"
import { CategoryLabel } from "~/_components/label.tsx"
import { Markdown } from "~/_includes/markdown.ts"
import { FluentPage } from "~plugins/fluent.ts"
import { CategoryId } from "~types/category.ts"

export const layout = "base.tsx"

type LanguageIndexProps = {
  resources: Resource[]
  languageId: string
}

export default function LanguageIndexLayout(page: PageData & LanguageIndexProps & FluentPage) {
  const { resources, lang, languageId, t } = page
  const lang_t = page.fluentBundle(page.lang, "languages")
  const category_t = page.fluentBundle(page.lang, "categories")
  const res_by_category: Record<CategoryId, [Resource]> = resources.reduce((acc, resource) => {
    if (resource.category in acc) {
      acc[resource.category].push(resource)
    } else {
      acc[resource.category] = [resource]
    }
    return acc
  }, {} as Record<CategoryId, [Resource]>)

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
          <h1 title={lang_t(languageId)}>
            {lang_t(languageId)}
          </h1>
          <p>
            {lang_t(languageId + "-description")}
          </p>
        </div>
        <div className="search-page-results" data-pagefind-ignore>
          {resources.length === 0 && (
            <div>
              {t("no-resources-in-category")}
            </div>
          )}
          {Object.entries(res_by_category).map(([category, resources]) => {
            return (
              <div key={category} className="category">
                <h2>
                  {category_t(category)}
                </h2>
                <ul>
                  {resources.map((resource) => {
                    const resName = selectLocale(lang, resource.name)
                    const resDescription = selectLocale(lang, resource.description)
                    return (
                      <li className="search-result">
                        <a href={`/resource/${resource.id}`}>
                          <img src={"/static/images/tag-resource.svg"} alt="" />
                          {resName}
                        </a>
                        {resDescription && (
                          <Markdown as="p" className="description">
                            {resDescription}
                          </Markdown>
                        )}
                      </li>
                    )
                  })}
                </ul>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
