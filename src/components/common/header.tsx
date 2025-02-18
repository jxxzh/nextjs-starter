import { Link } from '@/lib/i18n'
import { cn } from '@/lib/utils'
import { LocaleSelect } from './locale-select'
import { ThemeToggle } from './theme-toggle'

export function Header({
  className,
}: {
  className?: string
}) {
  return (
    <div>
      <div className={cn('w-screen bg-secondary fixed top-0 left-0 right-0 z-50', className)}>
        <header className="responsive-container h-header flex items-center py-2">
          <Link href="/" className="flex-center">
            LOGO
          </Link>

          <ThemeToggle className="ml-auto" />
          <LocaleSelect className="ml-4" />
        </header>
      </div>

      <div className="h-header" />
    </div>
  )
}
