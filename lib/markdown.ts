import { Marked } from "marked"
import { markedHighlight } from "marked-highlight"
import hljs from "highlight.js"

// Configure marked with syntax highlighting
const marked = new Marked(
  markedHighlight({
    emptyLangClass: "hljs",
    langPrefix: "hljs language-",
    highlight(code, lang) {
      const language = hljs.getLanguage(lang) ? lang : "plaintext"
      return hljs.highlight(code, { language }).value
    },
  }),
)

/**
 * Frontmatter metadata for documentation pages
 */
export interface DocFrontmatter {
  id: string
  title?: string
  author?: string
  date?: string
  type: "doc"
  category?: string
}

/**
 * Frontmatter metadata for blog posts
 */
export interface PostFrontmatter {
  title: string
  author?: string
  date: string
  type: "post"
  category?: string
}

export type Frontmatter = DocFrontmatter | PostFrontmatter

/**
 * Table of contents entry
 */
export interface TocEntry {
  id: string
  text: string
  children: TocEntry[]
}

/**
 * Parsed content with frontmatter and HTML
 */
export interface ParsedContent<T extends Frontmatter = Frontmatter> {
  frontmatter: T
  content: string
  html: string
  toc: TocEntry[]
}

/**
 * Parse YAML frontmatter from markdown content
 */
function parseFrontmatter(
  content: string,
): { frontmatter: Record<string, unknown>; body: string } {
  const frontmatterRegex = /^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/
  const match = content.match(frontmatterRegex)

  if (!match) {
    return { frontmatter: {}, body: content }
  }

  const [, yamlContent, body] = match
  const frontmatter: Record<string, unknown> = {}

  // Simple YAML parser for frontmatter
  for (const line of yamlContent.split("\n")) {
    const colonIndex = line.indexOf(":")
    if (colonIndex === -1) { continue }

    const key = line.slice(0, colonIndex).trim()
    let value: string | undefined = line.slice(colonIndex + 1).trim()

    // Remove quotes if present
    if (
      (value.startsWith("'") && value.endsWith("'")) ||
      (value.startsWith('"') && value.endsWith('"'))
    ) {
      value = value.slice(1, -1)
    }

    if (key && value) {
      frontmatter[key] = value
    }
  }

  return { frontmatter, body }
}

/**
 * Process MDX-style JSX embeds in markdown
 * Converts {<Component>...</Component>} to regular HTML
 */
function processMdxEmbeds(content: string): string {
  // Convert {<figure>...</figure>} to <figure>...</figure>
  return content.replace(/\{(<(?:figure|img|video|audio)[^}]*>)\}/g, "$1")
}

/**
 * Create a URL-safe slug from text
 */
function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Remove diacritics
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 30)
}

/**
 * Extract headings from HTML and generate TOC structure
 * Also adds IDs to headings that don't have them
 */
function extractToc(html: string): { html: string; toc: TocEntry[] } {
  const headingRegex = /<h([1-6])([^>]*)>([\s\S]*?)<\/h\1>/gi

  interface TocNode {
    id: string
    text: string
    level: number
    children: TocNode[]
    parent: TocNode | null
  }

  const root: TocNode = {
    id: "",
    text: "",
    level: 0,
    children: [],
    parent: null,
  }
  let current = root

  // Process HTML and extract headings
  const modifiedHtml = html.replace(
    headingRegex,
    (match, level, attrs, content) => {
      const levelNum = parseInt(level, 10)
      const textContent = content.replace(/<[^>]*>/g, "").trim() // Strip HTML tags for text

      if (!textContent) { return match }

      // Check if heading already has an ID
      const idMatch = attrs.match(/id=["']([^"']+)["']/)
      let id = idMatch ? idMatch[1] : slugify(textContent)

      // Navigate to correct parent level
      while (current.level >= levelNum && current.parent) {
        current = current.parent
      }

      const node: TocNode = {
        id,
        text: textContent,
        level: levelNum,
        children: [],
        parent: current,
      }
      current.children.push(node)
      current = node

      // Return heading with ID if it didn't have one
      if (!idMatch) {
        return `<h${level} id="${id}"${attrs}>${content}</h${level}>`
      }
      return match
    },
  )

  // Convert TocNode tree to TocEntry tree (without parent references)
  function toTocEntry(node: TocNode): TocEntry {
    return {
      id: node.id,
      text: node.text,
      children: node.children.map(toTocEntry),
    }
  }

  return {
    html: modifiedHtml,
    toc: root.children.map(toTocEntry),
  }
}

/**
 * Parse markdown/MDX content with frontmatter
 */
export function parseMarkdown<T extends Frontmatter>(
  content: string,
): ParsedContent<T> {
  const { frontmatter, body } = parseFrontmatter(content)

  // Process MDX embeds
  const processedBody = processMdxEmbeds(body)

  // Render markdown to HTML
  const rawHtml = marked.parse(processedBody) as string

  // Extract TOC and add heading IDs
  const { html, toc } = extractToc(rawHtml)

  return {
    frontmatter: frontmatter as T,
    content: processedBody,
    html,
    toc,
  }
}

/**
 * Load and parse a markdown file
 */
export async function loadMarkdownFile<T extends Frontmatter>(
  path: string,
): Promise<ParsedContent<T> | null> {
  try {
    const content = await Deno.readTextFile(path)
    return parseMarkdown<T>(content)
  } catch {
    return null
  }
}

/**
 * Get all documentation slugs
 */
export async function getDocSlugs(): Promise<string[]> {
  const slugs: string[] = []
  const docDir = `${Deno.cwd()}/content/doc`

  try {
    for await (const entry of Deno.readDir(docDir)) {
      if (entry.isDirectory) {
        slugs.push(entry.name)
        // Check for nested files
        const subDir = `${docDir}/${entry.name}`
        for await (const subEntry of Deno.readDir(subDir)) {
          if (
            subEntry.isFile && subEntry.name.endsWith(".mdx") &&
            subEntry.name !== "index.mdx"
          ) {
            const subSlug = subEntry.name.replace(".mdx", "")
            slugs.push(`${entry.name}/${subSlug}`)
          }
        }
      }
    }
  } catch {
    // Directory doesn't exist yet
  }

  return slugs
}

/**
 * Get all blog post slugs with metadata
 */
export async function getPostSlugs(): Promise<
  Array<{ slug: string; date: string; lang?: string }>
> {
  const posts: Array<{ slug: string; date: string; lang?: string }> = []
  const postDir = `${Deno.cwd()}/content/post`

  try {
    for await (const entry of Deno.readDir(postDir)) {
      if (entry.isDirectory) {
        // Extract date from directory name (e.g., "2024-10-31_post-title")
        const dateMatch = entry.name.match(/^(\d{4}-\d{2}-\d{2})_(.+)$/)
        if (dateMatch) {
          const [, date, slugPart] = dateMatch
          posts.push({ slug: slugPart, date })
        } else {
          posts.push({ slug: entry.name, date: "" })
        }
      }
    }
  } catch {
    // Directory doesn't exist yet
  }

  // Sort by date descending
  posts.sort((a, b) => b.date.localeCompare(a.date))

  return posts
}

/**
 * Load a documentation page by slug
 */
export async function loadDoc(
  slug: string,
): Promise<ParsedContent<DocFrontmatter> | null> {
  const docDir = `${Deno.cwd()}/content/doc`

  // Try index.mdx first
  let path = `${docDir}/${slug}/index.mdx`
  let content = await loadMarkdownFile<DocFrontmatter>(path)
  if (content) { return content }

  // Try direct file
  path = `${docDir}/${slug}.mdx`
  content = await loadMarkdownFile<DocFrontmatter>(path)
  if (content) { return content }

  // Try nested path
  const parts = slug.split("/")
  if (parts.length >= 2) {
    path = `${docDir}/${parts[0]}/${parts.slice(1).join("/")}.mdx`
    content = await loadMarkdownFile<DocFrontmatter>(path)
    if (content) { return content }
  }

  return null
}

/**
 * Load a blog post by slug
 */
export async function loadPost(
  slug: string,
): Promise<ParsedContent<PostFrontmatter> | null> {
  const postDir = `${Deno.cwd()}/content/post`

  // Find the directory with matching slug
  try {
    for await (const entry of Deno.readDir(postDir)) {
      if (entry.isDirectory) {
        const dateMatch = entry.name.match(/^(\d{4}-\d{2}-\d{2})_(.+)$/)
        if (dateMatch && dateMatch[2] === slug) {
          const path = `${postDir}/${entry.name}/index.mdx`
          return await loadMarkdownFile<PostFrontmatter>(path)
        }
      }
    }
  } catch {
    // Directory doesn't exist
  }

  return null
}

/**
 * Get recent posts for sidebar
 */
export async function getRecentPosts(
  limit: number = 3,
): Promise<Array<ParsedContent<PostFrontmatter> & { slug: string }>> {
  const postSlugs = await getPostSlugs()
  const posts: Array<ParsedContent<PostFrontmatter> & { slug: string }> = []

  for (const { slug } of postSlugs.slice(0, limit)) {
    const post = await loadPost(slug)
    if (post) {
      posts.push({ ...post, slug })
    }
  }

  return posts
}
