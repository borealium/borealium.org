import type { LangTag } from "./language.ts"

export type L10nPath = {
  reference: string
  l10n: string
  locales: LangTag[]
}
