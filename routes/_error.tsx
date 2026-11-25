import { HttpError } from "fresh"
import { Head } from "fresh/runtime"
import { define } from "../utils.ts"

// The [[lang]] layout wraps error pages too and supplies the navbar and footer.
export default define.page(function ErrorPage({ error, state }) {
  const { lang, i18n } = state
  const { t } = i18n

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
          <a href={`/${lang}/`} class="error-home-link">
            {t("error-go-home", { fallback: "Go to homepage" })}
          </a>
        </div>
      </div>
    </>
  )
})
