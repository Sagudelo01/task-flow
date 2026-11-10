export type Priority = 'low' | 'medium' | 'high'

export type Filter = 'all' | 'active' | 'completed'

export interface Task {
  id: string
  title: string
  priority: Priority
  done: boolean
  createdAt: number
}

export const PRIORITY_META: Record<
  Priority,
  { label: string; dot: string; ring: string }
> = {
  low: { label: 'Baja', dot: 'bg-sky-400', ring: 'ring-sky-400/30' },
  medium: { label: 'Media', dot: 'bg-amber-400', ring: 'ring-amber-400/30' },
  high: { label: 'Alta', dot: 'bg-rose-400', ring: 'ring-rose-400/30' },
}
