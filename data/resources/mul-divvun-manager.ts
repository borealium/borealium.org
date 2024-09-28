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
      "Divvun Manager is an app for installing language tools on your Windows or Mac computer.",
    sv:
      "Divvun Manager är et program för att installera språkverktyg för din Windows- eller Mac-dator.",
    nb:
      "Divvun Manager er et program for å installere språkverktøy for Windows- eller Mac-datamaskinen din.",
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
    sv: `
        I Divvun Manager väljer du språk, och därefter installerar du verktygen som finns. Efter installationen
        vil Divvun Manager med jämna mellanrum kolla om det finns nya versioner av verktygen, och i fall det
        finns vil de uppdateras automatiskt.
    `,
    nb: `
        I Divvun Manager velger du språk, og deretter installerer du verktøyene for språket. Etter installasjonen
        vil Divvun Manager med jevne mellomrom sjekke om det finnes nye versjoner av verktøyene, og i så fall
        oppdatere dem automatisk.
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
