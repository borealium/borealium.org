const results = [
  "Home",
  "Proofing",
  "Keyboards",
  "Dictionaries",
  "Documentation",
  "News",
]

export function SearchForm() {
  return (
    <form action="/en/search/" method="GET" className="search-form">
      <label className="search">
        <SearchIcon />
        <input name="q" id="search-input" type="text" placeholder="Search..."></input>
        {
          /* <div id="search-results" className="results">
          {results.filter((x) => x.includes("")).map((result) => <a href="/">{result}</a>)}
        </div> */
        }
      </label>
    </form>
  )
}

function SearchIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="var(--color-brand)"
      width="24px"
      height="24px"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
      />
    </svg>
  )
}
