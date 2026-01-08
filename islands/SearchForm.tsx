import { useEffect, useRef, useState } from "preact/hooks"

interface SearchResult {
  type: "resource" | "language" | "category"
  id: string
  title: string
  description?: string
  url: string
  score: number
}

interface SearchFormProps {
  lang: string
  seeMoreText: string
  initialQuery?: string
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
      style={{ minWidth: "24px", minHeight: "24px" }}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
      />
    </svg>
  )
}

export default function SearchForm({ lang, seeMoreText, initialQuery = "" }: SearchFormProps) {
  const [query, setQuery] = useState(initialQuery)
  const [results, setResults] = useState<SearchResult[]>([])
  const [showPopover, setShowPopover] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const debounceRef = useRef<number | null>(null)

  // Handle click on wrapper to expand and focus
  const handleWrapperClick = () => {
    const navControl = document.querySelector(".nav-control")
    if (navControl) {
      navControl.classList.add("search-visible")
    }
    inputRef.current?.focus()
  }

  // Handle focus
  const handleFocus = () => {
    setShowPopover(true)
  }

  // Handle blur with delay to allow clicking results
  const handleBlur = () => {
    setTimeout(() => {
      const navControl = document.querySelector(".nav-control")
      if (navControl) {
        navControl.classList.remove("search-visible")
      }
      setShowPopover(false)
    }, 200)
  }

  // Handle input change with debounced search
  const handleInput = (e: Event) => {
    const value = (e.target as HTMLInputElement).value
    setQuery(value)

    if (debounceRef.current) {
      clearTimeout(debounceRef.current)
    }

    if (!value || value.trim().length < 2) {
      setResults([])
      setShowPopover(false)
      return
    }

    setShowPopover(true)
    setIsLoading(true)

    debounceRef.current = setTimeout(async () => {
      try {
        const res = await fetch(
          `/api/search?q=${encodeURIComponent(value)}&lang=${lang}&limit=5`,
        )
        const data = await res.json()
        setResults(data.results || [])
      } catch (err) {
        console.error("Search error:", err)
        setResults([])
      } finally {
        setIsLoading(false)
      }
    }, 200) as unknown as number
  }

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current)
      }
    }
  }, [])

  return (
    <div ref={wrapperRef} class="search-wrapper" onClick={handleWrapperClick}>
      <form
        action={`/${lang}/search`}
        class="search"
        onClick={(e) =>
          e.stopPropagation()}
      >
        <SearchIcon />
        <input
          ref={inputRef}
          id="search"
          class="search-input"
          name="q"
          type="text"
          placeholder=""
          value={query}
          onInput={handleInput}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      </form>
      <div
        class={`search-popover ${
          showPopover && (results.length > 0 || isLoading) ? "" : "hidden"
        }`}
        hidden={!showPopover || (results.length === 0 && !isLoading)}
      >
        <ul class="search-results">
          {isLoading && results.length === 0 && (
            <li class="search-result loading">Searching...</li>
          )}
          {results.map((result) => {
            const iconMap: Record<string, string> = {
              resource: "tag-resource",
              category: "tag-category",
              language: "tag-language",
            }
            const icon = iconMap[result.type] ?? "tag-page"
            return (
              <li key={`${result.type}-${result.id}`} class="search-result">
                <a href={result.url}>
                  <img src={`/static/images/${icon}.svg`} alt="" />
                  <span>{result.title}</span>
                </a>
              </li>
            )
          })}
        </ul>
        {results.length > 0 && (
          <div class="search-see-more">
            <a
              class="search-see-more-button"
              href={`/${lang}/search?q=${encodeURIComponent(query)}`}
            >
              {seeMoreText}
            </a>
          </div>
        )}
      </div>
    </div>
  )
}
