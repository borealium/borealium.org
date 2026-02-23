import { App, staticFiles } from "fresh"
import { type State } from "./utils.ts"
import { initPahkat } from "./data/pahkat.ts"

// Initialize Pahkat data on server startup
await initPahkat()

export const app = new App<State>()

app.use(staticFiles())
app.fsRoutes()

// Fresh's trailingSlashes("always") plugin doesn't work with fsRoutes() because
// URLPattern-based route matching doesn't handle trailing slashes (e.g. {/:lang}?
// matches /en but not /en/). Instead, wrap the handler to enforce trailing slashes
// at the request level: redirect to add them, then strip before Fresh routes.
const _originalHandler = app.handler
app.handler = function (this: typeof app) {
  const inner = _originalHandler.call(this)
  return async (req: Request, info?: Deno.ServeHandlerInfo) => {
    const url = new URL(req.url)

    const lastSegment = url.pathname.split("/").pop() ?? ""
    const isFile = lastSegment.includes(".")
    const isApi = url.pathname.startsWith("/api/")

    if (!isFile && !isApi && url.pathname !== "/") {
      if (!url.pathname.endsWith("/")) {
        return new Response(null, {
          status: 301,
          headers: { Location: url.pathname + "/" + url.search },
        })
      }
      // Strip trailing slash for Fresh's route matching
      const stripped = new URL(req.url)
      stripped.pathname = url.pathname.slice(0, -1)
      return inner(new Request(stripped, req), info)
    }

    return inner(req, info)
  }
}
