import { generateWorkoutSummary } from '../workoutSummary'

describe('generateWorkoutSummary', () => {
  it('should return empty summary and zero stats for empty sets', () => {
    const result = generateWorkoutSummary([])
    expect(result).toEqual({
      summary: "",
      stats: {
        totalTime: "0:00",
        totalDistance: 0,
        avgPace: "0:00/100 m",
        setCount: 0
      }
    })
  })

  it('should return empty summary and zero stats for all zero duration sets', () => {
    const sets = [
      { minutes: 0, seconds: 0, pace: 90 },
      { minutes: 0, seconds: 0, pace: 120 }
    ]
    const result = generateWorkoutSummary(sets)
    expect(result).toEqual({
      summary: "",
      stats: {
        totalTime: "0:00",
        totalDistance: 0,
        avgPace: "0:00/100 m",
        setCount: 2
      }
    })
  })

  it('should generate summary in meters by default', () => {
    const sets = [
      { minutes: 1, seconds: 30, pace: 90 },
      { minutes: 1, seconds: 30, pace: 90 }
    ]
    const { summary, stats } = generateWorkoutSummary(sets)
    
    expect(summary).toContain('/100 m')
  })

  it('should generate summary in yards when specified', () => {
    const sets = [
      { minutes: 1, seconds: 30, pace: 90 },
      { minutes: 1, seconds: 30, pace: 90 }
    ]
    const { summary, stats } = generateWorkoutSummary(sets, true)
    
    expect(summary).toContain('/100 yd')
  })

  it('should group consecutive identical sets', () => {
    const sets = [
      { minutes: 1, seconds: 30, pace: 90 },
      { minutes: 1, seconds: 30, pace: 90 },
      { minutes: 1, seconds: 30, pace: 90 },
      { minutes: 2, seconds: 0, pace: 120 }
    ]
    const { summary } = generateWorkoutSummary(sets)
    
    expect(summary).toContain('3×1:30 @ 1:30/100 m')
    expect(summary).toContain('2:00 @ 2:00/100 m')
  })

  it('should not group non-consecutive identical sets', () => {
    const sets = [
      { minutes: 1, seconds: 30, pace: 90 },
      { minutes: 2, seconds: 0, pace: 120 },
      { minutes: 1, seconds: 30, pace: 90 }
    ]
    const { summary } = generateWorkoutSummary(sets)
    
    expect(summary).toContain('1:30 @ 1:30/100 m')
    expect(summary).toContain('2:00 @ 2:00/100 m')
    expect(summary).not.toContain('2×1:30 @ 1:30/100 m')
  })

  it('should format time correctly for different durations', () => {
    const sets = [
      { minutes: 0, seconds: 45, pace: 90 },  // 45s
      { minutes: 1, seconds: 30, pace: 90 },  // 1m 30s
      { minutes: 65, seconds: 0, pace: 90 }   // 1h 5m
    ]
    const { summary } = generateWorkoutSummary(sets)
    
    expect(summary).toContain('0:45 @ 1:30/100 m')
    expect(summary).toContain('1:30 @ 1:30/100 m')
    expect(summary).toContain('65:00 @ 1:30/100 m')
    expect(summary).toContain('Time: 1:07:15') // Total time: 1h 7m 15s
  })

  it('should calculate average pace correctly', () => {
    const sets = [
      { minutes: 1, seconds: 30, pace: 90 },  // 1:30/100m
      { minutes: 2, seconds: 0, pace: 120 }   // 2:00/100m
    ]
    const { summary, stats } = generateWorkoutSummary(sets)
    
    // Average pace should be weighted by distance
    // Total time: 3:30, Total distance: 200m
    // 210 seconds / 2 = 105 seconds per 100m = 1:45/100m
    expect(stats.avgPace).toBe('1:45/100')
  })

  it('should handle sets with zero seconds', () => {
    const sets = [
      { minutes: 1, seconds: 0, pace: 90 },
      { minutes: 2, seconds: 0, pace: 120 }
    ]
    const { summary } = generateWorkoutSummary(sets)
    
    expect(summary).toContain('1:00 @ 1:30/100 m')
    expect(summary).toContain('2:00 @ 2:00/100 m')
  })

  it('should format large distances with thousands separators', () => {
    const sets = [
      { minutes: 10, seconds: 0, pace: 60 },  // 1000m
      { minutes: 10, seconds: 0, pace: 60 }   // 1000m
    ]
    const { summary, stats } = generateWorkoutSummary(sets)
    
    expect(stats.totalDistance).toBe(2000)
    expect(summary).toContain('2,000 m')
  })

  it('should filter out zero duration sets but include them in set count', () => {
    const sets = [
      { minutes: 1, seconds: 30, pace: 90 },
      { minutes: 0, seconds: 0, pace: 90 },
      { minutes: 2, seconds: 0, pace: 120 }
    ]
    const { summary, stats } = generateWorkoutSummary(sets)
    
    expect(summary).not.toContain('0:00')
    expect(stats.setCount).toBe(3) // Should include zero duration sets in count
  })

  it('should handle edge case with very short sets', () => {
    const sets = [
      { minutes: 0, seconds: 1, pace: 60 },   // 1s
      { minutes: 0, seconds: 2, pace: 60 }    // 2s
    ]
    const { summary, stats } = generateWorkoutSummary(sets)
    
    expect(summary).toContain('0:01 @ 1:00/100 m')
    expect(summary).toContain('0:02 @ 1:00/100 m')
    expect(stats.totalTime).toBe('0:03')
  })
}) 
