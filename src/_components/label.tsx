export function CategoryLabel(props: { category: string }) {
  return (
    <div className="category-label">
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
