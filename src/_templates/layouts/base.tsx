import { Page, PageData } from "lume/core.ts"
import { Navbar } from "~/_templates/_components/navbar.tsx"
import { script } from "~/_templates/layouts/lang-redir.tsx"

export default function BasePage(page: PageData) {
  const { title, children, lang, url, originalUrl } = page

  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <title>{title}</title>
        <link rel="stylesheet" href="/styles/index.css" />
        {
          /* {script(`
          if (document.documentElement.hasAttribute("lang")) {
            localStorage.setItem("divvun:language", document.documentElement.getAttribute("lang"))
          }

          const pagefind = await import("/pagefind/pagefind.js");
          const search = await pagefind.search("North")
          const fiveResults = await Promise.all(search.results.slice(0, 5).map(r => r.data()));
          console.log(fiveResults);
        `)} */
        }
      </head>
      <body id="top">
        <Navbar url={originalUrl || url || "/"} />
        <div className="navbar-offset-wrapper">
          {children}
        </div>
      </body>
    </html>
  )
}
