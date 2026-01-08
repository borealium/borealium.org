interface CategoryLabelProps {
  category: string
}

export function CategoryLabel({ category }: CategoryLabelProps) {
  return (
    <div class="category-label">
      <span>{category}</span>
    </div>
  )
}

export function TagLabel({ text }: { text: string }) {
  return <div class="tag-label">{text}</div>
}
