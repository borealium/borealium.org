import { Data } from "lume/core/file.ts"
import { Footer } from "~/_components/footer.tsx"
import { Navbar } from "~/_components/navbar.tsx"
import { script } from "~/_includes/lang-redir.tsx"
import { FluentPage } from "~plugins/fluent.ts"
export default function BasePage(page: Data & FluentPage) {
  const { title, children, url, originalUrl, lang, t } = page
  const lang_t = page.fluentBundle(lang, "languages")
  const isRtl = lang === "yi"

  if (t == null) {
    throw new Error("t not available")
  }

  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <title>{title ? `Borealium | ${title}` : "Borealium"}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&family=Noto+Sans+Hebrew:wght@100..900&family=Noto+Sans:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="/styles/index.css" />
        <script defer data-domain="borealium.org" src="https://plausible.io/js/script.js"></script>
        {script(`
          if (document.documentElement.hasAttribute("lang")) {
            localStorage.setItem("borealium:language", document.documentElement.getAttribute("lang"))
          }
        `)}
        {script(`
          const pagefind = await import("/pagefind/pagefind.js")

          function createSearchResult(input, withDescription) {
            const li = document.createElement("li")
            const a = document.createElement("a")
            li.setAttribute("class", "search-result")
            a.setAttribute("href", input.url)
            
            let cls = "tag-page"
            if (input.type === "resource") {
              cls = "tag-resource"
            } else if (input.type === "category-index") {
              cls = "tag-category"
            } else if (input.type === "language-index") {
              cls = "tag-language"
            } else if (input.type === "post") {
              cls = "tag-page"
            }
          
            const tagSpan = document.createElement("img")
            tagSpan.setAttribute("src", "/static/images/" + cls + ".svg")
            
            const textSpan = document.createElement("span")
            textSpan.innerText = input.title

            a.appendChild(tagSpan)
            a.appendChild(textSpan)
            li.appendChild(a)

            if (withDescription && input.description != null) {
              const descriptionSpan = document.createElement("div")
              descriptionSpan.setAttribute("class", "description")
              descriptionSpan.innerText = input.description
              li.appendChild(descriptionSpan)
            }

            return li
          }
          
          function createSearchPopoverResults(query, inputs) {
            const resultsNode = document.querySelector(".search-results")
            resultsNode.innerHTML = ""
            for (const input of inputs) {
              resultsNode.appendChild(createSearchResult(input))
            }
            
            const q = new URLSearchParams()
            q.set("q", query)
            const searchUrl = \`/\${document.documentElement.lang}/search/?\${q.toString()}\`
            document.querySelector(".search-see-more-button").setAttribute("href", searchUrl)
            resultsNode.parentNode.removeAttribute("hidden")
          }

          function createSearchResults(query, inputs) {
            const resultsNode = document.querySelector(".search-page-results")
            document.querySelector(".search-query").innerText = query
            document.querySelector(".result-count").innerText = inputs.length.toString()
            resultsNode.innerHTML = ""
            for (const input of inputs) {
              resultsNode.appendChild(createSearchResult(input, true))
            }
          }

          function hidePopover() {
            const resultsNode = document.querySelector(".search-results")
            resultsNode?.parentNode.setAttribute("hidden", "hidden")
          }

          function showPopover() {
            const resultsNode = document.querySelector(".search-results")
            if (resultsNode?.children[0] != null) {
              resultsNode?.parentNode.removeAttribute("hidden")
            }
          }

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

          function updateLanguageSelectorHrefs(query) {
            const languageSelector = document.querySelector(".language-wrapper .list")
            
            if (languageSelector == null) {
              return
            }
            
            const links = Array.from(languageSelector.querySelectorAll("a"))
            links.forEach(link => {
              const href = link.getAttribute("href")
              if (href == null) {
                return
              }
              
              link.setAttribute("href", href + "?" + query.toString())
            })
          }

          window.pagefind = pagefind

          async function attach() {
            let debounceId

            document.querySelector(".search-wrapper").addEventListener("click", e => {
              document.querySelector(".nav-control").classList.add("search-visible")
              document.querySelector(".search-input").focus()
            })

            document.querySelector(".search-input").addEventListener("focus", e => {
              showPopover()
            })

            document.querySelector(".search-input").addEventListener("blur", e => {
              document.querySelector(".nav-control").classList.remove("search-visible")
            })

            document.querySelector(".navbar-offset-wrapper").addEventListener("click", e => {
              hidePopover()
            })
            
            document.querySelector("#search").addEventListener("input", async (e) => {
              if (e.target.value == null || e.target.value.trim() === "") {
                hidePopover()
                debounceId = null
                return
              }

              const thisDebounceId = +new Date()
              debounceId = thisDebounceId
              const results = await searchResults(e.target.value, 5)
              
              if (thisDebounceId === debounceId) {
                createSearchPopoverResults(e.target.value, results)
              }
            })

            const element = document.querySelector(".search-page-results")
            if (element != null) {
              const query = new URLSearchParams(location.search)
              const q = query.get('q')
              if (q != null) {
                const results = await searchResults(q)
                createSearchResults(q, results)
                updateLanguageSelectorHrefs(query)
              }
            }
          }

          if (document.readyState === "loading") {
            document.addEventListener("DOMContentLoaded", attach)
          } else {
            attach()
          }
        `)}
      </head>
      <body id="top" dir={isRtl ? "rtl" : "auto"}>
        <div className="wrapper">
          <Navbar url={originalUrl || url || "/"} t={t} lang_t={lang_t} lang={lang} />
          <div className="navbar-offset-wrapper">
            {children}
          </div>
          <Footer t={t} />
        </div>
      </body>
    </html>
  )
}
