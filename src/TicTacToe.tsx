import { useState } from 'react'
import './TicTacToe.css'

type Board = (string | null)[]
type Player = 'X' | 'O'

export function TicTacToe() {
  const [board, setBoard] = useState<Board>(Array(9).fill(null))
  const [isXNext, setIsXNext] = useState(true)
  const [winner, setWinner] = useState<Player | null>(null)

  const calculateWinner = (squares: Board): Player | null => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ]
    for (let line of lines) {
      const [a, b, c] = line
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a] as Player
      }
    }
    return null
  }

  const handleClick = (index: number) => {
    if (board[index] !== null || winner) return

    const newBoard = [...board]
    newBoard[index] = isXNext ? 'X' : 'O'
    setBoard(newBoard)

    const gameWinner = calculateWinner(newBoard)
    if (gameWinner) {
      setWinner(gameWinner)
    }

    setIsXNext(!isXNext)
  }

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setIsXNext(true)
    setWinner(null)
  }

  const isBoardFull = board.every((square) => square !== null)
  const currentPlayer = isXNext ? 'X' : 'O'
  const gameOver = winner !== null || isBoardFull

  return (
    <div className="tic-tac-toe">
      <h1>Tic Tac Toe</h1>
      <div className="status">
        {winner ? (
          <span className="winner">🎉 Player {winner} wins!</span>
        ) : isBoardFull ? (
          <span className="draw">It's a draw!</span>
        ) : (
          <span>Current player: <strong>{currentPlayer}</strong></span>
        )}
      </div>

      <div className="board">
        {board.map((value, index) => (
          <button
            key={index}
            className={`square ${value}`}
            onClick={() => handleClick(index)}
            disabled={gameOver}
            aria-label={`Square ${index + 1}`}
          >
            {value}
          </button>
        ))}
      </div>

      <button className="reset-button" onClick={resetGame}>
        New Game
      </button>
    </div>
  )
}
