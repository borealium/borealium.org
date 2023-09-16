import { CategoryId, LangTag } from "~types/category.ts"

export type Resource = {
  id: string
  type: ResourceType
  category: CategoryId
  languages: LangTag[]
  tags?: string[]
  name: Record<LangTag, string>
  description: Record<LangTag, string>
  externalDocumentationUrl?: URL
  links?: Link[]
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
}

export enum ResourceType {
  External = "external",
  Pahkat = "pahkat",
}
