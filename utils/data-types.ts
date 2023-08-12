// import React from "react"
// import type { PageData } from "lume/core.ts"
// import { Search } from "lume/plugins/search.ts"
// import { Nav } from "lume/plugins/nav.ts"
// import { FluentBundle } from "npm:@fluent/bundle"

// export type Languages = {
//   default: string
//   languages: Record<string, {
//     name: string
//     autonym: string
//   }>
//   fallbacks: Record<string, string[]>
// }

// // ad-hoc graphql query, TODO: generate this from the schema

// export type Data = {
//   categories: Categories
//   languages: Languages
//   tools: {
//     repo: ToolsRepo
//   }
// }

// type Plugins = {
//   search: Search
//   alternates: PageData[] | undefined
//   nav: Nav
//   fluentBundles: {
//     en: FluentBundle
//     sv: FluentBundle
//   }
// }

// export type Page =
//   & PageData
//   & Data
//   & Plugins
