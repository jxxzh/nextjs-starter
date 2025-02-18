import { createNavigation } from 'next-intl/navigation'
import { defineRouting } from 'next-intl/routing'

interface LocaleConfig {
  code: string
  desc: string
}

export const localesConfig: LocaleConfig[] = [
  { code: 'en', desc: 'English' }, // 英语
  // { code: 'fr', desc: 'Français' }, // 法语
  // { code: 'zh-Hant', desc: '繁體中文' }, // 繁体中文
]

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: localesConfig.map(({ code }) => code),
  // Used when no locale matches
  defaultLocale: 'en',
  localePrefix: 'as-needed',
})

export const getLocalePathSegment = (locale: string) => locale === routing.defaultLocale ? '' : `/${locale}`

// Lightweight wrappers around Next.js' navigation APIs
// that will consider the routing configuration
export const { Link, redirect, permanentRedirect, usePathname, useRouter }
  = createNavigation(routing)
