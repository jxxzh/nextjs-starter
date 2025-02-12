import type { Metadata } from 'next'
import { appConfig } from '@/constants/app-config'
import { getAbsoluteUrl, getLocaleUrl } from '@/utils/url'
import { localesConfig } from '../i18n/routing'

/**
 * 根据 localesConfig 生成 alternates languages 对象
 * @returns Record<string, string> 语言代码和对应的完整路径映射
 */
function generateLanguageAlternates(pathname: string) {
  return localesConfig.reduce((acc, { code }) => ({
    ...acc,
    [code]: getLocaleUrl(pathname, code),
  }), {
    'x-default': getAbsoluteUrl(pathname),
  })
}

function generateSEOMetadata({
  locale,
  title,
  pathname,
  description,
  keywords,
  openGraph,
  twitter,
}: {
  locale: string
  title: string
  pathname: string
  description: string
  keywords: string
  openGraph?: Metadata['openGraph']
  twitter?: Metadata['twitter']
}): Metadata {
  const localeUrl = getLocaleUrl(pathname, locale)
  return {
    title,
    description,
    keywords,
    alternates: {
      languages: generateLanguageAlternates(pathname),
      canonical: localeUrl,
    },
    openGraph: {
      type: 'website',
      title,
      description,
      url: localeUrl,
      siteName: appConfig.name,
      ...openGraph,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      ...twitter,
    },
  }
}

export { generateSEOMetadata }
