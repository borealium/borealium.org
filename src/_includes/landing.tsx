import { Data, Page } from "lume/core/file.ts"
import type Searcher from "lume/core/searcher.ts"
import { FluentPage, type TranslateFn } from "~plugins/fluent.ts"
import Aside, { SimplePost } from "../_components/aside.tsx"

export const layout = "base.tsx"

export default function (
  {
    lang,
    search,
    comp,
    t,
  }: {
    page: Page & FluentPage
    search: Searcher
    t: TranslateFn
    comp: any
    lang: string
  },
) {
  // const { lang } = page
  const posts = search.pages(`type=post lang=${lang}`, "date=desc", 3)

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
          const { id, title, category, date, originalUrl } = post as Data

          console.log(originalUrl)

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
