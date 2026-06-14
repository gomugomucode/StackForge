import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const baseUrl = 'https://stackforge.io'

// Define static routes
const staticRoutes = [
  '/',
  '/about',
  '/blog',
  '/roadmaps',
  '/notes',
  '/cheatsheets',
  '/interview-prep',
  '/projects',
  '/certifications',
  '/tools',
  '/community',
]

// The dynamic routes can be parsed or hardcoded for the demo.
// Ideally, we'd import db.ts but since it's TS, it's easier to just list the known ones or parse it.
const technologies = [
  'javascript', 'typescript', 'react', 'node', 'python', 'go', 'docker', 'kubernetes', 'aws'
]

async function generateSitemap() {
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n'
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'

  const addUrl = (route) => {
    xml += '  <url>\n'
    xml += `    <loc>${baseUrl}${route}</loc>\n`
    xml += `    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>\n`
    xml += '    <changefreq>weekly</changefreq>\n'
    xml += `    <priority>${route === '/' ? '1.0' : '0.8'}</priority>\n`
    xml += '  </url>\n'
  }

  staticRoutes.forEach(addUrl)

  technologies.forEach((tech) => {
    addUrl(`/learn/${tech}`)
    addUrl(`/certificate/${tech}`)
  })

  xml += '</urlset>'

  // Write to public directory so it gets served statically and copied on build
  const publicDir = path.join(__dirname, '..', 'public')
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true })
  }
  
  fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), xml)
  console.log('✅ sitemap.xml generated successfully in /public')

  // Generate robots.txt
  const robotsTxt = `User-agent: *
Allow: /
Sitemap: ${baseUrl}/sitemap.xml
`
  fs.writeFileSync(path.join(publicDir, 'robots.txt'), robotsTxt)
  console.log('✅ robots.txt generated successfully in /public')
}

generateSitemap().catch(console.error)
