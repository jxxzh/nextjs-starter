import type { Viewport } from 'next'
import { LoadingScript } from '@/components/common/loading'
import { initDayjs } from '@/lib/date'
import { routing } from '@/lib/i18n'
import { cn } from '@/lib/utils'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
// 导入字体文件
import { Poppins } from 'next/font/google'
import ClientInitialization from '../common/client-initialization'
import { BaseProvider } from '../provider/base-provider'
// 导入全局css
import '@/styles/globals.css'

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

export async function BaseLayout({
  children,
  locale,
}: {
  children: React.ReactNode
  locale: string
}) {
  // 初始化dayjs
  initDayjs(locale)

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages()

  return (
    <html
      lang={locale}
      suppressHydrationWarning
    >
      <body className={cn(poppins.className)}>
        {/* 加载动画 */}
        <LoadingScript />
        {/* next-intl */}
        <NextIntlClientProvider messages={messages}>
          <BaseProvider>
            <ClientInitialization locale={locale} />
            {children}
          </BaseProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
