import { Page } from "../../../utils/data-types.ts";

export function Breadcrumbs({ nav, url }: Page) {
  return (
    <ul className="breadcrumbs">
      {nav.breadcrumb(url as string).map(({ data, slug }) => (
        <li>
          {data ? (
            <a href={data!.url as string}>{data!.title || ""}</a>
          ) : (
            <span>{slug}</span>
          )}
        </li>
      ))}
    </ul>
  );
}
