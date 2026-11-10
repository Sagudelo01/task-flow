import { useMemo } from 'react'
import { useLocalStorage } from './useLocalStorage'
import type { Filter, Priority, Task } from '../types'

const SEED: Task[] = [
  {
    id: 'seed-1',
    title: 'Diseñar el flujo de onboarding',
    priority: 'high',
    done: false,
    createdAt: Date.now() - 6000,
  },
  {
    id: 'seed-2',
    title: 'Revisar pull requests del equipo',
    priority: 'medium',
    done: false,
    createdAt: Date.now() - 4000,
  },
  {
    id: 'seed-3',
    title: 'Configurar despliegue continuo',
    priority: 'low',
    done: true,
    createdAt: Date.now() - 2000,
  },
]

const uid = () =>
  typeof crypto !== 'undefined' && 'randomUUID' in crypto
    ? crypto.randomUUID()
    : Math.random().toString(36).slice(2)

export function useTasks() {
  const [tasks, setTasks] = useLocalStorage<Task[]>('taskflow:tasks', SEED)

  const add = (title: string, priority: Priority) => {
    const value = title.trim()
    if (!value) return
    setTasks((prev) => [
      { id: uid(), title: value, priority, done: false, createdAt: Date.now() },
      ...prev,
    ])
  }

  const toggle = (id: string) =>
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)),
    )

  const remove = (id: string) =>
    setTasks((prev) => prev.filter((t) => t.id !== id))

  const edit = (id: string, title: string) =>
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, title: title.trim() || t.title } : t)),
    )

  const clearCompleted = () => setTasks((prev) => prev.filter((t) => !t.done))

  const stats = useMemo(() => {
    const total = tasks.length
    const done = tasks.filter((t) => t.done).length
    return { total, done, active: total - done, pct: total ? Math.round((done / total) * 100) : 0 }
  }, [tasks])

  const byFilter = (filter: Filter) =>
    tasks.filter((t) =>
      filter === 'active' ? !t.done : filter === 'completed' ? t.done : true,
    )

  return { tasks, add, toggle, remove, edit, clearCompleted, stats, byFilter }
}
