import React from "react"
import { FluentBundle } from "npm:@fluent/bundle"
import { Square } from "~/_templates/_components/square.tsx"
import { DownloadButton } from "~/_templates/_components/download-button.tsx"
import { Page } from "lume/core.ts"
import search from "lume/plugins/search.ts"
import { CategoryLabel, TagLabel } from "~/_templates/_components/label.tsx"

export const layout = "layouts/base.tsx"

export default function (page: Page) {
  const { title, document, children, url, lang, fluentBundle, search } = page

  const posts = search.pages(["type=post", `lang=${lang}`], "data=desc")
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

  // const POSTS: SimplePost[] = [
  //   {
  //     date: "2020-08-05",
  //     tag: "lorem",
  //     title: "Beep Boop",
  //     description: "Some excerpt",
  //     url: "/post/beep-boop",
  //   },
  //   {
  //     date: "2020-08-04",
  //     tag: "ipsum",
  //     title: "Lorem ipsum dolor sit amet",
  //     description:
  //       "Lorem ipsum dolor sit amet, consectetur adipiscing elit sed diam non pro id el element euismod tempor",
  //   },
  //   {
  //     date: "2020-08-03",
  //     tag: "dolor",
  //     title: "Lorem ipsum dolor sit amet",
  //     description:
  //       "Lorem ipsum dolor sit amet, consectetur adipiscing elit sed diam non pro id el element euismod tempor",
  //   },
  //   {
  //     date: "2020-08-02",
  //     tag: "sit",
  //     title: "Lorem ipsum dolor sit amet",
  //     description:
  //       "Lorem ipsum dolor sit amet, consectetur adipiscing elit sed diam non pro id el element euismod tempor",
  //   },
  //   {
  //     date: "2023-08-01",
  //     tag: "amet",
  //     title: "Lorem ipsum dolor sit amet",
  //     description:
  //       "Lorem ipsum dolor sit amet, consectetur adipiscing elit sed diam non pro id el element euismod tempor",
  //   },
  // ]

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
      <section className="aside">
        <CategoryLabel context="updates" category="news" />
        {posts.map((post) => {
          const { id, title, category, date, lang, originalUrl, author } = post
          return <AsideBlock id={id} date={date.toISOString()} tag={category} title={title} url={originalUrl} />
        })}
      </section>
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
        <div className="squares-grid">
          {props.categories.map((category) => (
            <Square
              title={category.title}
              description={category.description}
              href={category.href}
              img={category.img ? { src: category.img.src, alt: category.img.alt } : undefined}
            />
          ))}
        </div>
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

export type SimplePost = {
  date: string
  tag: string
  title: string
  // description: string
  url: string
  id: string
}

function AsideBlock(props: SimplePost) {
  return (
    <div className="aside-block">
      <div className="aside-block-meta">
        <div>{props.date}</div>
        <TagLabel text={props.tag} />
      </div>
      <div className="aside-block-text">
        <h3>
          <a href={props.url}>{props.title}</a>
        </h3>
        <p data-excerpt-id={props.id}>
          {/* {props.description} */}
        </p>
      </div>
    </div>
  )
}
