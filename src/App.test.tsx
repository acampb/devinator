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
