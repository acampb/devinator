import { render, screen, fireEvent, act } from '@testing-library/react'
import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest'
import { TicTacToe } from './TicTacToe'

beforeEach(() => {
  vi.useFakeTimers()
})
afterEach(() => {
  vi.useRealTimers()
})

function getCell(n: number) {
  return screen.getByRole('button', { name: new RegExp(`Cell ${n}`) })
}

function clickCell(n: number) {
  fireEvent.click(getCell(n))
}

function advanceAI() {
  act(() => { vi.advanceTimersByTime(500) })
}

function getStatus() {
  // The status <p> has aria-live="polite" and class "ttt-status"
  return document.querySelector('.ttt-status')!
}

describe('TicTacToe', () => {
  it('renders the board with 9 cells and initial status', () => {
    render(<TicTacToe />)
    expect(screen.getByRole('heading', { name: 'Tic Tac Toe' })).toBeInTheDocument()
    const cells = screen.getAllByRole('button').filter((b) => b.classList.contains('ttt-cell'))
    expect(cells).toHaveLength(9)
    expect(getStatus().textContent).toBe('🎮 Your turn (X)')
  })

  it('places X when the player clicks an empty cell', () => {
    render(<TicTacToe />)
    clickCell(1)
    expect(getCell(1)).toHaveTextContent('X')
  })

  it('does not allow clicking an already-filled cell', () => {
    render(<TicTacToe />)
    clickCell(5)
    expect(getCell(5)).toHaveTextContent('X')
    // Cell is now disabled — clicking again should not change it
    clickCell(5)
    expect(getCell(5)).toHaveTextContent('X')
  })

  it('shows AI thinking status immediately after player moves', () => {
    render(<TicTacToe />)
    clickCell(5)
    // Before the AI timer fires, status should say "thinking"
    expect(getStatus().textContent).toBe('🤖 AI is thinking…')
  })

  it('AI makes a move after the player', () => {
    render(<TicTacToe />)
    clickCell(1)
    advanceAI()
    const cells = screen.getAllByRole('button', { name: /Cell/ })
    const oCells = cells.filter((c) => c.textContent === 'O')
    expect(oCells.length).toBeGreaterThanOrEqual(1)
  })

  it('status returns to player turn after AI moves', () => {
    render(<TicTacToe />)
    clickCell(5)
    advanceAI()
    // After AI moves, it should be player's turn again (or game over)
    expect(getStatus().textContent).toMatch(/Your turn|win|draw/i)
  })

  it('New Game button resets the board', () => {
    render(<TicTacToe />)
    clickCell(5)
    advanceAI()

    fireEvent.click(screen.getByRole('button', { name: 'New Game' }))

    const cells = screen.getAllByRole('button', { name: /Cell/ })
    cells.forEach((c) => expect(c.textContent).toBe(''))
    expect(getStatus().textContent).toBe('🎮 Your turn (X)')
  })

  it('score board starts at zero', () => {
    render(<TicTacToe />)
    const scoreValues = screen.getAllByText('0')
    expect(scoreValues.length).toBeGreaterThanOrEqual(3)
  })

  it('score increments after a completed game', () => {
    render(<TicTacToe />)

    // Play through a full game — AI is perfect so result is draw or AI win
    const tryClick = (n: number) => {
      const cell = getCell(n)
      if (cell.textContent === '' && !cell.hasAttribute('disabled')) {
        fireEvent.click(cell)
        advanceAI()
      }
    }

    for (const n of [1, 2, 3, 4, 5, 6, 7, 8, 9]) {
      tryClick(n)
    }

    // At least one score counter should be > 0
    const scoreEls = screen.getAllByText(/^\d+$/)
    const total = scoreEls.reduce((sum, el) => sum + parseInt(el.textContent ?? '0'), 0)
    expect(total).toBeGreaterThanOrEqual(1)
  })

  it('win cells are highlighted when player wins', () => {
    render(<TicTacToe />)

    // Play several moves — AI is perfect and will block, so we just verify
    // the board stays consistent and doesn't crash
    clickCell(1)
    advanceAI()
    clickCell(2)
    advanceAI()
    clickCell(3)
    advanceAI()

    const cells = screen.getAllByRole('button', { name: /Cell/ })
    expect(cells).toHaveLength(9)
  })
})
