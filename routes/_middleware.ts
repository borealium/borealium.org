import { define } from "../utils.ts"
import { initFluent, isFluentInitialized } from "../lib/fluent.ts"
import {
  createTranslationContext,
  getDefaultLanguage,
  isValidLanguage,
  parseAcceptLanguage,
} from "../lib/i18n.ts"

export const handler = define.middleware(async (ctx) => {
  const url = new URL(ctx.req.url)

  // Strip trailing slashes (except for root)
  if (url.pathname !== "/" && url.pathname.endsWith("/")) {
    const newUrl = url.pathname.slice(0, -1) + url.search
    return new Response(null, {
      status: 301,
      headers: { Location: newUrl },
    })
  }

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
      headers: { Location: `/${detectedLang}` },
    })
  }

  // Get the lang parameter from the URL (from [[lang]] optional segment)
  const langParam = ctx.params.lang

  let lang: string

  if (langParam && isValidLanguage(langParam)) {
    // Valid language in URL
    lang = langParam
  } else if (langParam) {
    // Invalid language parameter - this might be a different route segment
    // Let Fresh handle it normally
    lang = parseAcceptLanguage(ctx.req.headers.get("Accept-Language"))
  } else {
    // No language in URL - detect from Accept-Language header
    lang = parseAcceptLanguage(ctx.req.headers.get("Accept-Language"))
  }

  // Create translation context
  const i18n = createTranslationContext(lang)

  // Set state for downstream handlers
  ctx.state.lang = lang
  ctx.state.i18n = i18n

  return ctx.next()
})
