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
      { minutes: 0, seconds: 0, pace: 90, stroke: 'FR' },
      { minutes: 0, seconds: 0, pace: 120, stroke: 'BR' }
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
      { minutes: 1, seconds: 30, pace: 90, stroke: 'FR' },
      { minutes: 1, seconds: 30, pace: 90, stroke: 'FR' }
    ]
    const { summary, stats } = generateWorkoutSummary(sets)
    
    expect(summary).toContain('/100 m')
  })

  it('should generate summary in yards when specified', () => {
    const sets = [
      { minutes: 1, seconds: 30, pace: 90, stroke: 'FR' },
      { minutes: 1, seconds: 30, pace: 90, stroke: 'FR' }
    ]
    const { summary, stats } = generateWorkoutSummary(sets, true)
    
    expect(summary).toContain('/100 yd')
  })

  it('should group consecutive identical sets including stroke', () => {
    const sets = [
      { minutes: 1, seconds: 30, pace: 90, stroke: 'FR' },
      { minutes: 1, seconds: 30, pace: 90, stroke: 'FR' },
      { minutes: 1, seconds: 30, pace: 90, stroke: 'FR' },
      { minutes: 2, seconds: 0, pace: 120, stroke: 'BR' }
    ]
    const { summary } = generateWorkoutSummary(sets)
    
    expect(summary).toContain('3×1:30 FR @ 1:30/100 m')
    expect(summary).toContain('1×2:00 BR @ 2:00/100 m')
  })

  it('should not group sets with different strokes even if time and pace are the same', () => {
    const sets = [
      { minutes: 1, seconds: 30, pace: 90, stroke: 'FR' },
      { minutes: 1, seconds: 30, pace: 90, stroke: 'BR' },
      { minutes: 1, seconds: 30, pace: 90, stroke: 'FR' }
    ]
    const { summary } = generateWorkoutSummary(sets)
    
    expect(summary).toContain('1×1:30 FR @ 1:30/100 m')
    expect(summary).toContain('1×1:30 BR @ 1:30/100 m')
    expect(summary).toContain('1×1:30 FR @ 1:30/100 m')
  })

  it('should use FR as default stroke when not specified', () => {
    const sets = [
      { minutes: 1, seconds: 30, pace: 90 },
      { minutes: 1, seconds: 30, pace: 90, stroke: 'BR' }
    ]
    const { summary } = generateWorkoutSummary(sets)
    
    expect(summary).toContain('1×1:30 FR @ 1:30/100 m')
    expect(summary).toContain('1×1:30 BR @ 1:30/100 m')
  })

  it('should format time correctly for different durations', () => {
    const sets = [
      { minutes: 0, seconds: 45, pace: 90, stroke: 'FR' },  // 45s
      { minutes: 1, seconds: 30, pace: 90, stroke: 'BR' },  // 1m 30s
      { minutes: 65, seconds: 0, pace: 90, stroke: 'BK' }   // 1h 5m
    ]
    const { summary } = generateWorkoutSummary(sets)
    
    expect(summary).toContain('1×0:45 FR @ 1:30/100 m')
    expect(summary).toContain('1×1:30 BR @ 1:30/100 m')
    expect(summary).toContain('1×65:00 BK @ 1:30/100 m')
    expect(summary).toContain('Time: 1:07:15') // Total time: 1h 7m 15s
  })

  it('should calculate average pace correctly', () => {
    const sets = [
      { minutes: 1, seconds: 30, pace: 90, stroke: 'FR' },  // 1:30/100m
      { minutes: 2, seconds: 0, pace: 120, stroke: 'BR' }   // 2:00/100m
    ]
    const { summary, stats } = generateWorkoutSummary(sets)
    
    // Average pace should be weighted by distance
    // Total time: 3:30, Total distance: 200m
    // 210 seconds / 2 = 105 seconds per 100m = 1:45/100m
    expect(stats.avgPace).toBe('1:45/100')
  })

  it('should handle sets with zero seconds', () => {
    const sets = [
      { minutes: 1, seconds: 0, pace: 90, stroke: 'FR' },
      { minutes: 2, seconds: 0, pace: 120, stroke: 'BR' }
    ]
    const { summary } = generateWorkoutSummary(sets)
    
    expect(summary).toContain('1×1:00 FR @ 1:30/100 m')
    expect(summary).toContain('1×2:00 BR @ 2:00/100 m')
  })

  it('should format large distances with thousands separators', () => {
    const sets = [
      { minutes: 10, seconds: 0, pace: 60, stroke: 'FR' },  // 1000m
      { minutes: 10, seconds: 0, pace: 60, stroke: 'FR' }   // 1000m
    ]
    const { summary, stats } = generateWorkoutSummary(sets)
    
    expect(stats.totalDistance).toBe(2000)
    expect(summary).toContain('2×10:00 FR @ 1:00/100 m')
    expect(summary).toContain('2,000 m')
  })

  it('should filter out zero duration sets but include them in set count', () => {
    const sets = [
      { minutes: 1, seconds: 30, pace: 90, stroke: 'FR' },
      { minutes: 0, seconds: 0, pace: 90, stroke: 'BR' },
      { minutes: 2, seconds: 0, pace: 120, stroke: 'BK' }
    ]
    const { summary, stats } = generateWorkoutSummary(sets)
    
    expect(summary).not.toContain('0:00')
    expect(stats.setCount).toBe(3) // Should include zero duration sets in count
  })

  it('should handle edge case with very short sets', () => {
    const sets = [
      { minutes: 0, seconds: 1, pace: 60, stroke: 'FR' },   // 1s
      { minutes: 0, seconds: 2, pace: 60, stroke: 'BR' }    // 2s
    ]
    const { summary, stats } = generateWorkoutSummary(sets)
    
    expect(summary).toContain('1×0:01 FR @ 1:00/100 m')
    expect(summary).toContain('1×0:02 BR @ 1:00/100 m')
    expect(stats.totalTime).toBe('0:03')
  })
}) 
