import { MenuItem } from "~/_components/menu-item.tsx"
import { getLanguageData } from "~plugins/language-data.ts"
import { TranslateIcon } from "~/_components/icons.tsx"

const { languages } = getLanguageData()

export function LanguageSelect(props: { url: string }) {
  return (
    <>
      <input className="button" type="checkbox" />
      <div className="language-select">
        <TranslateIcon />
        <MenuItem text="" />
      </div>
      <ul className="list">
        {Object.entries(languages).map(([code, data]) => {
          if (data.regions != null) {
            return Object.entries(data.regions).map(([regionCode, regionText]) => {
              return (
                <li key={code}>
                  <a data-multilang href={`/${code}-${regionCode.toLowerCase()}${props.url}`}>
                    {data.autonym} ({regionText})
                  </a>
                </li>
              )
            })
          }

          return (
            <li key={code}>
              <a data-multilang href={`/${code}${props.url}`}>
                {data.autonym}
              </a>
            </li>
          )
        })}
      </ul>
    </>
  )
}
