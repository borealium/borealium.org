import { Page } from "~utils/data-types.ts"

import { Breadcrumbs } from "~/_templates/components/breadcrumbs.tsx"

export const layout = "layouts/base.tsx"

export default function (page: Page & { tool_category: string }) {
  const { title, search, tool_category, url, nav } = page
  const tools = search.pages(`category=tool cat:${tool_category}`)

  return (
    <>
      <Breadcrumbs {...page} />
      <main>
        <h1>{title}</h1>
        <article>
          <h2>Tools</h2>
          <ul>
            {tools.map(({ data }: any) => (
              <li>
                <a href={data.url}>{data.title}</a>
              </li>
            ))}
          </ul>
        </article>
      </main>
    </>
  )
}
