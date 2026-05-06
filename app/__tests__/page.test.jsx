import { render, screen, fireEvent, act } from '@testing-library/react'
import Home from '../page'

jest.mock('../utils/storage', () => ({
  loadSets: jest.fn(() => []),
  saveSets: jest.fn(),
  loadLastSet: jest.fn(() => ({ minutes: 1, seconds: 0, pace: 68, stroke: 'FR' })),
  loadPreferences: jest.fn(() => ({ useYards: false })),
  savePreferences: jest.fn(),
}))

const storage = require('../utils/storage')

beforeEach(() => {
  jest.clearAllMocks()
  storage.loadSets.mockReturnValue([])
  storage.loadLastSet.mockReturnValue({ minutes: 1, seconds: 0, pace: 68, stroke: 'FR' })
  storage.loadPreferences.mockReturnValue({ useYards: false })
})

describe('Home page', () => {
  it('shows Intro when there are no sets', () => {
    render(<Home />)
    expect(screen.getByRole('button', { name: /add a new set/i })).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: /delete all sets/i })).not.toBeInTheDocument()
  })

  it('hydrates sets from storage on mount', () => {
    storage.loadSets.mockReturnValue([
      { minutes: 2, seconds: 0, pace: 90, stroke: 'FR' },
    ])
    render(<Home />)
    expect(screen.getByRole('button', { name: /delete all sets/i })).toBeInTheDocument()
    expect(screen.getByLabelText(/Stroke/i)).toHaveValue('FR')
  })

  it('hydrates useYards preference from storage', () => {
    storage.loadPreferences.mockReturnValue({ useYards: true })
    storage.loadSets.mockReturnValue([
      { minutes: 1, seconds: 30, pace: 90, stroke: 'FR' },
    ])
    render(<Home />)
    expect(screen.getByLabelText(/yards instead of meters/i)).toBeChecked()
  })

  it('appends a new set when Add Set is clicked and persists', () => {
    render(<Home />)
    fireEvent.click(screen.getByRole('button', { name: /add a new set/i }))
    expect(storage.loadLastSet).toHaveBeenCalled()
    expect(storage.saveSets).toHaveBeenCalledWith([
      { minutes: 1, seconds: 0, pace: 68, stroke: 'FR' },
    ])
  })

  it('removes a set after the confirm step', () => {
    storage.loadSets.mockReturnValue([
      { minutes: 1, seconds: 30, pace: 90, stroke: 'FR' },
    ])
    render(<Home />)
    const removeBtn = screen.getByRole('button', { name: /^remove set 1$/i })
    fireEvent.click(removeBtn)
    expect(
      screen.getByRole('button', { name: /are you sure you want to remove set 1/i })
    ).toBeInTheDocument()
    fireEvent.click(
      screen.getByRole('button', { name: /are you sure you want to remove set 1/i })
    )
    expect(storage.saveSets).toHaveBeenLastCalledWith([])
  })

  it('clears all sets via the Delete all sets confirmation', () => {
    storage.loadSets.mockReturnValue([
      { minutes: 1, seconds: 30, pace: 90, stroke: 'FR' },
      { minutes: 1, seconds: 30, pace: 90, stroke: 'FR' },
    ])
    render(<Home />)
    fireEvent.click(screen.getByRole('button', { name: /delete all sets/i }))
    fireEvent.click(screen.getByRole('button', { name: /are you sure/i }))
    expect(storage.saveSets).toHaveBeenLastCalledWith([])
  })

  it('persists preference change when toggling yards', () => {
    render(<Home />)
    fireEvent.click(screen.getByRole('switch', { name: /yards instead of meters/i }))
    expect(storage.savePreferences).toHaveBeenCalledWith({ useYards: true })
  })

  it('resets the remove confirmation after 2 seconds', () => {
    jest.useFakeTimers()
    storage.loadSets.mockReturnValue([
      { minutes: 1, seconds: 30, pace: 90, stroke: 'FR' },
    ])
    render(<Home />)
    fireEvent.click(screen.getByRole('button', { name: /^remove set 1$/i }))
    expect(
      screen.getByRole('button', { name: /are you sure you want to remove set 1/i })
    ).toBeInTheDocument()
    act(() => {
      jest.advanceTimersByTime(2000)
    })
    expect(screen.getByRole('button', { name: /^remove set 1$/i })).toBeInTheDocument()
    jest.useRealTimers()
  })
})
