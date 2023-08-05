import { CategoryLabel, TagLabel } from "~/_templates/_components/label.tsx"

export function Aside() {
  return (
    <section className="aside">
      <CategoryLabel context="updates" category="news" />
      <AsideBlock
        date="2020-12-21"
        tag="something"
        title="Lorem ipsum dolor sit amet"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit sed diam non pro id el element
          euismod tempor"
      />
      <AsideBlock
        date="2020-12-21"
        tag="something"
        title="Lorem ipsum dolor sit amet"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit sed diam non pro id el element
          euismod tempor"
      />
      <AsideBlock
        date="2020-12-21"
        tag="something"
        title="Lorem ipsum dolor sit amet"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit sed diam non pro id el element
          euismod tempor"
      />
      <AsideBlock
        date="2020-12-21"
        tag="something"
        title="Lorem ipsum dolor sit amet"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit sed diam non pro id el element
          euismod tempor"
      />
    </section>
  )
}

function AsideBlock(props: { date: string; tag: string; title: string; description: string }) {
  return (
    <div className="aside-block">
      <div className="aside-block-meta">
        <div>{props.date}</div>
        <TagLabel text={props.tag} />
      </div>
      <div className="aside-block-text">
        <h3>{props.title}</h3>
        <p>
          {props.description}
        </p>
      </div>
    </div>
  )
}
