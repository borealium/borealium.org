import { CategoryLabel, TagLabel } from "~/_templates/_components/label.tsx"

export type SimplePost = {
  date: string
  tag: string
  title: string
  // description: string
  url: string
  id: string
}

export default function Aside(props: { context: string; category: string; posts: SimplePost[] }) {
  return (
    <div className="aside">
      <CategoryLabel context={props.context} category={props.category} />
      {props.posts.map((post) => <AsideBlock {...post} />)}
    </div>
  )
}

function AsideBlock(props: SimplePost) {
  return (
    <div className="aside-block">
      <div className="aside-block-text">
        <h3>
          {props.title}
        </h3>
        <p data-excerpt-id={props.id}>
          {/* {props.description} */}
        </p>
      </div>
      <a href={props.url}>Read more</a>
    </div>
  )
}
