import { appConfig } from '@/constants/app-config'
import { getLocaleUrl } from '@/utils/url'
import { getTranslations } from 'next-intl/server'

export interface SchemaBreadcrumbItem {
  label: string
  path: string
}

export interface SchemaImage {
  url: string
  width: number
  height: number
  caption?: string
  alt?: string
}

export interface SchemaProps {
  title: string
  description: string
  pathname: string
  locale: string
  breadcrumbs?: SchemaBreadcrumbItem[]
  image?: SchemaImage
  datePublished?: string
  dateModified?: string
  keywords?: string[]
  author?: {
    name: string
    url?: string
  }
  publisherType?: 'Organization' | 'Person'
}

async function ComplexSchema({
  title,
  description,
  pathname,
  locale,
  breadcrumbs,
  image,
  dateModified,
  keywords,
  author,
  publisherType = 'Organization',
}: SchemaProps) {
  const t = await getTranslations()
  const currentUrl = getLocaleUrl(pathname, locale)
  const currentDateModified = dateModified || new Date().toISOString()

  const graph: any[] = [
    {
      '@type': 'WebPage',
      '@id': currentUrl,
      'url': currentUrl,
      'name': title,
      'description': description,
      'dateModified': currentDateModified,
      'isPartOf': {
        '@id': getLocaleUrl('/#website', locale),
      },
      'about': description,
      'keywords': keywords?.join(', '),
      'author': author
        ? {
            '@type': 'Person',
            'name': author.name,
            'url': author.url,
          }
        : undefined,
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
      'potentialAction': [
        {
          '@type': 'ReadAction',
          'target': [currentUrl],
        },
      ],
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
      'alternativeText': image.alt ?? title,
      'inLanguage': locale,
      'representativeOfPage': true,
    })
  }

  if (breadcrumbs) {
    graph.push({
      '@type': 'BreadcrumbList',
      '@id': getLocaleUrl(`${pathname}#breadcrumb`, locale),
      'itemListElement': breadcrumbs.map((item, index) => ({
        '@type': 'ListItem',
        'position': index + 1,
        'name': item.label,
        ...(item.path && {
          item: {
            '@type': 'WebPage',
            '@id': getLocaleUrl(item.path, locale),
            'url': getLocaleUrl(item.path, locale),
            'name': item.label,
          },
        }),
      })),
    })
  }

  // Website Schema
  graph.push({
    '@type': 'WebSite',
    '@id': getLocaleUrl('/#website', locale),
    'url': getLocaleUrl('/', locale),
    'name': t(`page.home.seo.title`),
    'description': t(`page.home.seo.description`),
    'publisher': {
      '@id': getLocaleUrl(`/#${publisherType.toLowerCase()}`, locale),
    },
    'inLanguage': locale,
    'potentialAction': [
      {
        '@type': 'SearchAction',
        'target': {
          '@type': 'EntryPoint',
          'urlTemplate': `${getLocaleUrl('/', locale)}search?q={search_term_string}`,
        },
        'query-input': 'required name=search_term_string',
      },
    ],
  })

  // Publisher Schema (Person or Organization)
  const publisherSchema = {
    '@type': publisherType,
    '@id': getLocaleUrl(`/#${publisherType.toLowerCase()}`, locale),
    'name': appConfig.name,
    'url': getLocaleUrl('/', locale),
  }
  graph.push(publisherSchema)

  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react-dom/no-dangerously-set-innerhtml
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@graph': graph,
        }, null, process.env.NODE_ENV === 'development' ? 2 : 0),
      }}
    />
  )
}

export { ComplexSchema }
