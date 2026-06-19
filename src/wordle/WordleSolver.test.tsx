import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { WordleSolver } from '../WordleSolver'

describe('WordleSolver', () => {
  it('renders the heading and initial prompt', () => {
    render(<WordleSolver />)
    expect(screen.getByRole('heading', { name: /wordle solver/i })).toBeInTheDocument()
    expect(screen.getByText(/enter your first guess/i)).toBeInTheDocument()
  })

  it('rejects a word shorter than 5 letters via direct form submit', async () => {
    const user = userEvent.setup()
    render(<WordleSolver />)

    const input = screen.getByRole('textbox', { name: /enter your guess/i })
    await user.type(input, 'cat')

    // Fire submit on the form directly — bypasses the disabled button
    const form = input.closest('form')!
    fireEvent.submit(form)

    expect(screen.getByRole('alert')).toHaveTextContent(/exactly 5 letters/i)
  })

  it('adds a valid 5-letter guess and shows tiles', async () => {
    const user = userEvent.setup()
    render(<WordleSolver />)

    const input = screen.getByRole('textbox', { name: /enter your guess/i })
    await user.type(input, 'crane')
    await user.click(screen.getByRole('button', { name: /add guess/i }))

    // 5 tiles should now be visible (one per letter)
    const tiles = screen.getAllByRole('button', { name: /letter [a-z] at position/i })
    expect(tiles).toHaveLength(5)
  })

  it('cycling a tile changes its aria-label state', async () => {
    const user = userEvent.setup()
    render(<WordleSolver />)

    await user.type(screen.getByRole('textbox', { name: /enter your guess/i }), 'crane')
    await user.click(screen.getByRole('button', { name: /add guess/i }))

    const firstTile = screen.getByRole('button', { name: /letter c at position 1, state absent/i })
    await user.click(firstTile)
    expect(screen.getByRole('button', { name: /letter c at position 1, state present/i })).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: /letter c at position 1, state present/i }))
    expect(screen.getByRole('button', { name: /letter c at position 1, state correct/i })).toBeInTheDocument()
  })

  it('reset button clears all guesses', async () => {
    const user = userEvent.setup()
    render(<WordleSolver />)

    await user.type(screen.getByRole('textbox', { name: /enter your guess/i }), 'crane')
    await user.click(screen.getByRole('button', { name: /add guess/i }))
    await user.click(screen.getByRole('button', { name: /reset/i }))

    expect(screen.queryAllByRole('button', { name: /letter/i })).toHaveLength(0)
    expect(screen.getByText(/enter your first guess/i)).toBeInTheDocument()
  })
})
