"use client"

import { useEffect, useRef, useState } from 'react'

export function useWakeLock() {
  const wakeLockRef = useRef(null)
  const [wakeLockActive, setWakeLockActive] = useState(false)
  const [wakeLockRequested, setWakeLockRequested] = useState(false)

  const requestWakeLock = async () => {
    if (!navigator.wakeLock) return

    try {
      wakeLockRef.current = await navigator.wakeLock.request('screen')
      setWakeLockActive(true)
    } catch (err) {
      console.error('Failed to request wake lock:', err)
      setWakeLockActive(false)
    }
  }

  const releaseWakeLock = () => {
    if (wakeLockRef.current) {
      wakeLockRef.current.release()
      wakeLockRef.current = null
      setWakeLockActive(false)
    }
  }

  useEffect(() => {
    const handleVisibilityChange = async () => {
      if (
        document.visibilityState === 'visible' &&
        wakeLockRequested &&
        wakeLockRef.current === null
      ) {
        await requestWakeLock()
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      releaseWakeLock()
    }
  }, [wakeLockRequested])

  // When user toggles, request or release the lock
  useEffect(() => {
    if (wakeLockRequested) {
      requestWakeLock()
    } else {
      releaseWakeLock()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wakeLockRequested])

  return {
    requestWakeLock,
    releaseWakeLock,
    wakeLockActive,
    wakeLockRequested,
    setWakeLockRequested,
  }
} 
