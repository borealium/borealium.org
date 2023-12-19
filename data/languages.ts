import { LanguagesData } from "~types/language.ts"

const languagesData: LanguagesData = {
  regions: {
    "NO": {
      en: "Norway",
    },
    "SE": {
      en: "Sweden",
      smj: "Ruoŧŧa",
    },
  },
  languages: {
    "is": {
      name: {
        en: "Icelandic",
        is: "Íslenska",
      },
    },
    "fo": {
      name: {
        en: "Faroese",
        fo: "Føroyskt",
      },
    },
    "kl": {
      name: {
        en: "Greenlandic",
        kl: "Kalaallisut",
      },
    },
    "se": {
      name: {
        en: "North Sámi",
        se: "Davvisámegiella",
      },
    },
    "smj": {
      name: {
        en: "Lule Sámi",
        smj: "Julevsámegiella",
      },
      regions: ["NO", "SE"],
    },
    "sma": {
      name: {
        en: "South Sámi",
        sma: "Åarjelsaemien gïele",
      },
    },
    "sjd": {
      name: {
        en: "Kildin Sámi",
        sjd: "Кӣллт са̄мь кӣлл",
      },
    },
    "sms": {
      name: {
        en: "Skolt Sámi",
        sms: "Nuõrttsääʹmǩiõll",
      },
    },
    "smn": {
      name: {
        en: "Inari Sámi",
        smn: "Anarâškielâ",
      },
    },
    "fkv": {
      name: {
        en: "Kven",
        fkv: "Kväänin kieli",
      },
    },
    "fit": {
      name: {
        en: "Meänkieli",
        fit: "Meänkieli",
      },
    },
    "sje": {
      name: {
        en: "Pite Sámi",
        sje: "Bidumsámegiella",
      },
    },
    "sju": {
      name: {
        en: "Ume Sámi",
        sju: "Ubmejesámiengiälla",
      },
    },
    "en": {
      name: {
        en: "English",
        sv: "Engelska",
      },
    },
    "sv": {
      name: {
        en: "Swedish",
        sv: "Svenska",
      },
    },
    "nb": {
      name: {
        en: "Norwegian (Bokmål)",
        sv: "Norska (Bokmål)",
        nb: "Norsk bokmål",
      },
    },
    /*     "nn": {
      name: { en: "Norwegian (Nynorsk)" },
      autonym: "Norsk nynorsk",
    }, */
    "fi": {
      name: { en: "Finnish" },
      autonym: "Suomi",
    },
    /*     "da": {
      name: { en: "Danish" },
      autonym: "Dansk",
    }, */
  },
  fallbacks: {
    "se": ["nb", "en"],
    "sma": ["sv", "en"],
    "sms": ["fi", "en"],
    "smn": ["fi", "en"],
    "sje": ["sv", "en"],
    "sju": ["sv", "en"],
    "fkv": ["nb", "fi", "en"],
    "fit": ["sv", "fi", "en"],
    "smj-SE": ["smj", "sv", "en"],
    "smj-NO": ["smj", "nb", "en"],
    "nb": ["nn", "en"],
    "nn": ["nb", "en"],
    "fo": ["da", "en"],
    "kl": ["da", "en"],
  },
  uiOnly: ["da", "en", "fi", "nb", "nn", "sv"],
  excludeFromUi: ["fit", "fkv", "sjd", "sje", "sju", "sms", "sma", "smn"],
}

export default languagesData
