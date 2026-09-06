# What to keep, what to convert, what to retire

BIO 004 Human Anatomy to BIO 005 Human Physiology. Aug 17 2026.

Recommendations, with the counts they are based on. The anatomy repo holds 531 HTML pages and about 6 MB of teaching data. Not all of it should follow you across, and some of what should is not obvious.

---

## The short version

| Asset | Recommendation | Why |
|---|---|---|
| Mastery OS | **Convert.** Done. | The architecture is the course. Physiology needs it more than anatomy did. |
| Drawing checks, 69 with checklists | **Convert. Highest priority.** | The single best fit for physiology. Your format is better than what I generated. |
| Spaced recall cards, 4,674 | **Keep as anatomy review.** Done. | Do not convert. Write physiology cards fresh. |
| DOK 3 explain-why bank, 301 items | **Convert the format, rewrite the content.** | Already physiology-shaped reasoning. Closest thing you have. |
| Practice exam bank, 523 questions | **Convert the architecture, rewrite the content.** | The scaffolding is worth more than the questions. |
| Brain dumps, 28 pools | **Convert, and change the trigger.** | Works better online than it did in person. |
| Loops, lab ID videos | **Retire. Replace with something else.** | The format does not survive the move online. |
| Lab sprints, structure lists, Atlas | **Retire for physiology.** | Anatomy identification. Nothing to convert. |
| Study With Me, Scholar Points | **Convert. Low effort.** | Policy, not content. Mostly a find and replace. |

---

## 1. Drawing checks. Convert first.

**What exists:** 69 drawings in `draw-checklists.js`, and the schema is the good part:

```
id, code, week, module, packet, worksheet, firstTaught,
name, brainDump, standard, youKnowItWhen, comps, items
```

`brainDump` is the two-minute prompt. `standard` is what a correct drawing shows. `youKnowItWhen` is the bar. `items` is the checklist. `comps` links it to competencies.

**Recommendation: this is the highest-value thing to convert, and it should be done by hand.**

Two reasons. First, physiology *is* drawing. A feedback loop, a pressure curve, a nephron with the transporters marked, an oxyhemoglobin curve with its shifts. These are the mechanisms, and a student who can draw them can do the course. Anatomy drawings prove you have seen something; physiology drawings prove you understand how it works. The tool fits the subject better here than it did there.

Second, and this is my error to flag: I auto-generated 128 physiology drawing checklists by splitting competency statements on commas. They are structurally valid and pedagogically thin. They have no `standard`, no `youKnowItWhen`, no real checklist. Next to your 69 they are obviously machine-made.

**Suggested scope:** about 40 drawings, not 128. One per week for the core mechanism, plus the handful that carry a whole unit. Written properly, with your four fields. Candidates, in the order they appear in the term:

negative feedback loop · osmosis and tonicity with a cell in three solutions · the action potential with the channel states marked · the neuromuscular junction · the crossbridge cycle · length-tension curve · the reflex arc · a hormone axis with both feedback loops · pressure curves of the cardiac cycle with the valve events · the pressure-volume loop · Starling forces at a capillary · the baroreceptor reflex · lung volumes on a spirogram · the oxyhemoglobin curve with its shifts · the nephron with what moves where · the countercurrent multiplier · RAAS · acid-base compensation on a pH and bicarbonate plot · the absorptive and postabsorptive states

That is 19. Doubling it covers the term with room for the ones you know students always miss.

---

## 2. Spaced recall cards. Keep anatomy, write physiology fresh.

**What exists:** 4,674 cards in `bio004-card-bank.js`, across 18 areas.

**Recommendation: keep them exactly as they are, for anatomy review, and do not try to convert any of them.**

Built as `anatomy-review.html` in this repo. It carries the whole bank, has its own spacing engine and its own storage keys, and is clearly labeled optional and not graded.

**The part that matters:** answering an anatomy card must never move a physiology mastery bar. A student reviewing the brachial plexus has not learned anything about glomerular filtration, and an app that says otherwise is lying to them at the exact moment they are trusting it to tell them what to study. That is why the deck has its own engine rather than a mode flag on the physiology one. Two engines and two keys cannot cross. One engine with a flag is one bug away from it. Verified: with physiology progress seeded, working the anatomy deck leaves every physiology key untouched.

**Why not convert them:** anatomy cards ask what and where. Physiology asks what happens next and why. A converted card is a bad physiology card wearing a physiology label, and it will teach students that this course rewards recall. It does not.

**Why students will want the anatomy deck anyway:** physiology assumes the anatomy. In week 10 a student who is shaky on the chambers and valves is going to struggle with the cardiac cycle, and the honest thing is to have the fix right there rather than making them go and find it.

**What replaces it:** cards written against the 268 physiology competencies, at the level the course actually asks. That is the largest remaining build item and it is item H in `PLACEHOLDERS.md`.

---

## 3. DOK 3 explain-why bank. Convert the format.

**What exists:** 301 items in `dok3-explain-why.js`. Format is `{ dok:3, q, a, options[4], correctIndex, explanation }`. Sample: *"A tissue must stretch and recoil repeatedly, such as in the wall of a large artery. Which connective tissue fiber should dominate, and why?"*

**Recommendation: convert the format immediately, rewrite the content for physiology.**

This is the most physiology-like thing in the entire anatomy build. It is already structure to consequence reasoning: given a situation, predict, then justify. That is exactly the shape of a physiology exam question, and it is the shape of 160 of your 268 competencies.

Two changes when you rewrite. Make the prediction come first and the mechanism second, because that is the order a clinician thinks in. And use real numbers where you can. "Efferent arteriole constricts, what happens to GFR and why" is a better item than any wording of the same idea without the vessel named.

If you only convert one question bank, convert this one, not the exam bank.

---

## 4. Practice exam bank. Keep the architecture.

**What exists:** 523 questions in `practice-exam-bank.js`. 160 true/false, 319 multiple choice, 13 matching, 31 free response. Every item carries `stem, options, correctIndex, rationale, topic, dok, exam, src`.

**Recommendation: convert the architecture, rewrite every question.**

The scaffolding is worth more than the questions. `rationale` on every item, `dok` on every item, `src` pointing back to where it was first asked, questions pooled across exams so practice does not just replay one paper. That is a well-built bank and it should be rebuilt the same way for physiology.

The questions themselves do not transfer. Not one of the 523 is a physiology question.

**One structural note.** Your anatomy exams are two thirds recall by DOK. Physiology sits at DOK 3 by nature: 160 of the 268 competencies are predict or trace. If you rebuild the bank at anatomy's difficulty mix, students will pass practice and fail the exam. Build it at the mix the course actually asks and let the first exam confirm it.

---

## 5. Brain dumps. Convert, and change what triggers them.

**What exists:** 28 pools and 32 sessions in `bio004-braindump-data.js`. The rule: five minutes, blank paper, closed notes, phone away, retrieving the previous class day.

**Recommendation: convert, and rethink the trigger for an online course.**

The mechanism is excellent and it is cheap. Blind retrieval on paper, graded on honest effort, is the best predictor you have of how an exam will go, and it costs a student five minutes.

In BIO 004 the trigger is a class day. There are no class days here. Two options:

- **Weekly, at the Prime step.** Before opening anything on Monday, dump what you remember from last week. Ties naturally to the week container and to spaced recall.
- **Self-triggered, inside the study app.** The OS asks for one when it detects a week has gone by without retrieval on an area.

I would take the first. It is predictable, it is one habit, and it does not depend on the app noticing anything. The second is a nice addition later, not the foundation.

Keep "graded on honest effort, not accuracy." That is what makes students actually attempt it.

---

## 6. Loops. Retire the format, keep the slot.

**What exists:** an index and station names, pointing at short lab identification walkthroughs shot over cadaver and slide material.

**Recommendation: retire it and put something else in the slot. The slot is worth keeping.**

Loops answers "I am looking at a real specimen and I cannot name what I am seeing." Physiology students do not have that problem, because there is no specimen. Converting the format means making videos of someone naming parts of a diagram, which is worse than the diagram.

**What the slot is actually for:** the moment a student is stuck on a mechanism and rereading is not working. Three candidates:

- **Two-minute mechanism walkthroughs.** You draw one mechanism, talking, in real time. Same length as a Loop, same "watch it once between study blocks" use. Pairs directly with the drawing checks: they watch you draw it, then they draw it.
- **Worked problems.** Screen recording of you working a GFR calculation or reading an ABG out loud, including the part where you decide what to do first. Students almost never see the deciding.
- **"Why is this wrong."** Take the most common wrong answer on a hard item and spend two minutes on why it is appealing and where it breaks.

The third is the most valuable and the least common in any course. Wrong answers are where the learning is, and almost nobody records them.

Whatever you pick, keep the shape in `os/loops-index.js` and the OS and the per-competency buttons pick it up with no other change.

---

## 7. Lab sprints, structure lists, the Atlas. Retire for physiology.

These are anatomy identification: find the structure on the specimen, name the structure on the slide, explore the model. There is no physiology equivalent because physiology does not ask you to find things.

They stay in the anatomy repo where they belong, and the anatomy review deck is the door back to that material for anyone who wants it.

**What takes their place in the week:** the lab in this course is reading real output. Spirometry traces, ECG strips, blood pressure and orthostatic data, urinalysis, ABG values, a glucose tolerance curve. 132 of the 268 competencies are already written that way and tagged Lab. That is a genuinely different lab, and the delivery decision in `PLACEHOLDERS.md` item 3 has to be able to serve it.

---

## 8. Study With Me, Scholar Points, the dock, Hootie

**Convert, low effort, high return.** These are policy and plumbing, not content. Scholar Points in particular works better online, where a student has fewer natural reasons to talk to anyone. The weekly caps you built are the thoughtful part and they carry over unchanged.

The dock and Hootie are converted already.

---

## What I would do in the time before Sept 8

If you get three things done, these three:

1. **Write 40 drawing checks properly.** Highest value per hour of your time. The auto-generated ones are a placeholder and should not ship as they are.
2. **Convert the DOK 3 format and write 60 to 80 physiology items.** Enough for one per competency on the core mechanisms. This is what the Recall view can run on before the full card bank exists.
3. **Decide the lab.** It blocks all 15 weeks and it constrains 132 competencies.

The full card bank is the biggest item and it is also the one that can arrive in week 3 without breaking anything, because competency-level recall covers the gap.
