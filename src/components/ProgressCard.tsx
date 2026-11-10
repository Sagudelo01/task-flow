interface Props {
  done: number
  total: number
  active: number
  pct: number
}

export function ProgressCard({ done, total, active, pct }: Props) {
  const radius = 26
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (pct / 100) * circumference

  return (
    <div className="relative z-10 flex items-center justify-between gap-4 overflow-hidden rounded-3xl border border-black/10 bg-white/70 p-5 backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.04]">
      <div>
        <p className="text-xs font-medium uppercase tracking-wider text-black/45 dark:text-white/40">
          Progreso de hoy
        </p>
        <p className="mt-1 text-2xl font-bold tracking-tight">
          {done}
          <span className="text-black/35 dark:text-white/35"> / {total}</span>
        </p>
        <p className="mt-0.5 text-sm text-black/50 dark:text-white/45">
          {active === 0 && total > 0
            ? '¡Todo listo! 🎉'
            : `${active} pendiente${active === 1 ? '' : 's'}`}
        </p>
      </div>

      <div className="relative grid place-items-center">
        <svg viewBox="0 0 64 64" className="h-16 w-16 -rotate-90">
          <circle
            cx="32"
            cy="32"
            r={radius}
            fill="none"
            strokeWidth="6"
            className="stroke-black/10 dark:stroke-white/10"
          />
          <circle
            cx="32"
            cy="32"
            r={radius}
            fill="none"
            strokeWidth="6"
            strokeLinecap="round"
            stroke="url(#grad)"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            style={{ transition: 'stroke-dashoffset 0.6s cubic-bezier(0.2,0.8,0.2,1)' }}
          />
          <defs>
            <linearGradient id="grad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#7c5cff" />
              <stop offset="100%" stopColor="#38bdf8" />
            </linearGradient>
          </defs>
        </svg>
        <span className="absolute text-sm font-bold">{pct}%</span>
      </div>
    </div>
  )
}
