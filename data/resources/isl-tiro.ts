import { LinkType } from "~types/resource.ts"
import { defineResource } from "~data/resources.ts"

export default defineResource(import.meta.url, "isl", {
  languages: ["is"],
  category: "text-to-speech",
  links: [
    {
      type: LinkType.Normal,
      url: new URL("https://tiro.is/talgerving"),
    },
  ],
})
