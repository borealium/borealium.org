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
      <div className="aside-block-meta">
        <div>{props.date}</div>
        <TagLabel text={props.tag} />
      </div>
      <div className="aside-block-text">
        <h3>
          <a href={props.url}>{props.title}</a>
        </h3>
        <p data-excerpt-id={props.id}>
          {/* {props.description} */}
        </p>
      </div>
    </div>
  )
}
