import { Page } from "lume/core/file.ts";
import { DownloadButton } from "~/_components/download-button.tsx";
import { FluentPage } from "~plugins/fluent.ts";
import { autonym, getLanguageData } from "~plugins/language-data.ts";

export default function LanguageMap({ page }: { page: Page & FluentPage }) {
  const t = page.fluentBundle(page.lang, "_components/landing/MainBlock");
  const lang_t = page.fluentBundle(page.lang, "languages");
  const { languages, uiOnly } = getLanguageData();

  return (
    <brl-language-map
      baseNodes={`${JSON.stringify(
        Object.entries(languages)
          .filter(([code]) => !uiOnly.includes(code))
          .map(([code]) => {
            return { ...languages[code], code, title: lang_t(code) };
          })
      )}`}
    >
      <noscript className="fallback">
        {Object.entries(languages)
          .filter(([code]) => !uiOnly.includes(code))
          .map(([code]) => {
            return (
              <DownloadButton
                title={autonym(code)}
                tooltip={lang_t(code)}
                href={`/language/${code}`}
              />
            );
          })}
      </noscript>
    </brl-language-map>
  );
}
