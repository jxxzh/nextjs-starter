import { appConfig } from '@/constants/app-config'
import { getLocaleUrl } from '@/utils/url'
import { getTranslations } from 'next-intl/server'

export interface SchemaBreadcrumbItem {
  label: string
  path: string
}

async function ComplexSchema({
  title,
  description,
  pathname,
  locale,
  breadcrumbs,
  image,
}: {
  title: string
  description: string
  pathname: string
  locale: string
  breadcrumbs?: SchemaBreadcrumbItem[]
  image?: {
    url: string
    width: number
    height: number
    caption?: string
  }
}) {
  const t = await getTranslations()

  const graph: any[] = [
    {
      '@type': 'WebPage',
      '@id': getLocaleUrl(pathname, locale),
      'url': getLocaleUrl(pathname, locale),
      'name': title,
      'description': description,
      'dateModified': new Date().toISOString(),
      'isPartOf': {
        '@id': getLocaleUrl('/#website', locale),
      },
      ...(image && {
        primaryImageOfPage: {
          '@id': getLocaleUrl(`${pathname}#primaryimage`, locale),
        },
        image: {
          '@id': getLocaleUrl(`${pathname}#primaryimage`, locale),
        },
      }),
      ...(breadcrumbs && {
        breadcrumb: {
          '@id': getLocaleUrl(`${pathname}#breadcrumb`, locale),
        },
      }),
      'inLanguage': locale,
    },
  ]

  if (image) {
    graph.push({
      '@type': 'ImageObject',
      '@id': getLocaleUrl(`${pathname}#primaryimage`, locale),
      'url': image.url,
      'contentUrl': image.url,
      'width': image.width,
      'height': image.height,
      'caption': image.caption ?? title,
      'inLanguage': locale,
    })
  }

  if (breadcrumbs) {
    graph.push({
      '@type': 'BreadcrumbList',
      'itemListElement': breadcrumbs.map((item, index) => ({
        '@type': 'ListItem',
        'position': index + 1,
        'name': item.label,
        ...(item.path && { item: getLocaleUrl(item.path, locale) }),
      })),
    })
  }

  graph.push({
    '@type': 'WebSite',
    '@id': getLocaleUrl('/#website', locale),
    'url': getLocaleUrl('/', locale),
    'name': t(`route.home.title`),
    'description': t(`route.home.description`),
    'publisher': {
      '@id': getLocaleUrl('/#organization', locale),
    },
    'potentialAction': [
      {
        '@type': 'SearchAction',
        'target': {
          '@type': 'EntryPoint',
          'urlTemplate': `${getLocaleUrl('/', locale)}?s={search_term_string}`,
        },
        'query-input': {
          '@type': 'PropertyValueSpecification',
          'valueRequired': true,
          'valueName': 'search_term_string',
        },
      },
    ],
    'inLanguage': 'en-US',
  })

  graph.push({
    '@type': 'Organization',
    '@id': getLocaleUrl('/#organization', locale),
    'name': appConfig.name,
    'url': getLocaleUrl('/', locale),
  })

  return (
    <>
      {/* eslint-disable-next-line react-dom/no-dangerously-set-innerhtml */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@graph': graph,
        }) }}
      />
    </>
  )
}

export { ComplexSchema }
