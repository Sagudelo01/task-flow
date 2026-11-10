import type { Filter, Task } from '../types'
import { TaskItem } from './TaskItem'

interface Props {
  tasks: Task[]
  filter: Filter
  onToggle: (id: string) => void
  onRemove: (id: string) => void
  onEdit: (id: string, title: string) => void
}

const EMPTY_COPY: Record<Filter, { title: string; sub: string }> = {
  all: { title: 'Sin tareas todavía', sub: 'Agrega la primera arriba para empezar.' },
  active: { title: 'Nada pendiente', sub: 'Disfruta el momento — todo está hecho.' },
  completed: { title: 'Aún nada completado', sub: 'Marca una tarea para verla aquí.' },
}

export function TaskList({ tasks, filter, onToggle, onRemove, onEdit }: Props) {
  if (tasks.length === 0) {
    const copy = EMPTY_COPY[filter]
    return (
      <div className="relative z-10 flex flex-col items-center gap-2 rounded-3xl border border-dashed border-black/15 py-14 text-center dark:border-white/15">
        <div className="animate-float grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-accent/20 to-sky-400/20 text-accent">
          <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 11l3 3L22 4M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
          </svg>
        </div>
        <p className="font-semibold">{copy.title}</p>
        <p className="text-sm text-black/45 dark:text-white/40">{copy.sub}</p>
      </div>
    )
  }

  return (
    <ul className="relative z-10 flex flex-col gap-2.5">
      {tasks.map((t) => (
        <TaskItem
          key={t.id}
          task={t}
          onToggle={onToggle}
          onRemove={onRemove}
          onEdit={onEdit}
        />
      ))}
    </ul>
  )
}
