import { Head } from "fresh/runtime"
import { HttpError, page } from "fresh"
import { marked } from "marked"
import { define } from "../../../utils.ts"
import { getAllCategories } from "../../../data/categories.ts"
import { getResourcesByCategory } from "../../../data/resourceIndex.ts"
import { getRecentPosts } from "../../../lib/markdown.ts"
import { createTranslator, selectLocale } from "../../../lib/i18n.ts"
import { CategoryLabel } from "../../../components/CategoryLabel.tsx"
import { Aside } from "../../../components/Aside.tsx"
import type { Resource } from "../../../types/resource.ts"

export const handler = define.handlers({
  async GET(ctx) {
    const { id } = ctx.params

    // Validate category exists
    if (!getAllCategories().includes(id)) {
      throw new HttpError(404, `Category "${id}" not found`)
    }

    // Get recent posts for sidebar
    const recentPosts = await getRecentPosts(3)
    ctx.state.recentPosts = recentPosts.map((post) => ({
      id: post.slug,
      title: post.frontmatter.title,
      date: post.frontmatter.date,
      tag: post.frontmatter.category ?? "news",
      url: `/${ctx.state.lang}/post/${post.slug}`,
      excerpt: post.content.slice(0, 150) + "...",
    }))

    return page()
  },
})

export default define.page(function CategoryPage({ params, state }) {
  const { id } = params
  const { lang, i18n, recentPosts } = state
  const { t } = i18n
  const posts = recentPosts ?? []

  const categoryT = createTranslator(lang, "categories")
  const categoryName = categoryT(id, { fallback: id })
  const categoryDescription = categoryT(`${id}-description`, {
    fallback: `Resources in the ${id} category`,
  })

  const resources = getResourcesByCategory(id)

  return (
    <>
      <Head>
        <title>{categoryName} | Borealium</title>
        <meta name="description" content={categoryDescription} />
      </Head>

      <div class="category-index">
        <div class="content">
          <div>
            <CategoryLabel category={t("category", { fallback: "Category" })} />
            <h1>{categoryName}</h1>
            <p>{categoryDescription}</p>
          </div>
          <ul class="search-page-results">
            {resources.length === 0 && (
              <div>
                {t("no-resources-in-category", {
                  fallback: "No resources were found in this category.",
                })}
              </div>
            )}
            {resources.map((resource) => (
              <ResourceListItem
                key={resource.id}
                resource={resource}
                lang={lang}
              />
            ))}
          </ul>
        </div>
        <Aside category={t("news", { fallback: "News" })} posts={posts} t={t} />
      </div>
    </>
  )
})

function ResourceListItem(
  { resource, lang }: { resource: Resource; lang: string },
) {
  const name = selectLocale(lang, resource.name) ?? resource.id
  const description = selectLocale(lang, resource.description)

  return (
    <li class="search-result">
      <a href={`/${lang}/resource/${resource.id}`}>
        <img src="/static/images/tag-resource.svg" alt="" />
        <strong>{name}</strong>
      </a>
      {description && (
        <p
          class="description"
          dangerouslySetInnerHTML={{
            __html: marked.parse(description) as string,
          }}
        />
      )}
    </li>
  )
}
