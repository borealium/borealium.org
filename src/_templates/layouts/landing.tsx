import React from "react"
import { Page } from "~utils/data-types.ts"
import { FluentBundle } from "npm:@fluent/bundle"
import { Aside } from "~/_templates/_components/aside.tsx"
import { CategoryLabel } from "~/_templates/_components/label.tsx"
import { Square } from "~/_templates/_components/square.tsx"
import { DownloadButton } from "~/_templates/_components/download-button.tsx"

export const layout = "layouts/base.tsx"

function script(strings: TemplateStringsArray) {
  const text = strings[0]
  return (
    <script
      dangerouslySetInnerHTML={{ __html: text }}
    />
  )
}

export default function (page: Page & { showTableOfContents?: boolean }) {
  const { title, document, children, lang, showTableOfContents = true, fluentBundles } = page

  if (lang == null) {
    return (
      <div>
        <button className="le-button">test</button>
      </div>
    )
  }

  return (
    <main className="landing">
      <div className="blocks">
        <OneBlock {...page} />
        <Block {...page} />
        <Block {...page} />
      </div>
      <Aside />
    </main>
  )
}

function msg(page: Page, msg: string): string {
  const bundle = page.fluentBundles[page.lang as string] as FluentBundle
  if (bundle == null) {
    return ""
  }

  const message = bundle.getMessage("welcome")
  if (message?.value) {
    return bundle.formatPattern(message.value)
    // → "Welcome, Anna, to Foo 3000!"
  }

  return ""
}

function Block(page: Page) {
  return (
    <div className="main-block">
      <CategoryLabel context="divvun" category="manager" />
      <h2>One download and the rest is handled automatically, including keeping the tools up-to-date.</h2>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit sed diam non et erat. Lorem ipsum dolor sit amet,
        consectetur adipiscing elit sed diam non et erat.
      </p>
      <div className="button-group">
        <DownloadButton title="Divvun Manager 2.0" description="for Windows" />
        <DownloadButton title="Divvun Manager 2.0" description="for macOS" />
      </div>
    </div>
  )
}

function OneBlock(page: Page) {
  return (
    <div className="one-block">
      <div className="first-cell">
        <CategoryLabel context="divvun" category="global" />
        <h2>We are Divvun, we provide open-source language tools to keep indigenous and minority languages alive.</h2>
        <p>
          We help to develop and maintain language and technology tools, including spelling and grammar checkers,
          keyboards, dictionaries, and other digital and web services - with the vast majority being provided free of
          charge as open-source software.
        </p>
      </div>
      <div className="second-cell">
        <h3>Explore more about our tools:</h3>
        <div className="squares-grid">
          <Square title="Proofing Tools" description="Lorem ipsum dolor sit amet consecteur." />
          <Square title="Proofing Tools" description="Lorem ipsum dolor sit amet consecteur." />
          <Square title="Proofing Tools" description="Lorem ipsum dolor sit amet consecteur." />
          <Square title="Proofing Tools" description="Lorem ipsum dolor sit amet consecteur." />
          <Square title="Proofing Tools" description="Lorem ipsum dolor sit amet consecteur." />
          <Square title="Proofing Tools" description="Lorem ipsum dolor sit amet consecteur." />
        </div>
      </div>
    </div>
  )
}
