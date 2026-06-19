import { WORD_LIST } from './wordList'

export type LetterState = 'correct' | 'present' | 'absent'

export interface Clue {
  letter: string   // single lowercase letter
  index: number    // 0-4 position in the 5-letter word
  state: LetterState
}

/**
 * Filter the candidate word list based on all clues provided so far.
 *
 * Rules (matching official Wordle logic):
 *   correct  → that letter MUST appear at that exact index.
 *   present  → that letter MUST appear in the word, but NOT at that index.
 *   absent   → that letter must NOT appear in the word at all, UNLESS it is
 *               also marked correct/present elsewhere (handles duplicate-letter
 *               edge cases — e.g. guessing "SPEED" on "CREEP": the first E is
 *               absent but the second is correct).
 */
export function filterCandidates(clues: Clue[], pool: string[] = WORD_LIST): string[] {
  if (clues.length === 0) return pool

  // Build constraint structures from the clue set
  const correctAt = new Map<number, string>()       // index → letter
  const presentLetters = new Map<string, Set<number>>() // letter → set of forbidden indexes
  const absentLetters = new Set<string>()
  const requiredLetters = new Set<string>()

  for (const { letter, index, state } of clues) {
    if (state === 'correct') {
      correctAt.set(index, letter)
      requiredLetters.add(letter)
    } else if (state === 'present') {
      requiredLetters.add(letter)
      if (!presentLetters.has(letter)) presentLetters.set(letter, new Set())
      presentLetters.get(letter)!.add(index)
    } else {
      // absent — only truly absent if not also required (duplicate-letter guard)
      // We'll resolve this after collecting all clues, below.
      absentLetters.add(letter)
    }
  }

  // Remove from absentLetters any letter that is also required
  for (const l of requiredLetters) absentLetters.delete(l)

  return pool.filter(word => {
    // 1. Correct-position constraints
    for (const [i, l] of correctAt) {
      if (word[i] !== l) return false
    }

    // 2. Absent-letter constraints
    for (const l of absentLetters) {
      if (word.includes(l)) return false
    }

    // 3. Present-letter constraints (must exist, but not at forbidden index)
    for (const [l, forbidden] of presentLetters) {
      if (!word.includes(l)) return false
      for (const idx of forbidden) {
        if (word[idx] === l) return false
      }
    }

    return true
  })
}

/**
 * Score a guess word against a secret word and return the resulting clues.
 * Useful for testing and for the "simulate" feature.
 *
 * Implements the same two-pass algorithm Wordle uses to handle duplicate letters
 * correctly.
 */
export function scoreGuess(guess: string, secret: string): LetterState[] {
  const result: LetterState[] = Array(5).fill('absent')
  const secretArr = secret.split('')
  const remaining: (string | null)[] = [...secretArr]

  // Pass 1: mark exact matches
  for (let i = 0; i < 5; i++) {
    if (guess[i] === secretArr[i]) {
      result[i] = 'correct'
      remaining[i] = null
    }
  }

  // Pass 2: mark present (yellow) matches for non-exact positions
  for (let i = 0; i < 5; i++) {
    if (result[i] === 'correct') continue
    const idx = remaining.indexOf(guess[i])
    if (idx !== -1) {
      result[i] = 'present'
      remaining[idx] = null
    }
  }

  return result
}
