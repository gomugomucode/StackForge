"use client"

import React, { useState } from 'react'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { Button } from '@/components/ui/Button'
import { Copy, Trash2, Check, FileJson } from 'lucide-react'
import { motion } from 'framer-motion'

export default function JsonFormatterPage() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  const formatJson = () => {
    try {
      const parsed = JSON.parse(input)
      setOutput(JSON.stringify(parsed, null, 2))
      setError(null)
    } catch (e: any) {
      setError(e.message)
      setOutput('')
    }
  }

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(output)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="container mx-auto px-4 py-20">
      <SectionHeader 
        title="JSON Formatter" 
        subtitle="Clean, beautify and validate your JSON data instantly."
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-[calc(100vh-300px)]">
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm font-bold text-muted-foreground uppercase">
              <FileJson className="w-4 h-4" /> Input
            </div>
            <Button variant="ghost" size="sm" className="gap-2 text-xs" onClick={() => setInput('')}>
              <Trash2 className="w-3 h-3" /> Clear
            </Button>
          </div>
          <textarea 
            className="flex-1 p-6 rounded-3xl border border-border bg-card font-mono text-sm focus:ring-2 focus:ring-primary outline-none transition-all resize-none"
            placeholder="Paste your messy JSON here..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <Button 
            variant="primary" 
            size="lg" 
            className="w-full py-6 text-lg font-bold" 
            onClick={formatJson}
          >
            Format JSON
          </Button>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm font-bold text-muted-foreground uppercase">
              <Check className="w-4 h-4" /> Output
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              className="gap-2 text-xs" 
              onClick={copyToClipboard}
              disabled={!output}
            >
              {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
              {copied ? 'Copied!' : 'Copy'}
            </Button>
          </div>
          <div className={`flex-1 p-6 rounded-3xl border border-border font-mono text-sm overflow-auto transition-all ${
            error ? 'bg-destructive/10 border-destructive text-destructive' : 'bg-card text-foreground'
          }`}>
            {error ? (
              <div className="flex flex-col items-center justify-center h-full text-center space-y-2">
                <p className="font-bold">Invalid JSON</p>
                <p className="text-xs opacity-70">{error}</p>
              </div>
            ) : (
              <pre className="whitespace-pre-wrap">{output || 'Formatted JSON will appear here...'}</pre>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
