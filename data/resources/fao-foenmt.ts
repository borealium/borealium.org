import { LinkType } from "~types/resource.ts"
import { defineResource } from "~data/resources.ts"

export default defineResource("fao", {
  languages: ["fo"],
  category: "mt",
  links: [
    {
      type: LinkType.Normal,
      url: new URL("https://huggingface.co/spaces/barbaroo/English-Faroese"),
    },
  ],
})
