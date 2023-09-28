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
            localStorage.setItem("borealium:language", document.documentElement.getAttribute("lang"))
          }
        `)}
        {script(`
          const pagefind = await import("/pagefind/pagefind.js")

          async function searchResults(query, limit) {
            const search = await pagefind.debouncedSearch(query)
            if (search == null) {
              return null
            }
            const results = await Promise.all(search.results.map(x => x.data()))
            const filtered = results.map(x => ({
              url: x.url,
              title: x.meta.title,
              category: x.filters.category?.[0],
              languages: x.filters.language ?? [],
              type: x.filters.type?.[0]
            }))
            
            if (limit != null) {
              return filtered.slice(0, limit)
            }

            return filtered
          }

          console.log("OK")
          window.pagefind = pagefind

          async function attach() {
            document.querySelector("#search").addEventListener("input", async e => {
              const results = await searchResults(e.target.value, 5)
              console.log(results)
            })

            const element = document.querySelector("#search-results")
            if (element != null) {
              element.innerText = JSON.stringify(await searchResults(new URLSearchParams(location.search).get('q')), null, 2)
            }
          }

          if (document.readyState === "loading") {
            document.addEventListener("DOMContentLoaded", attach)
          } else {
            attach()
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
