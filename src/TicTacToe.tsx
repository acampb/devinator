import { useState, useEffect } from 'react'
import './TicTacToe.css'

// ─── Types ────────────────────────────────────────────────────────────────────

type Player = 'X' | 'O'
type Cell = Player | null
type Board = Cell[]

// ─── Win / draw helpers ───────────────────────────────────────────────────────

const WIN_LINES = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
]

function getWinner(board: Board): { winner: Player; line: number[] } | null {
  for (const line of WIN_LINES) {
    const [a, b, c] = line
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { winner: board[a] as Player, line }
    }
  }
  return null
}

function isDraw(board: Board): boolean {
  return board.every((cell) => cell !== null) && getWinner(board) === null
}

// ─── Minimax AI ───────────────────────────────────────────────────────────────

function minimax(board: Board, isMaximising: boolean): number {
  const result = getWinner(board)
  if (result) return result.winner === 'O' ? 10 : -10
  if (isDraw(board)) return 0

  const scores: number[] = []
  for (let i = 0; i < 9; i++) {
    if (board[i] !== null) continue
    const next = [...board]
    next[i] = isMaximising ? 'O' : 'X'
    scores.push(minimax(next, !isMaximising))
  }
  return isMaximising ? Math.max(...scores) : Math.min(...scores)
}

function getBestMove(board: Board): number {
  let bestScore = -Infinity
  let bestMove = -1
  for (let i = 0; i < 9; i++) {
    if (board[i] !== null) continue
    const next = [...board]
    next[i] = 'O'
    const score = minimax(next, false)
    if (score > bestScore) {
      bestScore = score
      bestMove = i
    }
  }
  return bestMove
}

// ─── Component ────────────────────────────────────────────────────────────────

const EMPTY_BOARD: Board = Array(9).fill(null)

export function TicTacToe() {
  const [board, setBoard] = useState<Board>([...EMPTY_BOARD])
  const [isPlayerTurn, setIsPlayerTurn] = useState(true)
  const [scores, setScores] = useState({ player: 0, ai: 0, draws: 0 })
  const [gameOver, setGameOver] = useState(false)

  const winResult = getWinner(board)
  const draw = isDraw(board)
  const winningLine = winResult?.line ?? []

  // AI move
  useEffect(() => {
    if (isPlayerTurn || gameOver) return
    const timer = setTimeout(() => {
      const move = getBestMove(board)
      if (move === -1) return
      const next = [...board]
      next[move] = 'O'
      setBoard(next)

      const result = getWinner(next)
      if (result) {
        setScores((s) => ({ ...s, ai: s.ai + 1 }))
        setGameOver(true)
      } else if (isDraw(next)) {
        setScores((s) => ({ ...s, draws: s.draws + 1 }))
        setGameOver(true)
      } else {
        setIsPlayerTurn(true)
      }
    }, 350)
    return () => clearTimeout(timer)
  }, [isPlayerTurn, board, gameOver])

  function handleCellClick(index: number) {
    if (!isPlayerTurn || board[index] !== null || gameOver) return
    const next = [...board]
    next[index] = 'X'
    setBoard(next)

    const result = getWinner(next)
    if (result) {
      setScores((s) => ({ ...s, player: s.player + 1 }))
      setGameOver(true)
    } else if (isDraw(next)) {
      setScores((s) => ({ ...s, draws: s.draws + 1 }))
      setGameOver(true)
    } else {
      setIsPlayerTurn(false)
    }
  }

  function resetGame() {
    setBoard([...EMPTY_BOARD])
    setIsPlayerTurn(true)
    setGameOver(false)
  }

  function getStatusMessage() {
    if (winResult) {
      return winResult.winner === 'X' ? '🎉 You win!' : '🤖 AI wins!'
    }
    if (draw) return "🤝 It's a draw!"
    if (!isPlayerTurn) return '🤖 AI is thinking…'
    return '🎮 Your turn (X)'
  }

  return (
    <main className="ttt-page">
      <header className="ttt-header">
        <h1>Tic Tac Toe</h1>
        <div className="ttt-score-board">
          <div className="ttt-score">
            <span className="ttt-score-label">You (X)</span>
            <span className="ttt-score-value">{scores.player}</span>
          </div>
          <div className="ttt-score ttt-score--draw">
            <span className="ttt-score-label">Draws</span>
            <span className="ttt-score-value">{scores.draws}</span>
          </div>
          <div className="ttt-score ttt-score--ai">
            <span className="ttt-score-label">AI (O)</span>
            <span className="ttt-score-value">{scores.ai}</span>
          </div>
        </div>
      </header>

      <p className="ttt-status" aria-live="polite">
        {getStatusMessage()}
      </p>

      <div className="ttt-board" aria-label="Tic Tac Toe board">
        {board.map((cell, i) => {
          const isWinCell = winningLine.includes(i)
          return (
            <button
              key={i}
              className={[
                'ttt-cell',
                cell === 'X' ? 'ttt-cell--x' : '',
                cell === 'O' ? 'ttt-cell--o' : '',
                isWinCell ? 'ttt-cell--win' : '',
              ]
                .filter(Boolean)
                .join(' ')}
              onClick={() => handleCellClick(i)}
              aria-label={`Cell ${i + 1}${cell ? `, ${cell}` : ''}`}
              disabled={cell !== null || !isPlayerTurn || gameOver}
            >
              {cell}
            </button>
          )
        })}
      </div>

      <div className="ttt-actions">
        <button className="ttt-new-game" onClick={resetGame}>
          New Game
        </button>
      </div>

      <p className="ttt-hint">You are X — you always go first. The AI plays perfectly.</p>
    </main>
  )
}
