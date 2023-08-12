import { Page } from "lume/core.ts"
import { DownloadButton } from "~/_templates/_components/download-button.tsx"
import { LinkType, Resource } from "~types/resource.ts"

export const layout = "layouts/base.tsx"

type ResourceProps = {
  resource: Resource
}

export default function ResourceLayout(page: Page & ResourceProps) {
  const { resource } = page

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
          <h2>{resource.name["en"]}</h2>
          <p>
            {resource.description["en"] + " lorem Ipsum is simply dummy text of the printing and typesetting industry."}
          </p>
        </div>
        <div className="downloads">
          <h3>Downloads</h3>
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
