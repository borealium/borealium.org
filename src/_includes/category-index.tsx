import { Data, Page } from "lume/core/file.ts"
import type Searcher from "lume/core/searcher.ts"
import Aside, { SimplePost } from "~/_components/aside.tsx"
import { CategoryLabel } from "~/_components/label.tsx"
import { Markdown } from "~/_includes/markdown.ts"
import { FluentPage, TranslateFn } from "~plugins/fluent.ts"
import { selectLocale } from "~plugins/language-data.ts"
import { LangTag } from "~types/category.ts"
import { Resource } from "~types/resource.ts"

export const layout = "base.tsx"

type CategoryIndexProps = {
  resources: Resource[]
  category: Record<LangTag, { name: string; description: string }>
  categoryId: string
  t: TranslateFn
  lang: string
}

export default function CategoryIndexLayout(
  { page, search, t, lang, category, categoryId, resources }: {
    page: Page & FluentPage
    search: Searcher
  } & CategoryIndexProps,
) {
  const posts = search.pages(`type=post lang=${lang}`, "date=desc", 3)
  const cat = selectLocale(lang, category) ?? category["en"]

  page.title = cat.name

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
        </div>
      </div>
      <Aside
        t={t}
        category={t("news")}
        posts={posts.map((post) => {
          const { id, title, category, date, originalUrl } = post as Data

          return {
            id: id,
            date: date?.toISOString(),
            tag: category,
            title: title,
            url: originalUrl,
          } as SimplePost
        })}
      />
    </div>
  )
}
