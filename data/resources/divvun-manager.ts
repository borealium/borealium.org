import { LinkType } from "~types/resource.ts"
import { defineResource } from "~data/resources.ts"

export default defineResource(import.meta.url, "mul", {
  languages: [],
  category: "package-management",
  moreInfo: true,
  release: {
    platforms: ["windows", "macos"],
  },
  documentationUrl: "/doc/divvun-manager/",
  links: [
    {
      type: LinkType.Windows,
      url: new URL(
        "https://pahkat.uit.no/divvun-installer/download/divvun-installer?platform=windows",
      ),
    },
    {
      type: LinkType.MacOS,
      url: new URL(
        "https://pahkat.uit.no/divvun-installer/download/divvun-installer?platform=macos",
      ),
    },
  ],
})
