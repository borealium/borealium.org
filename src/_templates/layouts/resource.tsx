import { FluentBundle } from "@fluent/bundle"
import { Page } from "lume/core.ts"
import { DownloadButton } from "~/_templates/_components/download-button.tsx"
import { LinkType, Resource } from "~types/resource.ts"
import { CategoryLabel } from "~/_templates/_components/label.tsx"
import Aside, { SimplePost } from "~/_templates/_components/aside.tsx"
import Tag from "~/_templates/_components/tag.tsx"

export const layout = "layouts/base.tsx"

type ResourceProps = {
  resource: Resource
  fluentBundle: FluentBundle
}

export default function ResourceLayout(page: Page & ResourceProps) {
  // const { resource, fluentBundle, lang, search } = page
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

  const posts = [] // search.pages(["type=post", `lang=${lang}`], "date=desc")

  return (
    <div className="resource" data-pagefind-filter={`type:resource`}>
      <div className="content-wrapper">
        <div className="content">
          <div>
            <CategoryLabel context="Borealium" category={resource.category} />
            <h1>{resource.name["en"]}</h1>
            <p>
              {resource.description["en"]}
            </p>
          </div>
          <div className="tags-wrapper">
            <a className="tag" href="/" data-pagefind-filter={`category:${resource.category}`}>{resource.category}</a>
            {resource.languages.map((lang, key) => {
              return <Tag key={key} text={lang} href="/" pagefindFilter={`language:${lang}`} />
            })}
          </div>
          <div className="meta-wrapper section">
            <div className="meta">
              <span>Version</span>
              <p>1.0.1</p>
            </div>
            <div className="meta">
              <span>Author</span>
              <p>Johanna Ahlgren</p>
            </div>
            <div className="meta">
              <span>Version</span>
              <p>© Copyright 2000-2023 Oslo University</p>
            </div>
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
          <div className="downloads">
            <h3>{fluentBundle.getMessage("downloads")?.value as string}</h3>
            <div className="links">
              {resource.links?.map((link) => {
                const info = parseLinkType(link.type!)
                if (info == null) {
                  return <DownloadButton title={link.text["en"]} href={link.url.href} large={true} />
                }
                return (
                  <DownloadButton
                    title={link.text["en"]}
                    description={info.text}
                    href={link.url.href}
                    img={{ src: info.img?.src, alt: info.img?.alt }}
                    large={true}
                  />
                )
              })}
            </div>
          </div>
        </div>
        <div className="related-documentation">
          <p className="description">
            Duis sit amet nibh nunc. Pellentesque vel est eget lorem posuere pellentesque nec sit amet nunc. Curabitur
            ligula enim, ornare eu mauris vitae, pellentesque laoreet nisi. Proin id mi at sapien condimentum laoreet.
            Pellentesque ligula magna, venenatis fringilla tempus ut, posuere a erat. Morbi non odio hendrerit, mollis
            mi ac, suscipit dolor. Donec ut posuere quam. Phasellus purus erat, commodo nec congue eu, porta id enim.
          </p>
          <div className="categories">
            <dl>
              <dt>Category 1</dt>
              <dd>
                <a href="/">Descriptive link 1</a>
              </dd>
              <dd>
                <a href="/">Descriptive link 2</a>
              </dd>
            </dl>
            <dl>
              <dt>Category 2</dt>
              <dd>
                <a href="/">Descriptive link 1</a>
              </dd>
              <dd>
                <a href="/">Descriptive link 2</a>
              </dd>
              <dd>
                <a href="/">Descriptive link 3</a>
              </dd>
              <dd>
                <a href="/">Descriptive link 4</a>
              </dd>
            </dl>
          </div>
        </div>
      </div>
      <Aside
        context="explore"
        category="related"
        posts={posts.map((post) => {
          const { id, title, category, date, lang, originalUrl, author } = post

          return {
            id: id,
            date: date.toISOString(),
            tag: category,
            title: title,
            url: originalUrl,
          } as SimplePost
        })}
      />
    </div>
  )
}
