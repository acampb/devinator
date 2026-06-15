import { useState } from 'react'
import './TicTacToe.css'

type Player = 'X' | 'O' | null
type BoardState = Player[]

export function TicTacToe({ onBack }: { onBack: () => void }) {
  const [board, setBoard] = useState<BoardState>(Array(9).fill(null))
  const [isXNext, setIsXNext] = useState(true)
  const [gameOver, setGameOver] = useState(false)

  const calculateWinner = (squares: BoardState): Player => {
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
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i]
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a]
      }
    }
    return null
  }

  const winner = calculateWinner(board)
  const isBoardFull = board.every((square) => square !== null)
  const isDraw = isBoardFull && !winner

  const handleClick = (index: number) => {
    if (board[index] || winner || gameOver) return

    const newBoard = [...board]
    newBoard[index] = isXNext ? 'X' : 'O'
    setBoard(newBoard)

    const newWinner = calculateWinner(newBoard)
    if (newWinner) {
      setGameOver(true)
    }

    setIsXNext(!isXNext)
  }

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setIsXNext(true)
    setGameOver(false)
  }

  const renderSquare = (index: number) => (
    <button
      className="square"
      onClick={() => handleClick(index)}
      disabled={gameOver || winner !== null}
    >
      {board[index]}
    </button>
  )

  return (
    <div className="tictactoe-container">
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h1>Tic Tac Toe</h1>
        <button onClick={onBack} className="nav-button">
          Back
        </button>
      </header>

      <div className="game-content">
        <div className="status">
          {winner ? (
            <p style={{ color: '#2ecc71', fontWeight: 'bold' }}>🎉 Player {winner} wins!</p>
          ) : isDraw ? (
            <p style={{ color: '#f39c12', fontWeight: 'bold' }}>It's a draw!</p>
          ) : (
            <p>Current player: <span style={{ fontWeight: 'bold' }}>{isXNext ? 'X' : 'O'}</span></p>
          )}
        </div>

        <div className="board">
          <div className="board-row">
            {renderSquare(0)}
            {renderSquare(1)}
            {renderSquare(2)}
          </div>
          <div className="board-row">
            {renderSquare(3)}
            {renderSquare(4)}
            {renderSquare(5)}
          </div>
          <div className="board-row">
            {renderSquare(6)}
            {renderSquare(7)}
            {renderSquare(8)}
          </div>
        </div>

        <button onClick={resetGame} className="reset-button">
          New Game
        </button>
      </div>
    </div>
  )
}
