import { describe, it, expect } from 'vitest'
import { filterCandidates, scoreGuess, type Clue } from '../wordle/solver'

// ── scoreGuess ─────────────────────────────────────────────────────────────

describe('scoreGuess', () => {
  it('marks all correct when guess === secret', () => {
    expect(scoreGuess('crane', 'crane')).toEqual([
      'correct', 'correct', 'correct', 'correct', 'correct',
    ])
  })

  it('marks all absent when no letters overlap', () => {
    expect(scoreGuess('jumbo', 'skirt')).toEqual([
      'absent', 'absent', 'absent', 'absent', 'absent',
    ])
  })

  it('marks correct positions in crane vs trace', () => {
    // CRANE vs TRACE:
    //   C(0) → in TRACE at index 3, not at 0  → present
    //   R(1) → TRACE[1] = R (exact match)  → correct
    //   A(2) → TRACE[2] = A (exact match)  → correct
    //   N(3) → not in TRACE                → absent
    //   E(4) → TRACE[4] = E (exact match)  → correct
    expect(scoreGuess('crane', 'trace')).toEqual([
      'present', 'correct', 'correct', 'absent', 'correct',
    ])
  })

  it('handles duplicate letters — only as many marks as copies in secret', () => {
    // SPEED vs CREEP:
    //   Pass 1 (exact): E(2) matches CREEP[2]=E → correct; no other exact
    //   Pass 2 (present): S→not in remaining→absent; P→CREEP has P@3→present;
    //                     (E at index 3 already used one copy) E→remaining has E@3→present; D→absent
    // Remaining after pass 1: C,R,_,P,_ (index 2 nulled)
    // S(0): no S in remaining → absent
    // P(1): P@3 in remaining → present
    // E(2): already correct, skip
    // E(3): remaining had E@3 nulled in pass1? No — pass1 only nulled index 2 (the matching E).
    //       CREEP[3]=E. Did pass1 null it? No, SPEED[3]=E but CREEP[3]=E → exact match!
    // Let me re-trace: SPEED=S,P,E,E,D  CREEP=C,R,E,E,P
    //   Pass 1: index 0: S≠C; index 1: P≠R; index 2: E=E→correct, null remaining[2];
    //           index 3: E=E→correct, null remaining[3]; index 4: D≠P
    //   Pass 2: S(0)→remaining=C,R,_,_,P; no S→absent
    //           P(1)→remaining has P@4→present, null remaining[4]
    //           E(2)→already correct, skip
    //           E(3)→already correct, skip
    //           D(4)→remaining=C,R,_,_,_; no D→absent
    const result = scoreGuess('speed', 'creep')
    expect(result).toEqual(['absent', 'present', 'correct', 'correct', 'absent'])
  })

  it('marks a correct-position letter as correct, not present', () => {
    const result = scoreGuess('abbey', 'abbey')
    expect(result).toEqual(['correct', 'correct', 'correct', 'correct', 'correct'])
  })

  it('does not double-count a letter that appears once in secret', () => {
    // Guess AABCD vs secret AXYZB: only one A in secret
    // Pass 1: A(0)=A→correct; null remaining[0]
    // Pass 2: A(1)→no A left in remaining→absent; B(2)→B@4→present; C,D absent
    const result = scoreGuess('aabcd', 'axyzb')
    expect(result[0]).toBe('correct') // first A exact match
    expect(result[1]).toBe('absent')  // second A — none left in pool
    expect(result[2]).toBe('present') // B exists but not at index 2
    expect(result[3]).toBe('absent')  // C not in secret
    expect(result[4]).toBe('absent')  // D not in secret
  })
})

// ── filterCandidates ───────────────────────────────────────────────────────

describe('filterCandidates', () => {
  it('returns all words when no clues given', () => {
    const pool = ['crane', 'slate', 'audio']
    expect(filterCandidates([], pool)).toEqual(pool)
  })

  it('keeps only words with a correct letter at the right position', () => {
    const pool = ['crane', 'slate', 'brave']
    const clues: Clue[] = [{ letter: 'r', index: 1, state: 'correct' }]
    expect(filterCandidates(clues, pool)).toEqual(['crane', 'brave'])
  })

  it('eliminates words missing a present letter', () => {
    const pool = ['crane', 'slate', 'brave']
    const clues: Clue[] = [{ letter: 'r', index: 0, state: 'present' }]
    // 'r' must exist but NOT at index 0
    expect(filterCandidates(clues, pool)).toEqual(['crane', 'brave'])
  })

  it('eliminates words containing an absent letter', () => {
    const pool = ['crane', 'slate', 'brave']
    const clues: Clue[] = [{ letter: 'r', index: 0, state: 'absent' }]
    expect(filterCandidates(clues, pool)).toEqual(['slate'])
  })

  it('rejects a word where a present letter sits at the forbidden index', () => {
    // 'a' is present but NOT at index 0
    const pool = ['arced', 'crane', 'flame']
    const clues: Clue[] = [{ letter: 'a', index: 0, state: 'present' }]
    // arced: a@0 → forbidden index → eliminated
    // crane: a@2 → fine
    // flame: a@2 → fine
    expect(filterCandidates(clues, pool)).toEqual(['crane', 'flame'])
  })

  it('handles absent + correct of same letter (duplicate guard)', () => {
    // Suppose secret is ABBEY; guess is AABBY
    // First A: correct at 0, second A: absent → 'a' must not be purged from candidacy
    const pool = ['abbey', 'about', 'abbot']
    const clues: Clue[] = [
      { letter: 'a', index: 0, state: 'correct' },
      { letter: 'a', index: 1, state: 'absent' },
    ]
    const result = filterCandidates(clues, pool)
    // All start with 'a', correct@0 ✓. 'a' is in requiredLetters so not truly absent.
    // present forbidden at index 1: none of these words have 'a' at index 1, so all pass.
    // But the absent clue doesn't add a forbiddenIndex — it only prevents total-absent removal.
    // Since 'a' is NOT in absentLetters (removed by duplicate guard), all three kept.
    expect(result).toEqual(['abbey', 'about', 'abbot'])
  })

  it('combines multiple clue types to narrow candidates', () => {
    const pool = ['crane', 'slate', 'brave', 'graze', 'trace']
    const clues: Clue[] = [
      { letter: 'r', index: 1, state: 'correct' },  // _ r _ _ _
      { letter: 'a', index: 2, state: 'correct' },  // _ r a _ _
      { letter: 'c', index: 0, state: 'absent' },   // no C
    ]
    // crane: c@0 → absent eliminates it
    // slate: r not at index 1 → eliminated
    // brave: b r a v e → r@1 ✓, a@2 ✓, no c ✓ → kept
    // graze: g r a z e → r@1 ✓, a@2 ✓, no c ✓ → kept
    // trace: t r a c e → r@1 ✓, a@2 ✓, but contains c → eliminated
    expect(filterCandidates(clues, pool)).toEqual(['brave', 'graze'])
  })
})
