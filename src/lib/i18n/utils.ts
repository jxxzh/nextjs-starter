import { isServer } from '@/utils/env'
import { getLocale } from 'next-intl/server'
import { routing } from './routing'

/**
 * 从 pathname 中获取 locale
 * 例如: '/fr/slug' => 'fr', '/about' => defaultLocale
 */
function getLocaleFromPathname(pathname: string): string {
  // 移除开头的 '/'
  const path = pathname.slice(1)
  const _ = 1

  // 如果路径为空，返回默认语言
  if (!path) {
    return routing.defaultLocale
  }

  // 获取第一个路径片段
  const firstSegment = path.split('/')[0]

  // 检查是否是支持的语言
  return routing.locales.includes(firstSegment)
    ? firstSegment
    : routing.defaultLocale
}

/**
 * 获取当前 locale
 * - 服务端：通过 next-intl/server 获取 locale
 * - 客户端：通过 URL pathname 获取 locale
 * @returns 返回 locale，如果获取失败则返回 defaultLocale
 */
export async function getLocaleFromCookie() {
  try {
    if (isServer) {
      return await getLocale()
    }
    return getLocaleFromPathname(window.location.pathname)
  }
  // eslint-disable-next-line unused-imports/no-unused-vars
  catch (_) {
    return routing.defaultLocale
  }
}
