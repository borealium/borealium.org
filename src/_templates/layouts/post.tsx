import { Page } from "lume/core.ts"

type BlogProps = {
  title: string
  slug: string
  author: string
  date: string
  content: string
  layout: string
}

export const layout = "layouts/base.tsx"

export default function BlogLayout(page: Page & BlogProps) {
  const { title, slug, author, date, layout, content } = page
  const raw = JSON.stringify(
    {
      title,
      author,
      slug,
      date,
      layout,
    },
    null,
    2,
  )

  return (
    <article className="post">
      <nav>
        <ol id="toc"></ol>
        <br />
        <a href="#top">Back to top</a>
      </nav>
      <div className="content">
        <header>
          <h1>{title}</h1>
          <h4>By {author}</h4>
          <time>{date.toISOString()}</time>
        </header>
        <section data-toc-context>
          {content}
        </section>
      </div>
    </article>
  )
}
