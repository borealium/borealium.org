export function Square(props: {
  title: string
  description: string
  href: string
  img?: {
    src: string
    alt: string
  }
}) {
  return (
    <a className="square" href={props.href}>
      {props.img && <img src={props.img.src} alt={props.img.alt} />}
      <span>{props.title}</span>
      <p>{props.description}</p>
    </a>
  )
}
