import { getAbsoluteUrl } from '@/utils/url'

export const APP_CONFIG = {
  name: process.env.NEXT_PUBLIC_APP_NAME,
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL,
  env: process.env.NEXT_PUBLIC_APP_ENV,
  supportEmail: process.env.NEXT_PUBLIC_SUPPORT_EMAIL,
  docs: {
    privacy: getAbsoluteUrl('/privacy.html'),
    terms: getAbsoluteUrl('/terms.html'),
  },
} as const
