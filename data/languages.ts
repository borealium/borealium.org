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
      coordinates: [27, 69],
      labelPosition: "right",
    },
    "sje": {
      autonym: "Bidumsámegiella",
      coordinates: [16.5, 63.3],
      labelPosition: "bottom",
    },
    "da": {
      autonym: "Dansk",
    },
    "se": {
      autonym: "Davvisámegiella",
      coordinates: [18.5, 68.5],
      labelPosition: "top",
    },
    "en": {
      autonym: "English",
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
    "smj": {
      autonym: "Julevsámegiella",
      // regions: ["NO", "SE"],
      coordinates: [18, 67],
      labelPosition: "left",
    },
    "kl": {
      autonym: "Kalaallisut",
      coordinates: [-2, 69.7],
      labelPosition: "right",
    },
    // "sjd": {
    //   autonym: "Кӣллт са̄мь кӣлл",
    //   coordinates: [33.5, 67.75],
    //   labelPosition: "bottom",
    // },
    "fkv": {
      autonym: "Kväänin kieli",
      coordinates: [23.75, 70],
      labelPosition: "top",
    },
    "fit": {
      autonym: "Meänkieli",
      coordinates: [23, 66.5],
      labelPosition: "bottom",
    },
    "nb": {
      autonym: "Norsk, bokmål",
    },
    "nn": {
      autonym: "Norsk, nynorsk",
    },
    "sms": {
      autonym: "Nuõrttsääʹmǩiõll",
      coordinates: [29, 67.75],
      labelPosition: "left",
    },
    // "rom": {
    //   autonym: "Rromani ćhib",
    //   coordinates: [18, 59],
    //   labelPosition: "right",
    // },
    "fi": {
      autonym: "Suomi",
    },
    "sv": {
      autonym: "Svenska",
    },
    "sju": {
      autonym: "Ubmejesámiengiälla",
      coordinates: [18, 65.87],
      labelPosition: "left",
    },
    "yi": {
      autonym: "Yiddisch",
      coordinates: [12, 58],
      labelPosition: "bottom",
    },
    "sma": {
      autonym: "Åarjelsaemien gïele",
      coordinates: [13, 65],
      labelPosition: "left",
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
