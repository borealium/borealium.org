interface DownloadButtonProps {
  title: string
  href: string
  tooltip?: string
  description?: string
  img?: { src: string; alt: string }
  large?: boolean
}

export function DownloadButton({
  title,
  href,
  tooltip,
  description,
  img,
  large,
}: DownloadButtonProps) {
  return (
    <a
      class={`download-button ${large ? "large" : ""}`}
      href={href}
      title={tooltip}
    >
      {img && <img src={img.src} alt={img.alt} />}
      <div class="button-text">
        <span>{title}</span>
        {description && <div>{description}</div>}
      </div>
    </a>
  )
}
