import { beforeEach, describe, expect, it } from 'vitest'
import { act, renderHook } from '@testing-library/react'
import { useTasks } from './useTasks'

beforeEach(() => localStorage.clear())

describe('useTasks', () => {
  it('starts from the seed with three tasks, one completed', () => {
    const { result } = renderHook(() => useTasks())
    expect(result.current.stats.total).toBe(3)
    expect(result.current.stats.done).toBe(1)
    expect(result.current.stats.active).toBe(2)
  })

  it('adds a task at the top and ignores blank titles', () => {
    const { result } = renderHook(() => useTasks())
    act(() => result.current.add('Write tests', 'high'))
    expect(result.current.tasks[0].title).toBe('Write tests')
    expect(result.current.stats.total).toBe(4)

    act(() => result.current.add('   ', 'low'))
    expect(result.current.stats.total).toBe(4)
  })

  it('toggles completion and recomputes progress', () => {
    const { result } = renderHook(() => useTasks())
    const first = result.current.tasks[0]
    act(() => result.current.toggle(first.id))
    expect(result.current.tasks.find((t) => t.id === first.id)?.done).toBe(true)
    expect(result.current.stats.pct).toBeGreaterThan(0)
  })

  it('removes a task and clears completed ones', () => {
    const { result } = renderHook(() => useTasks())
    const target = result.current.tasks[0]
    act(() => result.current.remove(target.id))
    expect(result.current.tasks.some((t) => t.id === target.id)).toBe(false)

    act(() => result.current.clearCompleted())
    expect(result.current.tasks.every((t) => !t.done)).toBe(true)
  })

  it('filters by state', () => {
    const { result } = renderHook(() => useTasks())
    expect(result.current.byFilter('completed').every((t) => t.done)).toBe(true)
    expect(result.current.byFilter('active').every((t) => !t.done)).toBe(true)
  })
})
