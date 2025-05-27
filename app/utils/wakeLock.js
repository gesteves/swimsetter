"use client"

import { useEffect, useRef } from 'react'

export function useWakeLock() {
  const wakeLockRef = useRef(null)

  const requestWakeLock = async () => {
    if (!navigator.wakeLock) return

    try {
      wakeLockRef.current = await navigator.wakeLock.request('screen')
    } catch (err) {
      console.error('Failed to request wake lock:', err)
    }
  }

  const releaseWakeLock = () => {
    if (wakeLockRef.current) {
      wakeLockRef.current.release()
      wakeLockRef.current = null
    }
  }

  useEffect(() => {
    const handleVisibilityChange = async () => {
      if (document.visibilityState === 'visible' && wakeLockRef.current === null) {
        await requestWakeLock()
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      releaseWakeLock()
    }
  }, [])

  return { requestWakeLock, releaseWakeLock }
} 
