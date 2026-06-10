export function About({ onNavigate }: { onNavigate: (page: 'home' | 'about' | 'pricing') => void }) {
  return (
    <main className="app">
      <h1>About Todo Testbed</h1>

      <section>
        <h2>What is This?</h2>
        <p>
          Todo Testbed is a lightweight, no-frills todo application built with React and Vite.
          It's designed to help you keep track of tasks you need to complete with a simple,
          distraction-free interface.
        </p>
      </section>

      <section>
        <h2>Features</h2>
        <ul>
          <li><strong>Add Todos:</strong> Enter your task and click "Add" or press Enter to create a new todo</li>
          <li><strong>Live Counter:</strong> See how many todos you have at a glance</li>
          <li><strong>Simple Interface:</strong> Clean, minimal design focused on getting things done</li>
          <li><strong>Instant Feedback:</strong> Changes appear immediately without page reloads</li>
        </ul>
      </section>

      <section>
        <h2>Built With</h2>
        <ul>
          <li><strong>React 19:</strong> Modern UI library with hooks</li>
          <li><strong>TypeScript:</strong> Type-safe JavaScript for fewer bugs</li>
          <li><strong>Vite:</strong> Lightning-fast build tool</li>
          <li><strong>Testing:</strong> Vitest and React Testing Library for quality assurance</li>
        </ul>
      </section>

      <section>
        <h2>Getting Started</h2>
        <ol>
          <li>Type a task in the input field</li>
          <li>Press Enter or click the "Add" button</li>
          <li>Your todo appears in the list below</li>
          <li>Repeat until you're productive! 🚀</li>
        </ol>
      </section>

      <nav style={{ marginTop: '2rem', paddingTop: '1rem', borderTop: '1px solid #ddd' }}>
        <button
          onClick={() => onNavigate('home')}
          className="nav-link"
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
        >
          ← Back to Todo
        </button>
      </nav>
    </main>
  )
}
