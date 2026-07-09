import { HttpError, page } from "fresh"
import { Head } from "fresh/runtime"
import { marked } from "marked"
import { define } from "../../../utils.ts"
import { getResourceById } from "~data/resourceIndex.ts"
import { getRecentPosts } from "~lib/markdown.ts"
import {
  autonym,
  createTranslator,
  getAllLanguages,
  selectLocale,
} from "~lib/i18n.ts"
import { LinkType, ResourceType } from "~types/resource.ts"
import type { Resource } from "~types/resource.ts"
import { CategoryLabel } from "../../../components/CategoryLabel.tsx"
import { DownloadButton } from "../../../components/DownloadButton.tsx"
import { Aside } from "../../../components/Aside.tsx"
import { LanguageTag } from "../../../components/Tag.tsx"
import { getUICategories } from "../../../data/categories.ts"
import { getTtsConfig } from "~data/ttsConfig.ts"
import TtsTest from "../../../islands/TtsTest.tsx"

const KEYBOARD_VIEWER_EMBED_URL = "https://keyboard.giellalt.org/embed"
// const KEYBOARD_VIEWER_EMBED_URL = "http://localhost:5177/embed"

/**
 * Fetches keyboard-viewer's static embed for `kbd` server-to-server and pulls
 * its `data-embed-height` out of the raw HTML, so the iframe below can be
 * given the correct height from first paint even with JS disabled — no-JS
 * visitors never run the postMessage-based resize script, so this is the
 * only chance to get their iframe sized correctly. Returns null (falling
 * back to a fixed guess) if keyboard-viewer is unreachable or the attribute
 * is missing.
 */
async function fetchEmbedHeight(kbd: string): Promise<number | null> {
  try {
    const url =
      `${KEYBOARD_VIEWER_EMBED_URL}?kbd=${kbd}&interactive=false&width=900`
    const res = await fetch(url)
    if (!res.ok) { return null }
    const html = await res.text()
    const match = html.match(/data-embed-height="(\d+)"/)
    return match ? Number(match[1]) : null
  } catch {
    return null
  }
}

export const handler = define.handlers({
  async GET(ctx) {
    const { id } = ctx.params
    const resource = getResourceById(id)

    if (!resource) {
      throw new HttpError(404, `Resource not found: ${id}`)
    }

    ctx.state.resource = resource

    if (
      resource.category === "keyboard-layouts" &&
      resource.id !== "divvun-keyboard"
    ) {
      ctx.state.keyboardEmbedHeight = await fetchEmbedHeight(
        resource.id.replace(/^keyboard-/, ""),
      )
    }

    // Get recent posts for sidebar
    const recentPosts = await getRecentPosts(3)
    ctx.state.recentPosts = recentPosts.map((post) => ({
      id: post.slug,
      title: post.frontmatter.title,
      date: post.frontmatter.date,
      tag: post.frontmatter.category ?? "news",
      url: `/${ctx.state.lang}/post/${post.slug}/`,
      excerpt: post.content.slice(0, 150) + "...",
    }))

    return page()
  },
})

function parseLinkType(type: LinkType | undefined, t: (key: string) => string) {
  switch (type) {
    case LinkType.AppleAppStore:
      return {
        text: t("for-apple-app-store"),
        img: { src: "/static/images/ios-logo.png", alt: "" },
      }
    case LinkType.GooglePlayStore:
      return {
        text: t("for-play-store"),
        img: { src: "/static/images/android-logo.png", alt: "" },
      }
    case LinkType.MacOS:
      return {
        text: t("for-macos"),
        img: { src: "/static/images/macos-logo.png", alt: "" },
      }
    case LinkType.Windows:
      return {
        text: t("for-windows"),
        img: { src: "/static/images/windows-logo.png", alt: "" },
      }
    default:
      return null
  }
}

function PahkatInfo({
  resource,
  t,
  lang,
}: {
  resource: Resource
  t: (key: string) => string
  lang: string
}) {
  if (!resource.release) {
    return null
  }

  const isRelevantCategory = resource.category === "keyboard-layouts" ||
    resource.category === "spellers"
  const isMobileKeyboard = isRelevantCategory &&
    resource.release.platforms.includes("mobile")
  const isOnDivvunManager = resource.release.platforms.includes("macos") ||
    resource.release.platforms.includes("windows")

  return (
    <div class="downloads">
      {isOnDivvunManager && (
        <div>
          <h3>{t("available-on-divvun-manager")}</h3>
          <p>{t("divvun-manager-description")}</p>
          <div style={{ marginTop: "16px" }}>
            <DownloadButton
              title={t("dm-button-title")}
              description={t("dm-button-description")}
              href={`/${lang}/resource/divvun-manager/`}
            />
          </div>
        </div>
      )}
      {isMobileKeyboard && (
        <div>
          <h3>{t("available-in-divvun-keyboard-app")}</h3>
          <p>{t("divvun-keyboard-description")}</p>
          <div style={{ marginTop: "16px" }}>
            <DownloadButton
              title={t("dk-button-title")}
              description={t("dk-button-description")}
              href={`/${lang}/resource/divvun-keyboard/`}
            />
          </div>
        </div>
      )}
    </div>
  )
}

function DownloadLinks({
  resource,
  t,
  lang,
}: {
  resource: Resource
  t: (key: string) => string
  lang: string
}) {
  if (!resource.links || resource.links.length === 0) {
    return null
  }

  return (
    <div class="downloads">
      <h3>{t("downloads")}</h3>
      <div class="links">
        {resource.links.map((link, idx) => {
          const info = parseLinkType(link.type, t)
          const text = selectLocale(lang, link.text) ?? ""
          if (info == null) {
            return (
              <DownloadButton
                key={idx}
                title={text}
                href={link.url.href}
                large
              />
            )
          }
          return (
            <DownloadButton
              key={idx}
              title={text}
              description={info.text}
              href={link.url.href}
              img={info.img}
              large
            />
          )
        })}
      </div>
    </div>
  )
}

// Listens for the resize messages keyboard-viewer's embed posts (both the
// interactive embed and the static/no-JS embed's progressive-enhancement
// script use the same "giellalt-keyboard-resize" protocol) and applies the
// reported height to whichever iframe sent it.
const KEYBOARD_RESIZE_LISTENER_SCRIPT = `
  window.addEventListener("message", (event) => {
    if (event.data.type === "giellalt-keyboard-resize") {
      const iframes = document.querySelectorAll("iframe")
      for (const iframe of iframes) {
        if (iframe.contentWindow === event.source) {
          iframe.style.height = event.data.height + "px"
          break
        }
      }
    }
  })
`

function KeyboardLayoutEmbed({
  resource,
  t,
  embedHeight,
}: {
  resource: Resource
  t: (key: string, opts?: { fallback?: string }) => string
  embedHeight: number | null | undefined
}) {
  if (
    resource.category !== "keyboard-layouts" ||
    resource.id === "divvun-keyboard"
  ) {
    return null
  }

  const kbd = resource.id.replace(/^keyboard-/, "")
  const src =
    `${KEYBOARD_VIEWER_EMBED_URL}?kbd=${kbd}&interactive=false&width=900`

  return (
    <div class="keyboard-embed section">
      <h3>{t("keyboard-layout", { fallback: "Keyboard layout" })}</h3>
      <iframe
        src={src}
        width="100%"
        height={embedHeight ?? 460}
        loading="lazy"
        style={{ maxWidth: "900px", border: "none" }}
      />
      <script
        // deno-lint-ignore react-no-danger
        dangerouslySetInnerHTML={{ __html: KEYBOARD_RESIZE_LISTENER_SCRIPT }}
      />
    </div>
  )
}

function RelatedDocumentation({
  t,
  lang,
  categoryT,
  langT,
}: {
  t: (key: string) => string
  lang: string
  categoryT: (key: string) => string
  langT: (key: string) => string
}) {
  // Set up collator for locale-aware sorting
  const supportedLocales = Intl.Collator.supportedLocalesOf([lang, "nb"])
  const collatorLocale = supportedLocales[0] ?? "nb"
  const collator = new Intl.Collator(collatorLocale)

  // Sort categories by translated name
  const sortedCategories = [...getUICategories()].sort((a, b) =>
    collator.compare(categoryT(a), categoryT(b))
  )

  // Sort languages by autonym
  const languages = getAllLanguages()
    .filter((l) => !l.isUiOnly)
    .sort((a, b) => collator.compare(autonym(a.tag), autonym(b.tag)))

  return (
    <div class="related-documentation">
      <p class="description">{t("borealium-description")}</p>
      <div class="categories">
        <dl>
          <dt>
            <img
              style={{ height: "16px" }}
              src="/static/images/tag-category.svg"
              alt=""
            />{" "}
            {t("categories")}
          </dt>
          {sortedCategories.map((key) => (
            <dd key={key}>
              <a class="tag tag-category" href={`/${lang}/category/${key}/`}>
                {categoryT(key)}
              </a>
            </dd>
          ))}
        </dl>
        <dl>
          <dt>
            <img
              style={{ height: "16px" }}
              src="/static/images/tag-language.svg"
              alt=""
            />{" "}
            {t("languages")}
          </dt>
          {languages.slice(0, 20).map(({ tag }) => (
            <dd key={tag}>
              <a
                class="tag tag-language"
                title={langT(tag)}
                href={`/${lang}/language/${tag}/`}
              >
                {autonym(tag)}
              </a>
            </dd>
          ))}
        </dl>
      </div>
    </div>
  )
}

export default define.page(function ResourcePage({ state }) {
  const { lang, i18n, recentPosts, keyboardEmbedHeight } = state
  const { t } = i18n
  const resource = state.resource as Resource
  const posts = recentPosts ?? []

  // Create translators
  const resourceT = createTranslator(lang, "_includes/resource")
  const categoryT = createTranslator(lang, "categories")
  const langT = createTranslator(lang, "languages")

  const name = selectLocale(lang, resource.name) ?? resource.id
  const description = selectLocale(lang, resource.description)
  const moreInfo = resource.moreInfo
    ? selectLocale(lang, resource.moreInfo)
    : null
  const isPahkat = resource.type === ResourceType.Pahkat
  const ttsConfig = getTtsConfig(resource.id)

  // Apply TTS config overrides
  const documentationUrl = ttsConfig?.documentationUrl ??
    resource.documentationUrl

  return (
    <>
      <Head>
        <title>{name} | Borealium</title>
        <meta
          name="description"
          content={description ?? `${name} - Language technology resource`}
        />
      </Head>

      <div class="resource">
        <div class="content-wrapper">
          <div class="content">
            <div>
              <CategoryLabel
                category={resourceT("resource", { fallback: "Resource" })}
              />
              <h1>{name}</h1>
              {description && (
                <p
                  class="description"
                  // deno-lint-ignore react-no-danger
                  dangerouslySetInnerHTML={{
                    __html: marked.parse(description) as string,
                  }}
                />
              )}
            </div>

            {/* Tags */}
            <div class="tags-wrapper">
              <a
                class="tag tag-category"
                href={`/${lang}/category/${resource.category}/`}
              >
                {categoryT(resource.category, { fallback: resource.category })}
              </a>
              {resource.languages.map((langTag) => (
                <LanguageTag
                  key={langTag}
                  text={autonym(langTag)}
                  href={`/${lang}/language/${langTag}/`}
                />
              ))}
            </div>

            {/* Meta info */}
            {(resource.release || documentationUrl) && (
              <div class="meta-wrapper section">
                {resource.release?.version && (
                  <div class="meta">
                    <span>{resourceT("release", { fallback: "Release" })}</span>
                    <p>
                      <code>{resource.release.version}</code>
                    </p>
                  </div>
                )}
                {resource.release?.platforms && (
                  <div class="meta">
                    <span>
                      {resourceT("platforms", { fallback: "Platforms" })}
                    </span>
                    <p>
                      {resource.release.platforms.map((p) =>
                        resourceT(p, { fallback: p })
                      ).join(", ")}
                    </p>
                  </div>
                )}
                {resource.release?.authors &&
                  resource.release.authors.length > 0 && (
                  <div class="meta">
                    <span>{resourceT("authors", { fallback: "Authors" })}</span>
                    <p>{resource.release.authors.join(", ")}</p>
                  </div>
                )}
                {documentationUrl && (
                  <div class="meta">
                    <span>
                      {resourceT("documentation", {
                        fallback: "Documentation",
                      })}
                    </span>
                    <p>
                      <a href={documentationUrl}>
                        <img
                          style={{
                            height: "16px",
                            float: "left",
                            marginTop: "3px",
                            marginRight: "6px",
                          }}
                          src="/static/images/tag-page.svg"
                          alt=""
                        />{" "}
                        {name}
                      </a>
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* More info */}
            {moreInfo && (
              <div
                class="section"
                // deno-lint-ignore react-no-danger
                dangerouslySetInnerHTML={{
                  __html: marked.parse(moreInfo) as string,
                }}
              />
            )}

            <KeyboardLayoutEmbed
              resource={resource}
              t={resourceT}
              embedHeight={keyboardEmbedHeight}
            />

            {/* Downloads */}
            {isPahkat
              ? (
                <PahkatInfo
                  resource={resource}
                  t={(key) => resourceT(key, { fallback: key })}
                  lang={lang}
                />
              )
              : (
                <DownloadLinks
                  resource={resource}
                  t={(key) => resourceT(key, { fallback: key })}
                  lang={lang}
                />
              )}

            {/* TTS Testing */}
            {ttsConfig && ttsConfig.voices.length > 0 && (
              <div class="section">
                <h3>
                  {resourceT("test-voice", { fallback: "Test the voice!" })}
                </h3>
                <TtsTest voices={ttsConfig.voices} />
              </div>
            )}
          </div>

          {/* Related documentation */}
          <RelatedDocumentation
            t={(key) => resourceT(key, { fallback: key })}
            lang={lang}
            categoryT={(key) => categoryT(key, { fallback: key })}
            langT={(key) => langT(key, { fallback: key })}
          />
        </div>

        <Aside category={t("news", { fallback: "News" })} posts={posts} t={t} />
      </div>
    </>
  )
})
