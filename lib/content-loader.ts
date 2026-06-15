import fs from 'fs/promises'
import path from 'path'

export async function getMdxContent(slug: string, category: string) {
  const filePath = path.join(process.cwd(), 'content', category, `${slug}.mdx`)
  const source = await fs.readFile(filePath, 'utf8')
  
  return {
    source,
  }
}

export async function getAllMdxSlugs(category: string) {
  const dirPath = path.join(process.cwd(), 'content', category)
  const files = await fs.readdir(dirPath)
  return files
    .filter(file => file.endsWith('.mdx'))
    .map(file => file.replace('.mdx', ''))
}
