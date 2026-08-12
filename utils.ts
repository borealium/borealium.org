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
import type { DeviceVariant, LayoutCombo, Platform } from "@divvun/keyboard"

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
  /** Server-built layout x platform combo tree for the keyboard-layout
   * embed island, or an error message if the kbdgen repo lookup failed */
  keyboardData?:
    | {
      combos: LayoutCombo[]
      defaultFile: string
      defaultPlatform: Platform
      defaultVariant: DeviceVariant
    }
    | { error: string }
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
