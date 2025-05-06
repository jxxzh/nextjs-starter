import type { routing } from '@/lib/i18n'
import type en from '../../messages/en.json'

declare global {
  interface AppConfig {
    Locale: (typeof routing.locales)[number]
    Messages: typeof en
  }
}
