export function DownloadButton(
  props: {
    title: string
    href: string
    tooltip?: string
    description?: string
    img?: { src: string; alt: string }
    large?: boolean
  },
) {
  return (
    <a className={`download-button ${props.large && "large"}`} href={props.href} title={props.tooltip}>
      {props.img && <img src={props.img.src} alt={props.img.alt} />}
      <div className="button-text">
        <span>{props.title}</span>
        {props.description && <div>{props.description}</div>}
      </div>
    </a>
  )
}
