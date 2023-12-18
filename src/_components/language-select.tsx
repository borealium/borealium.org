import { MenuItem } from "~/_components/menu-item.tsx"
import { getLanguageData, selectLocale } from "~plugins/language-data.ts"
import { TranslateIcon } from "~/_components/icons.tsx"

const languagesData = getLanguageData()

export function LanguageSelect(props: { lang: string; url: string }) {
  return (
    <>
      <input className="button" type="checkbox" />
      <div className="language-select">
        <TranslateIcon />
        <MenuItem
          text={languagesData.languages[props.lang?.split("-")[0]]?.autonym}
          smallText={props.lang}
        />
      </div>
      <ul className="list">
        {Object.entries(languagesData.languages)
          .filter(([code]) => !languagesData.excludeFromUi.includes(code))
          .map(([code, data]) => {
            if (data.regions != null) {
              return Object.entries(data.regions).map(([regionCode, regionText]) => {
                return (
                  <li key={code}>
                    <a
                      data-multilang
                      title={selectLocale(props.lang, data.name)}
                      href={`/${code}-${regionCode.toLowerCase()}${props.url}`}
                    >
                      {data.autonym} ({regionText})
                    </a>
                  </li>
                )
              })
            }

            return (
              <li key={code}>
                <a data-multilang title={selectLocale(props.lang, data.name)} href={`/${code}${props.url}`}>
                  {data.autonym}
                </a>
              </li>
            )
          })}
      </ul>
    </>
  )
}
