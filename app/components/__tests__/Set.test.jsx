import { render, screen, fireEvent } from '@testing-library/react';
import Set from '../Set';

describe('Set component', () => {
  const mockSet = {
    minutes: 1,
    seconds: 30,
    pace: 68
  };
  const mockOnUpdate = jest.fn();
  const mockOnRemove = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders set number correctly', () => {
    render(
      <table>
        <tbody>
          <Set
            index={0}
            set={mockSet}
            onUpdate={mockOnUpdate}
            onRemove={mockOnRemove}
          />
        </tbody>
      </table>
    );
    expect(screen.getByText('1')).toBeInTheDocument();
  });

  it('renders time and pace selectors with correct initial values', () => {
    render(
      <table>
        <tbody>
          <Set
            index={0}
            set={mockSet}
            onUpdate={mockOnUpdate}
            onRemove={mockOnRemove}
          />
        </tbody>
      </table>
    );

    const minutesSelect = screen.getByRole('combobox', { name: /minutes/i });
    expect(minutesSelect).toHaveValue('1');

    const secondsSelect = screen.getByRole('combobox', { name: /seconds/i });
    expect(secondsSelect).toHaveValue('30');

    const paceSelect = screen.getByRole('combobox', { name: /pace/i });
    expect(paceSelect).toHaveValue('68');
  });

  it('calls onUpdate when time is changed', () => {
    render(
      <table>
        <tbody>
          <Set
            index={0}
            set={mockSet}
            onUpdate={mockOnUpdate}
            onRemove={mockOnRemove}
          />
        </tbody>
      </table>
    );

    const minutesSelect = screen.getByRole('combobox', { name: /minutes/i });
    fireEvent.change(minutesSelect, { target: { value: '2' } });
    expect(mockOnUpdate).toHaveBeenCalledWith({ ...mockSet, minutes: 2 });

    const secondsSelect = screen.getByRole('combobox', { name: /seconds/i });
    fireEvent.change(secondsSelect, { target: { value: '45' } });
    expect(mockOnUpdate).toHaveBeenCalledWith({ ...mockSet, seconds: 45 });
  });

  it('calls onUpdate when pace is changed', () => {
    render(
      <table>
        <tbody>
          <Set
            index={0}
            set={mockSet}
            onUpdate={mockOnUpdate}
            onRemove={mockOnRemove}
          />
        </tbody>
      </table>
    );

    const paceSelect = screen.getByRole('combobox', { name: /pace/i });
    fireEvent.change(paceSelect, { target: { value: '75' } });
    expect(mockOnUpdate).toHaveBeenCalledWith({ ...mockSet, pace: 75 });
  });

  it('requires confirmation before calling onRemove', () => {
    render(
      <table>
        <tbody>
          <Set
            index={0}
            set={mockSet}
            onUpdate={mockOnUpdate}
            onRemove={mockOnRemove}
          />
        </tbody>
      </table>
    );

    // First click: confirmation state
    let button = screen.getByRole('button', { name: /remove set 1/i });
    fireEvent.click(button);
    expect(mockOnRemove).not.toHaveBeenCalled();

    // Second click: confirm removal
    button = screen.getByRole('button', { name: /confirm remove set 1/i });
    fireEvent.click(button);
    expect(mockOnRemove).toHaveBeenCalled();
  });

  it('renders all pace options formatted as M:SS/100 m and covers the correct range', () => {
    render(
      <table>
        <tbody>
          <Set
            index={0}
            set={mockSet}
            onUpdate={mockOnUpdate}
            onRemove={mockOnRemove}
          />
        </tbody>
      </table>
    );
    const paceSelect = screen.getByRole('combobox', { name: /pace/i });
    const options = Array.from(paceSelect.querySelectorAll('option'));

    expect(options.length).toBe(101); // 50 to 150 inclusive

    options.forEach((option, i) => {
      const value = 50 + i;
      const min = Math.floor(value / 60);
      const sec = String(value % 60).padStart(2, '0');
      expect(option.textContent).toBe(`${min}:${sec}/100 m`);
      expect(option.value).toBe(String(value));
    });
  });
});
