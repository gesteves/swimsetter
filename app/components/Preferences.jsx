"use client"

import React from 'react'
import Card from './Card'
import Toggle from './Toggle'
import { useWakeLock } from '../utils/wakeLock'
import { savePreferences } from '../utils/storage'

export default function Preferences({ useYards, setUseYards }) {
  const { wakeLockRequested, setWakeLockRequested } = useWakeLock()

  const handleWakeLockToggle = (checked) => {
    setWakeLockRequested(checked)
  }

  const handleUnitsToggle = (checked) => {
    setUseYards(checked)
    savePreferences({ useYards: checked })
  }

  return (
    <Card>
      <div className="space-y-4">
        <Toggle
          label="Prevent the screen from turning off"
          checked={wakeLockRequested}
          onChange={handleWakeLockToggle}
        />
        <Toggle
          label="Use yards instead of meters"
          checked={useYards}
          onChange={handleUnitsToggle}
        />
      </div>
    </Card>
  )
} 
