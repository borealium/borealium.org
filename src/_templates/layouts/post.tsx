import { Data, Page, PageData } from "lume/core.ts"
import Aside, { SimplePost } from "~/_templates/_components/aside.tsx"

type BlogProps = {
  title: string
  slug: string
  author: string
  date: string
  content: string
  layout: string
}

export const layout = "layouts/base.tsx"

export default function BlogLayout(page: PageData & BlogProps) {
  const { title, slug, author, date, lang, layout, content, search } = page
  // const raw = JSON.stringify(
  //   {
  //     title,
  //     author,
  //     slug,
  //     date,
  //     layout,
  //   },
  //   null,
  //   2,
  // )
  const posts = search.pages(["type=post", `lang=${lang}`], "date=desc")

  return (
    <article className="post" data-pagefind-filter={`type:post`}>
      <div className="content">
        <header>
          {date != null && (
            <div className="category-label">
              <time>{date.toISOString().split("T")[0]}</time>
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
        context="updates"
        category="news"
        posts={posts.map((post) => {
          const { id, title, category, date, lang, originalUrl, author } = post as Data<PageData>

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
