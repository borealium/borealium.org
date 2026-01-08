import { HttpError, page } from "fresh"
import { Head } from "fresh/runtime"
import { define } from "../../../utils.ts"
import {
  getRecentPosts,
  loadPost,
  type ParsedContent,
  type PostFrontmatter,
} from "~lib/markdown.ts"
import { Aside } from "../../../components/Aside.tsx"
import { CategoryLabel } from "../../../components/CategoryLabel.tsx"

export const handler = define.handlers({
  async GET(ctx) {
    const slug = ctx.params.slug

    if (!slug) {
      throw new HttpError(404, "Blog post not found")
    }

    const post = await loadPost(slug)

    if (!post) {
      throw new HttpError(404, `Blog post not found: ${slug}`)
    }

    ctx.state.post = post

    // Get recent posts for sidebar
    const recentPosts = await getRecentPosts(3)
    ctx.state.recentPosts = recentPosts.map((p) => ({
      id: p.slug,
      title: p.frontmatter.title,
      date: p.frontmatter.date,
      tag: p.frontmatter.category ?? "news",
      url: `/${ctx.state.lang}/post/${p.slug}`,
      excerpt: p.content.slice(0, 150) + "...",
    }))

    return page()
  },
})

export default define.page(function PostPage({ state }) {
  const { lang, i18n, recentPosts } = state
  const { t } = i18n
  const post = state.post as ParsedContent<PostFrontmatter>
  const posts = recentPosts ?? []

  const title = post.frontmatter.title
  const date = post.frontmatter.date
  const author = post.frontmatter.author

  return (
    <>
      <Head>
        <title>{title} | Borealium</title>
        <meta name="description" content={post.content.slice(0, 160)} />
      </Head>

      <article class="post">
        <div class="content">
          <header>
            {date && (
              <div class="category-label">
                <time>{date}</time>
              </div>
            )}
            <div class="divider" />
            {author && (
              <span style={{ fontSize: "80%" }}>Author: {author}</span>
            )}
            <h1>{title}</h1>
          </header>
          <section dangerouslySetInnerHTML={{ __html: post.html }} />
        </div>
        <Aside category={t("news", { fallback: "News" })} posts={posts} t={t} />
      </article>
    </>
  )
})
