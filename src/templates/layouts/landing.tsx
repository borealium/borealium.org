import React from "react"
import { Page } from "~utils/data-types.ts"
import { Breadcrumbs } from "~/templates/components/breadcrumbs.tsx"
import { FluentBundle } from "npm:@fluent/bundle"

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
    <div className="landing">
      <Header />
      <main>
        <div className="blocks">
          <Block {...page} />
          <Block {...page} />
          <Block {...page} />
          <Block {...page} />
        </div>
        <Aside />
      </main>
    </div>
  )
}

function Header() {
  return (
    <nav className="header-nav">
      <div className="nav primary md lg">
        <div>Icon</div>
        <div>Divvun</div>
        <div>Proofing tools</div>
        <div>Keyboards</div>
        <div>Dictionaries</div>
      </div>
      <div className="nav primary xs sm">
        <div>Icon</div>
        <div>Borger</div>
      </div>
      <div className="nav search xs">
        <div>Ant burner</div>
      </div>
      <div className="nav search sm md lg">
        <div>Search</div>
      </div>
      <div className="nav tertiary md lg">
        <div>Language</div>
      </div>
    </nav>
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
      <div>section tag</div>
      <h2>We are Divvun, blah blah</h2>
      <p>
        {msg(page, "welcome")}{" "}
        Some text Some text Some text Some text Some text Some text Some text Some text Some text Some text Some text
        Some text Some text Some text Some text Some text
      </p>
    </div>
  )
}

function Aside() {
  return (
    <section className="aside">
      <AsideBlock />
      <AsideBlock />
      <AsideBlock />
      <AsideBlock />
      <AsideBlock />
    </section>
  )
}

function AsideBlock() {
  return (
    <div>
      <div>date</div>
      <div>tag</div>
      <h3>title</h3>
    </div>
  )
}
