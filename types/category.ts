export type CategoryId = string
export type LangTag = string

export type CategoriesData = Record<CategoryId, Record<LangTag, CategoryData>>
export type CategoryData = {
  name: string
  description: string
}
