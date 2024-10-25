import dedent from "https://esm.sh/v135/dedent@1.5.1/denonext/dedent.mjs"
import { marked } from "https://esm.sh/v135/marked@10.0.0/denonext/marked.mjs"
import { React } from "lume/deps/react.ts"

export function md(content: string) {
  return marked.parse(dedent(content))
}

export function Markdown(props: React.HTMLProps<HTMLDivElement> & { children: string }) {
  const { children, ...rest } = props
  return React.createElement(rest.as ? rest.as : "div", { ...rest, dangerouslySetInnerHTML: { __html: md(children) } })
}
