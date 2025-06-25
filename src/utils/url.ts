import { routing } from '@/lib/i18n'

/** 格式化路径, 在开头添加'/'，并去掉末尾的'/' */
export function formatPath(path: string): string {
  if (!path.startsWith('/'))
    path = `/${path}`
  if (path.endsWith('/'))
    path = path.slice(0, -1)
  return path || '/'
}

/** 格式化 URL, 去掉末尾的'/' */
export function formatUrl(url: string): string {
  if (url.endsWith('/'))
    url = url.slice(0, -1)
  return url
}

/** 将相对路径转换为绝对 URL */
export function getAbsoluteUrl(path: string): string {
  if (!process.env.NEXT_PUBLIC_SITE_URL)
    throw new Error('NEXT_PUBLIC_SITE_URL is not set')
  return formatUrl(`${process.env.NEXT_PUBLIC_SITE_URL}${formatPath(path)}`)
}

/** 获取国际化路由前缀 */
export function getLocalePrefix(locale: string): string {
  return locale === routing.defaultLocale ? '' : `/${locale}`
}

/** 获取带语言前缀的路径 */
export function getLocalePath(path: string, locale: string): string {
  return formatPath(`${getLocalePrefix(locale)}${path}`)
}

/** 获取带语言前缀的 URL */
export function getLocaleUrl(path: string, locale: string): string {
  return getAbsoluteUrl(getLocalePath(path, locale))
}
