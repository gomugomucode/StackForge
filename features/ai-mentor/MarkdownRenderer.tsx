import React from 'react'
import { CodeBlock } from '../../components/mdx/CodeBlock'

interface MarkdownRendererProps {
  content: string
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  // Split content by code blocks: ```[language]\n[code]\n```
  const parts = content.split(/(```[\s\S]*?```)/g)

  return (
    <div className="space-y-3 text-sm text-[#e2e8f0] leading-relaxed">
      {parts.map((part, index) => {
        if (part.startsWith('```')) {
          // Extract language and code
          const match = part.match(/```(\w*)\n([\s\S]*?)\n?```/)
          const language = match ? match[1] : 'javascript'
          const code = match ? match[2] : part.slice(3, -3)
          return (
            <CodeBlock
              key={index}
              code={code.trim()}
              language={language || 'javascript'}
            />
          )
        }

        // Parse paragraphs, headers, and lists
        const lines = part.split('\n')
        let inList = false
        const elements: React.ReactNode[] = []
        let listItems: string[] = []

        const flushList = (key: number) => {
          if (listItems.length > 0) {
            elements.push(
              <ul key={`list-${key}`} className="list-disc pl-5 my-2 space-y-1 text-[#cbd5e1]">
                {listItems.map((item, idx) => (
                  <li key={idx} dangerouslySetInnerHTML={{ __html: formatInline(item) }} />
                ))}
              </ul>
            )
            listItems = []
          }
        }

        lines.forEach((line, lineIdx) => {
          const trimmed = line.trim()

          if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
            inList = true
            listItems.push(trimmed.slice(2))
          } else {
            if (inList) {
              flushList(lineIdx)
              inList = false
            }

            if (trimmed.startsWith('### ')) {
              elements.push(
                <h3
                  key={lineIdx}
                  className="text-base font-bold text-white mt-4 mb-2 first:mt-0"
                  dangerouslySetInnerHTML={{ __html: formatInline(trimmed.slice(4)) }}
                />
              )
            } else if (trimmed.startsWith('## ')) {
              elements.push(
                <h2
                  key={lineIdx}
                  className="text-lg font-bold text-white mt-5 mb-3 border-b border-[#21262d] pb-1 first:mt-0"
                  dangerouslySetInnerHTML={{ __html: formatInline(trimmed.slice(3)) }}
                />
              )
            } else if (trimmed.startsWith('# ')) {
              elements.push(
                <h1
                  key={lineIdx}
                  className="text-xl font-extrabold text-white mt-6 mb-4 first:mt-0"
                  dangerouslySetInnerHTML={{ __html: formatInline(trimmed.slice(2)) }}
                />
              )
            } else if (trimmed !== '') {
              elements.push(
                <p
                  key={lineIdx}
                  className="my-2 text-[#cbd5e1]"
                  dangerouslySetInnerHTML={{ __html: formatInline(trimmed) }}
                />
              )
            }
          }
        })

        // Flush any trailing list items
        if (inList) {
          flushList(lines.length)
        }

        return <div key={index}>{elements}</div>
      })}
    </div>
  )
}

function formatInline(text: string): string {
  let formatted = text
    // Escape simple HTML characters
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    // Bold: **text**
    .replace(/\*\*(.*?)\*\*/g, '<strong class="text-white font-semibold">$1</strong>')
    // Inline code: `code`
    .replace(/`(.*?)`/g, '<code class="bg-[#1e293b]/80 border border-[#334155] text-accent-purple px-1.5 py-0.5 rounded text-xs font-mono font-bold">$1</code>')
    // Highlighted text placeholder e.g. [text]
    .replace(/\[(.*?)\]/g, '<span class="text-accent-cyan font-medium">$1</span>')

  return formatted
}
