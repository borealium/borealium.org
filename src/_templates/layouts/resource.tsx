import { Resource } from "~types/resource.ts"
import { Page } from "~utils/data-types.ts"

type ResourceProps = {
  resource: Resource
}

export default function ResourceLayout(page: Page & ResourceProps) {
  const { resource } = page

  return <pre>{JSON.stringify(resource, null, 2)}</pre>
}
