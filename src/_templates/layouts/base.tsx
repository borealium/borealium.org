import { Page } from "lume/core.ts"
import { Navbar } from "~/_templates/_components/navbar.tsx"

export default function BasePage(page: Page) {
  const { title, children } = page

  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <title>{title}</title>
        <link rel="stylesheet" href="/styles/index.css" />
      </head>
      <body>
        <Navbar />
        <div className="navbar-offset-wrapper">
          {children}
        </div>
      </body>
    </html>
  )
}
