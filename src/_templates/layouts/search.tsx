import Tag from "~/_templates/_components/tag.tsx"
import Aside, { SimplePost } from "~/_templates/_components/aside.tsx"

export const layout = "layouts/base.tsx"

export default function SearchPage() {
  const results: SearchResult[] = [
    {
      category: "Something",
      title: "Lorem Ipsum",
      tags: [
        "tag-1",
        "tag-2",
      ],
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
      category: "Else",
      title: "Ipsum Lorem",
      tags: [
        "lang",
        "uage",
      ],
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
      category: "Something",
      title: "Lorem Ipsum",
      tags: [
        "tag-1",
        "tag-2",
      ],
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
      category: "Else",
      title: "Ipsum Lorem",
      tags: [
        "lang",
        "uage",
      ],
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
      category: "Else",
      title: "Ipsum Lorem",
      tags: [
        "lang",
        "uage",
      ],
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
  ]

  // const posts = [] // TODO: this

  return (
    <div className="search-page">
      <div className="content">
        <div className="title">
          <h1>
            Results for <span>"{"keyboard sami"}"</span>
          </h1>
          <p>We found {results.length} results...</p>
        </div>
        <div className="results">
          {results.map((result) => (
            <Result
              category={result.category}
              title={result.title}
              tags={result.tags}
              description={result.description}
            />
          ))}
        </div>
      </div>
      <Aside
        context="explore"
        category="related"
        posts={[]}
      />
      {/* <pre id="search-results" style={{ "font-size": "4px" }}></pre> */}
    </div>
  )
}

type SearchResult = {
  category: string
  title: string
  tags: string[]
  description: string
}

function Result(props: SearchResult) {
  return (
    <div className="result">
      <div className="result-title">
        <div className="left">
          <Tag text={props.category} href="/" />
          <h2>{props.title}</h2>
        </div>
        <div className="right">
          {props.tags.map((tag) => <Tag text={tag} href="/" />)}
        </div>
      </div>
      <p>
        {props.description}
      </p>
    </div>
  )
}
