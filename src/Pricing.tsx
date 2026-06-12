export function Pricing() {
  return (
    <main className="app">
      <h1>Pricing</h1>
      <p style={{ textAlign: 'center', color: '#666', marginBottom: '2rem' }}>
        Simple, transparent pricing for individuals and teams
      </p>

      <div className="pricing-grid">
        {/* Free Tier */}
        <div className="pricing-card">
          <h2>Free</h2>
          <div className="price">
            <span className="amount">$0</span>
            <span className="period">/month</span>
          </div>
          <ul className="features">
            <li>✓ Up to 25 tasks</li>
            <li>✓ Due dates &amp; reminders</li>
            <li>✓ Mobile &amp; desktop apps</li>
            <li className="unavailable">✗ Team workspaces</li>
            <li className="unavailable">✗ Integrations &amp; API</li>
          </ul>
          <button className="cta-button">Get Started</button>
        </div>

        {/* Pro Tier */}
        <div className="pricing-card highlighted">
          <div className="badge">Most Popular</div>
          <h2>Pro</h2>
          <div className="price">
            <span className="amount">$100</span>
            <span className="period">/month</span>
          </div>
          <ul className="features">
            <li>✓ Everything in Free</li>
            <li>✓ Advanced features</li>
            <li>✓ Priority support</li>
            <li>✓ API access</li>
            <li>✓ Custom integrations</li>
          </ul>
          <button className="cta-button cta-primary">Start Free Trial</button>
        </div>

        {/* Enterprise Tier */}
        <div className="pricing-card">
          <h2>Enterprise</h2>
          <div className="price">
            <span className="amount">Custom</span>
          </div>
          <ul className="features">
            <li>✓ Everything in Pro</li>
            <li>✓ Dedicated support</li>
            <li>✓ SLA guarantees</li>
            <li>✓ On-premise option</li>
            <li>✓ Custom features</li>
          </ul>
          <button className="cta-button">Contact Sales</button>
        </div>
      </div>

      <nav style={{ marginTop: '2rem', paddingTop: '1rem', borderTop: '1px solid #ddd', textAlign: 'center' }}>
        <a href="/" className="nav-link">← Back to Todo</a>
      </nav>
    </main>
  )
}
