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
        {Object.entries(languages).map(([code, data]) => (
          <li key={code}>
            <a data-multilang href={`/${code}${props.url}`}>
              {data.autonym}
            </a>
          </li>
        ))}
      </ul>
    </>
  )
}
