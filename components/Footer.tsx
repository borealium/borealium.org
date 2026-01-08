import type { LangTag } from "~types/language.ts"

interface FooterProps {
  lang: LangTag
  t: (
    key: string,
    opts?: { fallback?: string; args?: Record<string, string> },
  ) => string
}

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
      { id: "github", url: "https://github.com/borealium/borealium.org" },
    ],
  },
  {
    id: "documentation",
    urls: [{ id: "maintaining-this-website", url: "/doc/website" }],
  },
]

function LinkGroup({
  links,
  lang,
  t,
}: {
  links: LinkGroupType
  lang: LangTag
  t: FooterProps["t"]
}) {
  return (
    <div class="link-group">
      <span>{t(links.id, { fallback: links.id })}</span>
      <ul>
        {links.urls.map(({ id, url }) => {
          // Add language prefix for internal URLs
          const href = url.startsWith("http") ? url : `/${lang}${url}`
          return (
            <li key={id}>
              <a href={href}>{t(id, { fallback: id })}</a>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

function FullLogo() {
  return <img src="/static/images/borealium-full-logo.svg" alt="Borealium" />
}

function Star() {
  return (
    <svg
      class="star"
      width="64"
      height="64"
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M32 0L34.2911 21.0939C34.784 25.632 38.368 29.216 42.9061 29.7089L64 32L42.9061 34.2911C38.368 34.784 34.784 38.368 34.2911 42.9061L32 64L29.7089 42.9061C29.216 38.368 25.632 34.784 21.0939 34.2911L0 32L21.0939 29.7089C25.632 29.216 29.216 25.632 29.7089 21.0939L32 0Z"
        fill="#FDFDFD"
      />
    </svg>
  )
}

export function Footer({ lang, t }: FooterProps) {
  const currentYear = new Date().getFullYear().toString()

  return (
    <footer class="footer">
      <div>
        <FullLogo />
        <p class="copyright">
          {t("website-copyright", {
            fallback: `© ${currentYear} UiT`,
            args: { year: currentYear },
          })}
        </p>
      </div>
      <div class="footer-content">
        <div class="links">
          {LINKS.map((x) => (
            <LinkGroup
              key={x.id}
              links={x}
              lang={lang}
              t={t}
            />
          ))}
        </div>
        <div class="footer-info">
          <div class="info-text">
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
