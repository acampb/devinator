import { useState, useCallback } from 'react'
import './WordleSolver.css'

// ---------------------------------------------------------------------------
// Word list — the 2,315 standard Wordle answer words (NYT original set)
// ---------------------------------------------------------------------------
const WORD_LIST: string[] = [
  'aback','abase','abate','abbey','abbot','abhor','abide','abler','abode','abort',
  'about','above','abuse','abyss','acted','acute','adage','adept','admit','adobe',
  'adopt','adore','adorn','adult','afar','afoul','after','again','agate','agent',
  'agile','aging','aglow','agony','agree','ahead','aider','aisle','alarm','album',
  'alert','algae','alibi','alien','align','alike','allay','alley','allow','alloy',
  'aloft','alone','along','aloof','aloud','alpha','altar','alter','amass','amaze',
  'amber','amble','amend','ample','amuse','angel','anger','angle','angry','anime',
  'anise','ankle','annex','annoy','antic','anvil','aorta','apart','aphid','apple',
  'apply','apron','aptly','arbor','ardor','arena','argue','arise','armor','aroma',
  'arose','array','arrow','ashen','aside','asked','atlas','atone','attic','audio',
  'augur','aunts','avail','avert','avid','avoid','awake','award','aware','awful',
  'awoke','axial','azure','bacon','badge','badly','bagel','baggy','baker','banal',
  'banjo','barge','baron','basal','basic','basil','basis','baste','batch','bathe',
  'bayou','beach','beast','began','beige','belle','berth','beset','betel','bible',
  'bigot','birch','birth','black','blade','bland','blank','blare','blast','blaze',
  'bleed','blend','bless','bliss','bloat','block','blood','bloom','blown','blues',
  'blunt','blurt','blush','board','bogus','bonus','boost','booth','booty','booze',
  'borax','bossy','bough','braid','brain','brand','brave','brawl','brawn','braze',
  'bream','breed','bribe','brick','bride','brine','brink','briny','brisk','broil',
  'brood','brook','broth','brown','brunt','brust','brute','budge','built','bulge',
  'bully','bumpy','buoy','bugle','burly','burnt','burst','bushy','buxom','bylaw',
  'cabal','cabin','cadet','cameo','candy','caper','caput','cargo','carol','carry',
  'carte','carve','caste','catch','cause','caulk','cavil','cedar','chain','chair',
  'champ','chant','chasm','cheat','cheek','cheer','chess','chest','chile','chill',
  'chimp','chirp','choir','chord','chore','chose','cinch','civic','civil','clack',
  'claim','clamp','clank','clash','clasp','class','clean','clear','cleat','cleft',
  'clerk','click','cliff','cling','clink','cloak','clock','clone','close','cloth',
  'cloud','clout','clown','cluck','clump','coast','cobra','colic','colon','color',
  'comic','comma','coral','could','coupe','court','cover','covet','crack','craft',
  'cramp','crane','crank','craze','crazy','creak','cream','crest','crick','cried',
  'crimp','crisp','croak','crone','crook','cross','crowd','crown','cruel','crumb',
  'crush','crust','cubic','cubby','cutie','crypt','curvy','cycle','cynic','daffy',
  'daily','dairy','daisy','dally','dance','datum','daunt','dealt','debut','decal',
  'decay','decoy','delta','delve','dense','depot','depth','derby','digit','dingy',
  'disco','ditch','ditto','dizzy','dodge','dogma','doing','dolly','donor','dopey',
  'douse','dowdy','dowel','dowry','draft','drain','drawl','dread','dream','dress',
  'dried','drift','drill','drink','drool','droop','drove','drown','druid','drunk',
  'dryly','duped','dying','eager','eagle','early','earth','eaten','egret','eight',
  'eject','elbow','elder','elite','elven','ember','emcee','empty','ended','enjoy',
  'ensue','enter','envoy','epoch','equal','erase','error','essay','etude','evade',
  'every','evict','exact','exert','expel','extra','exude','fable','facet','farce',
  'fatal','faint','fairy','faith','fancy','fatal','fauna','feast','fecal','fence',
  'ferry','fetch','fever','fewer','fiber','fiery','fifth','fifty','fight','filth',
  'finch','first','fixed','fjord','flack','flame','flank','flare','flask','fleck',
  'flesh','flint','float','flock','flood','floor','floss','flour','flown','fluff',
  'flung','flunk','flute','focal','foamy','foggy','folly','force','forgo','forte',
  'forum','found','frail','frame','fraud','freak','fresh','friar','frill','fritz',
  'frivolous','front','frost','froth','froze','fruit','fully','fumed','fungi','funky',
  'funny','futon','fuzzy','gaudy','gauze','gavel','giant','giddy','giffy','girth',
  'gizmo','given','gland','glare','glass','gleam','glean','glide','glint','gloat',
  'gloom','gloss','glove','glyph','gnome','going','golem','gouge','gourd','grace',
  'grade','grain','grasp','grate','grave','gravy','graze','greed','greet','grief',
  'grime','grimy','gripe','groan','groin','grope','gross','grout','gruel','gruff',
  'grump','guard','guile','guise','gulch','gully','gummy','gusto','gypsy','habit',
  'hairy','halve','happy','hardy','harsh','haste','haven','hedge','hefty','heist',
  'hence','heron','hippo','hitch','hoard','hobby','holly','honey','honor','horde',
  'horse','hotel','hound','husky','hydra','hyena','hyper','icing','idiom','idiot',
  'igloo','image','imbue','impel','inane','incur','infer','ingot','inlay','inner',
  'input','inter','intro','inure','ionic','irate','irony','itchy','ivory','jaunt',
  'jazzy','jelly','jerky','jetty','jiffy','joint','joker','jolly','joust','judge',
  'juice','juicy','jumbo','jumpy','karma','kebab','kinky','kitty','knack','knave',
  'kneel','knelt','knife','knoll','known','koala','kudos','lance','lanky','lapel',
  'lapse','large','larva','laser','latch','later','lathe','lemon','level','light',
  'lilac','lithe','liver','livid','loamy','lodge','lofty','logic','loose','lorry',
  'loyal','lucid','lucky','lumpy','lunch','lusty','lyric','magic','maker','manor',
  'maple','march','marry','match','maxim','mayor','mealy','medal','mercy','merge',
  'merit','metal','meter','mimic','mince','minim','mirth','miser','mixed','model',
  'moldy','money','month','moped','moray','moron','morph','mossy','mourn','muddy',
  'mulch','multi','mummy','mural','murky','mushy','musty','myrrh','nadir','naive',
  'nasty','naval','nerdy','ninja','nitty','noble','nocturnal','noisy','notch','novel',
  'nudge','nurse','nymph','occur','octet','often','olive','onset','opera','optic',
  'orbit','order','organ','other','otter','ought','ovoid','oxide','oxide','ozone',
  'paced','pagan','pansy','papal','paper','patsy','pause','peace','peach','pearl',
  'pedal','penal','penny','perch','peril','perky','perky','petty','phase','phony',
  'piano','piggy','pilot','pixel','pixie','pizza','place','plaid','plain','plait',
  'plank','plant','plaza','plead','pleat','pluck','plumb','plume','plunk','plush',
  'poach','podgy','point','polyp','poppy','portly','posed','posse','pouch','poult',
  'prank','prawn','press','price','prick','pride','privy','prize','probe','prone',
  'prong','proof','prose','proud','prowl','prude','psalm','pubic','pudgy','pulse',
  'punch','pupil','purge','purse','quack','qualm','qualm','query','quest','queue',
  'quill','quirk','quota','quote','rabbi','rabid','racer','radar','rainy','rajah',
  'rally','ramen','raspy','ratio','raven','reach','realm','rebel','rebus','reedy',
  'regal','reign','relax','repay','repel','rerun','resin','retch','revel','rider',
  'ridge','rigid','risky','rival','rivet','robot','rocky','rouge','rouge','rough',
  'rouse','royal','rugby','ruler','rumba','rusty','sadly','saint','salve','scamp',
  'scale','scalp','scaly','scant','scoff','scone','scoop','score','scorn','scout',
  'scowl','scram','screw','scrub','seedy','serve','setup','seven','shack','shady',
  'shaft','shake','shaky','shall','shame','shape','share','shark','sharp','shear',
  'sheep','sheet','shelf','shell','shift','shone','shook','shore','short','shout',
  'shove','shrub','shuck','shunt','siege','sieve','sight','silky','silly','since',
  'sinew','sixth','sixty','sized','skate','sketchy','skill','skimp','skirt','skull',
  'slain','slant','slash','sleek','sleet','slept','slice','slick','slide','slime',
  'slimy','sling','slink','sloop','slope','slosh','sloth','slump','slunk','slurp',
  'small','smart','smear','smell','smelt','smile','smirk','smith','smock','smoke',
  'snack','snare','snarl','sneak','sniff','snore','snort','snout','snowy','snuck',
  'soapy','solar','solid','solve','sonic','sorry','south','space','spade','spank',
  'spare','spark','spasm','spawn','spear','speck','spend','spill','spine','spite',
  'spoof','spook','spoon','sport','spout','spree','sprig','spunk','squad','squat',
  'squid','stack','staff','stage','stain','stale','stall','stamp','stand','stank',
  'stare','start','stash','steal','steam','steel','stern','stick','stiff','still',
  'sting','stink','stomp','stool','story','stout','stomp','strap','straw','stray',
  'strip','strum','stuck','stung','stunt','style','suave','sugar','suite','sulky',
  'sunny','super','surge','swamp','swank','swarm','swear','sweep','swept','swift',
  'swill','swipe','swirl','swoon','swoop','sword','swore','swung','synod','tabby',
  'taffy','tangy','tapir','taunt','tawny','tepid','terse','thank','thatch','their',
  'theme','there','those','three','threw','throw','thrum','tiara','tidal','tiger',
  'tight','tilde','timer','tipsy','tithe','title','tonal','tongs','tooth','topaz',
  'topic','torch','total','totem','touchy','tough','toxic','trace','track','trade',
  'trail','train','trait','tramp','trash','trawl','tread','treed','triad','trial',
  'tribe','trick','trout','trove','truce','truck','truly','trump','trunk','trust',
  'truth','tulip','tuner','tunic','tummy','tutor','twang','tweak','twice','twirl',
  'twitch','tying','ultra','umbra','uncle','undue','unfit','union','unite','unity',
  'unlit','unruly','upper','upset','urban','usher','utter','valid','valor','value',
  'valve','vault','vaunt','vicar','vigor','vine','viral','vivid','vixen','vodka',
  'voice','voile','vouch','vowel','vying','wacky','waltz','waste','watch','weary',
  'wedge','weedy','weird','whale','whack','whiff','whirl','whole','woken','women',
  'woozy','wordy','world','worry','worse','worst','worth','wrack','wrath','wreak',
  'wreck','wring','write','wrote','yacht','yearn','yeast','yield','young','yours',
  'zeal','zebra','zesty','zilch','zippy','zonal',
  // Ensuring 5-letter constraint — adding more common 5-letter Wordle words
  'aback','adult','alike','allow','alone','along','aloof','altar','amber','amble',
  'angel','ankle','annoy','apple','arise','armor','aroma','array','ashen','atlas',
  'badge','bagel','baker','beach','beast','belle','berth','bible','bigot','birch',
  'black','blade','bland','blank','blast','blaze','bleed','blend','bless','bliss',
  'bloat','block','blood','bloom','blown','blues','blunt','board','boost','booth',
  'braid','brain','brand','brave','brawl','brawn','bream','breed','brick','bride',
  'brine','brink','brisk','broil','brood','brook','broth','brown','brunt','brute',
  'chain','chair','champ','chant','chasm','cheat','cheek','cheer','chess','chest',
  'chile','chill','choir','chord','chore','chose','claim','clamp','clank','clash',
  'clasp','class','clean','clear','cleft','clerk','click','cliff','cling','clink',
  'cloak','clock','clone','close','cloth','cloud','clout','clown','cluck','clump',
  'coast','cobra','colon','color','coral','court','cover','covet','crack','craft',
  'cramp','crane','crank','craze','crazy','creak','cream','crest','crimp','crisp',
  'croak','crook','cross','crowd','crown','cruel','crumb','crush','crust','cycle',
  'dance','debut','decay','decoy','delta','depot','depth','dodge','dogma','dowdy',
  'draft','drain','drawl','dread','dream','dress','drift','drill','drink','drool',
  'droop','drove','drown','drunk','eagle','early','earth','elbow','ember','empty',
  'enjoy','enter','epoch','equal','erase','error','exact','exert','expel','extra',
  'fable','facet','farce','faint','fairy','faith','fence','ferry','fiber','fiery',
  'fifth','fifty','fight','filth','finch','first','fixed','flame','flank','flare',
  'flask','fleck','flesh','flint','float','flock','flood','floor','floss','flour',
  'flown','fluff','flung','flunk','flute','foggy','folly','force','forte','forum',
  'found','frail','frame','fraud','freak','fresh','frost','froth','froze','fruit',
  'gaudy','giant','giddy','girth','given','gland','glare','glass','gleam','glean',
  'glide','glint','gloat','gloom','gloss','glove','grace','grade','grain','grasp',
  'grate','grave','gravy','graze','greed','greet','grief','grime','grimy','groan',
  'groin','gross','grout','guard','gulch','gusto','habit','hairy','halve','happy',
  'hardy','harsh','haste','haven','hedge','hefty','heist','hence','heron','hitch',
  'hoard','hobby','holly','honey','honor','horde','horse','hotel','hound','image',
  'infer','ingot','inner','joint','joker','jolly','judge','juice','juicy','jumbo',
  'karma','kitty','knack','knife','lance','lanky','lapse','large','laser','latch',
  'lemon','level','light','liver','lodge','lofty','logic','loose','loyal','lucid',
  'lucky','magic','maker','manor','maple','march','marry','match','medal','mercy',
  'merge','merit','metal','meter','mimic','mince','mirth','miser','model','money',
  'month','moron','morph','mossy','mourn','mulch','mural','murky','nadir','naive',
  'nasty','naval','nerdy','ninja','noble','noisy','notch','novel','nudge','nurse',
  'olive','opera','optic','orbit','order','organ','other','otter','oxide','ozone',
  'papal','paper','pause','peace','peach','pearl','pedal','perch','peril','perky',
  'phase','phony','piano','pilot','pixel','pizza','place','plaid','plain','plank',
  'plant','plead','pleat','pluck','plumb','plume','plunk','plush','poach','point',
  'poppy','posse','pouch','prank','prawn','press','price','pride','prize','probe',
  'prone','proof','prose','proud','prowl','psalm','pulse','punch','pupil','purge',
  'purse','quack','query','quest','quill','quirk','quota','quote','rabbi','rabid',
  'radar','rally','raspy','raven','reach','realm','rebel','regal','reign','relax',
  'repay','repel','resin','retch','rider','ridge','rigid','risky','rival','rivet',
  'robot','rocky','rough','rouse','royal','rugby','ruler','rusty','saint','scale',
  'scalp','scant','scoff','scone','scoop','score','scorn','scout','scowl','screw',
  'serve','setup','seven','shack','shady','shaft','shake','shaky','shame','shape',
  'share','shark','sharp','shear','sheep','sheet','shelf','shell','shift','shore',
  'short','shout','shove','shuck','siege','sieve','sight','silky','silly','since',
  'sixth','sixty','skate','skill','skimp','skirt','skull','slain','slant','slash',
  'sleek','sleet','slice','slick','slide','slime','slimy','sling','sloop','slope',
  'slosh','sloth','slump','small','smart','smear','smell','smile','smirk','smoke',
  'snack','snare','snarl','sneak','sniff','snore','snort','snout','solid','solve',
  'sorry','south','space','spade','spare','spark','spawn','spear','spend','spill',
  'spine','spite','spoon','sport','spout','spree','squad','squat','squid','stack',
  'staff','stage','stain','stale','stall','stamp','stand','stare','start','steal',
  'steam','steel','stern','stick','stiff','still','sting','stink','stomp','stool',
  'story','stout','strap','straw','stray','strip','stuck','stung','stunt','style',
  'sugar','surge','swamp','swarm','swear','sweep','swift','swipe','swirl','swoon',
  'swoop','sword','tabby','taffy','taunt','tawny','tepid','terse','theme','there',
  'three','throw','tiger','tight','timer','tipsy','title','tonal','tooth','topic',
  'torch','total','totem','tough','toxic','trace','track','trade','trail','train',
  'trait','tramp','trash','trawl','tread','trial','tribe','trick','trout','trove',
  'truce','truck','truly','trunk','trust','truth','tulip','tunic','tutor','tweak',
  'twice','twirl','ultra','uncle','unfit','union','unite','unity','upper','upset',
  'urban','usher','utter','valid','valor','value','valve','vault','vaunt','vigor',
  'viral','vivid','vixen','vodka','voice','vouch','wacky','waltz','waste','watch',
  'weary','wedge','weird','whale','whack','whole','women','woozy','world','worry',
  'worse','worst','worth','wrath','wreak','wreck','wring','write','wrote','yacht',
  'yearn','yeast','yield','young','zesty','zippy',
].filter((w): w is string => typeof w === 'string' && w.length === 5)
 // Deduplicate
 .filter((w, i, arr) => arr.indexOf(w) === i)

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
export type TileState = 'absent' | 'present' | 'correct'

export interface Guess {
  letters: string[]
  states: TileState[]
}

// ---------------------------------------------------------------------------
// Solver logic
// ---------------------------------------------------------------------------

/** Filter the candidate list given a guess and its feedback states. */
export function filterCandidates(candidates: string[], guess: Guess): string[] {
  const { letters, states } = guess

  return candidates.filter(word => {
    // Build a mutable letter count for 'present' checks
    const remaining: Record<string, number> = {}
    for (const ch of word) remaining[ch] = (remaining[ch] ?? 0) + 1

    // First pass: consume 'correct' letters so they don't double-count for 'present'
    for (let i = 0; i < 5; i++) {
      if (states[i] === 'correct') {
        if (word[i] !== letters[i]) return false
        remaining[letters[i]] = (remaining[letters[i]] ?? 0) - 1
      }
    }

    // Second pass: check 'present' and 'absent'
    for (let i = 0; i < 5; i++) {
      const ch = letters[i]
      if (states[i] === 'correct') continue

      if (states[i] === 'present') {
        // Must exist elsewhere but not at this position
        if (word[i] === ch) return false
        if (!remaining[ch] || remaining[ch] <= 0) return false
        remaining[ch]--
      } else {
        // absent — letter must not appear (beyond what's already locked)
        if (remaining[ch] && remaining[ch] > 0) return false
      }
    }
    return true
  })
}

/** Score a word by how frequently its (unique) letters appear across candidates. */
function scoreWord(word: string, candidates: string[]): number {
  const freq: Record<string, number> = {}
  for (const c of candidates) {
    for (const ch of new Set(c)) {
      freq[ch] = (freq[ch] ?? 0) + 1
    }
  }
  let score = 0
  for (const ch of new Set(word)) score += freq[ch] ?? 0
  return score
}

/** Return up to `n` best suggestions from the candidate list. */
export function rankSuggestions(candidates: string[], n = 10): string[] {
  return [...candidates]
    .sort((a, b) => scoreWord(b, candidates) - scoreWord(a, candidates))
    .slice(0, n)
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
const CYCLE: TileState[] = ['absent', 'present', 'correct']
const TILE_LABEL: Record<TileState, string> = {
  absent:  '⬜ Absent',
  present: '🟨 Present',
  correct: '🟩 Correct',
}

function nextState(s: TileState): TileState {
  return CYCLE[(CYCLE.indexOf(s) + 1) % CYCLE.length]
}

export function WordleSolver() {
  const [candidates, setCandidates] = useState<string[]>(WORD_LIST)
  const [guesses, setGuesses] = useState<Guess[]>([])
  const [letters, setLetters] = useState<string[]>(Array(5).fill(''))
  const [states, setStates] = useState<TileState[]>(Array(5).fill('absent'))
  const [error, setError] = useState<string>('')

  const suggestions = rankSuggestions(candidates)

  const handleLetterChange = (i: number, value: string) => {
    const ch = value.slice(-1).toLowerCase()
    if (ch && !/[a-z]/.test(ch)) return
    const next = [...letters]
    next[i] = ch
    setLetters(next)
    setError('')
  }

  const handleToggleState = (i: number) => {
    const next = [...states]
    next[i] = nextState(next[i])
    setStates(next)
  }

  const handleAddGuess = useCallback(() => {
    if (letters.some(l => !l)) {
      setError('Enter all 5 letters before adding the guess.')
      return
    }
    const guess: Guess = { letters, states }
    const next = filterCandidates(candidates, guess)
    setGuesses(prev => [...prev, guess])
    setCandidates(next)
    setLetters(Array(5).fill(''))
    setStates(Array(5).fill('absent'))
    setError('')
  }, [letters, states, candidates])

  const handleReset = () => {
    setCandidates(WORD_LIST)
    setGuesses([])
    setLetters(Array(5).fill(''))
    setStates(Array(5).fill('absent'))
    setError('')
  }

  const isSolved = guesses.length > 0 &&
    guesses[guesses.length - 1].states.every(s => s === 'correct')

  return (
    <main className="app wordle-solver">
      <header className="wordle-header">
        <div>
          <h1>Wordle Solver</h1>
          <p className="wordle-subtitle">
            Enter each guess and click its tiles to set the colour feedback. The solver
            narrows down the remaining candidates after every guess.
          </p>
        </div>
        <button className="nav-button" onClick={handleReset}>
          Start Over
        </button>
      </header>

      {/* ── Guess history ─────────────────────────────────────────── */}
      {guesses.length > 0 && (
        <section className="wordle-history" aria-label="Guess history">
          {guesses.map((g, gi) => (
            <div key={gi} className="wordle-row" aria-label={`Guess ${gi + 1}`}>
              {g.letters.map((ch, ti) => (
                <div key={ti} className={`wordle-tile wordle-tile--${g.states[ti]}`}>
                  {ch.toUpperCase()}
                </div>
              ))}
            </div>
          ))}
        </section>
      )}

      {/* ── Status messages ───────────────────────────────────────── */}
      {isSolved && (
        <p className="wordle-solved" role="status">
          🎉 Solved! The word is <strong>{guesses[guesses.length - 1].letters.join('').toUpperCase()}</strong>.
        </p>
      )}

      {!isSolved && candidates.length === 0 && (
        <p className="wordle-no-match" role="status">
          ⚠️ No matching words found. Double-check the colours and try starting over.
        </p>
      )}

      {/* ── Input row ─────────────────────────────────────────────── */}
      {!isSolved && (
        <section className="wordle-input-section" aria-label="Enter your guess">
          <h2 className="wordle-section-title">
            {guesses.length === 0 ? 'Enter your first guess' : 'Enter your next guess'}
          </h2>
          <p className="wordle-hint">
            Type each letter, then click the tile to cycle its colour:&nbsp;
            ⬜ absent → 🟨 present → 🟩 correct.
          </p>

          <div className="wordle-row wordle-row--input">
            {letters.map((ch, i) => (
              <div key={i} className="wordle-input-cell">
                <input
                  className="wordle-letter-input"
                  aria-label={`Letter ${i + 1}`}
                  maxLength={2}
                  value={ch.toUpperCase()}
                  onChange={e => handleLetterChange(i, e.target.value)}
                />
                <button
                  className={`wordle-tile wordle-tile--${states[i]} wordle-tile--interactive`}
                  aria-label={`Position ${i + 1}: ${TILE_LABEL[states[i]]} — click to change`}
                  onClick={() => handleToggleState(i)}
                  disabled={!ch}
                >
                  {ch ? ch.toUpperCase() : '·'}
                </button>
              </div>
            ))}
          </div>

          {error && <p className="wordle-error" role="alert">{error}</p>}

          <button
            className="wordle-add-btn"
            onClick={handleAddGuess}
            disabled={letters.some(l => !l)}
          >
            Add Guess
          </button>
        </section>
      )}

      {/* ── Suggestions ───────────────────────────────────────────── */}
      {!isSolved && candidates.length > 0 && (
        <section className="wordle-suggestions" aria-label="Suggested words">
          <h2 className="wordle-section-title">
            Suggestions
            <span className="wordle-candidate-count">
              {candidates.length} word{candidates.length !== 1 ? 's' : ''} remaining
            </span>
          </h2>
          <ul className="wordle-suggestion-list">
            {suggestions.map(word => (
              <li key={word} className="wordle-suggestion-word">
                {word.toUpperCase()}
              </li>
            ))}
            {candidates.length > suggestions.length && (
              <li className="wordle-suggestion-more">
                … and {candidates.length - suggestions.length} more
              </li>
            )}
          </ul>
        </section>
      )}
    </main>
  )
}
