export default function LanguageTag(props: { text: string; href: string; pagefindFilter?: string }) {
  return <a className="tag tag-language" href={props.href} data-pagefind-filter={props.pagefindFilter}>{props.text}</a>
}
