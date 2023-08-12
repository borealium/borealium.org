import { join } from "std/path/posix.ts"
import { Resource } from "~types/resource.ts"

const resources: Resource[] = await Promise.all(
  Array.from(Deno.readDirSync("./ext/resources"))
    .filter((x) => x.isFile && x.name.endsWith(".ts") && x.name !== "mod.ts")
    .map((x) => join("~ext/resources", x.name))
    .map((x) => import(x).then((x) => x.default)),
)

export default resources
