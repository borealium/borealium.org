export function MenuItem(props: { text?: string; smallText?: string }) {
  return (
    <div className="menu-item">
      {props.text && <span className="lg">{props.text}</span>}
      {props.smallText && <span className="sm">{props.smallText}</span>}
      <ChevronDown />
    </div>
  )
}

function ChevronDown() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="#01FDC1"
      width="24px"
      height="24px"
    >
      <path
        fillRule="evenodd"
        d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
        clipRule="evenodd"
      />
    </svg>
  )
}
