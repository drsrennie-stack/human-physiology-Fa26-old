# Mastery OS recall audit, September 2026

Scope: the question bank behind Mastery Physio OS (4,980 cards, 268 competencies,
34 topics), the level progression, and the shape of the study tool students use.

Three questions were asked: why are there anatomy questions in a physiology
course, does the tool actually run on spaced recall, and does it actually get
harder as a student uses it.

---

## 1. Anatomy questions in the bank

### What was found

The bank is not contaminated with anatomy at the scale you might have feared.
Two automated sweeps ran over all 4,980 cards. The first looked for questions
that ask only where something is or what something is called, with no functional
language anywhere in the question or the keyed answer. The second looked for
anatomy vocabulary that has no physiological job: cranial nerve numbers, gyri,
tract itineraries, surface landmarks, histological layer names, bones.

176 cards came back from the first sweep and 118 from the second. Reading
through them, most were false positives and genuinely physiological. Location is
often the physiology: where the SGLT sits on an epithelial cell decides whether
glucose can be absorbed, where a chemoreceptor sits decides what it can sense.

**38 cards were true strict anatomy.** They asked a student to name or place a
structure and stopped there. They cluster in two places:

| Where | How many | What they were |
|---|---|---|
| Week 5, the senses and motor control | 15 | Cranial nerve numbers, primary visual cortex location, crista ampullaris location, cribriform plate, internal capsule limbs, cerebral peduncle, precentral and postcentral gyrus, tract itineraries |
| Week 9, the heart | 6 | The four auscultation areas and the point of maximal impulse, given as intercostal spaces and sternal borders only, plus AV node location |
| Scattered | 7 | Right lymphatic duct territory, pontine group location, stratum functionalis, pudendal nerve, glossopharyngeal baroreceptor afferent, dorsal and ventral horn cell body locations, sympathetic and parasympathetic ganglion locations |
| Cell level anatomy with no function attached | 10 | Glycolysis in the cytosol, transmitter in vesicles, Na+ channel density at the hillock and nodes, IP3 store, steroid receptor location, gap junctions, Na+/K+ ATPase membrane side |

### What was changed

Nothing was deleted. All 38 were rewritten so the question turns on what the
structure or its position lets the body do. The structure name stays, either in
the keyed answer or in the explanation, so the vocabulary a student still needs
is not lost. Card ids, DOK levels, tags and competency ids are unchanged, so the
level gate, the spacing history and the competency map all still line up, and
coverage is still 268 of 268 competencies.

Examples of the shape of the change:

- Was: "Where is the primary visual cortex located?"
  Now: "The primary visual cortex is laid out as a map of the visual field. What
  follows from that arrangement when a small area of it is damaged?"

- Was: "Which cranial nerve carries auditory information from the cochlea to the
  brainstem?"
  Now: "Cochlear hair cells have no axon of their own. How does a sound signal
  get from a hair cell to the brainstem?" The keyed answer still names CN VIII.

- Was: "Where is the mitral auscultation area located?"
  Now: "Mitral sounds are loudest at the fifth intercostal space in the left
  midclavicular line, the same place the apical impulse is felt. What does that
  tell you about where the left ventricle sits?"

- Was: "Where is the Na+/K+ ATPase found in a polarized absorptive epithelial
  cell?"
  Now: "Why must the Na+/K+ ATPase sit only on the basolateral membrane, and
  never on the apical side facing the lumen?"

Cell level anatomy was kept throughout, on your instruction, but only where the
question turns on function. Compartments, membrane sidedness, channel density
and organelle stores are all doing real physiological work in their rewritten
form.

Every rewritten card carries a full teaching explanation: why the keyed answer is
right, and why each distractor is wrong, including what concept the distractor
represents and when it would be the right answer.

The script that made the change is `tools/fuse_anatomy_cards.py`. It is
idempotent and it lists exactly which card it touched, so you can read the
diff or reverse any single one.

### The heart sound cards, resolved

Answered 6 September: those cards are carried by the Stanford Medicine 25
bedside skills thread, which the course already runs as Clinical Correlations.
They stay where they are, tagged `lab` and `application` against
`w11-lab-heart-sounds`. In their rewritten form each one asks why the sound
projects to that spot rather than asking a student to memorize an intercostal
space, which is the same move the Clinical Correlation questions make: the
maneuver is the entry ticket and the physiology is the answer. Nothing further
to do here.

---

## 2. Spaced recall: it was there, but it was not working

The engine underneath was sound. Leitner boxes, in days, with a card answered
right moving out one box and a card missed dropping back to the start,
and "holding" means box 2 or better, which can only be reached by being right on
two separate days, so a lucky guess cannot fake it. A per competency gate opens
level 2 once three level 1 cards are holding, and level 3 the same way off
level 2. All of that is good design and it tests correctly in isolation.

**The set builder defeated it.** Every sitting was filled by taking one card from
each competency, newest week first. New material arrives faster than any single
competency can be driven to its threshold, so cards that had been answered once
were never brought back, and the gate never opened.

Simulated over the full 15 week term, a student doing 15 cards a day, five days
a week, was served **100 percent level 1 cards in every single week**, and
level 2 opened on 3 competencies out of 268. The difficulty never rose. That is
the behavior you noticed.

### The fix

Reviews come first, which is what makes spacing mean anything. A set of 15 is now:

- up to 10 cards that are **due for review**, most overdue first,
- plus 5 cards the student has **never seen**,
- and those 5 new slots are split, half to a level that has just opened on
  something already proved, half to material from the week being taught now.

That split matters. Two other orderings were tested and both failed. Putting the
current week ahead of newly unlocked depth starved the progression: level 1 rose
from 72 percent to 94 percent of cards over the term, going backwards. Putting
depth entirely ahead of new material covered the current week too slowly. The
half and half split keeps both jobs alive.

### What it does now

Same simulated student, same accuracy (80 percent on level 1, 70 on level 2, 60
on level 3), 15 cards a day, five days a week, 15 weeks:

| | First three weeks | Last three weeks |
|---|---|---|
| Level 1 recall | 70 to 76 percent | 45 to 55 percent |
| Level 2 and 3 | 24 to 30 percent | 45 to 55 percent |

Level 3 analyze cards start appearing around week 2 and hold at roughly 8 to
16 percent of the mix from there. Run it yourself with
`node tools/sim_difficulty.js`. It reports the level mix week by week. Those
figures are on the lengthened spacing ladder described in section 3.

### A capacity fact you should know

At 15 cards a day, five days a week, a student answers about 1,125 cards over the
term. The bank holds 4,980. That is why this default is called Keep up rather
than anything stronger: it holds on to what a student has learned and keeps them
current with the week being taught, and it does not cover the course.

What coverage would take is worked out in the next section, and it is now a goal
a student can choose in the tool.

---

## 3. Coverage: what it costs, and what a term will not buy

The recall tool was described in the first pass as a sampling instrument rather
than a coverage instrument. That was true but not useful on its own, so this
section works out what coverage would actually take, and the tool now offers it
as a goal a student can choose.

### What coverage has to mean

Not every card in the bank. There are 4,980 cards across 268 competencies,
about eighteen per competency, and the spares exist so there is a fresh question
waiting when a student misses one. Nobody needs the twelfth recall card on a
competency they have already proved three ways.

Coverage is defined as: **three cards holding at every level a competency has
cards for.** Holding means box 2 or better, which can only be reached by being
right on two separate days. Three is the same threshold the level gate already
uses, so covering a competency and opening its hardest questions are one act.
Every one of the 268 competencies has at least three cards at all three levels,
so the target is well formed everywhere.

That makes full coverage 2,412 cards holding, not 4,980.

### What it costs, measured

`tools/sim_coverage.js` runs the whole 15 week term against the real bank, with
a student who is right 80 percent of the time at level 1, 70 at level 2 and 60
at level 3. Each figure below is the average of three simulated terms. Minutes
come from a word count measured off the bank itself (103 words at level 1, 121
at level 2, 153 at level 3, counting question, options and explanation) costed
at 200 words a minute plus a thinking pause.

**Level 1 on every competency (804 cards holding):**

| Days a week | Daily cap | Competencies covered | Cards actually done | Minutes |
|---|---|---|---|---|
| 5 | 130 | 93 percent | 77 | 32 |
| 6 | 90 | 90 percent | 64 | 26 |
| 7 | 90 | 91 percent | 58 | 24 |

**Levels 1 and 2 on every competency (1,608 cards holding):**

| Days a week | Daily cap | Competencies covered | Cards actually done | Minutes |
|---|---|---|---|---|
| 5 | 180 | 30 percent | 135 | 66 |
| 6 | 180 | 50 percent | 131 | 64 |
| 7 | 180 | 70 percent | 126 | 62 |

**All three levels on every competency:** 10 percent at best, at any workload
tested. Not reachable in one term.

### Three findings worth acting on

**1. Days a week is the lever, not session length.** A card cannot move forward
more than once a day, because holding requires being right on two separate days.
So sixty cards on each of seven days beats four hundred cards on two days, by a
lot. On the levels 1 and 2 target, going from five days to seven more than
doubles what gets covered at the same daily volume. This is now the line the
page repeats to students.

**2. The tool saturates.** At seven days a week, raising the daily cap above
about 90 changes nothing for level 1 coverage. Past that point there is nothing
left that is due and nothing new that is worth starting. That is a good thing to
be able to tell a student who is anxious and wants to grind: past about sixty
cards there is nothing more the tool can give you today.

**3. The last weeks cannot finish.** At level 1 coverage, weeks 1 through 11 of
material finish within about one to four weeks of being taught. Weeks 12 to 15
do not finish before the term ends, because the ladder needs days that do not
exist yet. The third midterm covers weeks 11 to 15, so for that stretch the note
sheets and the teach-back work are carrying the load, not the cards. That is
worth saying to students out loud rather than letting them discover it.

### A change that came out of this: the spacing ladder is longer

The old ladder was 0, 1, 3, 7, 16, 35 days. Maintenance under that ladder ate
almost the whole daily budget: a student with 1,400 cards holding was spending
most of every session re-answering cards they already knew, and there was never
room to reach the rest of the course.

The ladder is now **0, 1, 4, 12, 30, 75 days**. The top interval still returns a
card inside a 15 week term, so nothing is parked past the final. In simulation
this alone moved level 1 and 2 coverage from 144 competencies to 205 at the same
workload. No student progress is affected, since box numbers are unchanged and
nobody has used the tool yet.

### What the page now does about it

A goal chooser sits at the top:

- **Keep up.** 15 cards, about 8 minutes, five days a week. The default.
- **Cover the course.** Around 60 cards, about 25 minutes, seven days a week.
  The set is built to the coverage rules and sizes itself from what is actually
  due and what has not been met yet, so it varies day to day.

Under it, a coverage meter: competencies covered out of 268, plus how many are
proved at recall, apply and analyze. And a collapsible panel written for
students that explains the levels, what covered means, the three workloads with
their real minute costs, why days beat length, and what the tool cannot do for
them.

The set builder in coverage mode follows three rules, all of which came out of
the simulation failing without them:

1. Due reviews are taken strictly by how overdue they are, not rotated across
   competencies. Rotation caps a competency at one review a day, and a
   competency needs nine cards holding, so rotation alone made coverage
   unreachable.
2. No more cards are started for a competency and level than it is short of.
   Without that cap one day starts every card a competency owns, the review load
   balloons, and nothing climbs.
3. Oldest unfinished material first, with a floor kept for the week being taught
   now.

### The structural answer to the question students will ask

They do not have to do anything different, and they should not try to. There is
no chapter menu, on purpose. Earlier weeks come back automatically, because due
reviews are pulled oldest first from every week of the course and new cards are
drawn from the oldest unfinished material once the current week has had its
share. The only thing a student has to change to reach coverage is how many days
a week they show up.

---

## 4. The dashboard came out

The old Mastery Physio OS carried a Mastery Dashboard, a Competency Map, a
Weakness Dashboard, a Recall view, a Self Tutoring Workflow, an Evidence of
Mastery panel, a Learning Skills Dashboard, an AI Mastery Coach, a Study Together
panel, a quiz race, an escape room and a Team Based Learning checkpoint flow. The
standalone build is 725 KB of page before the 5 MB card bank loads.

Two of those are worth flagging on their own: the TBL checkpoint flow does not
belong in BIO 005 at all, since the course is fully asynchronous with no team
component, and the Loops module is still an empty anatomy placeholder waiting for
a physiology replacement to be chosen.

The replacement is `spaced-recall.html`. It does three things:

1. **This week.** Week number, cards ready today, days practiced this week, cards
   answered this week, cards holding. One line telling the student whether their
   practice pattern is working.
2. **Practice.** One card at a time. Topic, level and position in the set. Answer
   options stacked vertically, never in columns. Confidence is asked before the
   explanation is shown, and answering right while saying you were guessing holds
   the card at box 1 so it has to be earned again. After the answer, the student
   is told when the card comes back and why, and is told by name when a level
   opens.
3. **What you did this week.** A seven day strip, Monday to Sunday, with cards
   answered each day and today marked. Then a table of the topics touched this
   week, cards answered in each, first try accuracy, and the level currently open
   in that topic.

No dashboards, no games, no coach, no team flow. It reads and writes the same
localStorage keys as the old recall engine (`bio005-recall-progress`,
`bio005-recall-v2`), so any student who already used the OS keeps their history,
and anything else on the site that reads the card history keeps working.

Tests: `node tools/test_spaced_recall.js` drives the real page in a headless
browser against the real 5 MB bank and checks 17 behaviors, including that a
fresh student is never served an analyze card, that level 3 stays shut until
level 2 is proved, and that losing the level 2 hold closes level 3 again.

---

## Files changed

| File | What happened |
|---|---|
| `cards/*.json` (21 of 36) | 38 cards rewritten. Nine other lines had British spellings (colour, metres, litres, fibre, centre) changed to US. Total diff is 302 lines, so it is readable in the GitHub UI. |
| `os/bio005-card-bank.js` | Regenerated from the sources |
| `os/card-competency-map.js` | Regenerated |
| `spaced-recall.html` | New. The simplified tool |
| `spaced-recall-page.compliance.md` | New. Accessibility compliance notes for the page. The existing `spaced-recall.compliance.md`, which covers the card bank and the old Recall view, is untouched |
| `tools/fuse_anatomy_cards.py` | New. The card rewrite, readable and reversible |
| `tools/test_spaced_recall.js` | New. Browser tests for the page |
| `tools/sim_difficulty.js` | New. The 15 week difficulty simulation |
| `tools/sim_coverage.js` | New. The coverage cost simulation behind section 3 |
| `os/draw-checklists.js`, `competency-recall.html`, `mastery-physio-os-standalone.html` | Removed a banned phrase from a header comment and an eyebrow line |

---

## What I did not do, and why

- **The old OS is still in the repo and still linked.** 55 pages link to
  `mastery-physio-os.html` and 48 to `mastery-physio-os-standalone.html`. Point
  those at `spaced-recall.html` when you are ready, or tell me and I will do the
  link sweep as one pass. Nothing was pointed at the new page yet, so nothing is
  broken while you decide.
- **`mastery-physio-os.html` at the repo root is broken independently of any of
  this.** It loads `card-competency-map.js` and `mastery-evidence.js` as siblings
  and `../bio005-competencies.js` as a parent, but those paths only resolve from
  inside `os/`. The root copy 404s on every one of them. The working copies are
  `os/mastery-physio-os.html` and `mastery-physio-os-standalone.html`.
- **Nothing was deleted from the repo.** You upload through the GitHub web
  interface, which overwrites but cannot delete, so removals have to be done by
  hand and are yours to decide.

Reviewer: Dr. Sharilyn Rennie
Date: 6 September 2026
