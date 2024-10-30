import { Data, PageData } from "lume/core.ts"
import { Resource } from "~types/resource.ts"
import { selectLocale } from "~plugins/language-data.ts"
import { CategoryLabel } from "~/_components/label.tsx"
import { LangTag } from "~types/category.ts"
import { Markdown } from "~/_includes/markdown.ts"
import { FluentPage } from "~plugins/fluent.ts"
import Aside, { SimplePost } from "~/_components/aside.tsx"

export const layout = "base.tsx"

type CategoryIndexProps = {
  resources: Resource[]
  category: Record<LangTag, { name: string; description: string }>
  categoryId: string
}

export default function CategoryIndexLayout(page: PageData & CategoryIndexProps & FluentPage) {
  const { resources, lang, category, categoryId, search, t } = page

  const posts = search.pages(["type=post", `lang=${lang}`], "date=desc").slice(0, 3)
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
        </div>
      </div>
      <Aside
        t={t}
        category={t("news")}
        posts={posts.map((post) => {
          const { id, title, category, date, originalUrl } = post as Data<PageData>

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
