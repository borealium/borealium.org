import { getCategoryData } from "~plugins/category-data.ts"
import resources from "~data/resources/mod.ts"
import { PageData } from "lume/core.ts"
import { CategoryId } from "~types/category.ts"

const categoryData: CategoryId[] = getCategoryData()

export default function* (_page: PageData) {
  for (const id of categoryData) {
    const filteredResources = resources
      .filter((resource) => resource.category === id)

    yield {
      id,
      url: `/category/${id}/`,
      categoryId: id,
      resources: filteredResources,
      layout: "category-index.tsx",
    }
  }
}
