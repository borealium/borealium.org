import { Page } from "lume/core/file.ts"
import Searcher from "lume/core/searcher.ts"
import { CategoryLabel } from "~/_components/label.tsx"
import { Markdown } from "~/_includes/markdown.ts"
import { FluentPage, TranslateFn } from "~plugins/fluent.ts"
import { selectLocale } from "~plugins/language-data.ts"
import { CategoryId } from "~types/category.ts"
import { Resource } from "~types/resource.ts"

export const layout = "base.tsx"

type LanguageIndexProps = {
  resources: Resource[]
  languageId: string
  t: TranslateFn
  lang: string
  fluentBundle: (lang: string, id: string, jsx?: boolean) => TranslateFn
}

export default function LanguageIndexLayout(
  {
    page,
    fluentBundle,
    resources,
    lang,
    languageId,
    t,
  }: { page: Page & FluentPage; search: Searcher } & LanguageIndexProps,
) {
  const lang_t = fluentBundle(lang, "languages")
  const category_t = fluentBundle(lang, "categories")

  page.title = lang_t(languageId)

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
          {lang_t(languageId + "-description") !== languageId + "-description" && (
            <p>
              {lang_t(languageId + "-description")}
            </p>
          )}
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
                <a
                  className="tag tag-category"
                  href={`/category/${category}`}
                  data-pagefind-filter={`category:${category}`}
                >
                  {category_t(category)}
                </a>
                <ul>
                  {resources.map((resource) => {
                    const resName = selectLocale(lang, resource.name)
                    const resDescription = selectLocale(lang, resource.description)
                    return (
                      <li className="search-result">
                        <a href={`/resource/${resource.id}`}>
                          <img src={"/static/images/tag-resource.svg"} alt="" />
                          <strong>{resName}</strong>
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
