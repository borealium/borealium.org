import { CategoryId, LangTag } from "~types/category.ts"

export type Resource = {
  id: string
  type: ResourceType
  category: CategoryId
  languages: LangTag[]
  tags?: string[]
  name: Record<LangTag, string>
  description: Record<LangTag, string>
  moreInfo?: Record<LangTag, string>
  release?: ResourceRelease
  documentationUrl?: string
  links?: Link[]
}

export type ResourceRelease = {
  version: string
  platforms: string[]
  authors: string[]
  license?: string
  licenseUrl?: URL
}

export type Link = {
  type?: LinkType
  text: Record<LangTag, string>
  url: URL
}

export enum LinkType {
  Normal = "normal",
  AppleAppStore = "apple-app-store",
  GooglePlayStore = "google-play-store",
  MacOS = "macos",
  Windows = "windows",
}

export enum ResourceType {
  External = "external",
  Pahkat = "pahkat",
}
