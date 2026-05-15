import { LinkType } from "~types/resource.ts"
import { defineResource } from "~data/resources.ts"

export default defineResource("fao", {
  languages: ["fo"],
  category: "speech-recognition",
  links: [
    {
      type: LinkType.Normal,
      url: new URL("https://voisit.fo"),
    },
    {
      type: LinkType.AppleAppStore,
      url: new URL("https://apps.apple.com/dk/app/voisit/id6459887023?l=da"),
    },
    {
      type: LinkType.GooglePlayStore,
      url: new URL(
        "https://play.google.com/store/apps/details?id=net.isolveit.voisit",
      ),
    },
  ],
})
