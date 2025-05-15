function isServer() {
  return typeof window === 'undefined'
}

function isBrowser() {
  return typeof window !== 'undefined'
}

function isProduction() {
  return process.env.NEXT_PUBLIC_APP_ENV === 'production'
}

function isDevelopment() {
  return process.env.NEXT_PUBLIC_APP_ENV === 'development'
}

export {
  isBrowser,
  isDevelopment,
  isProduction,
  isServer,
}
