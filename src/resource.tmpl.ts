import resources from "~ext/resources/mod.ts"

export const layout = "layouts/resource.tsx"

export default function* () {
  console.log("HENLO", resources)
  for (const r of resources) {
    yield { url: `/resource/${r.id}/`, resource: r, layout: "layouts/resource.tsx" }
  }
}
