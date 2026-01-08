import { defineConfig } from "vite"
import { fresh } from "@fresh/plugin-vite"
import { resolve } from "node:path"

export default defineConfig({
  plugins: [fresh()],
  resolve: {
    alias: {
      "~types/": resolve(import.meta.dirname!, "./types/") + "/",
      "~data/": resolve(import.meta.dirname!, "./data/") + "/",
      "~lib/": resolve(import.meta.dirname!, "./lib/") + "/",
    },
  },
})
