import { autonym, getWebsiteLanguages } from "~lib/i18n.ts"
import languagesData from "../data/languages.ts"
import type { LangTag } from "~types/language.ts"
import SearchForm from "../islands/SearchForm.tsx"

interface NavbarProps {
  lang: LangTag
  url: string
  t: (key: string, opts?: { fallback?: string }) => string
  searchQuery?: string
}

function TranslateIcon() {
  return (
    <svg
      width="34"
      height="19"
      viewBox="0 0 34 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M17.5059 5.38781H10.7306V1.68405C10.7306 1.16844 10.293 0.75 9.75302 0.75C9.21299 0.75 8.77543 1.16844 8.77543 1.68405V5.38781H1.97758C1.43794 5.38781 1 5.80625 1 6.32186C1 6.83784 1.43794 7.2559 1.97758 7.2559H12.2444C11.25 9.17197 8.54093 13.0787 1.94966 16.3287C1.546 16.5249 1.33599 16.96 1.44236 17.3807C1.54873 17.8014 1.94342 18.097 2.39618 18.0951C2.55242 18.0962 2.70593 18.0594 2.84308 17.9886C5.17304 16.8704 7.3433 15.4713 9.3004 13.8254L14.7186 18.0367C14.8904 18.1748 15.1082 18.2507 15.333 18.25C15.748 18.2519 16.1189 18.0035 16.2584 17.6302C16.3979 17.2568 16.2755 16.8398 15.9529 16.5904L10.7304 12.4968C12.2885 10.9854 13.5353 9.20774 14.4058 7.25593H17.5224C18.0624 7.25593 18.5 6.83787 18.5 6.32189C18.5 5.80628 18.0624 5.38784 17.5224 5.38784L17.5059 5.38781Z"
        fill="#01FDC1"
        stroke="#01FDC1"
      />
      <path
        d="M33.246 16.9744L26.8481 1.27152L26.7678 1.15987C26.7678 1.15987 26.7678 1.10683 26.7278 1.08531L26.6647 1.01076L26.6187 0.946959L26.5444 0.893917C26.522 0.871662 26.4973 0.852003 26.4697 0.835312L26.3894 0.792656L26.2919 0.75H25.5879L25.4904 0.792656L25.4101 0.835312L25.3358 0.888354L25.2615 0.946959L25.1984 1.01595V1.01632C25.176 1.04006 25.1548 1.06491 25.1352 1.09051L25.0893 1.1595V1.15987C25.0717 1.1888 25.0565 1.21921 25.0437 1.25037L18.5655 16.9741C18.3677 17.4615 18.633 18.0056 19.158 18.1893C19.6834 18.3729 20.2691 18.1262 20.4669 17.6388L21.9964 13.8847H29.8435L31.3501 17.6388C31.5004 17.9993 31.8731 18.2375 32.2895 18.2397C32.4109 18.2397 32.5316 18.2178 32.6447 18.1759C32.896 18.091 33.1009 17.9162 33.2136 17.6907C33.3267 17.4656 33.3383 17.2074 33.246 16.9741L33.246 16.9744ZM22.7579 12.0236L25.9079 4.22835L29.0583 12.0236H22.7579Z"
        fill="#01FDC1"
        stroke="#01FDC1"
      />
    </svg>
  )
}

function ChevronDown() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="#01FDC1"
      width="24px"
      height="24px"
    >
      <path
        fillRule="evenodd"
        d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
        clipRule="evenodd"
      />
    </svg>
  )
}

function MenuItem({ text, smallText }: { text?: string; smallText?: string }) {
  return (
    <div class="menu-item">
      {text && <span class="lg">{text}</span>}
      {smallText && <span class="sm">{smallText}</span>}
      <ChevronDown />
    </div>
  )
}

function LanguageSelect({ lang, url }: { lang: LangTag; url: string }) {
  const websiteLanguages = getWebsiteLanguages()

  // Filter out hidden languages and sort by autonym using locale collation
  const supportedLocales = Intl.Collator.supportedLocalesOf([lang, "nb"])
  const collatorLocale = supportedLocales[0] ?? "nb"
  const collator = new Intl.Collator(collatorLocale)
  const visibleLanguages = websiteLanguages
    .filter((code) => !languagesData.hidden.includes(code))
    .sort((a, b) => collator.compare(autonym(a), autonym(b)))

  // Get the path without the language prefix for building new URLs
  // Build regex dynamically to handle 2-letter, 3-letter codes, and regional variants
  const langPattern = [
    ...websiteLanguages,
    ...websiteLanguages.map((l) => `${l}-[a-z]{2}`),
  ].join("|")
  const pathWithoutLang =
    url.replace(new RegExp(`^/(${langPattern})(?=/|$)`), "") || "/"

  // For display, use base language code (strip region if present)
  const baseLang = lang.split("-")[0]

  return (
    <>
      <input class="button" type="checkbox" />
      <div class="language-select">
        <TranslateIcon />
        <MenuItem text={autonym(baseLang)} smallText={baseLang} />
      </div>
      <ul class="list">
        {visibleLanguages.map((code) => (
          <li key={code}>
            <a data-multilang href={`/${code}${pathWithoutLang}`}>
              {autonym(code)}
            </a>
          </li>
        ))}
      </ul>
    </>
  )
}

export function Navbar({ lang, url, t, searchQuery }: NavbarProps) {
  return (
    <div class="header-nav-wrapper">
      <div class="header-gradient" />
      <nav class="nav-control">
        <div class="nav">
          <a class="logo" href={`/${lang}`}>
            <img
              src="/static/images/borealium-small-logo.svg"
              alt="Borealium"
            />
          </a>
        </div>
        <SearchForm
          lang={lang}
          seeMoreText={t("see-more-results", { fallback: "See more results" })}
          initialQuery={searchQuery ?? ""}
        />
        <div class="language-wrapper">
          <LanguageSelect lang={lang} url={url} />
        </div>
      </nav>
    </div>
  )
}
