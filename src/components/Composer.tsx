import { useState } from 'react'
import { PRIORITY_META, type Priority } from '../types'

interface Props {
  onAdd: (title: string, priority: Priority) => void
}

const ORDER: Priority[] = ['low', 'medium', 'high']

export function Composer({ onAdd }: Props) {
  const [title, setTitle] = useState('')
  const [priority, setPriority] = useState<Priority>('medium')

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    onAdd(title, priority)
    setTitle('')
  }

  return (
    <form
      onSubmit={submit}
      className="relative z-10 rounded-3xl border border-black/10 bg-white/70 p-2 backdrop-blur-xl transition-shadow focus-within:border-accent/40 focus-within:shadow-lg focus-within:shadow-accent/10 dark:border-white/10 dark:bg-white/[0.04]"
    >
      <div className="flex items-center gap-2">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="¿Qué necesitas hacer?"
          className="flex-1 bg-transparent px-4 py-3 text-[15px] outline-none placeholder:text-black/35 dark:placeholder:text-white/30"
        />
        <button
          type="submit"
          disabled={!title.trim()}
          className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-accent to-accent-soft text-white shadow-lg shadow-accent/30 transition-all hover:scale-105 active:scale-95 disabled:cursor-not-allowed disabled:opacity-40 disabled:shadow-none"
          aria-label="Agregar tarea"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
            <path d="M12 5v14M5 12h14" />
          </svg>
        </button>
      </div>

      <div className="flex items-center gap-1.5 px-2 pb-1 pt-1">
        <span className="pr-1 text-xs text-black/40 dark:text-white/35">
          Prioridad
        </span>
        {ORDER.map((p) => {
          const meta = PRIORITY_META[p]
          const active = priority === p
          return (
            <button
              key={p}
              type="button"
              onClick={() => setPriority(p)}
              className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium transition-all ${
                active
                  ? 'bg-black/5 ring-1 ring-inset dark:bg-white/10 ' + meta.ring
                  : 'text-black/50 hover:bg-black/5 dark:text-white/45 dark:hover:bg-white/5'
              }`}
            >
              <span className={`h-2 w-2 rounded-full ${meta.dot}`} />
              {meta.label}
            </button>
          )
        })}
      </div>
    </form>
  )
}
