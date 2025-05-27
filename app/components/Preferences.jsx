"use client"

import React from 'react'
import Card from './Card'
import Toggle from './Toggle'
import { useWakeLock } from '../utils/wakeLock'
import { usePreferences } from '../utils/preferences'

export default function Preferences() {
  const { requestWakeLock, releaseWakeLock } = useWakeLock()
  const [preferences, updatePreferences] = usePreferences()

  const handleWakeLockToggle = async (checked) => {
    if (checked) {
      await requestWakeLock()
    } else {
      releaseWakeLock()
    }
    updatePreferences({ wakeLock: checked })
  }

  return (
    <Card>
      <div className="space-y-4">
        <Toggle
          label="Prevent the screen from turning off"
          checked={preferences.wakeLock}
          onChange={handleWakeLockToggle}
        />
      </div>
    </Card>
  )
} 
