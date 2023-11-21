import { FluentBundle } from "@fluent/bundle"
import { Data, Page, PageData } from "lume/core.ts"
import { DownloadButton } from "~/_components/download-button.tsx"
import { LinkType, Resource, ResourceType } from "~types/resource.ts"
import { CategoryLabel } from "~/_components/label.tsx"
import Aside, { SimplePost } from "~/_components/aside.tsx"
import LanguageTag from "~/_components/tag.tsx"
import { FluentPage, TranslateFn } from "~plugins/fluent.ts"
import { autonym, getLanguageData, selectLocale } from "~plugins/language-data.ts"
import { getCategoryData, translateCategoryName } from "~plugins/category-data.ts"

export const layout = "base.tsx"

type ResourceProps = {
  resource: Resource
  fluentBundle: FluentBundle
  lang: string
}

function PahkatInfo({ t }: { t: TranslateFn }) {
  return (
    <div className="downloads">
      <h3>{t("available-on-divvun-manager")}</h3>
      <p>{t("divvun-manager-description")}</p>
      <div style={{ marginTop: "8px" }}>
        <DownloadButton
          title={t("dm-button-title")}
          description={t("dm-button-description")}
          href="/resource/divvun-manager"
        />
      </div>
    </div>
  )
}

function parseLinkType(type: LinkType, t: TranslateFn) {
  switch (type) {
    case LinkType.AppleAppStore:
      return { text: t("for-apple-app-store"), img: { src: "/static/images/ios-logo.png", alt: "" } }
    case LinkType.GooglePlayStore:
      return { text: t("for-play-store"), img: { src: "/static/images/android-logo.png", alt: "" } }
    case LinkType.MacOS:
      return { text: t("for-macos"), img: { src: "/static/images/macos-logo.png", alt: "" } }
    case LinkType.Windows:
      return { text: t("for-windows"), img: { src: "/static/images/windows-logo.png", alt: "" } }
    default:
      return null
  }
}

function DownloadLinks(props: { t: TranslateFn; resource: Resource; lang: string }) {
  const { t, resource, lang } = props
  return (
    <div className="downloads">
      <h3>{t("downloads")}</h3>
      <div className="links">
        {resource.links?.map((link) => {
          const info = parseLinkType(link.type!, props.t)
          const text = selectLocale(lang, link.text)
          if (info == null) {
            return <DownloadButton title={text ?? ""} href={link.url.href} large={true} />
          }
          return (
            <DownloadButton
              title={text ?? ""}
              description={info.text}
              href={link.url.href}
              img={{ src: info.img?.src, alt: info.img?.alt }}
              large={true}
            />
          )
        })}
      </div>
    </div>
  )
}

export default function ResourceLayout(page: PageData & ResourceProps & FluentPage) {
  const { resource, lang, search } = page
  const t = page.fluentBundle(lang, "_includes/resource")
  const categories = getCategoryData()
  const languages = getLanguageData()

  const posts = search.pages(["type=post", `lang=${lang}`], "date=desc").slice(0, 3)

  const name = selectLocale(lang, resource.name)
  const description = selectLocale(lang, resource.description)
  const isPahkat = resource.type === ResourceType.Pahkat

  return (
    <div className="resource" data-pagefind-filter={`type:resource`}>
      <div className="content-wrapper">
        <div className="content">
          <div>
            <CategoryLabel category={t("resource")} />
            <h1>{name}</h1>
            {description != null && (
              <p>
                {description}
              </p>
            )}
          </div>
          <div className="tags-wrapper">
            <a
              className="tag tag-category"
              href={`/category/${resource.category}`}
              data-pagefind-filter={`category:${resource.category}`}
            >
              {translateCategoryName(lang, resource.category)}
            </a>
            {resource.languages.map((lang, key) => {
              return (
                <LanguageTag
                  key={key}
                  text={autonym(lang)}
                  href={`/language/${lang}`}
                  pagefindFilter={`language:${lang}`}
                />
              )
            })}
          </div>
          <div className="meta-wrapper section">
            {resource.release && (
              <>
                <div className="meta">
                  <span>{t("release")}</span>
                  <p>{resource.release.version}</p>
                </div>
                <div className="meta">
                  <span>{t("platforms")}</span>
                  <p>{resource.release.platforms.join(", ")}</p>
                </div>
                {resource.release.authors && resource.release.authors.length > 0 && (
                  <div className="meta">
                    <span>{t("authors")}</span>
                    <p>{resource.release.authors.join(", ")}</p>
                  </div>
                )}
              </>
            )}
          </div>
          <p className="section">
            Duis sit amet nibh nunc. Pellentesque vel est eget lorem posuere pellentesque nec sit amet nunc. Curabitur
            ligula enim, ornare eu mauris vitae, pellentesque laoreet nisi. Proin id mi at sapien condimentum laoreet.
            Pellentesque ligula magna, venenatis fringilla tempus ut, posuere a erat. Morbi non odio hendrerit, mollis
            mi ac, suscipit dolor. Donec ut posuere quam. Phasellus purus erat, commodo nec congue eu, porta id enim.
          </p>
          <div className="documentation section">
            <h3>
              Documentation
            </h3>
            <p>Last updated: 2023-07-16, 23:37</p>
            <p className="description">
              Duis sit amet nibh nunc. Pellentesque vel est eget lorem posuere pellentesque nec sit amet nunc. Curabitur
              ligula enim, ornare eu mauris vitae, pellentesque laoreet nisi. Proin id mi at sapien condimentum laoreet.
              Pellentesque ligula magna, venenatis fringilla tempus ut, posuere a erat. Morbi non odio hendrerit, mollis
              mi ac, suscipit dolor. Donec ut posuere quam. Phasellus purus erat, commodo nec congue eu, porta id enim.
            </p>
          </div>
          {isPahkat ? <PahkatInfo t={t} /> : <DownloadLinks t={t} resource={resource} lang={lang} />}
        </div>

        <div className="related-documentation">
          <p className="description">
            {t("borealium-description")}
          </p>
          <div className="categories">
            <dl>
              <dt>
                <img style={{ height: "16px" }} src={"/static/images/tag-category.svg"} alt="" /> {t("categories")}
              </dt>
              {Object.entries(categories).map(([key, value]) => {
                return (
                  <dd key={key}>
                    <a href={`/category/${key}`}>{selectLocale(lang, value)?.name}</a>
                  </dd>
                )
              })}
            </dl>
            <dl>
              <dt>
                <img style={{ height: "16px" }} src={"/static/images/tag-language.svg"} alt="" /> {t("languages")}
              </dt>
              {Object.entries(languages.languages)
                .filter(([key, value]) => !languages.uiOnly.includes(key))
                .map(
                  ([key, value]) => {
                    return (
                      <dd key={key}>
                        <a href={`/language/${key}`}>{value.autonym}</a>
                      </dd>
                    )
                  },
                )}
            </dl>
          </div>
        </div>
      </div>
      <Aside
        t={t}
        category={t("news")}
        posts={posts.map((post) => {
          const { id, title, category, date, originalUrl } = post as Data<PageData>

          return {
            id: id,
            date: date?.toISOString(),
            tag: category,
            title: title,
            url: originalUrl,
          } as SimplePost
        })}
      />
    </div>
  )
}
