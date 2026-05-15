import { LinkType } from "~types/resource.ts"
import { defineResource } from "~data/resources.ts"

export default defineResource("mul", {
  languages: ["fkv", "se", "sje", "sju", "sma", "smj", "sms"],
  category: "langlearning",
  moreInfo: true,
  links: [
    {
      type: LinkType.AppleAppStore,
      url: new URL("https://apps.apple.com/ua/app/new-amigos/id1496189775"),
    },
    {
      type: LinkType.GooglePlayStore,
      url: new URL(
        "https://play.google.com/store/apps/details?id=com.newamigos",
      ),
    },
    {
      type: LinkType.Normal,
      url: new URL("https://newamigos.com/"),
    },
  ],
})
