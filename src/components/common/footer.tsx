'use client'

import { APP_CONFIG } from '@/constants/app-config'
import { useTranslations } from 'next-intl'

export function Footer() {
  const t = useTranslations('components.footer')

  return (
    <footer className="bg-black text-white">
      <div className="responsive-container flex-center flex-wrap gap-x-8 h-22 py-2">
        <a href="/terms.html">{t('termsOfService')}</a>
        <a href="/privacy.html">{t('privacyPolicy')}</a>
        <a href={`mailto:${APP_CONFIG.supportEmail}`}>{t('contactUs')}</a>
      </div>
    </footer>
  )
}
