import type { PlaygroundLanguage } from '@/lib/core/types/phase5'
import { LANGUAGE_META } from './playgroundService'

interface LanguageSelectorProps {
  value: PlaygroundLanguage
  onChange: (lang: PlaygroundLanguage) => void
}

const LANGS = Object.entries(LANGUAGE_META) as [PlaygroundLanguage, typeof LANGUAGE_META[PlaygroundLanguage]][]

export function LanguageSelector({ value, onChange }: LanguageSelectorProps) {
  return (
    <div className="flex items-center gap-1.5 flex-wrap">
      {LANGS.map(([lang, meta]) => {
        const isActive = lang === value
        return (
          <button
            key={lang}
            onClick={() => onChange(lang)}
            className={[
              'flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-200',
              isActive
                ? 'text-white shadow-lg scale-105'
                : 'text-[#6e7681] hover:text-white bg-white/[0.04] hover:bg-white/[0.08]',
            ].join(' ')}
            style={isActive ? { backgroundColor: meta.color + '22', border: `1px solid ${meta.color}55`, color: meta.color } : {}}
            title={meta.label}
          >
            <span
              className="w-5 h-5 rounded flex items-center justify-center text-[9px] font-black"
              style={{ backgroundColor: meta.color + '33', color: meta.color }}
            >
              {meta.icon}
            </span>
            {meta.label}
            {!meta.runnable && (
              <span className="text-[9px] opacity-60 ml-0.5">(local)</span>
            )}
          </button>
        )
      })}
    </div>
  )
}
