import { Head } from "fresh/runtime"
import { page } from "fresh"
import { define } from "../../utils.ts"
import { MainBlock } from "../../components/landing/MainBlock.tsx"
import { SecondaryBlock1 } from "../../components/landing/SecondaryBlock1.tsx"
import { SecondaryBlock2 } from "../../components/landing/SecondaryBlock2.tsx"
import { Aside } from "../../components/Aside.tsx"
import { getRecentPosts } from "../../lib/markdown.ts"
import type { SimplePost } from "../../components/Aside.tsx"

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

export default define.page(function Home({ state }) {
  const { lang, i18n, recentPosts } = state
  const { t } = i18n
  const posts = recentPosts ?? []

  return (
    <>
      <Head>
        <title>
          {t("site-title", {
            fallback: "Borealium - Language Technology Resources",
          })}
        </title>
        <meta
          name="description"
          content={t("site-description", {
            fallback:
              "Language technology tools and resources for Nordic and minority languages",
          })}
        />
      </Head>

      <main class="landing">
        <div class="blocks">
          <div class="big-block">
            <MainBlock lang={lang} />
          </div>
          <div class="small-block">
            <SecondaryBlock1 lang={lang} />
          </div>
          <div class="small-block">
            <SecondaryBlock2 lang={lang} />
          </div>
        </div>
        <Aside category={t("news", { fallback: "News" })} posts={posts} t={t} />
      </main>
    </>
  )
})
