import { Page } from "../../../utils/data-types.ts";

export const layout = "layouts/base.tsx";

export default function ({ title, languages }: Page) {
  return (
    <main>
      <h1>{title}</h1>
      <ul>
        {Object.entries(languages.languages).map(([label, { name }]) => (
          <li>
            <a href={`/languages/${label}`}>{name}</a>
          </li>
        ))}
      </ul>
    </main>
  );
}
