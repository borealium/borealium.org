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
    sv:
      "Divvun Manager är en pakethanterare för att installera och uppdatera språkverktyg för din Windows- eller Mac-dator.",
    nb:
      "Divvun Manager er en pakkehåndterer for å installere og uppdatere språkverktøy for Windows- eller Mac-datamaskinen din.",
  },
  release: {
    platforms: ["windows", "macos"],
  },
  moreInfo: {
    en: `
        In Divvun Manager you choose a language, and then install the available tools. After installation,
        Divvun Manager periodically checks for updates, and installs them automatically in the background
        if any is available.
    `,
  },
  documentationUrl: "/doc/divvun-manager/",
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
