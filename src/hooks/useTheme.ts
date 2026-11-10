import { useEffect } from 'react'
import { useLocalStorage } from './useLocalStorage'

type Theme = 'light' | 'dark'

export function useTheme() {
  const prefersDark =
    typeof window !== 'undefined' &&
    window.matchMedia?.('(prefers-color-scheme: dark)').matches

  const [theme, setTheme] = useLocalStorage<Theme>(
    'taskflow:theme',
    prefersDark ? 'dark' : 'dark',
  )

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }, [theme])

  const toggle = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))

  return { theme, toggle }
}
