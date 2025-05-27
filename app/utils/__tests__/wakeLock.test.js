import { renderHook, act } from '@testing-library/react'
import { useWakeLock } from '../wakeLock'

describe('useWakeLock', () => {
  let mockWakeLock
  let mockRequest
  let mockRelease

  beforeEach(() => {
    mockRelease = jest.fn()
    mockRequest = jest.fn().mockResolvedValue({ release: mockRelease })
    mockWakeLock = { request: mockRequest }
    global.navigator.wakeLock = mockWakeLock
  })

  afterEach(() => {
    delete global.navigator.wakeLock
    jest.clearAllMocks()
  })

  it('requests wake lock when requestWakeLock is called', async () => {
    const { result } = renderHook(() => useWakeLock())
    await act(async () => {
      await result.current.requestWakeLock()
    })
    expect(mockRequest).toHaveBeenCalledWith('screen')
  })

  it('releases wake lock when releaseWakeLock is called', async () => {
    const { result } = renderHook(() => useWakeLock())
    await act(async () => {
      await result.current.requestWakeLock()
      result.current.releaseWakeLock()
    })
    expect(mockRelease).toHaveBeenCalled()
  })

  it('handles wake lock request failure gracefully', async () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {})
    mockRequest.mockRejectedValueOnce(new Error('Permission denied'))
    const { result } = renderHook(() => useWakeLock())
    await act(async () => {
      await result.current.requestWakeLock()
    })
    expect(consoleSpy).toHaveBeenCalledWith('Failed to request wake lock:', expect.any(Error))
    consoleSpy.mockRestore()
  })

  it('reacquires wake lock on visibility change if it was previously active', async () => {
    const { result } = renderHook(() => useWakeLock())
    await act(async () => {
      await result.current.requestWakeLock()
      // Simulate visibility change
      document.visibilityState = 'hidden'
      document.dispatchEvent(new Event('visibilitychange'))
      document.visibilityState = 'visible'
      document.dispatchEvent(new Event('visibilitychange'))
    })
    expect(mockRequest).toHaveBeenCalledTimes(2)
  })

  it('does not reacquire wake lock on visibility change if it was not previously active', async () => {
    renderHook(() => useWakeLock())
    await act(async () => {
      document.visibilityState = 'hidden'
      document.dispatchEvent(new Event('visibilitychange'))
      document.visibilityState = 'visible'
      document.dispatchEvent(new Event('visibilitychange'))
    })
    expect(mockRequest).not.toHaveBeenCalled()
  })

  it('releases wake lock on cleanup', async () => {
    const { result, unmount } = renderHook(() => useWakeLock())
    await act(async () => {
      await result.current.requestWakeLock()
    })
    unmount()
    expect(mockRelease).toHaveBeenCalled()
  })
}) 
