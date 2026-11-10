import { useEffect, useRef, useState } from 'react'
import { PRIORITY_META, type Task } from '../types'

interface Props {
  task: Task
  onToggle: (id: string) => void
  onRemove: (id: string) => void
  onEdit: (id: string, title: string) => void
}

export function TaskItem({ task, onToggle, onRemove, onEdit }: Props) {
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState(task.title)
  const inputRef = useRef<HTMLInputElement>(null)
  const meta = PRIORITY_META[task.priority]

  useEffect(() => {
    if (editing) inputRef.current?.focus()
  }, [editing])

  const commit = () => {
    onEdit(task.id, draft)
    setEditing(false)
  }

  return (
    <li className="task-enter group relative flex items-center gap-3 rounded-2xl border border-black/[0.07] bg-white/70 p-3 pr-2 backdrop-blur-xl transition-all hover:border-accent/30 hover:shadow-lg hover:shadow-accent/5 dark:border-white/[0.07] dark:bg-white/[0.03] dark:hover:border-accent/30">
      <span
        className={`absolute left-0 top-1/2 h-7 w-1 -translate-y-1/2 rounded-r-full ${meta.dot} transition-opacity ${
          task.done ? 'opacity-30' : 'opacity-100'
        }`}
      />

      <button
        onClick={() => onToggle(task.id)}
        aria-label={task.done ? 'Marcar como pendiente' : 'Marcar como hecha'}
        className={`grid h-6 w-6 shrink-0 place-items-center rounded-lg border-2 transition-all ${
          task.done
            ? 'border-accent bg-accent'
            : 'border-black/20 hover:border-accent dark:border-white/25'
        }`}
      >
        <svg
          viewBox="0 0 24 24"
          className={`tick h-4 w-4 text-white ${task.done ? 'checked' : 'opacity-0'}`}
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M4 12l5 5L20 6" />
        </svg>
      </button>

      {editing ? (
        <input
          ref={inputRef}
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onBlur={commit}
          onKeyDown={(e) => {
            if (e.key === 'Enter') commit()
            if (e.key === 'Escape') {
              setDraft(task.title)
              setEditing(false)
            }
          }}
          className="flex-1 rounded-lg bg-black/5 px-2 py-1 text-[15px] outline-none ring-1 ring-accent/40 dark:bg-white/10"
        />
      ) : (
        <button
          onDoubleClick={() => setEditing(true)}
          className={`flex-1 cursor-text select-none text-left text-[15px] transition-colors ${
            task.done
              ? 'text-black/35 line-through dark:text-white/30'
              : 'text-black/85 dark:text-white/90'
          }`}
        >
          {task.title}
        </button>
      )}

      <div className="flex items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100 focus-within:opacity-100">
        <button
          onClick={() => setEditing(true)}
          aria-label="Editar"
          className="grid h-8 w-8 place-items-center rounded-lg text-black/40 transition-colors hover:bg-black/5 hover:text-accent dark:text-white/40 dark:hover:bg-white/10"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 20h9M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4z" />
          </svg>
        </button>
        <button
          onClick={() => onRemove(task.id)}
          aria-label="Eliminar"
          className="grid h-8 w-8 place-items-center rounded-lg text-black/40 transition-colors hover:bg-rose-500/10 hover:text-rose-500 dark:text-white/40"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6" />
          </svg>
        </button>
      </div>
    </li>
  )
}
