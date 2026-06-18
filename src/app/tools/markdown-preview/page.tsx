"use client"

import React, { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { Button } from '@/components/ui/Button'
import { Copy, Trash2, FileText } from 'lucide-react'

export default function MarkdownPreviewPage() {
  const [input, setInput] = useState('# Hello World\n\nWelcome to the **Markdown Previewer**. \n\n- List item 1\n- List item 2\n\n```javascript\nconsole.log("Hello StackForge!");\n```')
  const [copied, setCopied] = useState(false)

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(input)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="container mx-auto px-4 py-20">
      <SectionHeader 
        title="Markdown Preview" 
        subtitle="Write in Markdown and see the rendered HTML in real-time. Perfect for documentation drafts."
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-[calc(100vh-300px)]">
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm font-bold text-muted-foreground uppercase">
              <FileText className="w-4 h-4" /> Editor
            </div>
            <Button variant="ghost" size="sm" className="gap-2 text-xs" onClick={() => setInput('')}>
              <Trash2 className="w-3 h-3" /> Clear
            </Button>
          </div>
          <textarea 
            className="flex-1 p-6 rounded-3xl border border-border bg-card font-mono text-sm focus:ring-2 focus:ring-primary outline-none transition-all resize-none"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm font-bold text-muted-foreground uppercase">
              <Copy className="w-4 h-4" /> Preview
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              className="gap-2 text-xs" 
              onClick={copyToClipboard}
            >
              {copied ? 'Copied!' : 'Copy MD'}
            </Button>
          </div>
          <div className="flex-1 p-6 rounded-3xl border border-border bg-card overflow-auto prose prose-sm dark:prose-invert max-w-none">
            <ReactMarkdown>{input}</ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  )
}
