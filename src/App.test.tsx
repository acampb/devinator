import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import App from './App'

describe('App', () => {
  it('renders the heading and an empty state', () => {
    render(<App />)
    expect(
      screen.getByRole('heading', { name: 'Todo Testbed' }),
    ).toBeInTheDocument()
    expect(screen.getByText('No todos yet.')).toBeInTheDocument()
  })

  it('adds a typed todo to the rendered list', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.type(screen.getByLabelText('New todo'), 'Write a test')
    await user.click(screen.getByRole('button', { name: 'Add' }))

    expect(screen.getByRole('listitem')).toHaveTextContent('Write a test')
    expect(screen.queryByText('No todos yet.')).not.toBeInTheDocument()
  })
})

describe('Pricing Page', () => {
  it('navigates to pricing page and displays pricing tiers', async () => {
    const user = userEvent.setup()
    render(<App />)

    const pricingButton = screen.getByRole('button', { name: 'Pricing' })
    await user.click(pricingButton)

    expect(screen.getByRole('heading', { name: 'Pricing' })).toBeInTheDocument()
    expect(screen.getByText('Free')).toBeInTheDocument()
    expect(screen.getByText('Pro')).toBeInTheDocument()
    expect(screen.getByText('Team')).toBeInTheDocument()
  })

  it('displays pricing amounts and features', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.click(screen.getByRole('button', { name: 'Pricing' }))

    expect(screen.getByText('$0')).toBeInTheDocument()
    expect(screen.getByText('$9')).toBeInTheDocument()
    expect(screen.getByText('$29')).toBeInTheDocument()
    expect(screen.getByText('Most Popular')).toBeInTheDocument()
  })

  it('can navigate back to home from pricing page', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.click(screen.getByRole('button', { name: 'Pricing' }))
    expect(screen.getByText('Pricing')).toBeInTheDocument()

    const backButton = screen.getByRole('button', { name: '← Back to Todo' })
    await user.click(backButton)

    expect(screen.getByRole('heading', { name: 'Todo Testbed' })).toBeInTheDocument()
  })
})
