import { render, fireEvent, act } from '@testing-library/react'
import Preferences from '../Preferences'

describe('Preferences', () => {
  let mockWakeLock
  let mockRequest
  let mockRelease
  let mockLocalStorage

  beforeEach(() => {
    mockRelease = jest.fn()
    mockRequest = jest.fn().mockResolvedValue({ release: mockRelease })
    mockWakeLock = { request: mockRequest }
    global.navigator.wakeLock = mockWakeLock

    // Mock localStorage
    mockLocalStorage = {
      getItem: jest.fn(),
      setItem: jest.fn(),
    }
    global.localStorage = mockLocalStorage
  })

  afterEach(() => {
    delete global.navigator.wakeLock
    delete global.localStorage
    jest.clearAllMocks()
  })

  it('renders both toggles with initial state', () => {
    mockLocalStorage.getItem.mockReturnValue(null)
    const { getByText, getByRole } = render(<Preferences />)
    
    expect(getByText('Prevent screen from locking')).toBeInTheDocument()
    expect(getByText('Keep screen on during workout')).toBeInTheDocument()
    expect(getByText('Use yards instead of meters')).toBeInTheDocument()
    expect(getByText('Display distances in yards')).toBeInTheDocument()

    const wakeLockToggle = getByRole('switch', { name: /prevent screen from locking/i })
    const unitsToggle = getByRole('switch', { name: /use yards instead of meters/i })

    expect(wakeLockToggle).toHaveAttribute('aria-checked', 'false')
    expect(unitsToggle).toHaveAttribute('aria-checked', 'false')
  })

  it('loads saved preferences from localStorage', () => {
    mockLocalStorage.getItem.mockReturnValue(JSON.stringify({ useYards: true, wakeLock: true }))
    const { getByRole } = render(<Preferences />)
    
    const wakeLockToggle = getByRole('switch', { name: /prevent screen from locking/i })
    const unitsToggle = getByRole('switch', { name: /use yards instead of meters/i })

    expect(wakeLockToggle).toHaveAttribute('aria-checked', 'true')
    expect(unitsToggle).toHaveAttribute('aria-checked', 'true')
  })

  it('requests wake lock when wake lock toggle is turned on', async () => {
    mockLocalStorage.getItem.mockReturnValue(null)
    const { getByRole } = render(<Preferences />)
    const wakeLockToggle = getByRole('switch', { name: /prevent screen from locking/i })

    await act(async () => {
      fireEvent.click(wakeLockToggle)
    })

    expect(mockRequest).toHaveBeenCalledWith('screen')
    expect(wakeLockToggle).toHaveAttribute('aria-checked', 'true')
    expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
      'swimPreferences',
      JSON.stringify({ useYards: false, wakeLock: true })
    )
  })

  it('releases wake lock when wake lock toggle is turned off', async () => {
    mockLocalStorage.getItem.mockReturnValue(JSON.stringify({ wakeLock: true }))
    const { getByRole } = render(<Preferences />)
    const wakeLockToggle = getByRole('switch', { name: /prevent screen from locking/i })

    await act(async () => {
      fireEvent.click(wakeLockToggle)
    })

    expect(mockRelease).toHaveBeenCalled()
    expect(wakeLockToggle).toHaveAttribute('aria-checked', 'false')
    expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
      'swimPreferences',
      JSON.stringify({ useYards: false, wakeLock: false })
    )
  })

  it('updates units preference when yards toggle is clicked', async () => {
    mockLocalStorage.getItem.mockReturnValue(null)
    const { getByRole } = render(<Preferences />)
    const unitsToggle = getByRole('switch', { name: /use yards instead of meters/i })

    await act(async () => {
      fireEvent.click(unitsToggle)
    })

    expect(unitsToggle).toHaveAttribute('aria-checked', 'true')
    expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
      'swimPreferences',
      JSON.stringify({ useYards: true, wakeLock: false })
    )
  })

  it('handles wake lock request failure gracefully', async () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {})
    mockRequest.mockRejectedValueOnce(new Error('Permission denied'))
    mockLocalStorage.getItem.mockReturnValue(null)
    const { getByRole } = render(<Preferences />)
    const wakeLockToggle = getByRole('switch', { name: /prevent screen from locking/i })

    await act(async () => {
      fireEvent.click(wakeLockToggle)
    })

    expect(consoleSpy).toHaveBeenCalledWith('Failed to request wake lock:', expect.any(Error))
    expect(wakeLockToggle).toHaveAttribute('aria-checked', 'true')
    consoleSpy.mockRestore()
  })
}) 
