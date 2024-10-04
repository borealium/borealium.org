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
      autonym: "Anarâškielâ",
    },
    "sje": {
      autonym: "Bidumsámegiella",
    },
    "da": {
      autonym: "Dansk",
    },
    "se": {
      autonym: "Davvisámegiella",
    },
    "en": {
      autonym: "English",
    },
    "fo": {
      autonym: "Føroyskt",
    },
    "is": {
      autonym: "Íslenska",
    },
    "smj": {
      autonym: "Julevsámegiella",
      regions: ["NO", "SE"],
    },
    "kl": {
      autonym: "Kalaallisut",
    },
    "sjd": {
      autonym: "Кӣллт са̄мь кӣлл",
    },
    "fkv": {
      autonym: "Kväänin kieli",
    },
    "fit": {
      autonym: "Meänkieli",
    },
    "nb": {
      autonym: "Norsk, bokmål",
    },
    "nn": {
      autonym: "Norsk, nynorsk",
    },
    "sms": {
      autonym: "Nuõrttsääʹmǩiõll",
    },
    "rom": {
      autonym: "Rromani ćhib",
    },
    "fi": {
      autonym: "Suomi",
    },
    "sv": {
      autonym: "Svenska",
    },
    "sju": {
      autonym: "Ubmejesámiengiälla",
    },
    "yid": {
      autonym: "Yidish",
    },
    "sma": {
      autonym: "Åarjelsaemien gïele",
    },
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
    "rom": ["sv", "en"],
    "yid": ["sv", "en"],
  },
  uiOnly: ["da", "en", "fi", "nb", "nn", "sv"],
  excludeFromUi: ["fit", "fkv", "rom", "sjd", "sje", "sju", "sms", "smn"],
}

export default languagesData
