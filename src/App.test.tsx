import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import App from './App'

describe('App', () => {
  it('renders the landing page hero heading', () => {
    render(<App />)
    expect(
      screen.getByRole('heading', { level: 1 }),
    ).toBeInTheDocument()
  })

  it('renders all six feature cards', () => {
    render(<App />)
    const cards = screen.getAllByRole('heading', { level: 3 })
    expect(cards).toHaveLength(6)
  })

  it('renders the get-started code block', () => {
    render(<App />)
    expect(screen.getByText(/npm run dev/)).toBeInTheDocument()
  })
})
