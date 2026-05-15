import { LinkType } from "~types/resource.ts"
import { defineResource } from "~data/resources.ts"

export default defineResource("isl", {
  languages: ["is"],
  category: "text-to-speech",
  links: [
    {
      type: LinkType.Normal,
      url: new URL("https://tiro.is/talgerving"),
    },
  ],
})
