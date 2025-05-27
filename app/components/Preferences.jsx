"use client"

import React from 'react'
import Card from './Card'
import Toggle from './Toggle'
import { useWakeLock } from '../utils/wakeLock'

export default function Preferences() {
  const { wakeLockRequested, setWakeLockRequested, wakeLockActive } = useWakeLock()

  const handleWakeLockToggle = (checked) => {
    setWakeLockRequested(checked)
  }

  return (
    <Card>
      <div className="space-y-4">
        <Toggle
          label="Prevent the screen from turning off"
          checked={wakeLockRequested}
          onChange={handleWakeLockToggle}
        />
      </div>
    </Card>
  )
} 
