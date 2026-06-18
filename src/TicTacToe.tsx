export function TicTacToe() {
  // Static decorative board — X wins in this preview!
  const board = ['X', 'O', 'X', 'O', 'X', 'O', null, null, 'X']
  const winLine = [2, 4, 6] // diagonal win for X

  return (
    <main className="app ttt-page">
      {/* Hero */}
      <section className="ttt-hero">
        <div className="ttt-hero-badge">🎮 New Game</div>
        <h1 className="ttt-hero-title">Tic Tac Toe</h1>
        <p className="ttt-hero-tagline">
          The classic game you know and love — now faster, sharper, and ready to play instantly.
          No downloads. No sign-up. Just pure X's and O's.
        </p>
        <button className="cta-button cta-primary ttt-cta">Play Now — It's Free</button>
      </section>

      {/* Decorative board preview */}
      <section className="ttt-board-section">
        <div className="ttt-board" aria-label="Tic Tac Toe board preview">
          {board.map((cell, i) => (
            <div
              key={i}
              className={[
                'ttt-cell',
                cell === 'X' ? 'ttt-cell-x' : cell === 'O' ? 'ttt-cell-o' : '',
                winLine.includes(i) ? 'ttt-cell-win' : '',
              ]
                .filter(Boolean)
                .join(' ')}
            >
              {cell}
            </div>
          ))}
        </div>
        <p className="ttt-board-caption">X wins! 🎉</p>
      </section>

      {/* Features */}
      <section className="ttt-features">
        <h2>Why You'll Love It</h2>
        <div className="ttt-features-grid">
          <div className="ttt-feature-card">
            <span className="ttt-feature-icon">⚡</span>
            <h3>Instant Play</h3>
            <p>Jump straight into a game in seconds. No loading screens, no setup.</p>
          </div>
          <div className="ttt-feature-card">
            <span className="ttt-feature-icon">👥</span>
            <h3>2-Player Mode</h3>
            <p>Challenge a friend on the same device. Pass and play, the classic way.</p>
          </div>
          <div className="ttt-feature-card">
            <span className="ttt-feature-icon">🏆</span>
            <h3>Win Detection</h3>
            <p>Automatic win and draw detection so you can focus on your strategy.</p>
          </div>
          <div className="ttt-feature-card">
            <span className="ttt-feature-icon">🔄</span>
            <h3>Rematch Ready</h3>
            <p>One click to reset and go again. Best of three? Best of ten? You decide.</p>
          </div>
          <div className="ttt-feature-card">
            <span className="ttt-feature-icon">📱</span>
            <h3>Works Everywhere</h3>
            <p>Fully responsive — play on your phone, tablet, or desktop.</p>
          </div>
          <div className="ttt-feature-card">
            <span className="ttt-feature-icon">🆓</span>
            <h3>Always Free</h3>
            <p>No ads, no paywalls, no nonsense. Just the game.</p>
          </div>
        </div>
      </section>

      {/* CTA banner */}
      <section className="ttt-cta-banner">
        <h2>Ready to play?</h2>
        <p>It only takes a second to start your first game.</p>
        <button className="cta-button cta-primary ttt-cta">Play Tic Tac Toe</button>
      </section>

      <nav style={{ marginTop: '2rem', paddingTop: '1rem', borderTop: '1px solid #ddd' }}>
        <a href="/" className="nav-link">← Back to Todo</a>
      </nav>
    </main>
  )
}
