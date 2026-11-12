import { beforeEach, describe, expect, it } from 'vitest'
import { act, renderHook } from '@testing-library/react'
import { useLocalStorage } from './useLocalStorage'

beforeEach(() => localStorage.clear())

describe('useLocalStorage', () => {
  it('returns the initial value when nothing is stored', () => {
    const { result } = renderHook(() => useLocalStorage('count', 0))
    expect(result.current[0]).toBe(0)
  })

  it('persists updates to localStorage', () => {
    const { result } = renderHook(() => useLocalStorage('count', 0))
    act(() => result.current[1](5))
    expect(result.current[0]).toBe(5)
    expect(localStorage.getItem('count')).toBe('5')
  })

  it('reads a previously stored value', () => {
    localStorage.setItem('count', '42')
    const { result } = renderHook(() => useLocalStorage('count', 0))
    expect(result.current[0]).toBe(42)
  })
})
