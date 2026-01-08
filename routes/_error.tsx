import { HttpError } from "fresh"
import { Head } from "fresh/runtime"
import { define } from "../utils.ts"
import { Navbar } from "../components/Navbar.tsx"
import { Footer } from "../components/Footer.tsx"

export default define.page(function ErrorPage({ error, url, state }) {
  const { lang, i18n } = state
  const { t } = i18n
  const searchQuery = url.searchParams.get("q") ?? ""

  let status = 500
  let message = "Something went wrong"

  if (error instanceof HttpError) {
    status = error.status
    if (status === 404) {
      message = t("error-404-message", { fallback: "Page not found" })
    } else if (status === 500) {
      message = t("error-500-message", { fallback: "Internal server error" })
    } else {
      message = error.message
    }
  }

  const title = status === 404
    ? t("error-404-title", { fallback: "404 - Not Found" })
    : t("error-title", { fallback: `Error ${status}` })

  return (
    <>
      <Head>
        <title>{title} | Borealium</title>
      </Head>
      <div class="wrapper">
        <Navbar lang={lang} url={url.pathname} t={t} searchQuery={searchQuery} />
        <div class="navbar-offset-wrapper">
          <div class="error-page">
            <div class="error-content">
              <h1 class="error-code">{status}</h1>
              <p class="error-message">{message}</p>
              {status === 404 && (
                <p class="error-suggestion">
                  {t("error-404-suggestion", {
                    fallback:
                      "The page you're looking for doesn't exist or has been moved.",
                  })}
                </p>
              )}
              <a href={`/${lang}`} class="error-home-link">
                {t("error-go-home", { fallback: "Go to homepage" })}
              </a>
            </div>
          </div>
        </div>
        <Footer lang={lang} t={t} />
      </div>
    </>
  )
})
