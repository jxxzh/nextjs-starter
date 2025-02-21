'use client'

import { ThemeProvider } from 'next-themes'
import { QueryProvider } from './query-provider'

export function BaseProvider({ children }: { children: React.ReactNode }) {
  return (
    <QueryProvider>
      {/* next-themes */}
      <ThemeProvider
        attribute="class"
        defaultTheme="light"
      >
        {children}
      </ThemeProvider>
    </QueryProvider>
  )
}
