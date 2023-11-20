import { DownloadButton } from "../_components/download-button.tsx"
import { Page } from "lume/core.ts"
import { CategoryLabel } from "../_components/label.tsx"
import { getLanguageData } from "~plugins/language-data.ts"
import Aside, { SimplePost } from "../_components/aside.tsx"
import { FluentPage } from "~plugins/fluent.ts"
// import SecondaryBlock2 from "~/_partials/landing/secondary-block-2.mdx"

export const layout = "base.tsx"

const { uiOnly, languages } = getLanguageData()

export default function (page: Page & FluentPage) {
  const { document, lang, t, search, comp } = page

  const posts = search.pages(["type=post", `lang=${lang}`], "date=desc").slice(0, 3)

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
        {
          /* <SmallBlock
          title="One download and the rest is handled automatically, including keeping the tools up-to-date."
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit sed diam non et erat. Lorem ipsum dolor sit amet,
          consectetur adipiscing elit sed diam non et erat."
          category="manager"
          buttons={
            <>
              <DownloadButton
                title="Divvun Manager"
                description="for Windows"
                href="https://pahkat.uit.no/divvun-installer/download/divvun-installer?platform=windows"
                img={{ src: "/static/images/windows-logo.png", alt: "Windows logo" }}
              />
              <DownloadButton
                title="Divvun Manager"
                description="for macOS"
                href="https://pahkat.uit.no/divvun-installer/download/divvun-installer?platform=macos"
                img={{ src: "/static/images/macos-logo.png", alt: "Apple logo" }}
              />
            </>
          }
        /> */
        }
      </div>
      <Aside
        context="updates"
        category="news"
        posts={posts.map((post) => {
          const { id, title, category, date, lang, originalUrl, author } = post

          return {
            id: id,
            date: date.toISOString(),
            tag: category,
            title: title,
            url: originalUrl,
          } as SimplePost
        })}
      />
    </main>
  )
}

type Category = {
  title: string
  description: string
  href: string
  img?: { src: string; alt: string }
}

function SmallBlock(props: { title: string; category: string; description: string; buttons: JSX.Element }) {
  return (
    <div className="small-block">
      <CategoryLabel category={props.category} />
      <h2>{props.title}</h2>
      <p>{props.description}</p>
      <div className="button-group">
        {props.buttons}
      </div>
    </div>
  )
}
