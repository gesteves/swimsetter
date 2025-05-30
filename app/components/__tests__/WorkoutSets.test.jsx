import { render, screen, fireEvent, act } from '@testing-library/react';
import WorkoutSets from '../WorkoutSets';

const sets = [
  { minutes: 1, seconds: 10, pace: 60 },
  { minutes: 2, seconds: 20, pace: 70 },
];

describe('WorkoutSets', () => {
  const mockUpdate = jest.fn();
  const mockRemove = jest.fn();
  const mockClear = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
  });

  afterEach(() => {
    act(() => {
      jest.runOnlyPendingTimers();
    });
    jest.useRealTimers();
  });

  it('renders all sets as list items', () => {
    render(
      <WorkoutSets
        sets={sets}
        onUpdateSet={mockUpdate}
        onRemoveSet={mockRemove}
        onClearWorkout={mockClear}
      />
    );
    const listItems = screen.getAllByRole('listitem');
    expect(listItems).toHaveLength(sets.length);
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
  });

  it('calls onUpdateSet when a set is updated', () => {
    render(
      <WorkoutSets
        sets={sets}
        onUpdateSet={mockUpdate}
        onRemoveSet={mockRemove}
        onClearWorkout={mockClear}
      />
    );
    const minutesSelect = screen.getAllByRole('combobox', { name: /minutes/i })[0];
    fireEvent.change(minutesSelect, { target: { value: '5' } });
    expect(mockUpdate).toHaveBeenCalledWith(0, { ...sets[0], minutes: 5 });
  });

  it('calls onRemoveSet when remove button is confirmed', () => {
    render(
      <WorkoutSets
        sets={sets}
        onUpdateSet={mockUpdate}
        onRemoveSet={mockRemove}
        onClearWorkout={mockClear}
      />
    );

    const removeButton = screen.getAllByRole('button')[0];

    act(() => {
      fireEvent.click(removeButton); // confirmation step
    });

    expect(mockRemove).not.toHaveBeenCalled();

    act(() => {
      fireEvent.click(removeButton); // confirmation click
    });

    expect(mockRemove).toHaveBeenCalledWith(0);
  });

  it('requires confirmation before calling onClearWorkout', () => {
    render(
      <WorkoutSets
        sets={sets}
        onUpdateSet={mockUpdate}
        onRemoveSet={mockRemove}
        onClearWorkout={mockClear}
      />
    );

    const deleteButton = screen.getByRole('button', { name: /delete all sets/i });

    act(() => {
      fireEvent.click(deleteButton);
    });

    expect(mockClear).not.toHaveBeenCalled();

    const confirmButton = screen.getByRole('button', { name: /are you sure/i });

    act(() => {
      fireEvent.click(confirmButton);
    });

    expect(mockClear).toHaveBeenCalled();
  });

  it('resets confirmation after timeout if not confirmed', () => {
    render(
      <WorkoutSets
        sets={sets}
        onUpdateSet={mockUpdate}
        onRemoveSet={mockRemove}
        onClearWorkout={mockClear}
      />
    );

    const deleteButton = screen.getByRole('button', { name: /delete all sets/i });

    act(() => {
      fireEvent.click(deleteButton);
    });

    expect(screen.getByRole('button', { name: /are you sure/i })).toBeInTheDocument();

    act(() => {
      jest.advanceTimersByTime(2000);
    });

    expect(screen.getByRole('button', { name: /delete all sets/i })).toBeInTheDocument();
  });
});
