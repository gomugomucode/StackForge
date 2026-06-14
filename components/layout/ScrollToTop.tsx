import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

export function ScrollToTop() {
  const pathname = usePathname()

  useEffect(() => {
    const hash = window.location.hash
    if (hash) {
      const element = document.querySelector(hash)
      element?.scrollIntoView({ behavior: 'smooth' })
    } else {
      window.scrollTo({ top: 0, behavior: 'auto' })
    }
  }, [pathname])

  return null
}
