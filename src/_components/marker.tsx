export const Marker = ({
  prefix = "Borealium",
  label,
}: {
  prefix?: string
  label: string
}) => {
  return (
    <span className="marker">
      <span className="prefix">{prefix}</span>
      <span className="separator">|</span>
      <span className="label">{label}</span>
    </span>
  )
}
