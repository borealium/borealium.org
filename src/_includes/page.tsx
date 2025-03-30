import { Data, Page } from "lume/core/file.ts"
import type Searcher from "lume/core/searcher.ts"
import Aside, { SimplePost } from "~/_components/aside.tsx"
import { FluentPage } from "~plugins/fluent.ts"

type PageProps = {
  title: string
  slug: string
  content: string
  layout: string
}

export const layout = "base.tsx"

export default function PageLayout({ page, search }: { page: Page & FluentPage; search: Searcher }) {
  const { title, t } = page.data
  const { content, lang } = page
  const posts = search.pages(`type=post lang=${lang}`, "date=desc", 3)

  return (
    <article className="post" data-pagefind-filter={`type:post`}>
      <div className="content">
        <header>
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
          const { id, title, category, date, originalUrl } = post as Data & PageProps

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
