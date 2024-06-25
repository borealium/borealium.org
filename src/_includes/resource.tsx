import { FluentBundle } from "@fluent/bundle"
import { Data, Page, PageData } from "lume/core.ts"
import { DownloadButton } from "~/_components/download-button.tsx"
import { LinkType, Resource, ResourceType, TtsIntegration } from "~types/resource.ts"
import { CategoryLabel } from "~/_components/label.tsx"
import Aside, { SimplePost } from "~/_components/aside.tsx"
import LanguageTag from "~/_components/tag.tsx"
import { FluentPage, TranslateFn } from "~plugins/fluent.ts"
import { autonym, getLanguageData, selectLocale } from "~plugins/language-data.ts"
import { getCategoryData, translateCategoryName } from "~plugins/category-data.ts"
import * as marked from "marked"
import dedent from "dedent"
import { useState } from "react"
import { script } from "~/_includes/lang-redir.tsx"

export const layout = "base.tsx"

type ResourceProps = {
  resource: Resource
  fluentBundle: FluentBundle
  lang: string
}

function PahkatInfo({ resource, t }: { resource: Resource; t: TranslateFn }) {
  if (resource.release == null) {
    return <></>
  }

  const dm = (
    <div>
      <h3>{t("available-on-divvun-manager")}</h3>
      <p>{t("divvun-manager-description")}</p>
      <div style={{ marginTop: "16px" }}>
        <DownloadButton
          title={t("dm-button-title")}
          description={t("dm-button-description")}
          href="/resource/divvun-manager"
        />
      </div>
    </div>
  )

  const dk = (
    <div>
      <h3>{t("available-in-divvun-keyboard-app")}</h3>
      <p>{t("divvun-keyboard-description")}</p>
      <div style={{ marginTop: "16px" }}>
        <DownloadButton
          title={t("dk-button-title")}
          description={t("dk-button-description")}
          href="/resource/divvun-keyboard"
        />
      </div>
    </div>
  )

  const isRelevantCategory = resource.category === "keyboard-layouts" || resource.category === "spellers"
  const isMobileKeyboard = isRelevantCategory && resource.release.platforms.includes("mobile")
  const isOnDivvunManager = resource.release.platforms.includes("macos") ||
    resource.release.platforms.includes("windows")

  return (
    <div className="downloads">
      {isOnDivvunManager && dm}
      {isMobileKeyboard && dk}
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

  if (resource.links == null) {
    return <></>
  }

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

  if (resource.category === "voices") {
    resource.integrations = [
      {
        type: "tts",
        voices: [{
          name: "Biret",
          gender: "female",
          apiUrl: "https://tts.divvun.user.town/se/female/",
          sampleText: "Bures, mu namma lea Biret. Mun lean Divvuma davvisámi dahkujietna.",
        }, {
          name: "Nihkol",
          gender: "male",
          apiUrl: "https://tts.divvun.user.town/smj/male/",
          sampleText: "Buoris, muv namma l Nihkol. Mån lav Divvuna julevsáme dahkojiedna.",
        }, {
          name: "Ábmut",
          gender: "male",
          apiUrl: "https://tts.divvun.user.town/smj/male/?speaker=1",
          sampleText: "Buoris, muv namma l Ábmut. Mån lav Divvuna julevsáme dahkojiedna.",
        }, {
          name: "Siggá",
          gender: "female",
          apiUrl: "https://tts.divvun.user.town/smj/female/",
          sampleText: "Buoris, muv namma l Siggá. Mån lav Divvuna julevsáme dahkojiedna.",
        }],
      },
    ]
  }

  const posts = search.pages(["type=post", `lang=${lang}`], "date=desc").slice(0, 3)

  const name = selectLocale(lang, resource.name)
  const description = selectLocale(lang, resource.description)
  const moreInfo = resource.moreInfo != null ? selectLocale(lang, resource.moreInfo) : null
  const isPahkat = resource.type === ResourceType.Pahkat

  const voices = resource.integrations?.filter((x) => x.type === "tts").flatMap((x) => x.voices) ?? []

  return (
    <>
      {resource.category === "voices" && (
        <template id="tts-integration">
          <style>
            {`
          * {
            box-sizing: border-box;
          }
          .container {
            margin-top: 32px;
            width: 100%;
            display: flex;
            flex-direction: column;
            gap: 16px;
          }
          textarea {
            width: 100%;
            background-color: #30334a;
            color: white;
            font-size: 28px;
            padding: 16px;
            resize: vertical;
            border-radius: 4px;
            min-height: 200px;
          }
          .button {
            border: 2px solid var(--color-border);
            border-radius: 8px;
            height: 64px;
            width: 66%;
            text-transform: uppercase;
            align-self: center;
            font-weight: bold;
          }
          .button:hover {
            color: var(--color-text-secondary);
            background-color: var(--color-highlight);
            border-color: var(--color-highlight);
          }
          .button[disabled] {
            background-color: var(--color-border);
            color: var(--color-text-secondary);
            border-color: var(--color-text-secondary);
            cursor: wait;
          }
          audio {
            align-self: center;
          }
          label {
            font-weight: bold;
            display: flex;
            gap: 16px;
            align-items: center;
          }
        `}
          </style>
          <div className="container">
            <h3>Test the voice!</h3>
            <label>
              <span>Voice:</span>
              <select className="voices-list">
                {voices.map((voice) => {
                  return <option data-sample={voice.sampleText} value={voice.apiUrl}>{voice.name}</option>
                })}
              </select>
            </label>
            <textarea className="speak-value">
              {voices[0]?.sampleText}
            </textarea>
            <button className="button speak-button">Speak</button>
            <audio className="speak-audio" controls autoPlay />
          </div>
          {script(`
          const list = document.querySelector(".voices-list")
          const textarea = document.querySelector(".speak-value")
          const button = document.querySelector(".speak-button")
          const audio = document.querySelector(".speak-audio")
          list.addEventListener("change", (e) => {
            textarea.value = list.selectedOptions[0].getAttribute("data-sample")
          })
          button.addEventListener("click", () => {
            button.disabled = true
            button.innerText = "Generating..."
            const url = list.value
            fetch(url, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                text: textarea.value
              }),
            }).then((response) => response.blob())
            .then((blob) => {
              audio.src = URL.createObjectURL(blob)
              button.disabled = false
              button.innerText = "Speak"
            })
          })
        `)}
        </template>
      )}
      <div className="resource" data-pagefind-filter={`type:resource`}>
        <div className="content-wrapper">
          <div className="content">
            <div>
              <CategoryLabel category={t("resource")} />
              <h1>{name}</h1>
              {description != null && (
                <p className="description">
                  {description}
                </p>
              )}
            </div>
            <div className="tags-wrapper">
              {resource.tags != null && (
                <div aria-hidden style={{ display: "none" }}>
                  {resource.tags.map((x) => {
                    return <div className="tag">{x}</div>
                  })}
                </div>
              )}

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
                  {resource.release.version && (
                    <div className="meta">
                      <span>{t("release")}</span>
                      <p>
                        <code>{resource.release.version}</code>
                      </p>
                    </div>
                  )}
                  <div className="meta">
                    <span>{t("platforms")}</span>
                    <p>{resource.release.platforms.map((p) => t(p)).join(", ")}</p>
                  </div>
                  {resource.release.authors && resource.release.authors.length > 0 && (
                    <div className="meta">
                      <span>{t("authors")}</span>
                      <p>{resource.release.authors.join(", ")}</p>
                    </div>
                  )}
                  {resource.documentationUrl && (
                    <div className="meta">
                      <span>{t("documentation")}</span>
                      <p>
                        <a href={resource.documentationUrl}>
                          <img
                            style={{ height: "16px", float: "left", marginTop: "3px", marginRight: "6px" }}
                            src={"/static/images/tag-page.svg"}
                            alt=""
                          />{" "}
                          {name}
                        </a>
                      </p>
                    </div>
                  )}
                </>
              )}
            </div>
            {moreInfo != null && (
              <div
                className="section"
                dangerouslySetInnerHTML={{ __html: marked.parse(dedent(moreInfo)) }}
              />
            )}
            {isPahkat
              ? <PahkatInfo resource={resource} t={t} />
              : <DownloadLinks t={t} resource={resource} lang={lang} />}

            {resource.integrations?.map((integration, i) => {
              switch (integration.type) {
                case "tts":
                  return <></>
                  // return <TtsIntegrationView resource={resource} integration={integration} key={i} />
                default:
                  return <></>
              }
            })}
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
                  .filter(([key]) => !languages.uiOnly.includes(key))
                  .map(
                    ([key]) => {
                      return (
                        <dd key={key}>
                          <a
                            title={selectLocale(lang, languages.languages[key].name)}
                            href={`/language/${key}`}
                          >
                            {autonym(key)}
                          </a>
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
      {resource.category === "voices" && script(`
const el = document.querySelector("#tts-integration");
const firstClone = el.content.cloneNode(true);
const res = document.querySelector(".content")
res.appendChild(firstClone)
      `)}
    </>
  )
}

// function TtsIntegrationView(props: { resource: Resource; integration: TtsIntegration }) {
//   const [selectedVoice, setSelectedVoice] = useState(0)
//   const [text, setText] = useState(props.integration.voices[selectedVoice].sampleText)

//   return <>
//     <select value={selectedVoice}>
//       {props.integration.voices.map((voice, i) => {
//         return <option key={i} value={i}>{voice.name}</option>
//       })}
//     </select>
//     <textarea value={text} onInput={(e) => setText(e.target.value)}>
//       {}
//     </textarea>
//   </>
// }

// class TtsIntegration extends HTMLElement {
//   constructor() {
//     // Always call super first in constructor
//     super()
//   }

//   connectedCallback() {
//     // Create a shadow root
//     const shadow = this.attachShadow({ mode: "open" })

//     // Create spans
//     const wrapper = document.createElement("span")
//     wrapper.setAttribute("class", "wrapper")

//     const icon = document.createElement("span")
//     icon.setAttribute("class", "icon")
//     icon.setAttribute("tabindex", "0")

//     const info = document.createElement("span")
//     info.setAttribute("class", "info")

//     // Take attribute content and put it inside the info span
//     const text = this.getAttribute("data-text")
//     info.textContent = text

//     // Insert icon
//     let imgUrl: string
//     if (this.hasAttribute("img")) {
//       imgUrl = this.getAttribute("img") as string
//     } else {
//       imgUrl = "img/default.png"
//     }

//     const img = document.createElement("img")
//     img.src = imgUrl
//     icon.appendChild(img)

//     // Create some CSS to apply to the shadow dom
//     const style = document.createElement("style")
//     console.log(style.isConnected)

//     style.textContent = `
//       .wrapper {
//         position: relative;
//       }

//       .info {
//         font-size: 0.8rem;
//         width: 200px;
//         display: inline-block;
//         border: 1px solid black;
//         padding: 10px;
//         background: white;
//         border-radius: 10px;
//         opacity: 0;
//         transition: 0.6s all;
//         position: absolute;
//         bottom: 20px;
//         left: 10px;
//         z-index: 3;
//       }

//       img {
//         width: 1.2rem;
//       }

//       .icon:hover + .info, .icon:focus + .info {
//         opacity: 1;
//       }
//     `

//     // Attach the created elements to the shadow dom
//     shadow.appendChild(style)
//     console.log(style.isConnected)
//     shadow.appendChild(wrapper)
//     wrapper.appendChild(icon)
//     wrapper.appendChild(info)
//   }
// }
