import { Page } from "lume/core.ts"

type BlogProps = {
  title: string
  slug: string
  author: string
  date: string
  content: string
  layout: string
}

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
    <>
      <pre>{raw}</pre>
      <div>{content}</div>
    </>
  )
}
