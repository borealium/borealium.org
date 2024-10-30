import { FluentBundle } from "@fluent/bundle"
import { Data, PageData } from "lume/core.ts"
import Aside, { SimplePost } from "~/_components/aside.tsx"
import { DownloadButton } from "~/_components/download-button.tsx"
import { CategoryLabel } from "~/_components/label.tsx"
import LanguageTag from "~/_components/tag.tsx"
import { script } from "~/_includes/lang-redir.tsx"
import { Markdown } from "~/_includes/markdown.ts"
import { getCategoryData, translateCategoryName } from "~plugins/category-data.ts"
import { FluentPage, TranslateFn } from "~plugins/fluent.ts"
import { autonym, getLanguageData, selectLocale } from "~plugins/language-data.ts"
import { LinkType, Resource, ResourceType } from "~types/resource.ts"

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
  const lang_t = page.fluentBundle(lang, "languages")
  const categories = getCategoryData()
  const languages = getLanguageData()

  if (resource.category === "voices") {
    resource.integrations = [
      {
        type: "tts",
        voices: [
          {
            language: "se",
            name: "Biret",
            gender: "female",
            apiUrl: "https://tts.divvun.user.town/se/female/",
            sampleText: "Bures, mu namma lea Biret. Mun lean Divvuma davvisámi dahkujietna.",
          },
          {
            language: "smj",
            name: "Nihkol",
            gender: "male",
            apiUrl: "https://tts.divvun.user.town/smj/male/",
            sampleText: "Buoris, muv namma l Nihkol. Mån lav Divvuna julevsáme dahkojiedna.",
          },
          {
            language: "smj",
            name: "Ábmut",
            gender: "male",
            apiUrl: "https://tts.divvun.user.town/smj/male/?speaker=1",
            sampleText: "Buoris, muv namma l Ábmut. Mån lav Divvuna julevsáme dahkojiedna.",
          },
          {
            language: "smj",
            name: "Siggá",
            gender: "female",
            apiUrl: "https://tts.divvun.user.town/smj/female/",
            sampleText: "Buoris, muv namma l Siggá. Mån lav Divvuna julevsáme dahkojiedna.",
          },
          {
            language: "sma",
            name: "Aanna",
            gender: "female",
            apiUrl: "https://tts.divvun.user.town/sma/female/",
            sampleText: "Buerie biejjie, mov nomme Aanna. Manne leam Divvunen åarjelsaemien dorjeldhgïele.",
          },
        ],
      },
    ]
  }

  const posts = search.pages(["type=post", `lang=${lang}`], "date=desc").slice(0, 3)

  const name = selectLocale(lang, resource.name)
  const description = selectLocale(lang, resource.description)
  const moreInfo = resource.moreInfo != null ? selectLocale(lang, resource.moreInfo) : null
  const isPahkat = resource.type === ResourceType.Pahkat

  const voices =
    resource.integrations?.filter((ttsIntegration) => ttsIntegration.type === "tts" && ttsIntegration).flatMap((
      ttsIntegration,
    ) =>
      ttsIntegration.voices.filter((ttsVoice) =>
        ttsVoice.language === resource.languages[0] && ttsVoice.gender === resource.id.split("-").at(-1)
      )
    ) ?? []

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
            <textarea className="speak-value" defaultValue={voices[0]?.sampleText} />
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
              console.log("Click")
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
                audio.innerHTML = ""
                const src = document.createElement('source')
                src.src = URL.createObjectURL(blob)
                src.type = "audio/x-wav"
                audio.appendChild(src)
                audio.load()
                audio.play()
                button.disabled = false
                button.innerText = "Speak"
              })
              .catch((e) => {
                console.error(e)
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
              {description != null && <Markdown as="p" className="description">{description}</Markdown>}
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
            {moreInfo != null && <Markdown className="section">{moreInfo}</Markdown>}
            {isPahkat
              ? <PahkatInfo resource={resource} t={t} />
              : <DownloadLinks t={t} resource={resource} lang={lang} />}
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
                            title={lang_t(key)}
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
