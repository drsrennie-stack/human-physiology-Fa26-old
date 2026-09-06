# The spaced recall card system, build notes

Aug 23 2026. **Complete. 4,980 cards, all 268 competencies, all five modules.**

## What is in this drop

| File | State |
|---|---|
| `bio005-competencies.js` | **Replaced.** Regenerated at 268 competencies. |
| `os/bio005-card-bank.js` | **New.** 4,980 cards. Generated, do not hand edit. 5 MB. |
| `os/card-competency-map.js` | **New.** 5,014 entries. Generated, do not hand edit. |
| `os/recall-view.js` | **Replaced.** The card UI, the flag, note sheets, DOK gating. |
| `os/mastery-evidence.js` | **Patched.** One function, `fromCards()`. |
| `compliance-notes-recall.md` | **New.** |
| `cards/*.json` | **New.** The authored source, one file per chapter. Edit here. |
| `tools/build_scaffold.py`, `tools/assemble_bank.py` | **New.** The generators. |
| `tools/test_recall.js`, `tools/test_gate.js`, `tools/shots.js` | **New.** The browser tests and screenshots. |

## The competency file had to be replaced first

The repo carried two competency sets that disagreed. `bio005-competencies.js`
held the superseded 137 with `m1-*` ids. `bio005-competencies.csv` next to it
held the 268 with `w1-*` ids. PLACEHOLDERS item B resolved that in favor of
268, but only the CSV was ever updated, so the file the OS actually loads was
still the old one.

Cards have to be tagged to competency ids, and a card tagged to an id that
does not exist moves no mastery bar. So the js was regenerated from the CSV at
268, keeping the same field shape (`id`, `module`, `week`, `system`,
`general`, `name`, `can`, `dok`, `yield`, `est`, `facets`) and the same
`BIO005_MODULES` and `BIO005_META` objects, so `competency-map.html`,
`course-schedule.html` and the OS read it unmodified.

`dokLabels` lost its DOK 4 "Transfer" entry, because DOK 4 is out of the
course by decision and leaving the label would let a downstream tool render a
tier nothing will ever populate.

**Regenerate with:** `python3 tools/build_scaffold.py`

## How the cards are shaped

4,980 cards planned across 268 competencies, by yield:

| Yield | Cards | DOK 1 | DOK 2 | DOK 3 |
|---|---|---|---|---|
| core (192 competencies) | 19 | 8 | 7 | 4 |
| high (67) | 18 | 8 | 6 | 4 |
| support (9) | 14 | 6 | 5 | 3 |

Delivered: **2,126 DOK 1, 1,791 DOK 2, 1,063 DOK 3.** That is 43 percent
recall, 36 percent apply, 21 percent analyze. The recall layer is deliberately
the fattest because the engine gates apply behind recall: a thin DOK 1 layer
would leave students stuck at the gate.

Coverage came out exactly on plan: 192 of 192 core competencies (3,648 cards),
67 of 67 high (1,206), 9 of 9 support (126). Nothing is uncovered. The correct
answer sits at option position 0, 1, 2 and 3 on 1,268 / 1,270 / 1,243 / 1,199
cards, so there is no position to learn.

**There is no DOK 4.** Transfer at that depth is clinical medicine. Clinical
context appears throughout (digoxin, SIADH, cholera toxin, hyperkalemia), but
never a management, dosing or diagnostic decision.

Every card carries:

- `competencyId` from `bio005-competencies.js`. The assembler refuses to write
  the bank if any card is missing one or points at an id that does not exist.
- `tags`: `["lecture"]`, `["lecture","lab"]`, or `["lab","application"]` for
  the 34 competencies that are lab tasks rather than lecture material, plus
  the chapter name, the DOK level as `dok1`/`dok2`/`dok3`, and the yield. So a
  card can be filtered by topic, depth or yield without a join.
- `topic`, `week` and `yield` as their own fields, for the same reason.
- `dok`, `q`, `a`, four `options`, `correctIndex`, and an `explanation` that
  says why the key is right and why each of the three distractors is wrong.

**Rebuild the bank with:** `python3 tools/assemble_bank.py`

It validates before it writes: eight required fields, exactly four options,
`correctIndex` in range, dok in 1 to 3, competencyId resolves, no duplicate
card ids or question text inside a chapter, no em dashes or en dashes, no
"none of the above", no credential suffixes. Any failure and nothing is
written.

## The competency map carries two grains, and it has to

```
"<topicId>"              every competency the chapter covers
"<topicId>:<cardId>"     the one competency that card actually proves
```

Chapter grain alone is not good enough here. Renal Physiology is one chapter
holding nineteen competencies. Crediting at the chapter level would hand a
student mastery of the countercurrent multiplier for answering a card about
micturition, and every mastery bar in the course would be fiction.

This is why `mastery-evidence.js` needed a patch. Its `fromCards()` resolved
one map entry per topic and fanned every card result out across every
competency in that chapter. It now reads the card key first and falls back to
the chapter, which stays correct for anything added later without its own
entry. One function changed, nothing else in that file was touched.

## What changed in recall-view.js

1. **The card opens on a focus stage.** Dimmed and blurred backdrop, nothing
   else reachable. Maroon `#7A2A22` shell framing a white face on all four
   sides, no bookend bars, lifted off the page on a real shadow. It reads as a
   physical card because that is what it is pretending to be. `role="dialog"`,
   focus trapped inside it, Escape closes and returns focus to the button that
   opened it.

   The card was navy in the first build. On the dark navy application surface
   of the OS that made it a slightly different dark rectangle on a dark page.
   The lighter terras were measured and rejected: `#C2734D` gives 3.6:1
   against white and `#A0522D` gives 5.6:1, neither of which can carry body
   text at AAA. `#7A2A22` gives 9.6:1 and is already in the OS palette.

2. **Select, then submit.** Rate confidence, choose an option, submit. The
   rating stays on screen with a Change button, and the option is a selection
   rather than an answer until Submit is pressed.

   This fixed a real defect, not just a preference. The previous build graded
   on the click, so a mis-tap on a phone was a permanent wrong answer that
   reset the card's box and, at high confidence, wrote a blindspot the student
   never had. Submit is disabled until a pick exists, with a visible reason
   next to it.

3. **The answer and its justification sit in a shaded block**, so they read as
   a separate thing from the question when a student scans back over a card.

4. **Flagging, and what a flag is for.** A flag is not a bookmark. Flagged
   cards, plus the ones the student actually missed, assemble into a printable
   note sheet grouped by competency: the question, the answer, why the wrong
   options were wrong, and open space to redraw the mechanism from memory.
   Missed cards land there without being asked for, because the student who
   most needs the sheet is the least likely to remember to flag anything.

   The sheet had ruled lines in the first build. They are gone: the task is to
   draw a mechanism, and a drawing does not sit on lines. An open bounded box
   replaced them.

5. **Both confidence red flags, not one.** The fork caught "sure and wrong".
   It missed "not sure and right", which is the quiet one: a student guesses
   correctly, the card is marked known, and it does not come back until it has
   gone. A correct answer given at "Not yet" now holds the card at box 1, so
   it returns tomorrow and has to be produced deliberately before it counts.

6. **DOK progression, per competency.** DOK 1 first. DOK 2 opens once three of
   that competency's DOK 1 cards are holding (right on two separate days).
   DOK 3 opens the same way off DOK 2. Per competency, not per chapter, so
   being strong on osmolarity does not hand you the hard membrane potential
   questions. There is an override toggle, because a gate a student cannot
   open is a wall and a student revising for an exam has earned the right to
   see everything.

7. **Term start.** The fork inherited the anatomy build's August 17 start and
   17 week term. BIO 005 opens Tue Sep 8 2026 and runs 15. Everything scoped
   to "this week" or "everything taught so far" was reading the wrong week all
   term.

8. **Gap runs sample per competency, not per chapter.** Two cards per chapter
   across 34 chapters told you nothing about seventeen of the nineteen renal
   competencies. Three per competency is a survey you can finish in a sitting
   that actually touches everything.

## Verified

Two headless Chromium suites against `os/mastery-physio-os.html`, both green.

`node tools/test_recall.js`, 52 checks:

- Zero console errors, zero failed asset requests (the offline font CDN aside).
- Bank loads 4,980 cards, competency set 268, map carries card-level keys.
- Focus stage opens on the body, fixed, above the OS, backdrop at 90 percent
  opacity with a 7px blur. Scroll locked while open, released on close.
- Shell measures `#7A2A22`, face measures `#FFFFFF`, question text 18.0:1,
  shell text 8.5:1.
- Options stay hidden until a confidence rating is given.
- Submit is disabled before a pick; arriving at the options grades nothing;
  selecting grades nothing; changing the pick moves the mark rather than
  adding one; submit is gone once used.
- Answer and justification render in the shaded panel.
- Sure and wrong: key marked, wrong pick marked, options locked, explanation
  revealed, red flag named, blindspot recorded, box reset to 0.
- Right but unsure: named, held at box 1.
- Escape closes, Tab does not escape the card, focus starts inside it.
- Note sheet builds, groups by competency, one open drawing block per card,
  zero ruled lines, says why each card is on it, byline with no credential
  suffix.
- Progress, flags and the mastery feed all survive a reload.
- One competency credited per card answered, not the whole chapter.

`node tools/test_gate.js`, 12 checks, which is the one that proves the
progressive difficulty actually works rather than just starting shallow. On a
competency with 8 DOK 1, 7 DOK 2 and 4 DOK 3 cards:

- A fresh student is dealt **8** cards. Only DOK 1.
- Three DOK 1 cards holding, and the deal becomes **15**. DOK 2 opened, DOK 3
  did not.
- Three DOK 2 cards holding, and the deal becomes **19**. DOK 3 opened.
- Doing that to one competency leaves its neighbor still gated at 8, so the
  gate is genuinely per competency and does not leak.
- The override widens the week 1 pool from 154 to 360.
- Every card carries topic, DOK, week, yield and tags: 4,980 of 4,980.
- Cold load of the whole OS with the 5 MB bank: about 1.2 seconds.

Three contrast failures were found during the audits and fixed rather than
accepted. All three are written up in `compliance-notes-recall.md` section 3.

## One thing to decide

Nine questions appear verbatim under two different competencies. Each one is a
foundational fact that two competencies genuinely both depend on, and because
they carry different competency ids they move different mastery bars, so
nothing is broken. But a student who meets the same sentence twice will read
it as a glitch. They are listed here so the call is yours: leave them as
deliberate interleaving, or reword one side of each pair.

| Question | Competency A | Competency B |
|---|---|---|
| What happens to total peripheral resistance during moderate whole body exercise? | `w11-exercise-cv` | `w15-exercise-integration` |
| What is a motor unit? | `w8-motor-hierarchy` | `w6-motor-units` |
| What is alveolar dead space? | `w12-va-q-matching` | `w12-dead-space` |
| What is the absolute refractory period? | `w6-cardiac-muscle` | `w4-refractory` |
| What is the approximate equilibrium potential for k+ in a typical neuron? | `w4-ion-disturbance` | `w2-nernst` |
| What is the term for glucose appearing in the urine? | `w9-diabetes` | `w2-transport-maximum` |
| What is the typical resting membrane potential of a neuron? | `w4-action-potential` | `w2-resting-potential` |
| Where does the lateral corticospinal tract cross the midline? | `w5-spinal-pathways` | `w8-corticospinal` |
| Which solute is the main determinant of extracellular fluid osmolarity? | `w13-volume-osmolarity` | `w1-compartment-shifts` |

Everything else is unique: 4,971 distinct questions across 4,980 cards.

## Not done

1. **A subject-matter read.** Every chapter was self-audited by its author
   against the competency statement, and the mechanical checks are exhaustive,
   but no second physiologist has read the 4,980 cards. The ones most worth
   spot-checking are the arithmetic-heavy chapters: Nernst, renal clearance,
   blood gases, cardiac output, ventilation.
2. **The rest of Mastery Physio OS is still unaudited** for accessibility.
   `compliance-notes.md` section 8 has the list. This drop covers the Recall
   system only.
3. **`competency-recall.html`** was the fallback while the bank was empty. It
   still works and can stay for now, but once Module 5 lands it is a second
   door onto the same job and should be retired or re-forked.
4. **The lab cards are written against the standard version of each exercise**,
   not against your lab manual, which has not been written yet. This affects
   all 34 lab-only competencies: diffusion and osmosis, RBC tonicity, the
   enzyme assay, the transport and membrane simulations, nerve conduction, the
   synapse sim, reflex testing, EMG and grip fatigue, tactile mapping, vision
   and hearing tests, autonomic testing, glucose tolerance, hormone assay,
   hematocrit, blood typing, ECG recording, heart sounds, blood pressure,
   spirometry, ventilation response, urinalysis, renal calculation, ABG
   interpretation, digestion enzymes, metabolic rate, and cycle graphs. Every
   one of them uses the common form of the exercise and the standard reference
   values. When the lab delivery decision lands, those chapters want a pass
   against the real protocol, and the values in them want checking against
   whichever text you adopt.

5. **Reference ranges** throughout are the common textbook ones. If your text
   uses different cutoffs (hematocrit, white count, blood gases, glucose
   thresholds), those cards need the numbers aligned.

6. **Where multiple choice cannot reach.** Roughly a third of the lab
   competencies say "perform", "record", "plot", or "draw". Cards test the
   reasoning such a performance requires, not the performance. The drawing
   synthesis competency is the clearest case: its cards ask what belongs on
   the diagram and which arrow direction is right, but a student can pass all
   nineteen without having drawn anything. The drawing itself is still the
   integrity mechanism and still has to be checked directly.
