import React from "react"
import { FluentBundle } from "npm:@fluent/bundle"
import { Aside, SimplePost } from "~/_templates/_components/aside.tsx"
import { CategoryLabel } from "~/_templates/_components/label.tsx"
import { Square } from "~/_templates/_components/square.tsx"
import { DownloadButton } from "~/_templates/_components/download-button.tsx"
import { Page } from "lume/core.ts"

export const layout = "layouts/base.tsx"

export default function (page: Page) {
  const { title, document, children, lang, fluentBundles } = page

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
      href: "/",
      img: {
        src: "/static/images/category-dictionaries.png",
        alt: "test",
      },
    },
    {
      title: "Keyboards",
      description: "Lorem ipsum dolor sit amet consecteur.",
      href: "/",
      img: {
        src: "/static/images/category-keyboard-layouts.png",
        alt: "test",
      },
    },
    {
      title: "Text-to-speech",
      description: "Lorem ipsum dolor sit amet consecteur.",
      href: "/",
      img: {
        src: "/static/images/category-language-learning.png",
        alt: "test",
      },
    },
    {
      title: "Language Learning",
      description: "Lorem ipsum dolor sit amet consecteur.",
      href: "/",
      img: {
        src: "/static/images/category-spellers.png",
        alt: "test",
      },
    },
    {
      title: "Dictionaries",
      description: "Lorem ipsum dolor sit amet consecteur.",
      href: "/",
      img: {
        src: "/static/images/category-text-to-speech.png",
        alt: "test",
      },
    },
    {
      title: "Translation",
      description: "Lorem ipsum dolor sit amet consecteur.",
      href: "/",
      img: {
        src: "/static/images/category-translation.png",
        alt: "test",
      },
    },
  ]

  const POSTS: SimplePost[] = [
    {
      date: "2020-08-05",
      tag: "lorem",
      title: "Lorem ipsum dolor sit amet",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit sed diam non pro id el element euismod tempor",
    },
    {
      date: "2020-08-04",
      tag: "ipsum",
      title: "Lorem ipsum dolor sit amet",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit sed diam non pro id el element euismod tempor",
    },
    {
      date: "2020-08-03",
      tag: "dolor",
      title: "Lorem ipsum dolor sit amet",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit sed diam non pro id el element euismod tempor",
    },
    {
      date: "2020-08-02",
      tag: "sit",
      title: "Lorem ipsum dolor sit amet",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit sed diam non pro id el element euismod tempor",
    },
    {
      date: "2023-08-01",
      tag: "amet",
      title: "Lorem ipsum dolor sit amet",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit sed diam non pro id el element euismod tempor",
    },
  ]

  return (
    <main className="landing">
      <div className="blocks">
        <BigBlock
          title="We are Divvun, we provide open-source language tools to keep indigenous and minority languages alive."
          description="We help to develop and maintain language and technology tools, including spelling and grammar checkers,
          keyboards, dictionaries, and other digital and web services - with the vast majority being provided free of
          charge as open-source software."
          categoriesTitle="Explore more about our tools:"
          categories={CATEGORIES}
        />
        <SmallBlock
          title="One download and the rest is handled automatically, including keeping the tools up-to-date."
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit sed diam non et erat. Lorem ipsum dolor sit amet,
          consectetur adipiscing elit sed diam non et erat."
        />
        <SmallBlock
          title="North, Inari, Julev, Skolt and South Sámi desktop and mobile keyboards."
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit sed diam non et erat. Lorem ipsum dolor sit amet,
          consectetur adipiscing elit sed diam non et erat."
        />
      </div>
      <Aside context="updates" category="news" posts={POSTS} />
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

function SmallBlock(props: { title: string; description: string }) {
  return (
    <div className="small-block">
      <CategoryLabel context="divvun" category="manager" />
      <h2>{props.title}</h2>
      <p>{props.description}</p>
      <div className="button-group">
        <DownloadButton
          title="Divvun Manager 2.0"
          description="for Windows"
          href="/"
          img={{ src: "/static/images/windows-logo.png", alt: "Windows logo" }}
        />
        <DownloadButton
          title="Divvun Manager 2.0"
          description="for macOS"
          href="/"
          img={{ src: "/static/images/macos-logo.png", alt: "Apple logo" }}
        />
      </div>
    </div>
  )
}
