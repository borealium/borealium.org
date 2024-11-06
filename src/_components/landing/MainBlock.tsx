import { Page } from "lume/core.ts"
import { CategoryLabel } from "~/_components/label.tsx"
import { script } from "~/_includes/lang-redir.tsx"
import { FluentPage } from "~plugins/fluent.ts"
import { getLanguageData } from "~plugins/language-data.ts"

export default function LandingMainBlock(
  page: Page & FluentPage,
) {
  const t = page.fluentBundle(page.lang, "_components/landing/MainBlock")
  const lang_t = page.fluentBundle(page.lang, "languages")
  const { languages, uiOnly } = getLanguageData()

  return (
    <>
      <div className="first-cell">
        <div className="text-group">
          <CategoryLabel category={t("welcome")} />
          <h2>{t("title")}</h2>
          <p>
            {t("description")}
          </p>
        </div>
      </div>
      <div className="second-cell">
        <h3>
          <img
            style={{ float: "left", marginTop: "-1px", marginRight: "8px" }}
            src={"/static/images/tag-language.svg"}
            alt=""
          />
          {t("subtitle")}
        </h3>
        <div className="language-group">
          <div id="graph">
            <button id="expand-button" aria-label="Expand graph">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
              </svg>
            </button>
          </div>
        </div>
        <script src="https://d3js.org/d3.v7.min.js"></script>
        <script src="/static/geo/shapes.js"></script>
        <script src="/static/geo/map.js"></script>
        {/* {Object.entries(languages)
          .filter(([code]) => !uiOnly.includes(code))
          .map(([code]) => {
            return (
              <DownloadButton
                title={autonym(code)}
                tooltip={lang_t(code)}
                href={`/language/${code}`}
              />
            )
          })} */}
        {script(`
          const expandButton = document.getElementById('expand-button');
          const graphContainer = document.getElementById('graph');
          let isExpanded = false;
        
          expandButton.addEventListener('click', () => {
            isExpanded = !isExpanded;
            graphContainer.classList.toggle('expanded');
            
            // Update the button icon
            expandButton.innerHTML = isExpanded 
              ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 3h6v6M21 3h-6v6M3 21h6v-6M21 21h-6v-6"/></svg>'
              : '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/></svg>';
            
            // Trigger resize handling if you have any
            if (typeof handleResize === 'function') {
              handleResize();
            }
          });
        `)}
      </div>
    </>
  )
}
