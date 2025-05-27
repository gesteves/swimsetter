"use client"

import React, { forwardRef } from 'react'
import Card from './Card'
import { loadLastSet } from '../utils/storage'
import { formatDistance, formatPace } from '../utils/units'

const ButtonCard = forwardRef(function ButtonCard({ onAddSet, useYards }, ref) {
  const lastSet = loadLastSet()
  const distance = (lastSet.minutes * 60 + lastSet.seconds) / lastSet.pace * 100

  return (
    <Card ref={ref} className="fixed bottom-0 left-0 right-0 z-10 bg-blue-50">
      <div className="flex items-center justify-between gap-4">
        <div className="text-sm text-gray-500">
          Last set: {lastSet.minutes}:{lastSet.seconds.toString().padStart(2, '0')} @ {lastSet.pace}/{useYards ? 'yd' : 'm'} • {formatDistance(distance, useYards)} • {formatPace(lastSet.pace, useYards)}
        </div>
        <button
          onClick={onAddSet}
          className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        >
          Add Set
        </button>
      </div>
    </Card>
  )
})

export default ButtonCard 
