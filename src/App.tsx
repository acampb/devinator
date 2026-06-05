import { useState } from 'react'
import './App.css'

function App() {
  const __unusedAutofixProbe = 123
  const [todos, setTodos] = useState<string[]>([])
  const [draft, setDraft] = useState('')

  const addTodo = () => {
    const text = draft.trim()
    if (!text) return
    setTodos((prev) => [...prev, text])
    setDraft('')
  }

  const clearAll = () => setTodos([])

  return (
    <main className="app">
      <h1>Todo Testbed</h1>

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

      {todos.length === 0 ? (
        <p className="empty">No todos yet.</p>
      ) : (
        <>
          <ul className="todo-list">
            {todos.map((todo, i) => (
              <li key={i}>{todo}</li>
            ))}
          </ul>
          <button onClick={clearAll}>Clear all</button>
        </>
      )}
    </main>
  )
}

export default App
