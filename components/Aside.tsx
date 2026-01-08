import { CategoryLabel } from "./CategoryLabel.tsx"

export interface SimplePost {
  date: string
  tag: string
  title: string
  url: string
  id: string
  excerpt?: string
}

interface AsideProps {
  category: string
  posts: SimplePost[]
  t: (key: string, opts?: { fallback?: string }) => string
}

function AsideBlock({
  post,
  t,
}: {
  post: SimplePost
  t: AsideProps["t"]
}) {
  return (
    <div class="aside-block">
      <div class="aside-block-text" dir="auto">
        <h3>
          <img
            style={{
              height: "16px",
              float: "left",
              marginTop: "1px",
              marginRight: "6px",
            }}
            src="/static/images/tag-page.svg"
            alt=""
          />{" "}
          {post.title}
        </h3>
        <p>{post.excerpt}</p>
      </div>
      <a href={post.url}>{t("read-more", { fallback: "Read more" })}</a>
    </div>
  )
}

export function Aside({ category, posts, t }: AsideProps) {
  return (
    <div class="aside">
      <CategoryLabel category={category} />
      {posts.map((post) => <AsideBlock key={post.id} post={post} t={t} />)}
    </div>
  )
}
