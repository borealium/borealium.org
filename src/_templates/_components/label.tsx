export function CategoryLabel(props: { context: string; category: string }) {
  return (
    <div className="category-label">
      {props.context}
      <div className="category-divider" />
      <span>{props.category}</span>
    </div>
  )
}

export function TagLabel(props: { text: string }) {
  return (
    <div className="tag-label">
      {props.text}
    </div>
  )
}
