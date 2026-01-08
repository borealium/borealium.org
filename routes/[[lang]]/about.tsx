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

export default define.page(function AboutPage({ state }) {
  const { lang, i18n, recentPosts } = state
  const { t, tmd } = i18n

  const title = t("title", { fallback: "About Borealium" })
  const posts = recentPosts ?? []

  return (
    <>
      <Head>
        <title>{title} | Borealium</title>
        <meta
          name="description"
          content="About the Borealium language technology portal"
        />
      </Head>

      <article class="post">
        <div class="content">
          <section>
            <h1>{title}</h1>

            <div
              dangerouslySetInnerHTML={{
                __html: tmd("para1", {
                  fallback:
                    "The Borealium web site is a central place to access language technology tools for the smaller languages of the Nordic countries.",
                }),
              }}
            />

            <div
              dangerouslySetInnerHTML={{
                __html: tmd("para2", {
                  fallback:
                    `The development of the site was financed by [Nordisk ministerråd](https://www.norden.org/en/nordic-council-ministers). The initiative to making the site was taken by [ASTIN](https://www.isof.se/vart-uppdrag/samarbeten/arbetsgruppen-for-sprakteknologi-i-norden-astin). Maintenance and administration is handled by [Divvun](https://divvun.no/en/index.html) and [Giellatekno](https://giellatekno.uit.no/index.eng.html) at [UiT The Arctic University of Norway](https://en.uit.no).`,
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
