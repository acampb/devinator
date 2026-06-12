import './Landing.css'

interface LandingProps {
  onNavigate: (page: 'home' | 'about' | 'pricing' | 'faq') => void
}

function LandingNav({ onNavigate }: LandingProps) {
  return (
    <nav className="landing-nav">
      <span className="landing-nav-logo">FlowTask</span>
      <div className="landing-nav-actions">
        <button
          className="landing-btn landing-cta-secondary"
          onClick={() => onNavigate('pricing')}
        >
          Pricing
        </button>
        <button
          className="landing-btn landing-cta-secondary landing-nav-login"
          onClick={() => onNavigate('home')}
        >
          Log In
        </button>
      </div>
    </nav>
  )
}

function LandingHero({ onNavigate }: LandingProps) {
  return (
    <section className="landing-hero">
      {/* Glow orbs */}
      <div className="landing-orb landing-orb-1" aria-hidden="true" />
      <div className="landing-orb landing-orb-2" aria-hidden="true" />
      <div className="landing-orb landing-orb-3" aria-hidden="true" />

      <div className="landing-hero-content">
        <h1 className="landing-headline">
          Get it <span className="landing-headline-accent">done.</span>
        </h1>
        <p className="landing-subline">
          FlowTask cuts the noise. Just your tasks, beautifully managed.
        </p>
        <div className="landing-hero-ctas">
          <button
            className="landing-btn landing-cta-primary"
            onClick={() => onNavigate('home')}
          >
            Start for free →
          </button>
          <button
            className="landing-btn landing-cta-secondary"
            onClick={() => onNavigate('pricing')}
          >
            See pricing
          </button>
        </div>
      </div>
    </section>
  )
}

function LandingFeatures() {
  return (
    <section className="landing-features">
      <h2 className="landing-features-heading">
        Everything you need. Nothing you don't.
      </h2>
      <div className="landing-features-grid">
        <div className="landing-feature-card">
          <span className="landing-feature-icon" aria-hidden="true">⚡</span>
          <h3 className="landing-feature-title">Instant</h3>
          <p className="landing-feature-body">
            Add tasks in one keystroke. No forms, no friction.
          </p>
        </div>
        <div className="landing-feature-card">
          <span className="landing-feature-icon" aria-hidden="true">📊</span>
          <h3 className="landing-feature-title">Always counted</h3>
          <p className="landing-feature-body">
            Live counter so you always know your load.
          </p>
        </div>
        <div className="landing-feature-card">
          <span className="landing-feature-icon" aria-hidden="true">🎯</span>
          <h3 className="landing-feature-title">Zero clutter</h3>
          <p className="landing-feature-body">
            Clean interface. Just you and your list.
          </p>
        </div>
      </div>
    </section>
  )
}

function LandingFooter() {
  return (
    <footer className="landing-footer">
      © 2025 FlowTask. Built with React.
    </footer>
  )
}

export function Landing({ onNavigate }: LandingProps) {
  return (
    <div className="landing-root">
      <LandingNav onNavigate={onNavigate} />
      <LandingHero onNavigate={onNavigate} />
      <LandingFeatures />
      <LandingFooter />
    </div>
  )
}
