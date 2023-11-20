import { Page } from "lume/core.ts"
import { DownloadButton } from "~/_components/download-button.tsx"
import { FluentPage } from "~plugins/fluent.ts"
import { CategoryLabel } from "~/_components/label.tsx"

export default function SecondaryBlock1(page: Page & FluentPage) {
  const t = page.fluentBundle(page.lang, "_components/landing/SecondaryBlock1")

  return (
    <>
      <CategoryLabel category={t("blah")} />
      <h2>{t("title")}</h2>
      <p>{t("description")}</p>
      <div className="button-group">
        {/* {"Nothing"} */}
      </div>
    </>
    // {/* <h2>
    //   North, Inari, Julev, Skolt and South Sámi desktop and mobile keyboards.
    // </h2>
    // <p>
    //   Lorem ipsum dolor sit amet, consectetur adipiscing elit sed diam non et erat. Lorem ipsum dolor sit amet,
    //   consectetur adipiscing elit sed diam non et erat.
    // </p>
    // <DownloadButton
    //   title="Divvun Keyboards"
    //   description="For iOS and Android"
    //   href="/resource/divvun-keyboard"
    // /> */}
  )
}
