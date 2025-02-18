'use client'

import { SelectContent, SelectItem } from '@/components/ui/select'
import { localesConfig, usePathname, useRouter } from '@/lib/i18n'
import { reportEvent } from '@/lib/report'
import { cn } from '@/lib/utils'
import * as SelectPrimitive from '@radix-ui/react-select'
import { ChevronDown, Globe } from 'lucide-react'
import { useLocale, useTranslations } from 'next-intl'
import { useSearchParams } from 'next/navigation'

export function LocaleSelect({
  className,
}: { className?: string }) {
  const t = useTranslations()
  const currLocale = useLocale()

  const items = localesConfig.map(item => (
    <SelectItem
      key={item.code}
      value={item.code}
      onClick={() => {
        reportEvent('click_top_language')
      }}
    >
      {item.desc}
    </SelectItem>
  ))

  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const setLocale = (locale: string) => {
    const path = `${pathname}?${searchParams.toString()}`
    router.replace(path, { locale })
  }

  return (
    <SelectPrimitive.Root value={currLocale} onValueChange={setLocale}>
      <SelectPrimitive.Trigger
        aria-label={t('common.switch', { name: t('dict.language') })}
        className={cn(
          'inline-flex items-center gap-2 text-sm md:text-base',
          className,
        )}
      >
        <Globe size={24} />
        <div className="max-md:hidden md:contents">
          <SelectPrimitive.Value />
          <ChevronDown size={16} />
        </div>
      </SelectPrimitive.Trigger>
      <SelectContent className="z-[1000] rounded-2xl bg-card">
        {items}
      </SelectContent>
    </SelectPrimitive.Root>
  )
}
