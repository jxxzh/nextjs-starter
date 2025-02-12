import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin(
  './src/lib/i18n/request.ts',
)

// const fileURL = new URL(process.env.NEXT_PUBLIC_FILE_BASE_URL!)
const nextConfig = {
  serverExternalPackages: ['pino', 'pino-pretty'],
  logging: {
    fetches: {
      fullUrl: process.env.NODE_ENV !== 'production',
    },
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
} satisfies NextConfig

export default withNextIntl(nextConfig)
