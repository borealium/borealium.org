import { Page } from "lume/core.ts"

export const layout = "layouts/base.tsx"

export default function LanguageLayout(page: Page & { id: string }) {
  return (
    <div className="language-page">
      <h1>Language: {page.id}</h1>
    </div>
  )
}
