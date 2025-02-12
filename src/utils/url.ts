import { appConfig } from '@/constants/app-config'
import { getLocalePathSegment } from '@/lib/i18n/routing'
import { capitalize } from '@/utils/string'

/**
 * 将相对路径转换为绝对 URL
 * @param path - 相对路径 (例如: '/blog')
 * @returns 完整的 URL (例如: 'https://example.com/blog')
 */
export function getAbsoluteUrl(path: string) {
  // 首先尝试使用环境变量中的 URL
  const baseUrl = appConfig.siteUrl

  // 确保 path 以 '/' 开头
  const normalizedPath = path.startsWith('/') ? path : `/${path}`

  // 移除 baseUrl 末尾的 '/'（如果存在）
  const normalizedBaseUrl = baseUrl.endsWith('/')
    ? baseUrl.slice(0, -1)
    : baseUrl

  return `${normalizedBaseUrl}${normalizedPath}`
}

export function getLocaleUrl(path: string, locale: string) {
  const localePath = getLocalePathSegment(locale)
  const normalizedPath = path.startsWith('/') ? path : `/${path}`
  return getAbsoluteUrl(`${localePath}${normalizedPath}`)
}

export function transformPokemonNameToRoute(name: string) {
  return name.replace(/ /g, '-').toLowerCase()
}

export function transformRouteToPokemonName(route: string) {
  return capitalize(route.replace(/-/g, ' '))
}
