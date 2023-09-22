import React from "react"
import { Square } from "~/_templates/_components/square.tsx"
import { DownloadButton } from "~/_templates/_components/download-button.tsx"
import { Page } from "lume/core.ts"
import { CategoryLabel, TagLabel } from "~/_templates/_components/label.tsx"
import { getLanguageData } from "~plugins/language-data.ts"
import Aside, { SimplePost } from "~/_templates/_components/aside.tsx"

export const layout = "layouts/base.tsx"

const { languages } = getLanguageData()

export default function (page: Page) {
  const { title, document, children, url, lang, fluentBundle, search } = page

  const posts = search.pages(["type=post", `lang=${lang}`], "date=desc")
  // console.log("WAT", posts[0].page)
  // Deno.exit(1)

  if (lang == null) {
    return (
      <div>
        <button className="le-button">test</button>
      </div>
    )
  }

  const CATEGORIES: Category[] = [
    {
      title: "Proofing Tools",
      description: "Lorem ipsum dolor sit amet consecteur.",
      href: "/category/proofing-tools",
      img: {
        src: "/static/images/category-dictionaries.png",
        alt: "test",
      },
    },
    {
      title: "Keyboards",
      description: "Lorem ipsum dolor sit amet consecteur.",
      href: "/category/keyboards",
      img: {
        src: "/static/images/category-keyboard-layouts.png",
        alt: "test",
      },
    },
    {
      title: "Text-to-speech",
      description: "Lorem ipsum dolor sit amet consecteur.",
      href: "/category/text-to-speech",
      img: {
        src: "/static/images/category-language-learning.png",
        alt: "test",
      },
    },
    {
      title: "Language Learning",
      description: "Lorem ipsum dolor sit amet consecteur.",
      href: "/category/language-learning",
      img: {
        src: "/static/images/category-spellers.png",
        alt: "test",
      },
    },
    {
      title: "Dictionaries",
      description: "Lorem ipsum dolor sit amet consecteur.",
      href: "/category/dictionaries",
      img: {
        src: "/static/images/category-text-to-speech.png",
        alt: "test",
      },
    },
    {
      title: "Translation",
      description: "Lorem ipsum dolor sit amet consecteur.",
      href: "/category/translation",
      img: {
        src: "/static/images/category-translation.png",
        alt: "test",
      },
    },
  ]

  return (
    <main className="landing">
      <div className="blocks">
        <BigBlock
          title={fluentBundle.getMessage("block-1-title")?.value as string}
          description={fluentBundle.getMessage("block-1-description")?.value as string}
          categoriesTitle="Explore more about our tools:"
          categories={CATEGORIES}
        />
        <SmallBlock
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
        />
        <SmallBlock
          title="North, Inari, Julev, Skolt and South Sámi desktop and mobile keyboards."
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit sed diam non et erat. Lorem ipsum dolor sit amet,
          consectetur adipiscing elit sed diam non et erat."
          category="keyboards"
          buttons={
            <>
              <DownloadButton
                title="Divvun Keyboards"
                description="For iOS and Android"
                href="/resource/divvun-keyboard"
              />
            </>
          }
        />
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

function BigBlock(props: { title: string; description: string; categoriesTitle: string; categories: Category[] }) {
  return (
    <div className="big-block">
      <div className="first-cell">
        <div className="text-group">
          <CategoryLabel context="divvun" category="global" />
          <h2>{props.title}</h2>
          <p>
            {props.description}
          </p>
        </div>
        <h3>{props.categoriesTitle}</h3>
      </div>
      <div className="second-cell">
        <ul className="list">
          {Object.entries(languages).map(([code, data]) => (
            <li key={code}>
              <a href={`/language/${code}`}>
                {data.autonym}
              </a>
            </li>
          ))}
        </ul>
        {
          /* <div className="squares-grid">
          {props.categories.map((category) => (
            <Square
              title={category.title}
              description={category.description}
              href={category.href}
              img={category.img ? { src: category.img.src, alt: category.img.alt } : undefined}
            />
          ))}
        </div> */
        }
      </div>
    </div>
  )
}

// function SmallBlock(props: { title: string; description: string }) {
//   return (
//     <div className="small-block">
//       <CategoryLabel context="divvun" category="manager" />
//       <h2>{props.title}</h2>
//       <p>{props.description}</p>
//       <div className="button-group">
//       </div>
//     </div>
//   )
// }

function SmallBlock(props: { title: string; category: string; description: string; buttons: JSX.Element }) {
  return (
    <div className="small-block">
      <CategoryLabel context="divvun" category={props.category} />
      <h2>{props.title}</h2>
      <p>{props.description}</p>
      <div className="button-group">
        {props.buttons}
      </div>
    </div>
  )
}
