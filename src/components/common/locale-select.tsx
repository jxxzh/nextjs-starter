'use client'

import { Select, SelectContent, SelectItem } from '@/components/ui/select'
import { localesConfig, usePathname, useRouter } from '@/lib/i18n'
import { cn } from '@/lib/utils'
import * as SelectPrimitive from '@radix-ui/react-select'
import { ChevronDown, Globe } from 'lucide-react'
import { useLocale, useTranslations } from 'next-intl'

export function LocaleSelect({
  className,
}: { className?: string }) {
  const t = useTranslations()
  const router = useRouter()
  const locale = useLocale()
  const pathname = usePathname()

  const items = localesConfig.map(item => (
    <SelectItem
      key={item.code}
      value={item.code}
    >
      {item.desc}
    </SelectItem>
  ))

  const setLocale = (locale: string) => {
    const path = `${pathname}${location.search}`
    router.replace(path, { locale })
  }

  return (
    <Select value={locale} onValueChange={setLocale}>
      <SelectPrimitive.Trigger
        className={cn(
          'inline-flex items-center gap-2 text-sm md:text-base',
          className,
        )}
        aria-label={t('common.switch', { name: t('dict.language') })}
      >
        <Globe className="size-6" />
        <div className="hidden md:contents">
          <SelectPrimitive.Value />
          <ChevronDown size={16} />
        </div>
      </SelectPrimitive.Trigger>
      <SelectContent align="center">
        {items}
      </SelectContent>
    </Select>
  )
}
