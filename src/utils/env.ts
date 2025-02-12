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

function isTest() {
  return process.env.NEXT_PUBLIC_APP_ENV === 'test'
}

export {
  isBrowser,
  isDevelopment,
  isProduction,
  isServer,
  isTest,
}
