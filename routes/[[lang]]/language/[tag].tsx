import { Head } from "fresh/runtime"
import { HttpError, page } from "fresh"
import { marked } from "marked"
import { define } from "../../../utils.ts"
import {
  createTranslator,
  getLanguageInfo,
  selectLocale,
} from "../../../lib/i18n.ts"
import languagesData from "../../../data/languages.ts"
import { getResourcesByLanguage } from "../../../data/resourceIndex.ts"
import { CategoryLabel } from "../../../components/CategoryLabel.tsx"
import type { Resource } from "../../../types/resource.ts"

export const handler = define.handlers({
  GET(ctx) {
    const { tag } = ctx.params

    // Validate language exists
    if (!languagesData.languages[tag]) {
      throw new HttpError(404, `Language "${tag}" not found`)
    }

    return page()
  },
})

export default define.page(function LanguagePage({ params, state }) {
  const { tag } = params
  const { lang, i18n } = state
  const { t } = i18n

  const langT = createTranslator(lang, "languages")
  const categoryT = createTranslator(lang, "categories")

  const languageInfo = getLanguageInfo(tag)
  const languageName = langT(tag, { fallback: languageInfo.autonym })
  const languageDescription = langT(`${tag}-description`, { fallback: "" })

  const resources = getResourcesByLanguage(tag)

  // Group resources by category
  const resourcesByCategory: Record<string, Resource[]> = {}
  for (const resource of resources) {
    if (!resourcesByCategory[resource.category]) {
      resourcesByCategory[resource.category] = []
    }
    resourcesByCategory[resource.category].push(resource)
  }

  return (
    <>
      <Head>
        <title>{languageName} | Borealium</title>
        <meta
          name="description"
          content={`Language technology resources for ${languageName}`}
        />
      </Head>

      <div class="category-index">
        <div class="content">
          <div>
            <CategoryLabel category={t("language", { fallback: "Language" })} />
            <h1 title={languageName}>{languageName}</h1>
            {languageDescription &&
              languageDescription !== `${tag}-description` && (
              <p>{languageDescription}</p>
            )}
          </div>
          <div class="search-page-results">
            {resources.length === 0 && (
              <div>
                {t("no-resources-in-category", {
                  fallback: "No resources were found for this language.",
                })}
              </div>
            )}
            {Object.entries(resourcesByCategory).map((
              [category, categoryResources],
            ) => (
              <div key={category} class="category">
                <a
                  class="tag tag-category"
                  href={`/${lang}/category/${category}`}
                >
                  {categoryT(category, { fallback: category })}
                </a>
                <ul>
                  {categoryResources.map((resource) => (
                    <ResourceListItem
                      key={resource.id}
                      resource={resource}
                      lang={lang}
                    />
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
})

function ResourceListItem(
  { resource, lang }: { resource: Resource; lang: string },
) {
  const name = selectLocale(lang, resource.name) ?? resource.id
  const description = selectLocale(lang, resource.description)

  return (
    <li class="search-result">
      <a href={`/${lang}/resource/${resource.id}`}>
        <img src="/static/images/tag-resource.svg" alt="" />
        <strong>{name}</strong>
      </a>
      {description && (
        <p
          class="description"
          dangerouslySetInnerHTML={{
            __html: marked.parse(description) as string,
          }}
        />
      )}
    </li>
  )
}
