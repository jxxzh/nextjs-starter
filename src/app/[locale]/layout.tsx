import type { Viewport } from 'next'
import { initDayjs } from '@/lib/date'
import { routing } from '@/lib/i18n'
import { cn } from '@/lib/utils'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages, setRequestLocale } from 'next-intl/server'
// 导入字体文件
import { Poppins } from 'next/font/google'
import { notFound } from 'next/navigation'
import Script from 'next/script'
import ClientInitialization from './client-initialization'
import Providers from './providers'
// 导入全局css
import '../globals.css'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'], // 根据需要的字重选择
  display: 'swap',
})

// 全局 ISR 过期时间，可被特定页面设置覆盖
export const revalidate = 3600 // 1小时

export function generateStaticParams() {
  return routing.locales.map(locale => ({ locale }))
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1.0,
  maximumScale: 1.0,
  userScalable: false,
}

export default async function LocaleLayout({
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

  // 初始化dayjs
  initDayjs(locale)

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages()

  return (
    <html
      lang={locale}
    >

      <body className={cn('dark', poppins.className)}>
        <Script
          type="module"
          strategy="lazyOnload"
          src="https://cdn.jsdelivr.net/npm/ldrs/dist/auto/spiral.js"
        />
        <NextIntlClientProvider messages={messages}>
          <Providers locale={locale}>
            <ClientInitialization locale={locale} />
            {children}
          </Providers>
        </NextIntlClientProvider>
        <div className="body-bg-left-blur" />
        <div className="body-bg-right-blur" />
      </body>
    </html>
  )
}
