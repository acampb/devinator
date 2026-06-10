import { useState } from 'react'
import './App.css'
import { About } from './About'

function App() {
  const [todos, setTodos] = useState<string[]>([])
  const [draft, setDraft] = useState('')
  const [page, setPage] = useState<'home' | 'about'>('home')

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

  return (
    <main className="app">
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h1>Todo Testbed</h1>
        <button
          onClick={() => setPage('about')}
          className="nav-button"
          title="Learn about this app"
        >
          About
        </button>
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
