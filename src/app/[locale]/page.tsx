import { CommonLoading } from '@/components/common/loading'
import { getTranslations, setRequestLocale } from 'next-intl/server'

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)

  const t = await getTranslations()

  return (
    <main className="h-[200vh] grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen pb-20 gap-16 font-[family-name:var(--font-geist-sans)]">
      <h1 className="text-red-500">
        Hello
        {' '}
        {t('common.appName')}
      </h1>
      <CommonLoading />
    </main>
  )
}
