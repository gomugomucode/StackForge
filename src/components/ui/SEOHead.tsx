import { useEffect } from 'react'

interface SEOHeadProps {
  title: string
  description?: string
  image?: string
  url?: string
  type?: 'website' | 'article' | 'course'
}

export function SEOHead({ title, description, image = '/og-image.png', url, type = 'website' }: SEOHeadProps) {
  useEffect(() => {
    const fullTitle = title ? `${title} | StackForge` : 'StackForge - Master Modern Software Development'
    document.title = fullTitle

    const setMeta = (name: string, content: string, isProperty = false) => {
      if (!content) return
      const selector = isProperty ? `meta[property="${name}"]` : `meta[name="${name}"]`
      let meta = document.querySelector(selector)
      if (!meta) {
        meta = document.createElement('meta')
        if (isProperty) meta.setAttribute('property', name)
        else meta.setAttribute('name', name)
        document.head.appendChild(meta)
      }
      meta.setAttribute('content', content)
    }

    if (description) {
      setMeta('description', description)
      setMeta('og:description', description, true)
      setMeta('twitter:description', description)
    }

    setMeta('og:title', fullTitle, true)
    setMeta('twitter:title', fullTitle)
    setMeta('og:type', type, true)
    
    if (image) {
      const fullImageUrl = image.startsWith('http') ? image : `${window.location.origin}${image}`
      setMeta('og:image', fullImageUrl, true)
      setMeta('twitter:image', fullImageUrl)
      setMeta('twitter:card', 'summary_large_image')
    }
    
    const currentUrl = url || window.location.href
    setMeta('og:url', currentUrl, true)

    // Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.setAttribute('rel', 'canonical')
      document.head.appendChild(canonical)
    }
    canonical.setAttribute('href', currentUrl.split('?')[0])

    // Structured Data JSON-LD
    let script = document.querySelector('#seo-json-ld')
    if (!script) {
      script = document.createElement('script')
      script.id = 'seo-json-ld'
      script.setAttribute('type', 'application/ld+json')
      document.head.appendChild(script)
    }
    
    const schemaData = {
      "@context": "https://schema.org",
      "@type": type === 'course' ? 'Course' : type === 'article' ? 'Article' : 'WebSite',
      "name": fullTitle,
      "description": description || '',
      "url": currentUrl,
      ...(image && { "image": image.startsWith('http') ? image : `${window.location.origin}${image}` })
    }
    script.textContent = JSON.stringify(schemaData)

  }, [title, description, image, url, type])

  return null
}
