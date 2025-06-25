import { Footer } from '@/components/common/footer'
import { Header } from '@/components/common/header'
import { setRequestLocale } from 'next-intl/server'

export default async function DefaultLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{
    locale: string
  }>
}) {
  const { locale } = await params
  setRequestLocale(locale)
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  )
}
