"use client"

import React, { useState } from 'react'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { Button } from '@/components/ui/Button'
import { Palette, Copy, Trash2 } from 'lucide-react'

export default function ColorPickerPage() {
  const [color, setColor] = useState('#8b5cf6')
  const [copied, setCopied] = useState(false)

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(color)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="container mx-auto px-4 py-20">
      <SectionHeader 
        title="Color Picker" 
        subtitle="Select the perfect shade for your project and get the HEX code instantly."
      />

      <div className="max-w-2xl mx-auto space-y-12">
        <div className="flex flex-col items-center gap-8">
          <div 
            className="w-64 h-64 rounded-full shadow-2xl border-8 border-border transition-transform hover:scale-105 active:scale-95 cursor-pointer relative" 
            style={{ backgroundColor: color }}
            onClick={() => {}} // Triggered by the input
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <Palette className="w-12 h-12 text-white drop-shadow-lg" />
            </div>
          </div>

          <div className="flex flex-col items-center gap-4 w-full max-w-sm">
            <div className="relative w-full group">
              <input 
                type="color" 
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                value={color}
                onChange={(e) => setColor(e.target.value)}
              />
              <div className="flex items-center justify-between p-4 rounded-2xl border border-border bg-card group-hover:border-primary transition-all">
                <span className="font-mono text-lg font-bold">{color.toUpperCase()}</span>
                <Button variant="ghost" size="sm" className="gap-2" onClick={copyToClipboard}>
                  {copied ? 'Copied!' : <Copy className="w-4 h-4" />}
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-4 w-full">
              {['#ef4444', '#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899'].map(c => (
                <button 
                  key={c} 
                  className="h-12 rounded-xl border border-border transition-transform hover:scale-110"
                  style={{ backgroundColor: c }}
                  onClick={() => setColor(c)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
