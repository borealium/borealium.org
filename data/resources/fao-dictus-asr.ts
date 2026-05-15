import { LinkType } from "~types/resource.ts"
import { defineResource } from "~data/resources.ts"

export default defineResource(import.meta.url, "fao", {
  languages: ["fo"],
  category: "speech-recognition",
  links: [
    {
      type: LinkType.Normal,
      url: new URL("https://dictus.dk/vare/dictus-sun-fo/"),
    },
  ],
})
