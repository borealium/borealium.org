import { Head } from "fresh/runtime"
import { page } from "fresh"
import { define } from "../../utils.ts"
import { Aside } from "../../components/Aside.tsx"
import { getRecentPosts } from "~lib/markdown.ts"

export const handler = define.handlers({
  async GET(ctx) {
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

export default define.page(function PrivacyPage({ state }) {
  const { i18n, recentPosts } = state
  const { t, tmd } = i18n

  const title = t("title", { fallback: "Privacy" })
  const posts = recentPosts ?? []

  return (
    <>
      <Head>
        <title>{title} | Borealium</title>
        <meta
          name="description"
          content="Privacy policy for the Borealium language technology portal"
        />
      </Head>

      <article class="post">
        <div class="content">
          <section>
            <h1>{title}</h1>

            <div
              dangerouslySetInnerHTML={{
                __html: tmd("body", {
                  fallback:
                    `The Borealium.org portal does not store any personally identifiable information, and uses only minimal analytics to be able to report site usage.

Page analytics is done using [Plausible](https://plausible.io/), and is fully GDPR compliant.`,
                }),
              }}
            />
          </section>
        </div>
        <Aside category={t("news", { fallback: "News" })} posts={posts} t={t} />
      </article>
    </>
  )
})
