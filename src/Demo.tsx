import { useState } from 'react'
import './App.css'
import './Demo.css'

interface Todo {
  id: number
  text: string
  done: boolean
}

type Page = 'home' | 'about' | 'pricing' | 'faq' | 'demo'

interface DemoProps {
  onNavigate: (page: Page) => void
}

export function Demo({ onNavigate }: DemoProps) {
  const [todos, setTodos] = useState<Todo[]>([])
  const [draft, setDraft] = useState('')
  const [nextId, setNextId] = useState(1)

  const addTodo = () => {
    const text = draft.trim()
    if (!text) return
    setTodos((prev) => [...prev, { id: nextId, text, done: false }])
    setNextId((n) => n + 1)
    setDraft('')
  }

  const toggleTodo = (id: number) => {
    setTodos((prev) =>
      prev.map((todo) => (todo.id === id ? { ...todo, done: !todo.done } : todo))
    )
  }

  const deleteTodo = (id: number) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id))
  }

  const clearAll = () => {
    setTodos([])
  }

  const count = todos.length
  const plural = count !== 1 ? 's' : ''

  return (
    <main className="app">
      <header>
        <h1>Todo Testbed</h1>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button
            onClick={() => onNavigate('demo')}
            className="nav-button active"
            title="Try the live demo"
          >
            Demo
          </button>
          <button
            onClick={() => onNavigate('pricing')}
            className="nav-button"
            title="View pricing plans"
          >
            Pricing
          </button>
          <button
            onClick={() => onNavigate('faq')}
            className="nav-button"
            title="View frequently asked questions"
          >
            FAQ
          </button>
          <button
            onClick={() => onNavigate('about')}
            className="nav-button"
            title="Learn about this app"
          >
            About
          </button>
        </div>
      </header>

      <div className="demo-banner">
        🧪 Live demo — changes are in-memory only and reset on refresh.
      </div>

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

      <div className="demo-list-header">
        <h2>
          {count} todo{plural}
        </h2>
        {count > 0 && (
          <button className="clear-btn" onClick={clearAll}>
            Clear all
          </button>
        )}
      </div>

      {count === 0 ? (
        <p className="empty">No todos yet. Add one above!</p>
      ) : (
        <ul className="todo-list">
          {todos.map((todo) => (
            <li key={todo.id} className={todo.done ? 'todo-done' : ''}>
              <button
                className="toggle-btn"
                onClick={() => toggleTodo(todo.id)}
                aria-label="Mark complete"
              >
                ✓
              </button>
              <span className="todo-text">{todo.text}</span>
              <button
                className="delete-btn"
                onClick={() => deleteTodo(todo.id)}
                aria-label="Delete todo"
              >
                ✕
              </button>
            </li>
          ))}
        </ul>
      )}
    </main>
  )
}
