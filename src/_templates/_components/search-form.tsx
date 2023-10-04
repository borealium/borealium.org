import Tag from "~/_templates/_components/tag.tsx"

export function SearchForm() {
  return (
    <form action="/search/" className="search">
      <SearchIcon />
      <input id="search" placeholder="Search..." name="q" type="text" />
      {
        /* <div className="results">
        <a className="result" href="/">
          <Tag text="Category" href="/" />
          <p>Keyboard layouts</p>
        </a>
        <a className="see-more" href="/">See more results...</a>
      </div> */
      }
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
      stroke="var(--color-text-secondary)"
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
