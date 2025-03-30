import { Data } from "lume/core/file.ts"
import resources from "~data/resources/mod.ts"
import { getCategoryData } from "~plugins/category-data.ts"

const categoryData = getCategoryData()

export default function* (_page: Data) {
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
