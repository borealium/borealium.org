import { LanguagesData } from "~types/language.ts"

const languagesData: LanguagesData = {
  regions: {
    "NO": {
      en: "Norway",
      nb: "Norge",
    },
    "SE": {
      en: "Sweden",
      nb: "Sverige",
      se: "Ruoŧŧa",
    },
  },
  languages: {
    "smn": {
      name: {
        en: "Inari Sámi",
        smn: "Anarâškielâ",
      },
    },
    "sje": {
      name: {
        en: "Pite Sámi",
        sje: "Bidumsámegiella",
      },
    },
    /*     "da": {
      name: { en: "Danish" },
      autonym: "Dansk",
    }, */
    "se": {
      name: {
        en: "North Sámi",
        se: "Davvisámegiella",
      },
    },
    "en": {
      name: {
        en: "English",
        nb: "Engelsk",
        sv: "Engelska",
      },
    },
    "fo": {
      name: {
        en: "Faroese",
        fo: "Føroyskt",
      },
    },
    "is": {
      name: {
        en: "Icelandic",
        is: "Íslenska",
      },
    },
    "smj": {
      name: {
        en: "Lule Sámi",
        smj: "Julevsámegiella",
      },
      regions: ["NO", "SE"],
    },
    "kl": {
      name: {
        en: "Greenlandic",
        kl: "Kalaallisut",
      },
    },
    "sjd": {
      name: {
        en: "Kildin Sámi",
        sjd: "Кӣллт са̄мь кӣлл",
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
    "nb": {
      name: {
        en: "Norwegian (Bokmål)",
        sv: "Norska (Bokmål)",
        nn: "Norsk, bokmål",
      },
    },
    "nn": {
      name: {
        en: "Norwegian (Nynorsk)"
        nn: "Norsk, nynorsk",
      },
    },
    "sms": {
      name: {
        en: "Skolt Sámi",
        sms: "Nuõrttsääʹmǩiõll",
      },
    },
    "rom": {
      name: {
        en: "Romani",
        nb: "Romsk",
        sv: "Romska",
        rom: "Rromani ćhib",
      },
    },
    "fi": {
      name: {
        en: "Finnish",
        fi: "Suomi",
        nb: "Finsk",
        sv: "Finska",
      },
    },
    "sv": {
      name: {
        en: "Swedish",
        nb: "Svensk",
        sv: "Svenska",
      },
    },
    "sju": {
      name: {
        en: "Ume Sámi",
        sju: "Ubmejesámiengiälla",
      },
    },
    "sma": {
      name: {
        en: "South Sámi",
        sma: "Åarjelsaemien gïele",
      },
    },
    "yid": {
      name: {
        en: "Yiddish",
        nb: "Jiddisk",
        sv: "Jiddiska",
      },
    },
  },
  fallbacks: {
    "se":     ["nb",  "en"],
    "sma":    ["sv",  "en"],
    "sms":    ["fi",  "en"],
    "smn":    ["fi",  "en"],
    "sje":    ["sv",  "en"],
    "sju":    ["sv",  "en"],
    "fkv":    ["nb",  "fi", "en"],
    "fit":    ["sv",  "fi", "en"],
    "smj-SE": ["smj", "sv", "en"],
    "smj-NO": ["smj", "nb", "en"],
    "nb":     ["nn",  "en"],
    "nn":     ["nb",  "en"],
    "fo":     ["da",  "en"],
    "kl":     ["da",  "en"],
    "rom":    ["sv",  "en"],
    "yid":    ["sv",  "en"],
  },
  uiOnly: ["da", "en", "fi", "nb", "nn", "sv"],
  excludeFromUi: ["fit", "fkv", "rom", "sjd", "sje", "sju", "sms", "sma", "smn"],
}

export default languagesData
