import { LinkType, Resource, ResourceType } from "~types/resource.ts"

const resource: Resource = {
  id: "divvun-keyboard",
  type: ResourceType.External,
  languages: [],
  category: "keyboard-layouts",
  name: {
    en: "Divvun Keyboard",
    sv: "Divvun Tangentbord",
    nb: "Divvun-tastaturer",
  },
  description: {
    en: "Divvun Keyboard for iOS and Android",
    sv: "Divvun-tangentbord för iOS och Android",
    nb: "Divvun-tastaturer for iOS og Android",
  },
  release: {
    platforms: ["mobile"],
    authors: [],
  },
  moreInfo: {
    en: `
      Divvun Keyboards contains keyboards for most Sámi languages and a number of other indigenous or minority languages.
    `,
    sv: `
      Divvun Tangentbord innehåller tangentbord för alla samiska språk, och tangentbord för ett antal andra urfolks- och minoritetsspråk.
    `,
    nb: `
      Divvun Tastaturer inneholder tastaturer for alle samiske språk, og tastaturer for en rekke andre urfolks- og minoritetsspråk.
    `,
  },
  links: [
    {
      type: LinkType.AppleAppStore,
      text: {
        en: "Stable",
      },
      url: new URL("https://apps.apple.com/app/divvun-keyboards/id948386025"),
    },
    {
      type: LinkType.GooglePlayStore,
      text: {
        en: "Stable",
      },
      url: new URL("https://play.google.com/store/apps/details?id=no.uit.giella.keyboards.Sami"),
    },
    {
      type: LinkType.AppleAppStore,
      text: {
        en: "Development",
      },
      url: new URL("https://apps.apple.com/us/app/divvun-dev-keyboards/id1518256662"),
    },
    {
      type: LinkType.GooglePlayStore,
      text: {
        en: "Development",
      },
      url: new URL("https://play.google.com/store/apps/details?id=no.uit.giella.keyboards.dev"),
    },
  ],
}

export default resource
