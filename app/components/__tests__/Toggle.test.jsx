import { render, fireEvent } from '@testing-library/react'
import Toggle from '../Toggle'

describe('Toggle', () => {
  it('renders toggle button with default (unchecked) state', () => {
    const { getByRole } = render(<Toggle onChange={() => {}} label="Test toggle" />)
    const toggle = getByRole('switch')
    expect(toggle).toHaveAttribute('aria-checked', 'false')
    expect(toggle.querySelector('div')).toHaveClass('bg-gray-200')
  })

  it('renders toggle button with checked state', () => {
    const { getByRole } = render(<Toggle onChange={() => {}} checked={true} label="Test toggle" />)
    const toggle = getByRole('switch')
    expect(toggle).toHaveAttribute('aria-checked', 'true')
    expect(toggle.querySelector('div')).toHaveClass('bg-indigo-600')
  })

  it('calls onChange with toggled value when clicked', () => {
    const onChange = jest.fn()
    const { getByRole } = render(<Toggle onChange={onChange} label="Test toggle" />)
    fireEvent.click(getByRole('switch'))
    expect(onChange).toHaveBeenCalledWith(true)
  })

  it('renders label and description if provided', () => {
    const { getByText } = render(<Toggle onChange={() => {}} label="Annual billing" description="(Save 10%)" />)
    expect(getByText('Annual billing')).toBeInTheDocument()
    expect(getByText('(Save 10%)')).toBeInTheDocument()
  })

  it('renders only label when description is not provided', () => {
    const { getByText, queryByText } = render(<Toggle onChange={() => {}} label="Annual billing" />)
    expect(getByText('Annual billing')).toBeInTheDocument()
    expect(queryByText('(Save 10%)')).not.toBeInTheDocument()
  })

  it('generates a unique id for aria-labelledby from label', () => {
    const { getByRole } = render(<Toggle onChange={() => {}} label="Annual billing" />)
    const toggle = getByRole('switch')
    expect(toggle).toHaveAttribute('aria-labelledby', 'annual-billing-label')
  })

  it('marks the visual switch as aria-hidden', () => {
    const { container } = render(<Toggle onChange={() => {}} label="Test toggle" />)
    const visualSwitch = container.querySelector('div[aria-hidden="true"]')
    expect(visualSwitch).toBeInTheDocument()
  })

  it('throws error when label is not provided', () => {
    const consoleError = jest.spyOn(console, 'error').mockImplementation(() => {})
    expect(() => {
      render(<Toggle onChange={() => {}} />)
    }).toThrow()
    consoleError.mockRestore()
  })
}) 
