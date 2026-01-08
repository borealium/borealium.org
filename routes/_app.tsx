import { define } from "../utils.ts"
import languagesData from "../data/languages.ts"

// Build list of all language variants for hreflang (including regional variants)
const ALL_LANGUAGE_VARIANTS: string[] = []
for (const lang of languagesData.websiteLanguages) {
  const langData = languagesData.languages[lang]
  if (langData?.regions && langData.regions.length > 0) {
    // Add regional variants instead of base language
    for (const region of langData.regions) {
      ALL_LANGUAGE_VARIANTS.push(`${lang}-${region.toLowerCase()}`)
    }
  } else {
    ALL_LANGUAGE_VARIANTS.push(lang)
  }
}

export default define.page(function App({ Component, state, url }) {
  const lang = state?.lang ?? "en"
  const dir = lang === "yi" ? "rtl" : "ltr"

  // Page-specific meta (can be set by individual pages via state.meta)
  const meta = state?.meta ?? {}
  const title = meta.title ?? "Borealium - Language Technology Resources"
  const description = meta.description ??
    "Language technology tools and resources for Nordic and minority languages"
  const image = meta.image ??
    "https://borealium.org/static/images/borealium-og.png"

  // Build canonical URL
  const baseUrl = "https://borealium.org"
  const canonicalUrl = `${baseUrl}${url.pathname}`

  // Build path without language prefix for hreflang alternates
  // Include both base languages and regional variants in the pattern
  const allCodes = [...ALL_LANGUAGE_VARIANTS, ...languagesData.websiteLanguages]
  const langPattern = allCodes.join("|")
  const pathWithoutLang =
    url.pathname.replace(new RegExp(`^/(${langPattern})(?=/|$)`), "") || "/"

  return (
    <html lang={lang} dir={dir}>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />

        {/* SEO Meta */}
        <meta name="description" content={description} />
        <link rel="canonical" href={canonicalUrl} />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Borealium" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={image} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:locale" content={lang} />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={image} />

        {/* Language Alternates */}
        {ALL_LANGUAGE_VARIANTS.map((l) => (
          <link
            key={l}
            rel="alternate"
            hreflang={l}
            href={`${baseUrl}/${l}${pathWithoutLang}`}
          />
        ))}
        <link
          rel="alternate"
          hreflang="x-default"
          href={`${baseUrl}${pathWithoutLang}`}
        />

        {/* Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Noto+Sans:wght@300;400;500;600;700&family=Noto+Sans+Hebrew:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        {/* Iosevka for code */}
        <link
          href="https://cdn.jsdelivr.net/npm/iosevka-webfont@14.0.0/iosevka.css"
          rel="stylesheet"
        />
        {/* Plausible Analytics */}
        <script
          defer
          data-domain="borealium.org"
          src="https://plausible.io/js/script.js"
        >
        </script>
      </head>
      <body>
        <Component />
      </body>
    </html>
  )
})
