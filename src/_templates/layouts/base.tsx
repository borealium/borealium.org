import { Page, PageData } from "lume/core.ts"
import { Navbar } from "~/_templates/_components/navbar.tsx"
import { script } from "~/_templates/layouts/lang-redir.tsx"
import { Footer } from "~/_templates/_components/footer.tsx"

export default function BasePage(page: PageData) {
  const { title, children, lang, url, originalUrl } = page

  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <title>{title}</title>
        <link rel="stylesheet" href="/styles/index.css" />
        {script(`
          if (document.documentElement.hasAttribute("lang")) {
            localStorage.setItem("divvun:language", document.documentElement.getAttribute("lang"))
          }
        `)}
      </head>
      <body id="top">
        <Navbar url={originalUrl || url || "/"} />
        <div className="navbar-offset-wrapper">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  )
}
