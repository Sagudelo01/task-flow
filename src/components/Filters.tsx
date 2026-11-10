import type { Filter } from '../types'

interface Props {
  value: Filter
  onChange: (f: Filter) => void
  hasCompleted: boolean
  onClear: () => void
}

const TABS: { key: Filter; label: string }[] = [
  { key: 'all', label: 'Todas' },
  { key: 'active', label: 'Activas' },
  { key: 'completed', label: 'Hechas' },
]

export function Filters({ value, onChange, hasCompleted, onClear }: Props) {
  return (
    <div className="relative z-10 flex items-center justify-between">
      <div className="flex rounded-2xl border border-black/10 bg-white/60 p-1 backdrop-blur dark:border-white/10 dark:bg-white/[0.04]">
        {TABS.map((t) => (
          <button
            key={t.key}
            onClick={() => onChange(t.key)}
            className={`relative rounded-xl px-4 py-1.5 text-sm font-medium transition-colors ${
              value === t.key
                ? 'text-white'
                : 'text-black/55 hover:text-black dark:text-white/50 dark:hover:text-white'
            }`}
          >
            {value === t.key && (
              <span className="absolute inset-0 rounded-xl bg-gradient-to-br from-accent to-accent-soft shadow-md shadow-accent/30" />
            )}
            <span className="relative">{t.label}</span>
          </button>
        ))}
      </div>

      {hasCompleted && (
        <button
          onClick={onClear}
          className="text-sm font-medium text-black/45 transition-colors hover:text-rose-500 dark:text-white/40 dark:hover:text-rose-400"
        >
          Limpiar hechas
        </button>
      )}
    </div>
  )
}
