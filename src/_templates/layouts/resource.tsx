import { FluentBundle } from "https://esm.sh/@fluent/bundle@0.18.0"
import { Page } from "lume/core.ts"
import { DownloadButton } from "~/_templates/_components/download-button.tsx"
import { LinkType, Resource } from "~types/resource.ts"

export const layout = "layouts/base.tsx"

type ResourceProps = {
  resource: Resource
  fluentBundle: FluentBundle
}

export default function ResourceLayout(page: Page & ResourceProps) {
  const { resource, fluentBundle } = page

  function parseLinkType(type: LinkType) {
    switch (type) {
      case LinkType.AppleAppStore:
        return { text: "for iOS", img: { src: "/static/images/ios-logo.png", alt: "iOS logo" } }
      case LinkType.GooglePlayStore:
        return { text: "for Android", img: { src: "/static/images/android-logo.png", alt: "Android logo" } }
      default:
        return null
    }
  }

  return (
    <div className="resource">
      <div className="content">
        <div>
          <h1>{resource.name["en"]}</h1>
          <p>
            {resource.description["en"]}
          </p>
        </div>
        <div>
          Category: <span data-pagefind-filter="category">{resource.category}</span>
        </div>
        <div className="downloads">
          <h3>{fluentBundle.getMessage("downloads")?.value as string}</h3>
          <div className="links">
            {resource.links?.map((link) => {
              const info = parseLinkType(link.type!)
              if (info == null) {
                return <DownloadButton title={link.text["en"]} href={link.url.href} />
              }
              return (
                <DownloadButton
                  title={link.text["en"]}
                  description={info.text}
                  href={link.url.href}
                  img={{ src: info.img?.src, alt: info.img?.alt }}
                />
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
