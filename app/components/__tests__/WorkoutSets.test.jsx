import { render, screen, fireEvent } from '@testing-library/react'
import WorkoutSets from '../WorkoutSets'

const sets = [
  { minutes: 1, seconds: 10, pace: 60 },
  { minutes: 2, seconds: 20, pace: 70 },
]

describe('WorkoutSets', () => {
  const mockUpdate = jest.fn()
  const mockRemove = jest.fn()
  const mockClear = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders all sets', () => {
    render(
      <WorkoutSets
        sets={sets}
        onUpdateSet={mockUpdate}
        onRemoveSet={mockRemove}
        onClearWorkout={mockClear}
      />
    )
    expect(screen.getByText('1')).toBeInTheDocument()
    expect(screen.getByText('2')).toBeInTheDocument()
  })

  it('calls onUpdateSet when a set is updated', () => {
    render(
      <WorkoutSets
        sets={sets}
        onUpdateSet={mockUpdate}
        onRemoveSet={mockRemove}
        onClearWorkout={mockClear}
      />
    )
    // Find the first set's minutes select
    const minutesSelect = screen.getAllByRole('combobox', { name: /minutes/i })[0]
    fireEvent.change(minutesSelect, { target: { value: '5' } })
    expect(mockUpdate).toHaveBeenCalledWith(0, { ...sets[0], minutes: 5 })
  })

  it('calls onRemoveSet when a set is removed', () => {
    render(
      <WorkoutSets
        sets={sets}
        onUpdateSet={mockUpdate}
        onRemoveSet={mockRemove}
        onClearWorkout={mockClear}
      />
    )
    // Find the first set's remove button
    const removeButton = screen.getByRole('button', { name: /remove set 1/i })
    fireEvent.click(removeButton)
    expect(mockRemove).toHaveBeenCalledWith(0)
  })

  it('calls onClearWorkout when delete all is clicked', () => {
    render(
      <WorkoutSets
        sets={sets}
        onUpdateSet={mockUpdate}
        onRemoveSet={mockRemove}
        onClearWorkout={mockClear}
      />
    )
    const deleteAllButton = screen.getByRole('button', { name: /delete all sets/i })
    fireEvent.click(deleteAllButton)
    expect(mockClear).toHaveBeenCalled()
  })
}) 
