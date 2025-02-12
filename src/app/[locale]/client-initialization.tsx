// In Next.js, this file would be called: app/providers.tsx
'use client'

import { createFirebaseApp, initClarify } from '@/lib/analytics'
import { initDayjs } from '@/lib/date'
import logger from '@/lib/logger'
import { useEffect } from 'react'

// 通过一个单独的子组件来初始化客户端的配置，因为 useEffect 的执行顺序是子组件先于父组件
export default function ClientInitialization({ locale }: { locale: string }) {
  useEffect(() => {
    // 初始化firebase
    createFirebaseApp()
    // 初始化Clarify
    initClarify()
    // 打印当前环境
    logger.info({
      env: process.env.NEXT_PUBLIC_APP_ENV,
    })
  }, [])

  useEffect(() => {
    // 初始化dayjs
    initDayjs(locale)
  }, [locale])
  return null
}
