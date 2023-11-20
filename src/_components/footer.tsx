import { TranslateFn } from "~plugins/fluent.ts"

type LinkGroupType = {
  id: string
  urls: Array<{ id: string; url: string }>
}

const LINKS: LinkGroupType[] = [
  {
    id: "information",
    urls: [
      { id: "about-us", url: "/about" },
      { id: "history", url: "/history" },
      { id: "divvun", url: "https://divvun.no/" },
    ],
  },
  {
    id: "documentation",
    urls: [
      { id: "maintaining-this-website", url: "/doc/website/" },
    ],
  },
]

function LinkGroup(props: { links: LinkGroupType; t: TranslateFn }) {
  const { t } = props

  return (
    <div className="link-group">
      <span>{t(props.links.id)}</span>
      <ul>
        {props.links.urls.map(({ id, url }) => {
          return (
            <li key={id}>
              <a href={url}>{t(id)}</a>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export function Footer(props: { t: TranslateFn }) {
  const currentYear = new Date().getFullYear().toString()
  return (
    <footer className="footer">
      <div>
        <FullLogo />
        <p className="copyright">Copyright © {currentYear} {props.t("website-copyright")}</p>
      </div>
      <div style={{ flexGrow: 1 }}>
        <div className="links">
          {LINKS.map((x) => <LinkGroup links={x} t={props.t} />)}
        </div>
      </div>
      <div className="footer-info">
        <div className="info-text">
          <span>UiT The Arctic University of Norway</span>
          <p>PO Box 6050 Langnes</p>
          <p>N-9037 Tromsø</p>
          <p>Norway</p>
        </div>
        <Star />
      </div>
    </footer>
  )
}

function FullLogo() {
  return <img src="/static/images/borealium-full-logo.svg" alt="" />
}

function Star() {
  return (
    <svg width="119" height="170" viewBox="0 0 119 170" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M73.4693 77.7439L-3.75065e-06 84.1951L73.4693 90.1829C77.9335 90.5486 80.3293 95.0319 80.7128 99.5122L86.9215 170L93.1302 99.5122C93.4131 96.1184 96.1124 92.8347 99.3638 91.22L99.3384 91.22L99.44 91.1825C100.089 90.8664 100.759 90.6169 101.435 90.4462L118.999 83.9639L118.999 88.0528L119 88.0512L119 83.9637L119 79.8178L118.999 79.8166L118.999 83.9639L118.999 83.9639L100.373 77.2261L100.467 77.2235C96.7871 76.0737 93.438 73.1366 93.1302 69.4512L86.9215 -3.79946e-06L80.7128 69.4512C80.3274 73.9602 77.9648 77.4125 73.4693 77.7439Z"
        fill="#FDFDFD"
      />
    </svg>
  )
}
