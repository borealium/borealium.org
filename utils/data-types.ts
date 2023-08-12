import React from "react"
import type { PageData } from "lume/core.ts"
import { Search } from "lume/plugins/search.ts"
import { Nav } from "lume/plugins/nav.ts"
import { FluentBundle } from "npm:@fluent/bundle"

export type Languages = {
  default: string
  languages: Record<string, {
    name: string
    autonym: string
  }>
  fallbacks: Record<string, string[]>
}

// ad-hoc graphql query, TODO: generate this from the schema
export type ToolsRepo = {
  url: string
  name: Record<string, string>
  description: Record<string, string>
  packages: Array<{
    id: string
    name: Record<string, string>
    description: Record<string, string>
    tags: string[]
    release: Array<{
      version: string
      channel: null | "nightly" | "beta" | string
      target: Array<{
        platform: string
        arch: null | string
        dependencies: Record<string, string>
        payload: {
          __typename: "MacOSPackage" | "WindowsExecutable" | "TarballPackage"
          url: string
        }
      }>
    }>
  }>
}

export type Data = {
  categories: Categories
  languages: Languages
  tools: {
    repo: ToolsRepo
  }
}

type Plugins = {
  search: Search
  alternates: PageData[] | undefined
  nav: Nav
  fluentBundles: {
    en: FluentBundle
    sv: FluentBundle
  }
}

export type Page =
  & PageData
  & Data
  & Plugins
