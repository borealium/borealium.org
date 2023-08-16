import search, { Search } from "lume/plugins/search.ts"
import { Page } from "lume/core.ts"
import { SearchForm } from "~/_templates/_components/search-form.tsx"

export const layout = "layouts/base.tsx"

export default function SearchLayout(page: Page & { search: Search }) {
  return (
    <div className="search-layout">
      <div className="content">
        <div>
          <h2>Search</h2>
          <p>
            eia ioeaj ieojfaio jefaio ejfaoie jfaeiof jaoifj aoiejf aoij falmkw do,a;w;dlm alwkmd almw dklamw dknawknd
          </p>
          {
            /* <div className="search-input-wrapper">
            <SearchForm />
          </div> */
          }
        </div>
        <div>
          <h3>Results:</h3>
          <ul className="results">
            {page.search.pages().map((x) => (
              <li>
                <a href={x?.data.url}>{x?.data.url}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
