import { getCategoryData } from "~plugins/category-data.ts"
import resources from "~ext/resources/mod.ts"
import { PageData } from "lume/core.ts"

const categoryData = getCategoryData()

export default function* (_page: PageData) {
  for (const id of Object.keys(categoryData)) {
    const filteredResources = resources
      .filter((resource) => resource.category === id)

    yield {
      id,
      url: `/category/${id}/`,
      categoryId: id,
      category: categoryData[id],
      resources: filteredResources,
      layout: "category-index.tsx",
    }
  }
}
