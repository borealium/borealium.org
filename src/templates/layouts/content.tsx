import React from "react"
import { Page } from "~utils/data-types.ts"
import { Breadcrumbs } from "~/templates/components/breadcrumbs.tsx"

export const layout = "layouts/base.tsx"

export default function (page: Page & { showTableOfContents?: boolean }) {
  const { title, children, showTableOfContents = true } = page

  return (
    <>
      <Breadcrumbs {...page} />
      <main className="content-page">
        <header>
          <h1>{title}</h1>
        </header>
        <article id="content">{children}</article>
        {showTableOfContents && (
          <aside>
            <header>
              <h2>Table of contents</h2>
            </header>
            <div data-insert-toc="#content"></div>
          </aside>
        )}
      </main>
    </>
  )
}
