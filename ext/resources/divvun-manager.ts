import { LinkType, Resource, ResourceType } from "~types/resource.ts"

const resource: Resource = {
  id: "divvun-manager",
  type: ResourceType.External,
  languages: [],
  category: "package-management",
  name: {
    en: "Divvun Manager",
  },
  description: {
    en:
      "Divvun Manager is a package manager for installing and updating language resources on your Windows or Mac computer.",
  },
  externalDocumentationUrl: "/doc/divvun-manager/",
  links: [
    {
      type: LinkType.Windows,
      text: {
        en: "Divvun Manager",
      },
      url: new URL("https://pahkat.uit.no/divvun-installer/download/divvun-installer?platform=windows"),
    },
    {
      type: LinkType.MacOS,
      text: {
        en: "Divvun Manager",
      },
      url: new URL("https://pahkat.uit.no/divvun-installer/download/divvun-installer?platform=macos"),
    },
  ],
}

export default resource
