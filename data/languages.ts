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
    "yi": {
      autonym: "Yidish",
    },
    "sma": {
      autonym: "Åarjelsaemien gïele",
    },
  },
  fallbacks: {
    "se": ["nb", "en"],
    "sma-NO": ["sma", "nb", "nn", "sv", "en"],
    "sma-SE": ["sma", "sv", "nb", "en"],
    "sms": ["fi", "en"],
    "smn": ["fi", "en"],
    "sje": ["sv", "nb", "en"],
    "sju": ["sv", "nb", "en"],
    "fkv": ["nb", "nn", "fi", "en"],
    "fit": ["sv", "fi", "en"],
    "smj-SE": ["smj", "sv", "nb", "en"],
    "smj-NO": ["smj", "nb", "nn", "sv", "en"],
    "nb": ["nn", "da", "sv", "en"],
    "nn": ["nb", "sv", "da", "en"],
    "fo": ["da", "en"],
    "kl": ["da", "en"],
    "rom": ["sv", "en"],
    "yi": ["sv", "en"],
  },
  uiOnly: ["da", "en", "fi", "nb", "nn", "sv"],
  excludeFromUi: ["fkv", "rom", "sjd", "sje", "sju", "sma-NO", "sma-SE", "smj-NO", "smj-SE", "smn"],
}

export default languagesData
