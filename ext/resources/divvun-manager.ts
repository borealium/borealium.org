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
  moreInfo: {
    en: `
        ## This is a test

        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent euismod, augue eu facilisis accumsan,
        augue nunc commodo nunc, vitae accumsan nunc augue eu magna. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent euismod, augue eu facilisis accumsan,
        augue nunc commodo nunc, vitae accumsan nunc augue eu magna.

        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent euismod, augue eu facilisis accumsan,
        augue nunc commodo nunc, vitae accumsan nunc augue eu magna.

        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent euismod, augue eu facilisis accumsan,
        augue nunc commodo nunc, vitae accumsan nunc augue eu magna.
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent euismod, augue eu facilisis accumsan,
        augue nunc commodo nunc, vitae accumsan nunc augue eu magna.

        ## Potato

        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent euismod, augue eu facilisis accumsan,
        augue nunc commodo nunc, vitae accumsan nunc augue eu magna.
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
