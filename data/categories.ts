import type { CategoryId } from "../types/category.ts"
import { getAllResources } from "./resourceIndex.ts"

export const categoriesList: CategoryId[] = [
  "package-management",
  "dictionaries",
  "grammar-checkers",
  "text-to-speech",
  "speech-recognition",
  "korp",
  "hyphenators",
  "mt",
  "langlearning",
  "wordinfl",
  "spellers",
  "keyboard-layouts",
  "voices",
  "speller-engines",
]

const hiddenCategories: CategoryId[] = [
  "package-management",
  "speller-engines",
]

/**
 * Returns all known categories: the static list plus any discovered from resources.
 */
export function getAllCategories(): CategoryId[] {
  const dynamic = new Set<CategoryId>(categoriesList)
  for (const r of getAllResources()) {
    if (r.category) {
      dynamic.add(r.category)
    }
  }
  return [...dynamic]
}

/**
 * Returns categories suitable for display in the UI,
 * filtering out internal categories like package-management and speller-engines.
 */
export function getUICategories(): CategoryId[] {
  return getAllCategories().filter((c) => !hiddenCategories.includes(c))
}
