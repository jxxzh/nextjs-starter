import { isServer } from '@/utils/env'
import dayjs from 'dayjs'
import advancedFormat from 'dayjs/plugin/advancedFormat'
import duration from 'dayjs/plugin/duration'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'
// 导入本地化语言
import 'dayjs/locale/en'
// import 'dayjs/locale/zh-tw'
// import 'dayjs/locale/fr'

const dayjsLocaleMap: Record<string, string> = {
  'zh-Hant': 'zh-tw',
  'zh-Hans': 'zh-cn',
}

export function initDayjs(locale: string) {
  const dayjsLocale = dayjsLocaleMap[locale] || locale
  dayjs.extend(utc)
  dayjs.extend(timezone)
  dayjs.extend(duration)
  dayjs.extend(advancedFormat)
  dayjs.extend(localizedFormat)
  dayjs.locale(dayjsLocale)
  if (!isServer()) {
    const userTz = dayjs.tz.guess()
    dayjs.tz.setDefault(userTz)
  }
}
