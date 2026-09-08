# Canvas iframe snippets, BIO 005

Every page below is already iframe ready: each one sends its height to the
parent, and every internal link carries `target="_top"` so a student never ends
up with the course loaded inside the course.

**How to paste one.** In the Canvas rich content editor, click `</>` at the
bottom right to switch to HTML view, paste, then switch back and save.

**Always keep the fallback link.** Canvas iframes fail on locked-down school
networks and inside the Canvas mobile app. A student who sees an empty gray box
does not email you, they just skip the work.

Base URL for everything: `https://drsrennie-stack.github.io/human-physiology-Fa26/`

---

## 1. The four weekly assignments, one file each, all fifteen weeks

Change `week=1` to the week you are building. Nothing else changes, and there is
only ever one copy of each file in the repo.

| Assignment | File | Height |
|---|---|---|
| Note sheet | `assignment-notesheet.html` | 2800 |
| Weekly lab analysis | `assignment-physioex.html` | 2600 |
| Book problems | `assignment-bookproblems.html` | 2200 |
| Discussion | `assignment-discussion.html` | 2200 |

```html
<p><iframe title="Weekly lab analysis instructions"
  src="https://drsrennie-stack.github.io/human-physiology-Fa26/assignment-physioex.html?week=1"
  width="100%" height="2600"
  style="width:100%;height:2600px;border:0"
  allowfullscreen></iframe></p>
<p><strong>If the box above does not load,</strong>
  <a href="https://drsrennie-stack.github.io/human-physiology-Fa26/assignment-physioex.html?week=1"
     target="_blank" rel="noopener">open the instructions in a new tab</a>.</p>
```

---

## 2. The printable sheets

These are the pages students print and fill in by hand. Attach the PDF to the
Canvas assignment as well, so the blank form survives the site being down.

| Sheet | File | Height | Pages |
|---|---|---|---|
| Weekly lab analysis sheet, all 15 weeks | `lab-report-form.html` | 1400 | 1 |
| Week 8 hormone cycle lab | `lab-week08-hormone-cycle.html` | 2600 | 2 |

```html
<p><strong>If the box above does not load,</strong>
     target="_blank" rel="noopener">open the lab in a new tab</a>.
  The printable PDF is attached to this assignment.</p>
```

**Week 5 only:** the assignment description must say, in the Canvas text and not
only inside the iframe, that page 3 has to print at 100 percent with "fit to
page" turned off. The charts are useless at any other scale, and there is a
calibration bar on the page to check it with.

---

## 3. The hub and the reference pages

| Page | File | Height |
|---|---|---|
| Course tools hub | `course-materials.html` | 4200 |
| Syllabus | `syllabus-fall2026.html` | 6000 |
| Schedule | `course-schedule.html` | 3600 |
| Week 1 brain dump packet | `braindump-week01.html` | 4000 |
| Competency list | `competency-study-guide.html` | 5000 |

Same pattern. The hub is the one page worth putting on the Canvas home page,
because everything else hangs off it.

---

## 4. The three weeks with no PhysioEx

PhysioEx 10.0 has no exercise for Weeks 1, 5 and 8. You do not build a different
Canvas assignment for those weeks. `assignment-physioex.html` reads the week from
the URL and, on those three, swaps in a panel naming the real lab and links
straight to it, and rewrites the step that tells students to read a simulation
setup screen.

| Week | Why | The lab |
|---|---|---|
| 1 | No homeostasis or graphing exercise | `workbook_week01_fluid-homeostasis.html` |
| 8 | No reproduction exercise | `lab-week08-hormone-cycle.html` |

---

## 5. Heights

The numbers above are the starting height for the box before the page's own
height sender takes over. If a page ever renders with an inner scrollbar in
Canvas, the fix is to raise that number, not to change the page.
