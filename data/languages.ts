import { LanguagesData } from "~types/language.ts"

const languagesData: LanguagesData = {
  languages: {
    "is": {
      name: { en: "Icelandic" },
      autonym: "Íslenska",
    },
    "fo": {
      name: { en: "Faroese" },
      autonym: "Føroyskt",
    },
    "kl": {
      name: { en: "Greenlandic" },
      autonym: "Kalaallisut",
    },
    "se": {
      name: { en: "North Sámi" },
      autonym: "Davvisámegiella",
    },
    "smj": {
      name: { en: "Lule Sámi" },
      autonym: "Julevsámegiella",
      regions: { "NO": "Norway", "SE": "Sweden" },
    },
    "sma": {
      name: { en: "South Sámi" },
      autonym: "Åarjelsaemien gïele",
    },
    "sjd": {
      name: { en: "Kildin Sámi" },
      autonym: "Кӣллт са̄мь кӣлл",
    },
    "sms": {
      name: { en: "Skolt Sámi" },
      autonym: "Nuõrttsääʹmǩiõll",
    },
    "smn": {
      name: { en: "Inari Sámi" },
      autonym: "Anarâškielâ",
    },
    "fkv": {
      name: { en: "Kven" },
      autonym: "Kväänin kieli",
    },
    "fit": {
      name: { en: "Meänkieli" },
      autonym: "Meänkieli",
    },
    "sje": {
      name: { en: "Pite Sámi" },
      autonym: "Bidumsámegiella",
    },
    "sju": {
      name: { en: "Ume Sámi" },
      autonym: "Ubmejesámiengiälla",
    },
    "en": {
      name: { en: "English" },
      autonym: "English",
    },
    "sv": {
      name: { en: "Swedish" },
      autonym: "Svenska",
    },
    "nb": {
      name: { en: "Norwegian (Bokmål)" },
      autonym: "Norsk bokmål",
    },
    /*     "nn": {
      name: { en: "Norwegian (Nynorsk)" },
      autonym: "Norsk nynorsk",
    }, */
    /*     "fi": {
      name: { en: "Finnish" },
      autonym: "Suomi",
    }, */
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
