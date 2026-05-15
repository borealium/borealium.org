import { LinkType } from "~types/resource.ts"
import { defineResource } from "~data/resources.ts"

export default defineResource("kal", {
  languages: ["kl"],
  category: "text-to-speech",
  links: [
    {
      type: LinkType.Normal,
      url: new URL("https://oqaasileriffik.gl/en/langtech/martha/"),
    },
    {
      type: LinkType.Normal,
      url: new URL("https://oqaasileriffik.gl/oqaaserpassualerineq/martha/"),
    },
    {
      type: LinkType.Normal,
      url: new URL("https://oqaasileriffik.gl/da/sprogteknologi/martha/"),
    },
  ],
})
