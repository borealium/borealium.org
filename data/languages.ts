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
    "da": {
      autonym: "Dansk",
    },
    "en": {
      autonym: "English",
    },
    "fi": {
      autonym: "Suomi",
    },
    "fit": {
      autonym: "Meänkieli",
      coordinates: [23, 66.8],
      labelPosition: "right",
    },
    "fkv": {
      autonym: "Kväänin kieli",
      coordinates: [23.75, 70],
      labelPosition: "top",
    },
    "fo": {
      autonym: "Føroyskt",
      coordinates: [-1, 60],
      labelPosition: "bottom",
    },
    "is": {
      autonym: "Íslenska",
      coordinates: [-3, 63.5],
      labelPosition: "right",
    },
    "kl": {
      autonym: "Kalaallisut",
      coordinates: [-2, 69.7],
      labelPosition: "right",
    },
    "krl": {
      autonym: "Karjalan kieli",
      coordinates: [30, 64],
      labelPosition: "bottom",
    },
    "nb": {
      autonym: "Norsk, bokmål",
    },
    "nn": {
      autonym: "Norsk, nynorsk",
    },
    // "rom": {
    //   autonym: "Rromani ćhib",
    //   coordinates: [18, 59],
    //   labelPosition: "right",
    // },
    "se": {
      autonym: "Davvisámegiella",
      coordinates: [22.5, 69],
      labelPosition: "left",
    },
    // "sjd": {
    //   autonym: "Кӣллт са̄мь кӣлл",
    //   coordinates: [33.5, 67.75],
    //   labelPosition: "bottom",
    // },
    "sje": {
      autonym: "Bidumsámegiella",
      coordinates: [16.9, 65.8],
      labelPosition: "right",
    },
    "sju": {
      autonym: "Ubmejesámiengiälla",
      coordinates: [15.8, 65.09],
      labelPosition: "left",
    },
    "sma": {
      autonym: "Åarjelsaemien gïele",
      coordinates: [13, 64],
      labelPosition: "right",
    },
    "smj": {
      autonym: "Julevsámegiella",
      // regions: ["NO", "SE"],
      coordinates: [18, 67],
      labelPosition: "left",
    },
    "smn": {
      autonym: "Anarâškielâ",
      coordinates: [27, 69],
      labelPosition: "right",
    },
    "sms": {
      autonym: "Nuõrttsääʹmǩiõll",
      coordinates: [28, 68],
      labelPosition: "left",
    },
    "sv": {
      autonym: "Svenska",
    },
    "yi": {
      autonym: "Yiddisch",
      coordinates: [14.5, 58],
      labelPosition: "bottom",
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
    "fkv": ["nb", "nn", "en"],
    "fit": ["sv", "en"],
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
  excludeFromUi: ["fkv", "rom", "sjd", "sje", "sju", "sma-NO", "sma-SE", "smj-NO", "smj-SE", "smn", "yi"],
}

export default languagesData
