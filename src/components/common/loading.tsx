'use client'

import type { ComponentProps, CSSProperties } from 'react'
import { Ring } from 'ldrs/react'
import 'ldrs/react/Ring.css'

export function CommonLoading({
  size = 4,
  ...props
}: ComponentProps<typeof Ring> & {
  size?: number
}) {
  return (
    <span className="[&_svg]:size-[var(--size)]!" style={{ '--size': `${size / 16}rem` } as CSSProperties}>
      <Ring
        color="currentcolor"
        {...props}
      />
    </span>
  )
}
