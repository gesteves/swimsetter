import { render, fireEvent } from '@testing-library/react'
import Toggle from '../Toggle'

describe('Toggle', () => {
  it('renders toggle button with default (unchecked) state', () => {
    const { getByRole } = render(<Toggle onChange={() => {}} />)
    const toggle = getByRole('switch')
    expect(toggle).toHaveAttribute('aria-checked', 'false')
    expect(toggle).toHaveClass('bg-gray-200')
  })

  it('renders toggle button with checked state', () => {
    const { getByRole } = render(<Toggle onChange={() => {}} checked={true} />)
    const toggle = getByRole('switch')
    expect(toggle).toHaveAttribute('aria-checked', 'true')
    expect(toggle).toHaveClass('bg-indigo-600')
  })

  it('calls onChange with toggled value when clicked', () => {
    const onChange = jest.fn()
    const { getByRole } = render(<Toggle onChange={onChange} />)
    fireEvent.click(getByRole('switch'))
    expect(onChange).toHaveBeenCalledWith(true)
  })

  it('renders label and description if provided', () => {
    const { getByText } = render(<Toggle onChange={() => {}} label="Annual billing" description="(Save 10%)" />)
    expect(getByText('Annual billing')).toBeInTheDocument()
    expect(getByText('(Save 10%)')).toBeInTheDocument()
  })

  it('does not render label or description if not provided', () => {
    const { container } = render(<Toggle onChange={() => {}} />)
    expect(container.querySelector('span.ml-3')).not.toBeInTheDocument()
  })

  it('generates a unique id for aria-labelledby from label', () => {
    const { getByRole } = render(<Toggle onChange={() => {}} label="Annual billing" />)
    const toggle = getByRole('switch')
    expect(toggle).toHaveAttribute('aria-labelledby', 'annual-billing-label')
  })
}) 
