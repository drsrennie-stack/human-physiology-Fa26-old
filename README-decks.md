# Five slide decks, Weeks 1 and 2

BIO 005 Human Physiology. Dr. Sharilyn Rennie.

**This replaces the earlier package. Delete the previous copies.** Everything in the first version was rewritten after your review: the writing, the slide length, the spelling, and the accent bars.

## What to do with this

Copy the five `slides-p-*.html` files into the **repo root**, beside `slides-p-introduction-to-physiology.html`. They are self contained and expect nothing except `icon.svg` and `bio005-dock.js` as siblings, which are already there.

Copy the five `compliance/*.compliance.md` files into **`compliance/`**. `compliance/index-rows.md` is a note to you, not a deliverable: it holds the rows to paste into `compliance/index.md` and three prose changes the index now needs.

`_deck-source/` is the generator. You need it only to change a deck.

## The five decks

| File | Week | Topic | Slides | Figures | Lab notes |
|---|---|---|---|---|---|
| `slides-p-quantitative-skills.html` | 1 | Quantitative Skills for Physiology | 40 | 3 | 24 |
| `slides-p-chemical-foundations.html` | 1 | Chemical Foundations | 52 | 4 | 8 |
| `slides-p-membrane-structure-and-diffusion.html` | 2 | Membrane Structure and Diffusion | 56 | 4 | 8 |
| `slides-p-membrane-transport.html` | 2 | Membrane Transport | 46 | 4 | 7 |
| `slides-p-membrane-potential.html` | 2 | Membrane Potential | 51 | 4 | 4 |

245 slides, 19 figures, 51 lab annotations. The decks are longer than the first version because slides were split rather than cut. Nothing was removed to make them fit.

## What changed after your review

**The writing.** The first version was clever instead of instructive. It used aphorisms ("It is a rate, not an amount"), wordplay ("a number that sits still is not sitting still"), idiom ("what each one buys you", "for you, for free"), commentary on the reader ("this is the hardest habit to build", "students lose points here"), and instructions to say things out loud. All of it is gone. `VOICE.md` in `_deck-source/` states the rules, and `lint.js` enforces the ones a machine can see.

**The slide length.** 138 of the original 168 slides carried too much text. The slide you screenshotted had 232 words visible at once. Ceilings are now enforced by `density.js`: 90 words visible before any card is opened, 170 on a worked example, 70 on a figure. Depth lives in the hidden card bodies, which is what the click to open mechanism is for. All 245 slides pass.

**One case per worked example.** A worked example carries one patient or one calculation. Two patients means two slides.

**Starting values are a list, not a paragraph.** Worked examples now open with each value in its own labeled box rather than a run-on sentence of data.

**American spelling.** 197 British spellings were converted across the decks, the patient file, the compliance documents and the instructor guide. Not memorize, hemoglobin not hemoglobin, edema not edema, liter not liter, labeled not labeled.

**No accent bars.** The lab annotation had a four pixel gold edge. It is now a plain one pixel border. The same bar is gone from the patient file's note block.

**Acidic and alkaline** on the pH scale, not acidemia and alkalemia.

## Competencies

I followed `bio005-competencies.csv`, the 268 row set. Every one of the 20 Week 1 and 20 Week 2 competencies is taught, and every slide that teaches one carries a line linking into `competency-study-guide.html` at the right anchor. 216 of the 245 slides carry one.

Lab competencies are taught in the lecture decks, each with an annotation reading "You will do this in lab" that says what the student will do and how the slide connects. They print.

## How to change a deck

```
cd _deck-source
node build-decks.js     # rebuild
node density.js         # every deck must report 0 over ceiling
node lint.js            # every deck must report clean
node fix-spelling.js content/<file>.js    # converts British spellings
```

`content/<deck-id>.js` holds the slides as small objects. `engine/` holds the CSS and JS lifted from your Introduction deck, so all six decks behave identically. To add a deck, drop a file in `content/` and rebuild.

## Three things in your repo that these decks surfaced

Not fixed by me, because they are your files and two are content decisions.

1. **`clinical-physiology-lab-manual.html`, the Week 2 theme.** It reads "Almost nothing in physiology is about how much of something there is. It is about how fast it is being made and used." You told me that is not true, and you were right. Amounts, reserves and capacities are real, and organ failure is measured as loss of reserve. The deck now teaches four kinds of number: amount, concentration, rate and reserve. The manual still carries the original line.
2. **`workbook_week02_membranes-transport.html`, Part 3 Q4.** Eight teaspoons of sugar is given as "about 400 mM glucose" with hypertonic as the expected answer. Eight level teaspoons is about 32 g per liter, roughly 94 mM, about 250 mOsm/L once sucrase splits it, which is mildly hypotonic. The drink fails for want of sodium.
3. **`src/weeks/parts/w1-f-curve.js` line 167, duplicated at `src/weeks/week01.js` line 1888.** "It cannot tell you whether the oxygen pressure is 80 or 130." On your curve, 130 gives about 99 percent.

Also unresolved: `workbook_week03_membrane-potential.html` is titled Week 3, but the competency file puts membrane potential in Week 2 and makes Week 3 Cell Signaling. The decks call it "the membrane potential lab packet" with no week number so the pointer is right either way.

## Verification

Every deck, by automated test:

- Zero external requests. Fonts inlined.
- Zero contrast failures at AA and at AAA, measured in three card states: at rest, marked opened, and open. Lowest ratio 7.78:1.
- No horizontal scrolling at 320, 375, 768, 1024 or 1440 pixels.
- No skipped heading level. No control without an accessible name.
- Present mode, the zoom dialog, its focus trap and its focus restoration confirmed on all five.
- In print, zero card bodies stay hidden, so a printed deck is complete.
- 19 figures, each with `role="img"`, a resolving `aria-labelledby`, a title, a description carrying the landmark values, and no text under 13 pixels.

Two contrast defects were found and fixed. One affects your existing Introduction deck: the gold card label `#6B5214` measures 7.39:1 on a white card and drops to 6.50:1 once a card takes the opened state. A single pass sweep never sees it. A third defect appeared during the rewrite: a white card placed on a dark slide inherited light text and measured 1.3:1. That was an engine gap, now fixed for every deck.

The physiology was fact checked line by line, every worked example recomputed by hand and every figure traced against the prose. Seventeen errors were found and corrected.

Dr. Sharilyn Rennie
