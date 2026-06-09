import './App.css'

function App() {
  return (
    <div className="landing">
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <h1 className="headline">Get organized. Stay focused.</h1>
          <p className="subheadline">
            Simple task management for teams that move fast.
          </p>
          <button className="cta-button">Get Started Free</button>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <div className="feature-grid">
            <div className="feature">
              <h3>⚡ Fast & Simple</h3>
              <p>No learning curve. Start organizing in seconds.</p>
            </div>
            <div className="feature">
              <h3>🤝 Collaborate</h3>
              <p>Share tasks with your team and track progress together.</p>
            </div>
            <div className="feature">
              <h3>📱 Everywhere</h3>
              <p>Access your tasks from any device, anytime.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Footer */}
      <section className="cta-footer">
        <div className="container">
          <h2>Ready to get started?</h2>
          <button className="cta-button">Create Your Free Account</button>
          <p className="footer-note">No credit card required. Free forever plan available.</p>
        </div>
      </section>
    </div>
  )
}

export default App
