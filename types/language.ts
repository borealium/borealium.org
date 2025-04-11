export type LanguageId = string
export type RegionId = string
export type LangTag = string
export type Coordinate = number

export type LanguagesData = {
  regions: Record<RegionId, Record<LangTag, string>>
  languages: Record<LanguageId, LanguageData>
  fallbacks: Record<LangTag, LangTag[]>
  uiOnly: LangTag[]
  websiteLanguages: LangTag[]
  hidden: LangTag[]
}

export type LanguageData = {
  autonym: string
  regions?: RegionId[]
  coordinates?: Coordinate[]
  labelPosition?: string
}
