export function ResourceSummary(
  props: { name: string; description: string; href: string; img?: { src: string; alt: string } },
) {
  return (
    <a className="resource-summary" href={props.href}>
      <div className="text-group">
        <span>{props.name}</span>
        <p>{props.description}</p>
      </div>
      {props.img && <img src={props.img.src} alt={props.img.alt} />}
    </a>
  )
}
