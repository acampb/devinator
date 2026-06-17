import { useState } from 'react'
import './App.css'
import { About } from './About'
import { FAQ } from './FAQ'
import { Pricing } from './Pricing'
import { TicTacToe } from './TicTacToe'

function App() {
  const [todos, setTodos] = useState<string[]>([])
  const [draft, setDraft] = useState('')
  const [page, setPage] = useState<'home' | 'about' | 'pricing' | 'faq' | 'tictactoe'>('home')

  const addTodo = () => {
    const text = draft.trim()
    if (!text) return
    setTodos((prev) => [...prev, text])
    setDraft('')
  }

  if (page === 'about') {
    return (
      <About />
    )
  }

  if (page === 'faq') {
    return (
      <FAQ />
    )
  }

  if (page === 'pricing') {
    return (
      <Pricing />
    )
  }

  if (page === 'tictactoe') {
    return (
      <TicTacToe />
    )
  }

  return (
    <main className="app">
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', gap: '0.5rem' }}>
        <h1>Todo Testbed</h1>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button
            onClick={() => setPage('tictactoe')}
            className="nav-button"
            title="Play tic tac toe"
          >
            Tic Tac Toe
          </button>
          <button
            onClick={() => setPage('pricing')}
            className="nav-button"
            title="View pricing plans"
          >
            Pricing
          </button>
          <button
            onClick={() => setPage('faq')}
            className="nav-button"
            title="View frequently asked questions"
          >
            FAQ
          </button>
          <button
            onClick={() => setPage('about')}
            className="nav-button"
            title="Learn about this app"
          >
            About
          </button>
        </div>
      </header>

      <form
        className="add-form"
        onSubmit={(e) => {
          e.preventDefault()
          addTodo()
        }}
      >
        <input
          aria-label="New todo"
          placeholder="What needs doing?"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>

      <h2>{todos.length} todo{todos.length !== 1 ? 's' : ''}</h2>
      {todos.length === 0 ? (
        <p className="empty">No todos yet.</p>
      ) : (
        <ul className="todo-list">
          {todos.map((todo, i) => (
            <li key={i}>{todo}</li>
          ))}
        </ul>
      )}
    </main>
  )
}

export default App
