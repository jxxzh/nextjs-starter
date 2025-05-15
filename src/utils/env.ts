const isServer = typeof window === 'undefined'
const isBrowser = typeof window !== 'undefined'

const isProd = process.env.NEXT_PUBLIC_APP_ENV === 'production'
const isDev = process.env.NEXT_PUBLIC_APP_ENV === 'development'

export {
  isBrowser,
  isDev,
  isProd,
  isServer,
}
