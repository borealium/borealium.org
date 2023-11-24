import { LanguagesData } from "~types/language.ts"

const languagesData: LanguagesData = {
  languages: {
    "is": {
      name: "Icelandic",
      autonym: "Íslenska",
    },
    "fo": {
      name: "Faroese",
      autonym: "Føroyskt",
    },
    "se": {
      name: "North Sámi",
      autonym: "Davvisámegiella",
    },
    "smj": {
      name: "Lule Sámi",
      autonym: "Julevsámegiella",
      "regions": { "NO": "Norway", "SE": "Sweden" },
    },
    "sma": {
      name: "South Sámi",
      autonym: "Åarjelsaemien gïele",
    },
    "sjd": {
      name: "Kildin Sámi",
      autonym: "Кӣллт са̄мь кӣлл",
    },
    "sms": {
      name: "Skolt Sámi",
      autonym: "Nuõrttsääʹmǩiõll",
    },
    "smn": {
      name: "Inari Sámi",
      autonym: "Anarâškielâ",
    },
    "fkv": {
      name: "Kven",
      autonym: "Kväänin kieli",
    },
    "fit": {
      name: "Meänkieli",
      autonym: "Meänkieli",
    },
    "sje": {
      name: "Pite Sámi",
      autonym: "Bidumsámegiella",
    },
    "en": {
      name: "English",
      autonym: "English",
    },
    "sv": {
      name: "Swedish",
      autonym: "Svenska",
    },
    "nb": {
      name: "Norwegian (Bokmål)",
      autonym: "Norsk bokmål",
    },
    "nn": {
      name: "Norwegian (Nynorsk)",
      autonym: "Norsk nynorsk",
    },
    "fi": {
      name: "Finnish",
      autonym: "Suomi",
    },
    "da": {
      name: "Danish",
      autonym: "Dansk",
    },
  },
  fallbacks: {
    "se": ["nb", "en"],
    "sma": ["sv", "en"],
    "sms": ["fi", "en"],
    "smn": ["fi", "en"],
    "sje": ["sv", "en"],
    "fkv": ["nb", "fi", "en"],
    "fit": ["sv", "fi", "en"],
    "smj-SE": ["smj", "sv", "en"],
    "smj-NO": ["smj", "nb", "en"],
    "nb": ["nn", "en"],
    "nn": ["nb", "en"],
  },
  uiOnly: ["da", "en", "fi", "nb", "nn", "sv"],
}

export default languagesData
