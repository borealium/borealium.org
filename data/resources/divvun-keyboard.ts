import { LinkType } from "~types/resource.ts"
import { defineResource } from "~data/resources.ts"

export default defineResource("mul", {
  languages: [],
  category: "keyboard-layouts",
  moreInfo: true,
  links: [
    {
      type: LinkType.AppleAppStore,
      url: new URL("https://apps.apple.com/app/divvun-keyboards/id948386025"),
    },
    {
      type: LinkType.GooglePlayStore,
      url: new URL(
        "https://play.google.com/store/apps/details?id=no.uit.giella.keyboards.Sami",
      ),
    },
    {
      type: LinkType.AppleAppStore,
      url: new URL(
        "https://apps.apple.com/us/app/divvun-dev-keyboards/id1518256662",
      ),
    },
    {
      type: LinkType.GooglePlayStore,
      url: new URL(
        "https://play.google.com/store/apps/details?id=no.uit.giella.keyboards.dev",
      ),
    },
  ],
})
