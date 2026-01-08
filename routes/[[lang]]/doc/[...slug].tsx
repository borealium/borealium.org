import { HttpError, page } from "fresh"
import { Head } from "fresh/runtime"
import { define } from "../../../utils.ts"
import {
  type DocFrontmatter,
  loadDoc,
  type ParsedContent,
  type TocEntry,
} from "~lib/markdown.ts"

export const handler = define.handlers({
  async GET(ctx) {
    const slug = ctx.params.slug

    if (!slug) {
      throw new HttpError(404, "Documentation page not found")
    }

    const doc = await loadDoc(slug)

    if (!doc) {
      throw new HttpError(404, `Documentation not found: ${slug}`)
    }

    ctx.state.doc = doc
    return page()
  },
})

function TocList({ entries }: { entries: TocEntry[] }) {
  if (entries.length === 0) { return null }

  return (
    <ol>
      {entries.map((entry) => (
        <li key={entry.id}>
          <a href={`#${entry.id}`}>{entry.text}</a>
          {entry.children.length > 0 && <TocList entries={entry.children} />}
        </li>
      ))}
    </ol>
  )
}

export default define.page(function DocPage({ state }) {
  const { i18n } = state
  const { t } = i18n
  const doc = state.doc as ParsedContent<DocFrontmatter>

  // Extract title from frontmatter or first heading in TOC
  const title = doc.frontmatter.title || doc.toc[0]?.text || "Documentation"

  return (
    <>
      <Head>
        <title>{title} | Borealium</title>
        <meta
          name="description"
          content={`${title} - Borealium Documentation`}
        />
      </Head>

      <article class="doc">
        <nav class="toc">
          <TocList entries={doc.toc} />
          <div style={{ height: "64px" }} />
          <a href="#top" class="back-to-top">
            ↑ {t("back-to-top", { fallback: "Back to top" })}
          </a>
        </nav>
        <div class="content">
          <section
            data-toc-context
            dangerouslySetInnerHTML={{ __html: doc.html }}
          />
        </div>
      </article>
    </>
  )
})
