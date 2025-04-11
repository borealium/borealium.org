import { TranslateIcon } from "~/_components/icons.tsx"
import { MenuItem } from "~/_components/menu-item.tsx"
import { TranslateFn } from "~plugins/fluent.ts"
import { autonym, getLanguageData, selectLocale } from "~plugins/language-data.ts"

const languagesData = getLanguageData()

export function LanguageSelect(props: { lang: string; url: string; lang_t: TranslateFn }) {
  return (
    <>
      <input className="button" type="checkbox" />
      <div className="language-select">
        <TranslateIcon />
        <MenuItem
          text={autonym(props.lang?.split("-")[0])}
          smallText={props.lang}
        />
      </div>
      <ul className="list">
        {Object.entries(languagesData.languages)
          .filter(([code]) => languagesData.websiteLanguages.includes(code))
          .filter(([code]) => !languagesData.hidden.includes(code))
          .map(([code, data]) => {
            if (data.regions != null) {
              return data.regions.map((regionCode) => {
                const regionText = selectLocale(code, languagesData.regions[regionCode])

                return (
                  <li key={code}>
                    <a
                      data-multilang
                      title={`${props.lang_t(code)} (${props.lang_t(regionCode)})`}
                      href={`/${code}-${regionCode.toLowerCase()}${props.url}`}
                    >
                      {autonym(code)} ({regionText})
                    </a>
                  </li>
                )
              })
            }

            return (
              <li key={code}>
                <a data-multilang title={props.lang_t(code)} href={`/${code}${props.url}`}>
                  {autonym(code)}
                </a>
              </li>
            )
          })}
      </ul>
    </>
  )
}
