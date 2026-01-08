import { App, staticFiles } from "fresh"
import { type State } from "./utils.ts"
import { initPahkat } from "./data/pahkat.ts"

// Initialize Pahkat data on server startup
await initPahkat()

export const app = new App<State>()

app.use(staticFiles())

// Include file-system based routes here
app.fsRoutes()
