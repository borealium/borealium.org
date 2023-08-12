import { Page } from "lume/core.ts"
import { Resource } from "~types/resource.ts"

type ResourceProps = {
  resource: Resource
}

export default function ResourceLayout(page: Page & ResourceProps) {
  const { resource } = page

  return <pre>{JSON.stringify(resource, null, 2)}</pre>
}
