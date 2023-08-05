import { Page } from "~utils/data-types.ts"

export default function BasePage(page: Page) {
  const { title, children, languages } = page

  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <title>{title}</title>
        <link rel="stylesheet" href="/styles/index.css" />
      </head>
      <body>
        {children}
      </body>
    </html>
  )
}
