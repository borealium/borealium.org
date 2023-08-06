export function DownloadButton(
  props: { title: string; description: string; href: string; img?: { src: string; alt: string } },
) {
  return (
    <a className="download-button" href={props.href}>
      {props.img && <img src={props.img.src} alt={props.img.alt} />}
      <div className="button-text">
        <span>{props.title}</span>
        <div>{props.description}</div>
      </div>
    </a>
  )
}
