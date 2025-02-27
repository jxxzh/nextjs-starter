import { Header } from '@/components/common/header'
import { CommonLoading } from '@/components/common/loading'
import { getTranslations, setRequestLocale } from 'next-intl/server'

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)

  const t = await getTranslations()

  return (
    <>
      <Header />
      <main className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <h1 className="text-red-500">
          Hello
          {' '}
          {t('common.appName')}
        </h1>
        <CommonLoading />
      </main>
    </>
  )
}
