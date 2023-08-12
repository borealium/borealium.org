import { join } from "std/path/posix.ts"
import { Resource, ResourceType } from "~types/resource.ts"

import { repo } from "~ext/pahkat.ts"

const externalResources: Resource[] = await Promise.all(
  Array.from(Deno.readDirSync("./ext/resources"))
    .filter((x) => x.isFile && x.name.endsWith(".ts") && x.name !== "mod.ts")
    .map((x) => join("~ext/resources", x.name))
    .map((x) => import(x).then((x) => x.default)),
)

const pahkatResources: Resource[] = repo.packages
  .map((pkg): Resource => {
    return {
      id: pkg.id,
      type: ResourceType.Pahkat,
      languages: pkg.tags
        .filter((x) => x.startsWith("lang:"))
        .map((x) => x.replace("lang:", "")),
      category: pkg
        .tags
        .find((x) => x.startsWith("cat:"))?.replace("cat:", "") ?? "",
      name: pkg.name,
      description: pkg.description,
    }
  })

// export type Resource = {
//   id: string
//   type: ResourceType
//   category: CategoryId
//   tags?: string[]
//   name: Record<LangTag, string>
//   description: Record<LangTag, string>
//   externalDocumentationUrl?: URL
//   links?: Link[]
// } & ({ language: LangTag } | { languages: LangTag[] })

export default [...externalResources, ...pahkatResources]
