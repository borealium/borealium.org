import { Page } from "../../../utils/data-types.ts";
import { Related } from "../../../utils/related-tools.ts";

import { Breadcrumbs } from "../components/breadcrumbs.tsx";

export const layout = "layouts/base.tsx";

export default function (page: Page & { related: Related }) {
  const { title, related, tags, search } = page;

  const categoryTag = tags?.find((tag) => tag.startsWith("cat:"));
  const category = categoryTag?.split(":")[1];
  const relatedByCategory = search.pages(categoryTag);

  const languageTag = tags?.find((tag) => tag.startsWith("lang:"));
  const language = languageTag?.split(":")[1];
  const relatedByLanguage = search.pages(languageTag);

  return (
    <>
      <Breadcrumbs {...page} />
      <main>
        <h1>{title}</h1>
        <aside>
          <h2>Related Tools</h2>

          {relatedByCategory.length > 0 && (
            <article>
              <h3>
                <a href={`/categories/${category}`}>By category</a>
              </h3>
              <ul>
                {relatedByCategory.map((tool) => {
                  if (!tool) throw new Error("No tool found");

                  return (
                    <li>
                      <a href={tool.data.url}>{tool.data.title}</a>
                    </li>
                  );
                })}
              </ul>
            </article>
          )}
          {relatedByLanguage.length > 0 && (
            <article>
              <h3>
                <a href={`/languages/${language}`}>By language</a>
              </h3>
              <ul>
                {relatedByLanguage.map((tool) => {
                  if (!tool) throw new Error("No tool found");

                  return (
                    <li>
                      <a href={tool.data.url}>{tool.data.title}</a>
                    </li>
                  );
                })}
              </ul>
            </article>
          )}
        </aside>
      </main>
    </>
  );
}
