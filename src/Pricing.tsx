export function Pricing() {
  return (
    <main className="app">
      <h1>Pricing</h1>
      <p style={{ color: '#666', marginBottom: '2rem' }}>
        Choose the plan that's right for you. Always free to get started.
      </p>

      <div className="pricing-grid">
        {/* Free Tier */}
        <div className="pricing-card">
          <h2>Free</h2>
          <div className="pricing-amount">
            <span className="price">$0</span>
            <span className="period">/month</span>
          </div>
          <p className="pricing-description">Perfect for getting started</p>
          <ul className="pricing-features">
            <li>✓ Up to 50 todos</li>
            <li>✓ Basic list view</li>
            <li>✓ Local storage</li>
            <li>✗ Cloud sync</li>
            <li>✗ Collaboration</li>
          </ul>
          <button className="pricing-button primary">Get Started</button>
        </div>

        {/* Pro Tier */}
        <div className="pricing-card featured">
          <div className="badge">Most Popular</div>
          <h2>Pro</h2>
          <div className="pricing-amount">
            <span className="price">$9</span>
            <span className="period">/month</span>
          </div>
          <p className="pricing-description">For power users</p>
          <ul className="pricing-features">
            <li>✓ Unlimited todos</li>
            <li>✓ Advanced filters & search</li>
            <li>✓ Cloud sync</li>
            <li>✓ Due dates & reminders</li>
            <li>✗ Collaboration</li>
          </ul>
          <button className="pricing-button primary">Start Free Trial</button>
        </div>

        {/* Team Tier */}
        <div className="pricing-card">
          <h2>Team</h2>
          <div className="pricing-amount">
            <span className="price">$29</span>
            <span className="period">/month</span>
          </div>
          <p className="pricing-description">For teams and organizations</p>
          <ul className="pricing-features">
            <li>✓ Unlimited todos</li>
            <li>✓ Cloud sync & backups</li>
            <li>✓ Due dates & reminders</li>
            <li>✓ Collaboration & sharing</li>
            <li>✓ Priority support</li>
          </ul>
          <button className="pricing-button primary">Contact Sales</button>
        </div>
      </div>

      <nav style={{ marginTop: '3rem', paddingTop: '1rem', borderTop: '1px solid #ddd', textAlign: 'center' }}>
        <button
          onClick={() => window.location.href = '/'}
          className="nav-link"
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
        >
          ← Back to Todo
        </button>
      </nav>
    </main>
  )
}
