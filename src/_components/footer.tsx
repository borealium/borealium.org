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
      { id: "privacy", url: "/privacy" },
/*      { id: "divvun", url: "https://divvun.no/" }, */
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
        <p className="copyright">{props.t("website-copyright", { year: currentYear })}</p>
      </div>
      <div className="footer-content">
        <div className="links">
          {LINKS.map((x) => <LinkGroup links={x} t={props.t} />)}
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
      </div>
    </footer>
  )
}

function FullLogo() {
  return <img src="/static/images/borealium-full-logo.svg" alt="" />
}

function Star() {
  return (
    <svg className="star" width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M32 0L34.2911 21.0939C34.784 25.632 38.368 29.216 42.9061 29.7089L64 32L42.9061 34.2911C38.368 34.784 34.784 38.368 34.2911 42.9061L32 64L29.7089 42.9061C29.216 38.368 25.632 34.784 21.0939 34.2911L0 32L21.0939 29.7089C25.632 29.216 29.216 25.632 29.7089 21.0939L32 0Z"
        fill="#FDFDFD"
      />
    </svg>
  )
}
