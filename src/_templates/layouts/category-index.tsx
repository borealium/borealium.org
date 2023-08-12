import { Page } from "lume/core.ts"
import { Resource } from "~types/resource.ts"

type CategoryIndexProps = {
  resources: Resource[]
}

export default function CategoryIndexLayout(page: Page & CategoryIndexProps) {
  const { resources } = page

  return <pre>{JSON.stringify(resources, null, 2)}</pre>
}
