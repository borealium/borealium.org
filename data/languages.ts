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
      name: "Northern Sami",
      autonym: "Davvisámegiella",
    },
    "smj": {
      name: "Lule Sami",
      autonym: "Julevsámegiella",
      "regions": { "NO": "Norway", "SE": "Sweden" },
    },
    "sma": {
      name: "Southern Sami",
      autonym: "Åarjelsaemien gïele",
    },
    "sjd": {
      name: "Kildin Sami",
      autonym: "Кӣллт са̄мь кӣлл",
    },
    "sms": {
      name: "Skolt Sami",
      autonym: "Nuõrttsääʹmǩiõll",
    },
    "smn": {
      name: "Inari Sami",
      autonym: "Anarâškielâ",
    },
    "fkv": {
      name: "Kven",
      autonym: "Kväänin kieli",
    },
    "sje": {
      name: "Pite Sami",
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
  },
  fallbacks: {
    "se": ["nb", "en"],
    "sma": ["sv", "en"],
    "sms": ["fi", "en"],
    "smn": ["fi", "en"],
    "sje": ["sv", "en"],
    "fkv": ["sv", "en"],
    "smj-SE": ["smj", "sv", "en"],
    "smj-NO": ["smj", "nb", "en"],
    "nb": ["nn", "en"],
    "nn": ["nb", "en"],
  },
  uiOnly: ["en", "fi", "nb", "nn", "sv"],
}

export default languagesData
