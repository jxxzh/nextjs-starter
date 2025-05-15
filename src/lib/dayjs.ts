import { isServer } from '@/utils/env'
import dayjs from 'dayjs'
import advancedFormat from 'dayjs/plugin/advancedFormat'
import duration from 'dayjs/plugin/duration'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'

// TODO: 导入本地化语言
import 'dayjs/locale/en'

const dayjsLocaleMap: Record<string, string> = {
  'zh-Hant': 'zh-tw',
  'zh-Hans': 'zh-cn',
}

dayjs.extend(advancedFormat)
dayjs.extend(duration)
dayjs.extend(localizedFormat)
dayjs.extend(timezone)
dayjs.extend(utc)

if (isServer)
  dayjs.tz.setDefault('UTC')

/** 设置 dayjs 语言 */
export function setDayjsLocale(locale: string) {
  dayjs.locale(dayjsLocaleMap[locale] || locale.toLowerCase())
}
