import { useState, useCallback } from 'react'
import './WordleSolver.css'
import { filterCandidates, type Clue, type LetterState } from './wordle/solver'

// ── Types ──────────────────────────────────────────────────────────────────

interface GuessRow {
  word: string
  states: LetterState[]
}

// ── Constants ─────────────────────────────────────────────────────────────

const CYCLE: LetterState[] = ['absent', 'present', 'correct']
const STATE_NEXT: Record<LetterState, LetterState> = {
  absent:  'present',
  present: 'correct',
  correct: 'absent',
}
const MAX_GUESSES = 6
const WORD_LEN = 5

// ── Component ─────────────────────────────────────────────────────────────

export function WordleSolver() {
  const [guesses, setGuesses] = useState<GuessRow[]>([])
  const [draft, setDraft] = useState('')
  const [error, setError] = useState<string | null>(null)

  // Derive candidates from current guesses — recomputed on every render but
  // the list is small enough that this is fine without useMemo.
  const clues: Clue[] = guesses.flatMap(({ word, states }) =>
    states.map((state, i) => ({ letter: word[i], index: i, state }))
  )
  const candidates = filterCandidates(clues)

  // ── Handlers ──

  const handleAddGuess = useCallback(() => {
    const word = draft.trim().toLowerCase()
    if (word.length !== WORD_LEN) {
      setError(`Word must be exactly ${WORD_LEN} letters.`)
      return
    }
    if (!/^[a-z]+$/.test(word)) {
      setError('Letters only, please.')
      return
    }
    if (guesses.length >= MAX_GUESSES) {
      setError(`Maximum ${MAX_GUESSES} guesses reached.`)
      return
    }
    setError(null)
    setGuesses(prev => [
      ...prev,
      { word, states: Array<LetterState>(WORD_LEN).fill('absent') },
    ])
    setDraft('')
  }, [draft, guesses.length])

  const handleCycleTile = useCallback((rowIdx: number, colIdx: number) => {
    setGuesses(prev => prev.map((row, ri) => {
      if (ri !== rowIdx) return row
      const newStates = [...row.states] as LetterState[]
      newStates[colIdx] = STATE_NEXT[newStates[colIdx]]
      return { ...row, states: newStates }
    }))
  }, [])

  const handleRemoveGuess = useCallback((rowIdx: number) => {
    setGuesses(prev => prev.filter((_, i) => i !== rowIdx))
  }, [])

  const handleReset = useCallback(() => {
    setGuesses([])
    setDraft('')
    setError(null)
  }, [])

  // ── Render ──

  return (
    <main className="wordle-solver">
      <h1>🟩 Wordle Solver</h1>
      <p className="subtitle">
        Enter your guesses and click each tile to set its colour. The solver
        narrows down the remaining possibilities in real time.
      </p>

      {/* Legend */}
      <div className="legend">
        <div className="legend-item">
          <span className="legend-swatch unset" />
          Unscored / absent
        </div>
        <div className="legend-item">
          <span className="legend-swatch present" />
          Present (wrong position)
        </div>
        <div className="legend-item">
          <span className="legend-swatch correct" />
          Correct position
        </div>
      </div>

      {/* Entered guesses with clickable tiles */}
      {guesses.length > 0 && (
        <div className="guess-rows">
          {guesses.map((row, ri) => (
            <div key={ri} className="guess-row">
              <span className="guess-row-number">{ri + 1}</span>
              <div className="tiles">
                {row.states.map((state, ci) => (
                  <button
                    key={ci}
                    className={`tile ${state}`}
                    onClick={() => handleCycleTile(ri, ci)}
                    title={`${row.word[ci].toUpperCase()} — click to cycle state (${CYCLE.join(' → ')})`}
                    aria-label={`Letter ${row.word[ci].toUpperCase()} at position ${ci + 1}, state ${state}. Click to cycle.`}
                  >
                    {row.word[ci]}
                  </button>
                ))}
              </div>
              <button
                className="btn btn-danger"
                onClick={() => handleRemoveGuess(ri)}
                aria-label={`Remove guess ${row.word.toUpperCase()}`}
                style={{ marginLeft: '0.5rem', padding: '0.25rem 0.6rem', fontSize: '0.8rem' }}
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Add-guess input */}
      {guesses.length < MAX_GUESSES && (
        <form
          className="guess-input-area"
          onSubmit={e => { e.preventDefault(); handleAddGuess() }}
        >
          <input
            aria-label="Enter your guess"
            placeholder="CRANE"
            maxLength={WORD_LEN}
            value={draft}
            onChange={e => { setDraft(e.target.value); setError(null) }}
          />
          <button type="submit" className="btn btn-primary" disabled={draft.trim().length !== WORD_LEN}>
            Add guess
          </button>
          {guesses.length > 0 && (
            <button type="button" className="btn btn-danger" onClick={handleReset}>
              Reset
            </button>
          )}
          {error && <span className="error-msg" role="alert">{error}</span>}
        </form>
      )}

      {guesses.length >= MAX_GUESSES && (
        <div style={{ marginBottom: '1rem' }}>
          <button className="btn btn-danger" onClick={handleReset}>Reset</button>
        </div>
      )}

      {guesses.length > 0 && (
        <p className="cycle-hint">
          💡 Click any tile to cycle its colour: absent → present (yellow) → correct (green).
        </p>
      )}

      {/* Candidates panel */}
      <div className="candidates-panel">
        <h2>Remaining candidates</h2>
        {guesses.length === 0 ? (
          <p className="candidates-count">Enter your first guess above to start filtering.</p>
        ) : candidates.length === 0 ? (
          <p className="no-candidates">
            No candidates match these clues — double-check your tile colours.
          </p>
        ) : (
          <>
            <p className="candidates-count">
              {candidates.length === 1
                ? '🎉 The answer is:'
                : `${candidates.length} possible word${candidates.length !== 1 ? 's' : ''} — top suggestions highlighted`}
            </p>
            <div className="candidates-list" aria-live="polite" aria-label="Candidate words">
              {candidates.map((w, i) => (
                <span
                  key={w}
                  className={`candidate-word${i < 5 ? ' top-pick' : ''}`}
                  title={i < 5 ? 'Top suggestion' : undefined}
                >
                  {w}
                </span>
              ))}
            </div>
          </>
        )}
      </div>

      <nav className="wordle-nav">
        <a href="/" className="nav-link">← Back to app</a>
      </nav>
    </main>
  )
}
