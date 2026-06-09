import './LandingPage.css'

const FEATURES = [
  {
    icon: '⚡',
    title: 'Fast by default',
    description:
      'Vite-powered dev server and optimised production builds keep iteration loops tight.',
  },
  {
    icon: '🧪',
    title: 'Test-first culture',
    description:
      'Vitest + Testing Library baked in. Write tests alongside every component, no config required.',
  },
  {
    icon: '🤖',
    title: 'Agentic validation',
    description:
      'Purpose-built for validating AI-driven workflows. Run, observe, and assert agent behaviour end-to-end.',
  },
  {
    icon: '🔒',
    title: 'Type-safe core',
    description:
      'Strict TypeScript throughout. Catch mistakes at compile time, not in production.',
  },
  {
    icon: '🎨',
    title: 'Zero-dependency UI',
    description:
      'No CSS framework overhead — just clean, scoped component styles that you own entirely.',
  },
  {
    icon: '🚀',
    title: 'Deploy anywhere',
    description:
      'Outputs a static bundle. Drop it on any CDN, server, or edge runtime with no fuss.',
  },
]

export default function LandingPage() {
  return (
    <div className="lp-root">
      {/* ── Nav ── */}
      <header className="lp-nav">
        <span className="lp-nav__logo">AVT</span>
        <nav className="lp-nav__links">
          <a href="#features">Features</a>
          <a href="#get-started">Get started</a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub ↗
          </a>
        </nav>
      </header>

      {/* ── Hero ── */}
      <section className="lp-hero">
        <div className="lp-hero__badge">Open-source · MIT licensed</div>
        <h1 className="lp-hero__heading">
          Agentic&nbsp;Validation
          <br />
          <span className="lp-hero__accent">Testbed</span>
        </h1>
        <p className="lp-hero__sub">
          A lightweight, type-safe playground for building and stress-testing
          AI agent pipelines — from first prototype to production confidence.
        </p>
        <div className="lp-hero__actions">
          <a href="#get-started" className="lp-btn lp-btn--primary">
            Get started
          </a>
          <a href="#features" className="lp-btn lp-btn--ghost">
            See features
          </a>
        </div>
      </section>

      {/* ── Features ── */}
      <section className="lp-features" id="features">
        <h2 className="lp-section-title">Everything you need</h2>
        <p className="lp-section-sub">
          Sensible defaults, zero lock-in, easy to extend.
        </p>
        <ul className="lp-features__grid">
          {FEATURES.map(({ icon, title, description }) => (
            <li key={title} className="lp-feature-card">
              <span className="lp-feature-card__icon" aria-hidden="true">
                {icon}
              </span>
              <h3 className="lp-feature-card__title">{title}</h3>
              <p className="lp-feature-card__desc">{description}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* ── Get started ── */}
      <section className="lp-cta" id="get-started">
        <h2 className="lp-cta__heading">Ready to build?</h2>
        <p className="lp-cta__sub">
          Clone the repo, install dependencies, and you're running in under a
          minute.
        </p>
        <div className="lp-code-block">
          <code>
            <span className="lp-code__dim">$</span> git clone https://github.com/your-org/agentic-validation-testbed
            <br />
            <span className="lp-code__dim">$</span> cd agentic-validation-testbed &amp;&amp; npm install
            <br />
            <span className="lp-code__dim">$</span> npm run dev
          </code>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="lp-footer">
        <span>© {new Date().getFullYear()} Agentic Validation Testbed</span>
        <span className="lp-footer__sep">·</span>
        <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </a>
        <span className="lp-footer__sep">·</span>
        <span>MIT License</span>
      </footer>
    </div>
  )
}
