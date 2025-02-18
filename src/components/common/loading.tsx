'use client'

import Script from 'next/script'

/** https://github.com/GriffinJohnston/ldrs */

interface LdrsProps {
  size?: number | string
  color?: string
  speed?: number
  stroke?: number
  strokeLength?: number
  bgOpacity?: number
}

export function LSpiral({
  size = 40,
  color = 'var(--primary)',
  speed = 0.9,
  stroke,
  strokeLength,
  bgOpacity,
}: LdrsProps) {
  return (
    // @ts-expect-error: Custom Web Component
    <l-spiral
      size={size}
      color={color}
      speed={speed}
      stroke={stroke}
      stroke-length={strokeLength}
      bg-opacity={bgOpacity}
    />
  )
}

export function LoadingScript() {
  return (
    <Script
      type="module"
      strategy="lazyOnload"
      src="https://cdn.jsdelivr.net/npm/ldrs/dist/auto/spiral.js"
    />
  )
}

// 默认的加载动画
export const CommonLoading = LSpiral
