import { Page } from "~utils/data-types.ts"
import { Marker } from "~/templates/components/marker.tsx"

export const layout = "layouts/base.tsx"

type WelcomeProps = {
  headline: string
  content: string
}

const Welcome = ({ headline, content }: WelcomeProps) => (
  <section className="start--welcome">
    <Marker label="Global" />
    <h1>{headline}</h1>
    <p>{content}</p>
  </section>
)

const Category = ({ headline, label }: { headline: string; label: string }) => (
  <a className="start--category" href={`./categories/${label}`}>
    <div className="start--category--icon">
      <img
        src={`/images/category-${label}.png`}
        alt={`Icon for category ${headline}`}
      />
    </div>
    <h2 className="start--category--headline">{headline}</h2>
  </a>
)

const Categories = ({
  categories,
  lang,
}: {
  categories: Page["categories"]
  lang: string
}) => (
  <section className="start--categories">
    {Object.entries(categories).map(([label, { name }]) => (
      <Category label={label} headline={name[lang] ?? name["en"]} />
    ))}
  </section>
)

const FeaturedTool = ({
  label,
  headline,
  description,
  lang,
}: {
  label: string
  headline: string
  description: string
  lang: string
}) => {
  return (
    <section className="start--featured-tool">
      <Marker label={label} />
      <h2>{headline}</h2>
      <p>{description}</p>
      <div className="downloads">
        {
          /* {Object.entries(latestStableReleaseByOs).map(([platform, url]) => (
          <a href={url}>
            <span className="label">{`Download ${featuredTool.name[lang]}`}</span>
            <br />
            <span className="platform">for {platform}</span>
          </a>
        ))} */
        }
      </div>
    </section>
  )
}

export default ({
  welcome,
  categories,
  tools,
  featuredTools,
  search,
  lang,
}: Page & {
  welcome: WelcomeProps
  featuredTools: Record<
    string,
    { label: string; headline: string; description: string }
  >
}) => (
  <main className="start">
    <Welcome {...welcome} />
    <Categories lang={lang ?? "en"} categories={categories} />
    {Object.entries(featuredTools).map(([id, content]) => <FeaturedTool lang={lang ?? "en"} key={id} {...content} />)}
    {/* News section in wireframe but not mentioned in tender */}
    <ul>
      {search.pages("url^=/tools").map((page) => {
        if (!page) throw new Error("page is undefined")

        return (
          <li>
            <a href={page.data.url}>{page.data.title}</a>
          </li>
        )
      })}
    </ul>
  </main>
)
