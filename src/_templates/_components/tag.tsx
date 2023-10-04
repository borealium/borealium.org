export default function Tag(props: { text: string; href: string; pagefindFilter?: string }) {
  return <a className="tag" href={props.href} data-pagefind-filter={props.pagefindFilter}>{props.text}</a>
}
