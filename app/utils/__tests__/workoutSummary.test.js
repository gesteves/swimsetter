import { generateWorkoutSummary } from '../workoutSummary'

describe('generateWorkoutSummary', () => {
  it('returns empty string for all zero sets', () => {
    expect(generateWorkoutSummary([{ minutes: 0, seconds: 0, pace: 60 }])).toBe('')
  })

  it('returns correct summary and stats for single set', () => {
    const sets = [{ minutes: 1, seconds: 30, pace: 60 }]
    const result = generateWorkoutSummary(sets)
    expect(result.summary).toMatch(/1:30 @ 1:00\/100m/)
    expect(result.summary).toMatch(/---/)
    expect(result.summary).toMatch(/1:30 total/)
    expect(result.summary).toMatch(/1:00\/100 m avg. pace/)
    expect(result.summary).toMatch(/150 m/)
    expect(result.stats).toEqual(
      expect.objectContaining({
        totalTime: '1:30',
        totalDistance: 150,
        avgPace: '1:00/100 m',
        setCount: 1
      })
    )
  })

  it('groups consecutive identical sets', () => {
    const sets = [
      { minutes: 1, seconds: 0, pace: 60 },
      { minutes: 1, seconds: 0, pace: 60 },
      { minutes: 2, seconds: 0, pace: 70 }
    ]
    const result = generateWorkoutSummary(sets)
    expect(result.summary).toMatch(/2×1:00 @ 1:00\/100m/)
    expect(result.summary).toMatch(/2:00 @ 1:10\/100m/)
  })

  it('formats time as H:MM:SS if over an hour', () => {
    const sets = [
      { minutes: 61, seconds: 0, pace: 60 }
    ]
    const result = generateWorkoutSummary(sets)
    expect(result.summary).toMatch(/1:01:00 total/)
    expect(result.stats.totalTime).toBe('1:01:00')
  })
}) 
