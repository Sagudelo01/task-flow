import { useState } from 'react'
import { Header } from './components/Header'
import { ProgressCard } from './components/ProgressCard'
import { Composer } from './components/Composer'
import { Filters } from './components/Filters'
import { TaskList } from './components/TaskList'
import { useTasks } from './hooks/useTasks'
import type { Filter } from './types'

export default function App() {
  const { add, toggle, remove, edit, clearCompleted, stats, byFilter } = useTasks()
  const [filter, setFilter] = useState<Filter>('all')

  return (
    <div className="aurora min-h-svh px-5 py-8 sm:py-12">
      <main className="mx-auto flex w-full max-w-xl flex-col gap-5">
        <Header />
        <ProgressCard {...stats} />
        <Composer onAdd={add} />
        <Filters
          value={filter}
          onChange={setFilter}
          hasCompleted={stats.done > 0}
          onClear={clearCompleted}
        />
        <TaskList
          tasks={byFilter(filter)}
          filter={filter}
          onToggle={toggle}
          onRemove={remove}
          onEdit={edit}
        />
        <p className="relative z-10 pt-2 text-center text-xs text-black/35 dark:text-white/30">
          Doble clic para editar · Se guarda en tu navegador
        </p>
      </main>
    </div>
  )
}
