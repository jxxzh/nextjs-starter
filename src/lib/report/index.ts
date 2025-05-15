/* eslint-disable eslint-comments/no-unlimited-disable */
'use client'

import type { Analytics } from 'firebase/analytics'
import { isDev } from '@/utils/env'
import { getAnalytics, isSupported, logEvent } from 'firebase/analytics'
import { getApps, initializeApp } from 'firebase/app'
import logger from '../logger'

let analytics: Analytics | undefined

const reportLogger = logger.create({
  defaults: {
    tag: 'analytics',
  },
})

export async function createFirebaseApp() {
  // 开发环境不初始化
  if (isDev)
    return
  // 没有配置 firebase 的 api key 不初始化
  if (!process.env.NEXT_PUBLIC_FIREBASE_API_KEY)
    return
  const clientCredentials = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    // databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
  }

  if (getApps().length <= 0) {
    const supported = await isSupported()
    if (supported) {
      const app = initializeApp(clientCredentials)
      analytics = getAnalytics(app)
    }
  }
}

/* eslint-disable*/
export function initClarify() {
  if (isDev) {
    return
  }
  if (!process.env.NEXT_PUBLIC_CLARITY_KEY) {
    return
  }
  (function (c, l, a, r, i, t, y) {
    // @ts-expect-error: don't care about this
    c[a] = c[a] || function () { (c[a].q = c[a].q || []).push(arguments) }
    // @ts-expect-error: don't care about this
    t = l.createElement(r); t.async = 1; t.src = `https://www.clarity.ms/tag/${i}`
    // @ts-expect-error: don't care about this
    y = l.getElementsByTagName(r)[0]; y.parentNode.insertBefore(t, y)
  })(window, document, 'clarity', 'script', process.env.NEXT_PUBLIC_CLARITY_KEY)
}
/* eslint-enable */

export function reportEvent(eventName: string, eventParams?: { [key: string]: any }) {
  reportLogger.info({
    eventName,
    eventParams,
  })
  if (analytics) {
    logEvent(analytics, eventName, eventParams)
  }
}
