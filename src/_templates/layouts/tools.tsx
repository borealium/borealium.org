import { Page } from "~utils/data-types.ts"

export const layout = "layouts/base.tsx"

// export const renderOrder = 2;

export default function ({ title, search }: Page) {
  const tools = search.pages(`category=tool`)

  return (
    <main>
      <h1>{title}</h1>
      <ul>
        {tools.map(({ data }: any) => (
          <li>
            <a href={data.url}>{data.title}</a>
          </li>
        ))}
      </ul>
    </main>
  )
}
