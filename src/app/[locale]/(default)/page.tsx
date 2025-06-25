import { getTranslations, setRequestLocale } from 'next-intl/server'

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)

  const t = await getTranslations()

  return (
    <main className="grow responsive-container">
      <h1 className="text-red-500">
        Hello
        {' '}
        {t('common.appName')}
      </h1>
    </main>
  )
}
