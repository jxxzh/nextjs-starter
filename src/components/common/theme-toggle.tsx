'use client'

import { MoonIcon, SunIcon } from 'lucide-react'
import { useTheme } from 'next-themes'
import { Button } from '../ui/button'

export function ThemeToggle(props: Parameters<typeof Button>[0]) {
  const { theme, setTheme } = useTheme()

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      {...props}
    >
      {theme === 'dark'
        ? (
            <SunIcon className="h-4 w-4" />
          )
        : (
            <MoonIcon className="h-4 w-4" />
          )}
    </Button>
  )
}
