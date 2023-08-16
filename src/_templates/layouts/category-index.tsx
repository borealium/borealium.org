import { Page } from "lume/core.ts"
import { Resource } from "~types/resource.ts"
import { ResourceSummary } from "~/_templates/_components/resource-summary.tsx"

export const layout = "layouts/base.tsx"

type CategoryIndexProps = {
  resources: Resource[]
}

export default function CategoryIndexLayout(page: Page & CategoryIndexProps) {
  const { resources } = page

  return (
    <div className="category-index">
      <div className="content">
        <div>
          <h2>Resources</h2>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
            industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
            scrambled it to make a type specimen book.
          </p>
        </div>
        <div className="results">
          {resources.map((resource) => (
            <ResourceSummary
              name={resource.name["en"]}
              description={resource.description["en"]}
              href={`/resource/${resource.id}`}
              img={{ src: "/static/images/category-keyboard-layouts.png", alt: "test" }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
