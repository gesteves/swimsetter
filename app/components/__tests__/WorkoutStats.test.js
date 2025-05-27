import { render, screen, fireEvent, act } from '@testing-library/react'
import WorkoutStats from '../WorkoutStats'

describe('WorkoutStats', () => {
  const stats = {
    setCount: 5,
    totalTime: '12:34',
    totalDistance: 1000,
    avgPace: '1:15/100 m',
  }
  const mockCopy = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders stats correctly', () => {
    render(<WorkoutStats stats={stats} onCopy={mockCopy} />)
    expect(screen.getByText('5')).toBeInTheDocument()
    expect(screen.getByText('12:34')).toBeInTheDocument()
    expect(screen.getByText('1,000 m')).toBeInTheDocument()
    expect(screen.getByText('1:15/100 m')).toBeInTheDocument()
  })

  it('shows dash for pace if totalDistance is 0', () => {
    render(<WorkoutStats stats={{ ...stats, totalDistance: 0 }} onCopy={mockCopy} />)
    expect(screen.getByText('—')).toBeInTheDocument()
  })

  it('calls onCopy and shows feedback when copy button is clicked', () => {
    jest.useFakeTimers()
    render(<WorkoutStats stats={stats} onCopy={mockCopy} />)
    const button = screen.getByRole('button', { name: /copy to clipboard/i })
    fireEvent.click(button)
    expect(mockCopy).toHaveBeenCalled()
    expect(screen.getByText(/copied to clipboard/i)).toBeInTheDocument()
    // Feedback disappears after 2 seconds
    act(() => {
      jest.advanceTimersByTime(2000)
    })
    expect(screen.getByText(/copy to clipboard/i)).toBeInTheDocument()
    jest.useRealTimers()
  })
}) 
