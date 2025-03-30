import { Page } from "lume/core/file.ts"
import type Searcher from "lume/core/searcher.ts"
import Aside, { SimplePost } from "~/_components/aside.tsx"
import { FluentPage } from "~plugins/fluent.ts"

type BlogProps = {
  title: string
  slug: string
  author: string
  date: string
  content: string
  layout: string
}

export const layout = "base.tsx"

export default function BlogLayout(
  {
    page,
    title,
    author,
    lang,
    content,
    search,
    t,
  }:
    & { page: Page & FluentPage; search: Searcher }
    & FluentPage
    & BlogProps,
) {
  const posts = search.pages(`type=post lang=${lang}`, "date=desc", 3)

  return (
    <article className="post" data-pagefind-filter={`type:post`}>
      <div className="content">
        <header>
          {page.data.date != null && (
            <div className="category-label">
              <time>{page.data.date.toISOString().split("T")[0]}</time>
            </div>
          )}
          <div className="divider" />
          <span style={{ fontSize: "80%" }}>Author: {author}</span>
          <h1>{title}</h1>
        </header>
        <section data-toc-context>
          {content}
        </section>
      </div>
      <Aside
        t={t}
        category={t("news")}
        posts={posts.map((post) => {
          const { id, title, category, date, originalUrl } = post

          return {
            id: id,
            date: date?.toISOString(),
            tag: category,
            title: title,
            url: originalUrl,
          } as SimplePost
        })}
      />
    </article>
  )
}
