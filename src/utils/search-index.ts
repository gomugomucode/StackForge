import { roadmaps } from '@/data/roadmaps'
import { cheatsheets } from '@/data/cheatsheets'
import { projects } from '@/data/projects'
import { interviewCategories } from '@/data/interviews'

export type SearchResult = {
  id: string
  title: string
  url: string
  category: string
  type: 'roadmap' | 'cheatsheet' | 'project' | 'interview'
}

export function getAllSearchItems(): SearchResult[] {
  const results: SearchResult[] = []

  roadmaps.forEach(r => {
    results.push({
      id: r.id,
      title: r.title,
      url: `/roadmaps/${r.id}`,
      category: r.category,
      type: 'roadmap'
    })
  })

  cheatsheets.forEach(s => {
    results.push({
      id: s.id,
      title: s.title,
      url: `/cheatsheets/${s.slug}`,
      category: s.category,
      type: 'cheatsheet'
    })
  })

  projects.forEach(p => {
    results.push({
      id: p.id,
      title: p.title,
      url: `/projects/${p.slug}`,
      category: p.category,
      type: 'project'
    })
  })

  interviewCategories.forEach(c => {
    results.push({
      id: c.id,
      title: c.title,
      url: `/interview/${c.slug}`,
      category: 'Interview Hub',
      type: 'interview'
    })
  })

  return results
}
