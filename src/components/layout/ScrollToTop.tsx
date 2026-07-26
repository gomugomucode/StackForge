'use client';

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

export function ScrollToTop() {
  const pathname = usePathname()

  useEffect(() => {
    const hash = window.location.hash
    if (hash && !hash.includes('=')) {
      try {
        const element = document.querySelector(hash)
        element?.scrollIntoView({ behavior: 'smooth' })
      } catch (e) {
        // Safe ignore for non-element hash fragments
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'auto' })
    }
  }, [pathname])

  return null
}
