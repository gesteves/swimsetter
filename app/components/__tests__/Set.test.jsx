import { render, screen, fireEvent, act } from '@testing-library/react';
import Set from '../Set';

describe('Set component', () => {
  const mockSet = {
    minutes: 1,
    seconds: 30,
    pace: 68,
  };
  const mockOnUpdate = jest.fn();
  const mockOnRemove = jest.fn();

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

  it('renders set number correctly', () => {
    render(
      <ul>
        <Set
          index={0}
          set={mockSet}
          onUpdate={mockOnUpdate}
          onRemove={mockOnRemove}
        />
      </ul>
    );
    expect(screen.getByText('1')).toBeInTheDocument();
  });

  it('renders time and pace selectors with correct initial values', () => {
    render(
      <ul>
        <Set
          index={0}
          set={mockSet}
          onUpdate={mockOnUpdate}
          onRemove={mockOnRemove}
        />
      </ul>
    );

    expect(screen.getByRole('combobox', { name: /minutes/i })).toHaveValue('1');
    expect(screen.getByRole('combobox', { name: /seconds/i })).toHaveValue('30');
    expect(screen.getByRole('combobox', { name: /pace/i })).toHaveValue('68');
  });

  it('calls onUpdate when time is changed', () => {
    render(
      <ul>
        <Set
          index={0}
          set={mockSet}
          onUpdate={mockOnUpdate}
          onRemove={mockOnRemove}
        />
      </ul>
    );

    fireEvent.change(screen.getByRole('combobox', { name: /minutes/i }), {
      target: { value: '2' },
    });
    expect(mockOnUpdate).toHaveBeenCalledWith({ ...mockSet, minutes: 2 });

    fireEvent.change(screen.getByRole('combobox', { name: /seconds/i }), {
      target: { value: '45' },
    });
    expect(mockOnUpdate).toHaveBeenCalledWith({ ...mockSet, seconds: 45 });
  });

  it('calls onUpdate when pace is changed', () => {
    render(
      <ul>
        <Set
          index={0}
          set={mockSet}
          onUpdate={mockOnUpdate}
          onRemove={mockOnRemove}
        />
      </ul>
    );

    fireEvent.change(screen.getByRole('combobox', { name: /pace/i }), {
      target: { value: '75' },
    });
    expect(mockOnUpdate).toHaveBeenCalledWith({ ...mockSet, pace: 75 });
  });

  it('requires confirmation before calling onRemove', () => {
    render(
      <ul>
        <Set
          index={0}
          set={mockSet}
          onUpdate={mockOnUpdate}
          onRemove={mockOnRemove}
        />
      </ul>
    );

    const button = screen.getByRole('button');
    act(() => {
      fireEvent.click(button);
    });
    expect(mockOnRemove).not.toHaveBeenCalled();

    act(() => {
      fireEvent.click(button);
    });
    expect(mockOnRemove).toHaveBeenCalled();
  });

  it('resets confirmation after timeout', () => {
    render(
      <ul>
        <Set
          index={0}
          set={mockSet}
          onUpdate={mockOnUpdate}
          onRemove={mockOnRemove}
        />
      </ul>
    );

    const button = screen.getByRole('button');

    act(() => {
      fireEvent.click(button);
    });

    act(() => {
      jest.advanceTimersByTime(2000);
    });

    act(() => {
      fireEvent.click(button);
    });

    expect(mockOnRemove).not.toHaveBeenCalled();
  });

  it('renders all pace options formatted as M:SS/100 m and covers the correct range', () => {
    render(
      <ul>
        <Set
          index={0}
          set={mockSet}
          onUpdate={mockOnUpdate}
          onRemove={mockOnRemove}
        />
      </ul>
    );

    const paceSelect = screen.getByRole('combobox', { name: /pace/i });
    const options = Array.from(paceSelect.querySelectorAll('option'));

    expect(options.length).toBe(101);

    options.forEach((option, i) => {
      const value = 50 + i;
      const min = Math.floor(value / 60);
      const sec = String(value % 60).padStart(2, '0');
      expect(option.textContent).toBe(`${min}:${sec}/100 m`);
      expect(option.value).toBe(String(value));
    });
  });
});
