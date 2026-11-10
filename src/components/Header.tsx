import { useTheme } from '../hooks/useTheme'

export function Header() {
  const { theme, toggle } = useTheme()

  return (
    <header className="relative z-10 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-accent to-accent-soft shadow-lg shadow-accent/30">
          <svg
            viewBox="0 0 24 24"
            className="h-6 w-6 text-white"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M4 12l5 5L20 6" />
          </svg>
        </div>
        <div>
          <h1 className="text-lg font-bold tracking-tight">TaskFlow</h1>
          <p className="text-xs text-black/50 dark:text-white/45">
            Enfócate en lo que importa
          </p>
        </div>
      </div>

      <button
        onClick={toggle}
        aria-label="Cambiar tema"
        className="group grid h-11 w-11 place-items-center rounded-2xl border border-black/10 bg-white/60 backdrop-blur transition-all hover:scale-105 hover:border-accent/40 active:scale-95 dark:border-white/10 dark:bg-white/5"
      >
        {theme === 'dark' ? (
          <svg
            viewBox="0 0 24 24"
            className="h-5 w-5 text-amber-300 transition-transform group-hover:rotate-45"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.5 1.5M17.5 17.5L19 19M19 5l-1.5 1.5M6.5 17.5L5 19" />
          </svg>
        ) : (
          <svg
            viewBox="0 0 24 24"
            className="h-5 w-5 text-indigo-500 transition-transform group-hover:-rotate-12"
            fill="currentColor"
          >
            <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
          </svg>
        )}
      </button>
    </header>
  )
}
