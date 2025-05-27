import { render, act } from '@testing-library/react'
import { useWakeLock } from '../wakeLock'
import React from 'react'

describe('useWakeLock', () => {
  let requestSpy
  beforeEach(() => {
    requestSpy = jest.spyOn(navigator.wakeLock, 'request')
    requestSpy.mockResolvedValue({ release: jest.fn() })
  })
  afterEach(() => {
    requestSpy.mockRestore()
  })

  function TestComponent() {
    const { requestWakeLock } = useWakeLock()
    return <button onClick={requestWakeLock}>Request</button>
  }

  it('calls navigator.wakeLock.request when requestWakeLock is called', async () => {
    const { getByText } = render(<TestComponent />)
    await act(async () => {
      getByText('Request').click()
    })
    expect(navigator.wakeLock.request).toHaveBeenCalledWith('screen')
  })

  it('sets up visibilitychange event handler', () => {
    const addSpy = jest.spyOn(document, 'addEventListener')
    const removeSpy = jest.spyOn(document, 'removeEventListener')
    const { unmount } = render(<TestComponent />)
    expect(addSpy).toHaveBeenCalledWith('visibilitychange', expect.any(Function))
    unmount()
    expect(removeSpy).toHaveBeenCalledWith('visibilitychange', expect.any(Function))
    addSpy.mockRestore()
    removeSpy.mockRestore()
  })
}) 
