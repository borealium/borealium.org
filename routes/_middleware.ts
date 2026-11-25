import { define } from "../utils.ts"
import { initFluent, isFluentInitialized } from "../lib/fluent.ts"
import {
  createTranslationContext,
  isValidLanguage,
  parseAcceptLanguage,
} from "../lib/i18n.ts"

export const handler = define.middleware(async (ctx) => {
  const url = new URL(ctx.req.url)

  // Initialize Fluent on first request
  if (!isFluentInitialized()) {
    await initFluent()
  }

  // Redirect root to detected language
  if (url.pathname === "/") {
    const detectedLang = parseAcceptLanguage(
      ctx.req.headers.get("Accept-Language"),
    )
    return new Response(null, {
      status: 302,
      headers: { Location: `/${detectedLang}/` },
    })
  }

  // The [[lang]] optional segment: "" when the URL has no language
  const langParam = ctx.params.lang
  const urlHasLang = !!langParam && isValidLanguage(langParam)
  const lang = urlHasLang
    ? langParam
    : parseAcceptLanguage(ctx.req.headers.get("Accept-Language"))

  // Fresh matches a path with no language whose first segment is not a route
  // under [[lang]], like /about/ or /asdasd/, to the index page with that
  // segment as lang, rendering the homepage. Moved under a language, a real
  // page renders and anything else is a 404.
  if (langParam && !urlHasLang) {
    const isFile = url.pathname.split("/").pop()!.includes(".")
    return new Response(null, {
      status: 302,
      headers: {
        Location: `/${lang}${url.pathname}${isFile ? "" : "/"}${url.search}`,
      },
    })
  }

  ctx.state.lang = lang
  ctx.state.i18n = createTranslationContext(lang)

  return ctx.next()
})
