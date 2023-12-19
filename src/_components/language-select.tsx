import { MenuItem } from "~/_components/menu-item.tsx"
import { autonym, getLanguageData, selectLocale } from "~plugins/language-data.ts"
import { TranslateIcon } from "~/_components/icons.tsx"

const languagesData = getLanguageData()

export function LanguageSelect(props: { lang: string; url: string }) {
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
          .filter(([code]) => !languagesData.excludeFromUi.includes(code))
          .map(([code, data]) => {
            if (data.regions != null) {
              return data.regions.map((regionCode) => {
                const regionText = selectLocale(code, languagesData.regions[regionCode])

                return (
                  <li key={code}>
                    <a
                      data-multilang
                      title={`${selectLocale(props.lang, data.name)} (${
                        selectLocale(props.lang, languagesData.regions[regionCode])
                      })`}
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
                <a data-multilang title={selectLocale(props.lang, data.name)} href={`/${code}${props.url}`}>
                  {autonym(code)}
                </a>
              </li>
            )
          })}
      </ul>
    </>
  )
}
