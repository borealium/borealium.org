import { define } from "../../utils.ts"
import { getAllResources } from "../../data/resourceIndex.ts"
import { getAllCategories } from "../../data/categories.ts"
import languagesData from "../../data/languages.ts"

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

  // Exact match
  if (normalizedText === normalizedQuery) { return 100 }

  // Starts with query
  if (normalizedText.startsWith(normalizedQuery)) { return 80 }

  // Contains query as whole word
  if (
    normalizedText.includes(` ${normalizedQuery} `) ||
    normalizedText.startsWith(`${normalizedQuery} `) ||
    normalizedText.endsWith(` ${normalizedQuery}`)
  ) {
    return 60
  }

  // Contains query
  if (normalizedText.includes(normalizedQuery)) { return 40 }

  return 0
}

export const handler = define.handlers({
  GET(ctx) {
    const url = new URL(ctx.req.url)
    const query = url.searchParams.get("q")?.trim() || ""
    const lang = url.searchParams.get("lang") || "en"
    const limit = parseInt(url.searchParams.get("limit") || "20")

    if (!query || query.length < 2) {
      return Response.json({ results: [], query })
    }

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
    for (const categoryId of getAllCategories()) {
      const idScore = searchScore(query, categoryId)
      // Format the category ID to be more readable for title
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

    // Sort by score descending and limit
    results.sort((a, b) => b.score - a.score)
    const limitedResults = results.slice(0, limit)

    return Response.json({
      results: limitedResults,
      query,
      total: results.length,
    })
  },
})
