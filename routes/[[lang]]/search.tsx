import { Head } from "fresh/runtime"
import { page } from "fresh"
import { marked } from "marked"
import { define } from "../../utils.ts"
import { getAllResources } from "../../data/resourceIndex.ts"
import { categoriesList } from "../../data/categories.ts"
import languagesData from "../../data/languages.ts"
import { Aside } from "../../components/Aside.tsx"
import { getRecentPosts } from "../../lib/markdown.ts"

interface SearchResult {
  type: "resource" | "language" | "category"
  id: string
  title: string
  description?: string
  url: string
  score: number
}

function normalize(str: string): string {
  return str.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
}

function searchScore(query: string, text: string): number {
  const normalizedQuery = normalize(query)
  const normalizedText = normalize(text)
  if (normalizedText === normalizedQuery) { return 100 }
  if (normalizedText.startsWith(normalizedQuery)) { return 80 }
  if (
    normalizedText.includes(` ${normalizedQuery} `) ||
    normalizedText.startsWith(`${normalizedQuery} `) ||
    normalizedText.endsWith(` ${normalizedQuery}`)
  ) { return 60 }
  if (normalizedText.includes(normalizedQuery)) { return 40 }
  return 0
}

function performSearch(query: string, lang: string): SearchResult[] {
  if (!query || query.length < 2) { return [] }

  const results: SearchResult[] = []

  // Search resources
  const resources = getAllResources()
  for (const resource of resources) {
    const nameScore = searchScore(query, resource.name.en || "")
    const descScore = searchScore(query, resource.description?.en || "") * 0.5
    const idScore = searchScore(query, resource.id) * 0.3
    const score = Math.max(nameScore, descScore, idScore)

    if (score > 0) {
      results.push({
        type: "resource",
        id: resource.id,
        title: resource.name.en || resource.id,
        description: resource.description?.en?.slice(0, 150),
        url: `/${lang}/resource/${resource.id}`,
        score,
      })
    }
  }

  // Search languages
  for (const [tag, data] of Object.entries(languagesData.languages)) {
    const autonymScore = searchScore(query, data.autonym)
    const tagScore = searchScore(query, tag) * 0.8
    const score = Math.max(autonymScore, tagScore)

    if (
      score > 0 && !languagesData.hidden.includes(tag) &&
      !languagesData.uiOnly.includes(tag)
    ) {
      results.push({
        type: "language",
        id: tag,
        title: data.autonym,
        url: `/${lang}/language/${tag}`,
        score,
      })
    }
  }

  // Search categories
  for (const categoryId of categoriesList) {
    const idScore = searchScore(query, categoryId)
    const title = categoryId.replace(/-/g, " ").replace(
      /\b\w/g,
      (c) => c.toUpperCase(),
    )

    if (idScore > 0) {
      results.push({
        type: "category",
        id: categoryId,
        title,
        url: `/${lang}/category/${categoryId}`,
        score: idScore,
      })
    }
  }

  results.sort((a, b) => b.score - a.score)
  return results.slice(0, 30)
}

export const handler = define.handlers({
  async GET(ctx) {
    const query = ctx.url.searchParams.get("q")?.trim() || ""
    const results = performSearch(query, ctx.state.lang)

    const recentPosts = await getRecentPosts(3)
    ctx.state.recentPosts = recentPosts.map((post) => ({
      id: post.slug,
      title: post.frontmatter.title,
      date: post.frontmatter.date,
      tag: post.frontmatter.category ?? "news",
      url: `/${ctx.state.lang}/post/${post.slug}`,
      excerpt: post.content.slice(0, 150) + "...",
    }))

    ctx.state.searchResults = results
    ctx.state.searchQuery = query

    return page()
  },
})

export default define.page(function SearchPage({ state }) {
  const { lang, i18n, searchResults, searchQuery, recentPosts } = state
  const { t } = i18n

  const query = searchQuery ?? ""
  const results = (searchResults ?? []) as SearchResult[]
  const posts = recentPosts ?? []

  return (
    <>
      <Head>
        <title>
          {query
            ? `${
              t("search-results", { fallback: "Search results for" })
            } "${query}" | Borealium`
            : `${t("search", { fallback: "Search" })} | Borealium`}
        </title>
      </Head>

      <main class="search-page">
        <div class="content">
          <div class="title">
            <h1>
              {query
                ? (
                  <>
                    {t("search-results", { fallback: "Search results for" })}
                    {" "}
                    <span class="search-query">"{query}"</span>
                  </>
                )
                : (
                  t("search", { fallback: "Search" })
                )}
            </h1>
          </div>

          {query && results.length === 0 && (
            <p style={{ color: "var(--color-text-secondary)", padding: "32px 0" }}>
              {t("no-results", { fallback: "No results found for" })} "{query}"
            </p>
          )}

          {!query && (
            <p style={{ color: "var(--color-text-secondary)", padding: "32px 0" }}>
              {t("search-instructions", {
                fallback: "Enter a search term above to find resources, languages, and categories.",
              })}
            </p>
          )}

          <ul class="search-page-results">
            {results.map((result) => {
              const iconMap: Record<string, string> = {
                resource: "tag-resource",
                category: "tag-category",
                language: "tag-language",
              }
              const icon = iconMap[result.type] ?? "tag-page"
              return (
                <li key={`${result.type}-${result.id}`} class="search-result">
                  <a href={result.url}>
                    <img src={`/static/images/${icon}.svg`} alt="" />
                    <span>{result.title}</span>
                  </a>
                  {result.description && (
                    <div
                      class="description"
                      dangerouslySetInnerHTML={{
                        __html: marked.parseInline(
                          result.description.replace(/\n+/g, " "),
                        ) + "...",
                      }}
                    />
                  )}
                </li>
              )
            })}
          </ul>
        </div>

        <Aside category={t("news", { fallback: "News" })} posts={posts} t={t} />
      </main>
    </>
  )
})
