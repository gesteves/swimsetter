import { loadSets, loadLastSet, saveSets } from '../storage'

describe('storage utils', () => {
  beforeEach(() => {
    localStorage.clear()
    jest.clearAllMocks()
  })

  it('returns [] if no sets in localStorage', () => {
    expect(loadSets()).toEqual([])
  })

  it('returns sets from localStorage', () => {
    const sets = [{ minutes: 1, seconds: 2, pace: 3, stroke: 'BR' }]
    localStorage.setItem('swimSets', JSON.stringify(sets))
    expect(loadSets()).toEqual(sets)
  })

  it('returns default set if no last set in localStorage', () => {
    expect(loadLastSet()).toEqual({ minutes: 1, seconds: 0, pace: 68, stroke: 'FR' })
  })

  it('returns last set from localStorage', () => {
    const lastSet = { minutes: 2, seconds: 3, pace: 4, stroke: 'BK' }
    localStorage.setItem('swimLastSet', JSON.stringify(lastSet))
    expect(loadLastSet()).toEqual(lastSet)
  })

  it('saveSets stores sets and last set in localStorage', () => {
    const sets = [
      { minutes: 1, seconds: 2, pace: 3, stroke: 'FL' },
      { minutes: 4, seconds: 5, pace: 6, stroke: 'BR' }
    ]
    saveSets(sets)
    expect(localStorage.setItem).toHaveBeenCalledWith('swimSets', JSON.stringify(sets))
    expect(localStorage.setItem).toHaveBeenCalledWith('swimLastSet', JSON.stringify(sets[1]))
  })
}) 
