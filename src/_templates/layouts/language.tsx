import { Page } from "~utils/data-types.ts"
import { Breadcrumbs } from "~/_templates/_components/breadcrumbs.tsx"

export const layout = "layouts/base.tsx"

export default function (page: Page & { lang_label: string }) {
  const { title, search, lang_label } = page

  const tools = search.pages(`category=tool lang:${lang_label}`)

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
