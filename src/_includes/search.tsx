import LanguageTag from "~/_components/tag.tsx"
import Aside, { SimplePost } from "~/_components/aside.tsx"
import { script } from "~/_includes/lang-redir.tsx"
import { Data, PageData } from "lume/core.ts"

export const layout = "base.tsx"

export default function SearchPage(page: PageData) {
  const { lang, search } = page
  const posts = search.pages(["type=post", `lang=${lang}`], "date=desc")

  return (
    <div className="search-page" data-pagefind-ignore>
      <div className="content">
        <div className="title">
          <h1>
            Search: <q className="search-query">...</q>
          </h1>
          <div>
            <span className="result-count">...</span> results.
          </div>
        </div>
        <ul className="search-page-results">
          <noscript>You must enable JavaScript for search to function.</noscript>
          <div>
            Loading...
          </div>
        </ul>
      </div>
      <Aside
        context="explore"
        category="related"
        posts={posts.map((post) => {
          const { id, title, category, date, lang, originalUrl, author } = post as Data<PageData>

          return {
            id: id,
            date: date?.toISOString(),
            tag: category,
            title: title,
            url: originalUrl,
          } as SimplePost
        })}
      />
      {/* <pre id="search-results"></pre> */}
    </div>
  )
}

// type SearchResult = {
//   category: string
//   title: string
//   tags: string[]
//   description: string
// }

// function Result(props: SearchResult) {
//   return (
//     <div className="result">
//       <div className="result-title">
//         <div className="left">
//           <Tag text={props.category} href="/" />
//           <h2>
//             <a href="/">{props.title}</a>
//           </h2>
//         </div>
//         <div className="right">
//           {props.tags.map((tag) => <Tag text={tag} href="/" />)}
//         </div>
//       </div>
//       <p>
//         {props.description}
//       </p>
//     </div>
//   )
// }
