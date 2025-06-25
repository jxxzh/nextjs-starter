import ClientInitialization from '@/components/common/client-initialization'
import { BaseProvider } from '@/components/provider/base-provider'
import { Toaster } from '@/components/ui/sonner'
import { routing } from '@/lib/i18n'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages, setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
// 导入全局css
import '@/styles/global.css'
import '@/lib/dayjs'

export function generateStaticParams() {
  return routing.locales.map(locale => ({ locale }))
}

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

  const messages = await getMessages()

  return (
    <html
      lang={locale}
      suppressHydrationWarning
    >
      <body className="flex flex-col min-h-dvh bg-background text-foreground">
        {/* next-intl */}
        <NextIntlClientProvider messages={messages}>
          <BaseProvider>
            <ClientInitialization locale={locale} />
            {children}
            <Toaster richColors />
          </BaseProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
