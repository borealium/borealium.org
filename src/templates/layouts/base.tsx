import { Page } from "~utils/data-types.ts"
import { Header } from "~/templates/components/header.tsx"

export default (page: Page) => {
  const { title, children, languages } = page
  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <title>{title}</title>
        <link rel="stylesheet" href="/styles/index.css" />
      </head>
      <body>
        <Header {...page} />
        {children}
      </body>
    </html>
  )
}
