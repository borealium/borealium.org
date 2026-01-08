import { createDefine } from "fresh"
import type { LangTag } from "./types/language.ts"
import type { TranslationContext } from "./lib/i18n.ts"
import type { Resource } from "./types/resource.ts"
import type {
  DocFrontmatter,
  ParsedContent,
  PostFrontmatter,
} from "./lib/markdown.ts"
import type { SimplePost } from "./components/Aside.tsx"

// This specifies the type of "ctx.state" which is used to share
// data among middlewares, layouts and routes.
export interface State {
  /** Current language tag */
  lang: LangTag
  /** Translation context with t() and tmd() functions */
  i18n: TranslationContext
  /** Resource data for resource pages */
  resource?: Resource
  /** Documentation page content */
  doc?: ParsedContent<DocFrontmatter>
  /** Blog post content */
  post?: ParsedContent<PostFrontmatter>
  /** Recent posts for sidebar */
  recentPosts?: SimplePost[]
  /** Search results for search page */
  searchResults?: unknown[]
  /** Search query for search page */
  searchQuery?: string
  /** Page meta tags */
  meta?: {
    title?: string
    description?: string
    image?: string
  }
}

export const define = createDefine<State>()
