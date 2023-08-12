import { getCategoryData } from "~plugins/category-data.ts"
import resources from "~ext/resources/mod.ts"

const categoryData = getCategoryData()

export default function* () {
  for (const id of Object.keys(categoryData)) {
    const filteredResources = resources
      .filter((resource) => resource.category === id)

    yield {
      id,
      url: `/category/${id}/`,
      resources: filteredResources,
      layout: "layouts/category-index.tsx",
    }
  }
}
