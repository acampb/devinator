import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import App from './App'

describe('App', () => {
  it('renders the landing page by default with a CTA button', () => {
    render(<App />)
    expect(screen.getByText('FlowTask')).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: 'Start for free →' }),
    ).toBeInTheDocument()
  })

  it('renders the heading and an empty state', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.click(screen.getByRole('button', { name: 'Start for free →' }))

    expect(
      screen.getByRole('heading', { name: 'Todo Testbed' }),
    ).toBeInTheDocument()
    expect(screen.getByText('No todos yet.')).toBeInTheDocument()
  })

  it('adds a typed todo to the rendered list', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.click(screen.getByRole('button', { name: 'Start for free →' }))

    await user.type(screen.getByLabelText('New todo'), 'Write a test')
    await user.click(screen.getByRole('button', { name: 'Add' }))

    expect(screen.getByRole('listitem')).toHaveTextContent('Write a test')
    expect(screen.queryByText('No todos yet.')).not.toBeInTheDocument()
  })
})
