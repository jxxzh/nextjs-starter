import { Header } from '@/components/common/header'
import { BaseLayout } from '@/components/layout/base'
import { routing } from '@/lib/i18n'
import { setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{
    locale: string
  }>
}) {
  const { locale } = await params

  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as any)) {
    notFound()
  }

  // Enable static rendering
  setRequestLocale(locale)

  return (
    <BaseLayout locale={locale}>
      <Header />
      {children}
    </BaseLayout>
  )
}
