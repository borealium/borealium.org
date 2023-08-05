export function Square(props: { title: string; description: string }) {
  return (
    <div className="square">
      <img src="" alt=" " />
      <span>{props.title}</span>
      <p>{props.description}</p>
    </div>
  )
}
