export function DownloadButton(props: { title: string; description: string }) {
  return (
    <div className="download-button">
      <img src="" alt=" " />
      <div className="button-text">
        <span>{props.title}</span>
        <div>{props.description}</div>
      </div>
    </div>
  )
}
