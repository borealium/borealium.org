interface TagProps {
  text: string
  href: string
  variant?: "category" | "language" | "resource" | "post"
}

export function Tag({ text, href, variant = "category" }: TagProps) {
  return (
    <a class={`tag tag-${variant}`} href={href}>
      {text}
    </a>
  )
}

export function LanguageTag({ text, href }: { text: string; href: string }) {
  return (
    <a class="tag tag-language" href={href}>
      {text}
    </a>
  )
}
