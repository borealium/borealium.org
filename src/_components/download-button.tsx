export function DownloadButton(
  props: { title: string; href: string; description?: string; img?: { src: string; alt: string }; large?: boolean },
) {
  return (
    <a className={`download-button ${props.large && "large"}`} href={props.href}>
      {props.img && <img src={props.img.src} alt={props.img.alt} />}
      <div className="button-text">
        <span>{props.title}</span>
        {props.description && <div>{props.description}</div>}
      </div>
    </a>
  )
}
