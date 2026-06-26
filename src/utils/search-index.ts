import { roadmaps } from '@/data/roadmaps'
import { cheatsheets } from '@/data/cheatsheets'
import { projects } from '@/data/projects'
import { interviewCategories } from '@/data/interviews'

export type SearchResult = {
  id: string
  title: string
  url: string
  category: string
  type: 'roadmap' | 'cheatsheet' | 'project' | 'interview' | 'topic' | 'lesson' | 'quiz' | 'interview_question'
}

export function getAllSearchItems(): SearchResult[] {
  const results: SearchResult[] = []

  // 1. Roadmaps
  roadmaps.forEach(r => {
    results.push({
      id: `roadmap-${r.slug}`,
      title: r.title,
      url: `/roadmaps/${r.slug}`,
      category: r.category,
      type: 'roadmap'
    })

    // 2. Topics & Lessons & Quizzes nested inside Roadmaps
    r.modules.forEach(m => {
      // Add module quiz
      results.push({
        id: `quiz-${m.slug}`,
        title: `Quiz: ${m.title} Module`,
        url: `/roadmaps/${r.slug}/quiz`,
        category: `${r.title} Quizzes`,
        type: 'quiz'
      })

      m.lessons.forEach(l => {
        // Add Topic page
        results.push({
          id: `topic-${l.slug}`,
          title: `Topic: ${l.title}`,
          url: `/learn/${r.slug}/${l.slug}`,
          category: `Topic in ${r.title}`,
          type: 'topic'
        })

        // Add Lesson path
        results.push({
          id: `lesson-${l.slug}`,
          title: `Lesson: ${l.title}`,
          url: `/roadmaps/${r.slug}/lesson/${l.slug}`,
          category: `Lesson in ${r.title}`,
          type: 'lesson'
        })
      })
    })
  })

  // 3. Cheatsheets
  cheatsheets.forEach(s => {
    results.push({
      id: `cheatsheet-${s.slug}`,
      title: `Cheatsheet: ${s.title}`,
      url: `/cheatsheets/${s.slug}`,
      category: s.category,
      type: 'cheatsheet'
    })
  })

  // 4. Projects
  projects.forEach(p => {
    results.push({
      id: `project-${p.slug}`,
      title: `Project: ${p.title}`,
      url: `/projects/${p.slug}`,
      category: p.category,
      type: 'project'
    })
  })

  // 5. Interview categories and individual questions
  interviewCategories.forEach(c => {
    results.push({
      id: `interview-category-${c.slug}`,
      title: `Interview Prep: ${c.title}`,
      url: `/interview/${c.slug}`,
      category: 'Interview Prep Hub',
      type: 'interview'
    })

    c.questions.forEach(q => {
      results.push({
        id: `question-${q.id}`,
        title: `Q&A: ${q.question}`,
        url: `/interview/${c.slug}`,
        category: `Interview Prep (${c.title})`,
        type: 'interview_question'
      })
    })
  })

  return results
}

