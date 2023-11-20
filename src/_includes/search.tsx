import LanguageTag from "~/_components/tag.tsx"
import Aside, { SimplePost } from "~/_components/aside.tsx"
import { script } from "~/_includes/lang-redir.tsx"
import { Data, PageData } from "lume/core.ts"

export const layout = "base.tsx"

export default function SearchPage(page: PageData) {
  const { lang, search } = page
  const t = page.fluentBundle(lang, "_includes/search")
  const posts = search.pages(["type=post", `lang=${lang}`], "date=desc")

  return (
    <div className="search-page" data-pagefind-ignore>
      <div className="content">
        <div className="title">
          <h1>
            {t("search")}: <q className="search-query">...</q>
          </h1>
          <div>
            <span className="result-count">...</span> {t("results")}.
          </div>
        </div>
        <ul className="search-page-results">
          <noscript>You must enable JavaScript for search to function.</noscript>
          <div>
            {t("loading")}
          </div>
        </ul>
      </div>
      <Aside
        t={t}
        category={t("news")}
        posts={posts.map((post) => {
          const { id, title, category, date, originalUrl } = post as Data<PageData>

          return {
            id: id,
            date: date?.toISOString(),
            tag: category,
            title: title,
            url: originalUrl,
          } as SimplePost
        })}
      />
    </div>
  )
}
