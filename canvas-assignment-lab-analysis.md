# Canvas assignment: Weekly lab analysis

BIO 005 Human Physiology, Yuba College, Fall 2026. One assignment shell, copied
fifteen times. The only thing that changes between copies is the week number in
two places: the title and the `?week=` on the iframe.

---

## Assignment settings

| Field | Value |
|---|---|
| Name | `Week 1 · Weekly lab analysis` |
| Points | 10 |
| Assignment group | Lab (15% of the course grade) |
| Display grade as | Points |
| Submission type | Online → **File uploads** only |
| Allowed extensions | `jpg,jpeg,png,pdf,heic` |
| Attempts | Unlimited (they will re-photograph; let them) |
| Due | Sunday of that week, **10:00 pm** |
| Available from | Monday of that week, 12:00 am |
| Until | Monday after, 10:00 pm (the 24-hour late window closes here) |
| Peer reviews | Off |
| Anonymous grading | Off (you need to see whose handwriting it is) |

Attach `weekly-lab-analysis-sheet.pdf` to the assignment so the blank form is one
click away even if the site is down.

Late policy to set once in the gradebook, not per assignment: 50% deduction,
applied after the due date, capped at one day. After 24 hours it is a zero.

---

## Description, paste into the RCE

Switch the RCE to HTML view (`</>` bottom right) and paste this. Change `week=1`
to the week you are building.

```html
<p><iframe title="Weekly lab analysis instructions"
  src="https://drsrennie-stack.github.io/human-physiology-Fa26/assignment-physioex.html?week=1"
  width="100%" height="2600"
  style="width:100%;height:2600px;border:0"
  allowfullscreen></iframe></p>
<p><strong>If the box above does not load,</strong>
  <a href="https://drsrennie-stack.github.io/human-physiology-Fa26/assignment-physioex.html?week=1"
     target="_blank" rel="noopener">open the instructions in a new tab</a>.
  The blank sheet is attached to this assignment as a PDF.</p>
```

The fallback link is not optional. Canvas iframes fail for students on locked-down
school networks and in the Canvas mobile app, and a student who sees an empty gray
box does not email you, they just skip the assignment.

The instructions page already handles the three weeks with no PhysioEx on its own,
so you do not write a different description for those. See below.

---

## The three weeks with no PhysioEx

PhysioEx 10.0 has no exercise for these, per `physioex-lab-map-fall2026.md`:

| Week | Topic | Why there is no PhysioEx | What the lab is instead |
|---|---|---|---|
| 1 | Foundations | No homeostasis or graphing exercise | Week 1 fluid homeostasis workbook (`workbook_week01_fluid-homeostasis.html`, exists) |
| 5 | Synapses and central integration | Exercise 3, split with week 4 not set | **Lab not chosen yet** |
| 8 | Reproduction | No reproduction exercise | Hormone cycle graph worksheet (**not built yet**) |

`assignment-physioex.html` reads the week from the URL and, on 1, 5 and 8, swaps
in a "Different lab this week" panel naming the actual lab, and rewrites step 02
so it stops telling students to read a simulation setup screen. Same file, same
iframe, no separate Canvas assignment.

The sheet itself does not change in those weeks. Same six blocks, same deadline.

Two of those three labs still have to be built. Weeks 5 and 8 are the open items.

---

## What you are grading

Ten points, weighted toward the thinking, not the numbers:

| | Points | What earns it |
|---|---|---|
| Blocks 1 and 2 filled in | 2 | Every activity listed, and a prediction that was written before the run |
| Block 3, what they have in common | 2 | Names the thing the body was controlling, not just "they were all labs" |
| Block 4, what surprised them | 2 | An actual assumption identified, or an honest "nothing did, and here is why" |
| Block 5, the causal chain | 2 | Arrows connect, at least two activities used, no gaps a reader has to fill in |
| Block 6, what they know now | 2 | Their own words, about mechanism |

A right answer with no reasoning scores lower than a wrong answer with a chain you
can follow. Say that in the first week's feedback and they will believe you by the
third.

---

## Building the other fourteen

In Canvas: open the Week 1 assignment → the three dots → **Duplicate** → rename the
copy → change `week=1` to `week=2` in both places in the HTML → set the new due
date. About ninety seconds each.

Do not duplicate the HTML file in the repo. There is one, and it serves all fifteen.
