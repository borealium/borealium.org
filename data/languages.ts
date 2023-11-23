import { LanguagesData } from "~types/language.ts"

const languagesData: LanguagesData = {
  languages: {
    "is": {
      name: "Icelandic",
      autonym: "íslenska",
    },
    "fo": {
      name: "Faroese",
      autonym: "føroyskt",
    },
    "se": {
      name: "Northern Sami",
      autonym: "davvisámegiella",
    },
    "smj": {
      name: "Lule Sami",
      autonym: "julevsámegiella",
      "regions": { "NO": "Norway", "SE": "Sweden" },
    },
    "sma": {
      name: "Southern Sami",
      autonym: "åarjelsaemien gïele",
    },
    "sjd": {
      name: "Kildin Sami",
      autonym: "Кӣллт са̄мь кӣлл",
    },
    "sms": {
      name: "Skolt Sami",
      autonym: "nuõrttsääʹmǩiõll",
    },
    "smn": {
      name: "Inari Sami",
      autonym: "anarâškielâ",
    },
    "fkv": {
      name: "Kven",
      autonym: "kväänin kieli",
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
      autonym: "norsk bokmål",
    },
    "nn": {
      name: "Norwegian (Nynorsk)",
      autonym: "norsk nynorsk",
    },
    "fi": {
      name: "Finnish",
      autonym: "suomi",
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
  uiOnly: ["en", "nb", "nn", "sv"],
}

export default languagesData
