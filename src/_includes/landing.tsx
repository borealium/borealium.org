import { DownloadButton } from "../_components/download-button.tsx"
import { Data, Page, PageData } from "lume/core.ts"
import { CategoryLabel } from "../_components/label.tsx"
import { getLanguageData } from "~plugins/language-data.ts"
import Aside, { SimplePost } from "../_components/aside.tsx"
import { FluentPage } from "~plugins/fluent.ts"

export const layout = "base.tsx"

export default function (page: PageData & FluentPage) {
  const { lang, t, search, comp } = page
  const posts = search.pages(["type=post", `lang="${lang}"`], "date=desc").slice(0, 3)

  return (
    <main className="landing" data-pagefind-ignore>
      <div className="blocks">
        <div className="big-block">
          <comp.landing.MainBlock t={t} lang={lang} />
        </div>
        <div className="small-block">
          <comp.landing.SecondaryBlock1 t={t} lang={lang} />
        </div>
        <div className="small-block">
          <comp.landing.SecondaryBlock2 t={t} lang={lang} />
        </div>
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
    </main>
  )
}
