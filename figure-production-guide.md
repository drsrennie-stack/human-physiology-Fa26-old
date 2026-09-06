# BIO 005 figure production guide

Human Physiology, Yuba College, Fall 2026
How to make the images for the notes pages and the matching slides.

---

## 1. The rule that decides everything

Before you generate anything, run one test on the figure you have in mind:

> **If you deleted every word from this figure, would the picture still teach something?**

That single question sorts every figure in the course into one of three kinds, and the kind decides how it gets made.

| Kind | What it is | How it gets made |
|---|---|---|
| **A. Generated art** | A structure you could recognize by its shape. A nephron, a sarcomere, an alveolus, a cell swelling in water, an enzyme holding a substrate. Delete the words and you still see something. | AI generates the picture with **no text in it at all**. Labels are added afterward as real text. |
| **B. Built in code** | Boxes, arrows, axes, equations, numbers, steps, tables, tracings. Delete the words and nothing is left. Feedback loops, graphs, mass balance, pH scales, membrane potential tracings. | Not generated. Built as HTML and SVG, the way `loop-switcher.html` is. |
| **C. Real image** | Micrographs, ECG strips, real spirometry traces, lab equipment photos. | Photographed or sourced. Never generated, because a generated micrograph is a fabricated specimen. |

Roughly half the figures in this course are Type B. That is not a problem to work around, it is the answer: those figures come out better, correct, accessible and editable when they are built rather than drawn.

**Type A is where the AI app earns its keep.** Everything in section 11 and 12 marked Type A has a full prompt written for it.

---

## 2. Never let the generator write the words

This is the one rule with no exceptions.

Image models do not spell. They produce text that looks like writing from across the room and turns into nonsense up close, and they attach it to the wrong structure. A blurred label on a decorative poster is a shrug. A blurred label on a nephron in a physiology course is a student learning the wrong thing, and it is an accessibility failure on top, because a screen reader cannot read a picture of a word.

So the workflow is two stages, always:

1. **Generate the art with zero text.** Empty white margins where the labels will go.
2. **Add the labels as real text** using `label-kit.html`.

What that buys you:

- The spelling is yours. `glossopharyngeal` comes out `glossopharyngeal`.
- A wrong label is a one line fix, not a regenerated image.
- Screen readers read the labels. So does the browser find function, so does copy and paste.
- The labels scale on a projector without going soft.
- The same art can carry a short label set in the notes and a bigger label set on the slide.

### How to use the label kit

1. Save the generated art into `assets/figures/` as `fig-w01-16-enzyme-art.png`. The `-art` suffix means unlabeled.
2. Open `label-kit.html` in a browser and point `ART.src` at that file.
3. Click a structure in the picture. The readout under it gives you the coordinates and copies them.
4. Add a line to the `LABELS` array: coordinates, the words, and which direction the leader line runs.
5. Press **Copy figure block**. That is the finished `<figure>`, styles included, ready to paste into a notes page or a slide.

---

## 3. The house style block

Paste this at the **top of every Type A prompt**, unchanged, before the subject description. It is what makes 60 figures look like they came from one book instead of 60 different ones.

```
STYLE: Flat vector medical illustration, clean editorial textbook style.
Solid white background, pure #FFFFFF, edge to edge.
Outlines in dark navy #08101F, even weight, crisp, no sketchy or
hand-drawn strokes, no double lines.
Fill colors restricted to this palette only:
  pale blue gray #ECEFF4
  warm cream     #F7EFD9
  muted gold     #B8924A
  brick red      #7A2A22
  white          #FFFFFF
No other colors anywhere. No gradients, no drop shadows, no glow,
no texture, no paper grain, no vignette, no border frame.
Diagrammatic and simplified, not photorealistic, not 3D rendered,
not a microscope photograph.
Every structure fully closed by its own outline and clearly separated
from its neighbors, so a label can point at one thing and mean it.
Leave at least 15 percent of the canvas as empty white margin on all
four sides.
NO TEXT ANYWHERE. No letters, no numbers, no labels, no captions,
no legend, no watermark, no signature, no scale bar.
```

Two notes on the palette. Gold and brick red are **accent** colors: use them for the one or two structures the figure is actually about, not for everything. And if a figure genuinely needs a color convention the course already uses elsewhere, say so in the subject block rather than adding a color to the house style.

---

## 4. The negative prompt

If your app has a separate negative prompt field, put this in it. If it does not, append it to the prompt.

```
text, letters, words, numbers, labels, captions, legend, key,
handwriting, watermark, signature, logo, arrows with text,
photorealism, 3D render, glossy highlights, gradients, drop shadow,
neon, pastel wash, sketchy lines, cross hatching, paper texture,
cluttered background, decorative border, frame, multiple styles,
extra limbs, duplicate structures, anatomically implausible shapes
```

**If the app puts text in anyway,** and some will no matter what you tell them, try in this order: (1) regenerate with `NO TEXT ANYWHERE` moved to the very first line of the prompt, (2) ask for an "unlabeled anatomical plate, labels to be added by hand later", (3) generate it larger than you need and crop the text out, (4) treat it as a Type B figure and tell me, and I will build it.

---

## 5. File and size specifications

| Setting | Value |
|---|---|
| Aspect ratio | 16:10 for most figures. 1:1 for a single cell or molecule. 16:9 only for something that is genuinely wide, like a nephron. |
| Width | 2400 px minimum. Bigger is fine. Never smaller: it has to survive a projector. |
| Format | PNG. White background, not transparent, because the notes cards are white and the slides may not be. |
| Location | `assets/figures/` |
| Naming | `fig-w05-03-synapse-art.png` |

The name is `fig` + week + a two digit number in the order the figure appears that week + a short slug + `-art` for unlabeled generated art. Keep the `-art` original after you have labeled it. When a label turns out to be wrong you want the clean plate back.

---

## 6. Labeling rules

These are the same rules as the anatomy atlas, so the two courses feel like one hand made them.

- **The dot goes on the structure. The words go out in white space.** Never set the words on top of the body of the drawing.
- **The leader line runs from the structure out to the words**, and the words sit at the far end, the non-arrow end.
- Pick the side with empty space on it. That is what the 15 percent margin is for.
- Leader lines do not cross each other. If two of them cross, move a label, do not shorten the line.
- Every label is a **noun phrase in the exact wording the exam uses.** Not "the place where it binds". `Active site`.
- Sentence case, no ending period on a plain label.
- Cap it at about **eight labels per figure.** Past that, split the figure or make the extra detail a second version.

### Type size

The label kit handles this, but so you know what it is doing: labels are sized relative to the picture, so one setting works on a phone, a laptop and a projector. On a slide, bump `.ov-text` `font-size` from `2.2px` to `2.8px` and use no more than five labels.

---

## 7. Numbered steps

For any process figure, a transport cycle, a cascade, a reflex:

- Steps are **gold numbered discs placed on the art**, at the point where that step happens.
- Every disc has a **matching numbered sentence in real text below the figure.** The label kit builds this list for you from the same array, so the two can never drift apart.
- **The number never carries the meaning by itself.** A student who cannot see the picture reads the numbered sentences and still learns the process. That is a hard requirement, not a nicety.
- Number in the order things happen, not in the order they sit on the page.
- Each step sentence is one sentence, present tense, and says what happens and why it matters. "Three sodium ions bind to the pump on the inside face" beats "Na+ binding".
- Six steps is the practical ceiling.

---

## 8. Alt text and captions

Every figure ships with three pieces of writing. They do different jobs and none of them substitutes for another.

**Alt text** describes what the picture *is*, in one sentence, for a student who cannot see it. It does not repeat the labels, because the labels are already real text on the page.
> `alt="Cross section of a cell membrane showing two rows of phospholipids with proteins spanning them."`

**The label list and step list** carry the content. The label kit renders them under the figure automatically.

**The caption** says why the figure is here, in one or two sentences. It is teaching, not description.
> "The active site is a shape, not a hole. Anything that fits the shape can sit in it, which is why competitive inhibitors work."

Never write "Image of" or "Diagram showing" in alt text, and never leave alt empty on a content figure.

---

## 9. Making the slides match

The point of doing it this way is that the slide and the notes are the same object, not two objects that resemble each other.

1. Build the figure once with the label kit.
2. The notes page gets the figure block as is.
3. The slide gets the same block with three changes: `font-size` up to `2.8px`, no more than five labels, and the caption dropped, because you say the caption out loud.

Because the art and the labels are separate layers, a slide version never means regenerating the art. It means showing fewer labels over the same picture. When you correct a term in the notes, correct it in one place and re-copy the block to the slide.

---

## 10. Check before it goes in a page

- [ ] No text baked into the art anywhere, including the corners.
- [ ] Background is white, not off white, not transparent, not gray.
- [ ] Palette holds. No stray teal, purple or green.
- [ ] Nothing anatomically wrong: no extra structures, no impossible connections, nothing mirrored the wrong way.
- [ ] Every label points at the right structure, and the leader ends in white space.
- [ ] No leader lines cross.
- [ ] Every numbered disc has a matching numbered sentence.
- [ ] Alt text written, caption written.
- [ ] Terms match the wording in the competency and the exam.
- [ ] Opens correctly at phone width and at projector width.
- [ ] Filed as `assets/figures/fig-wNN-NN-slug-art.png` with the clean plate kept.

---

## 11. Week 1 figures

Twenty competencies this week. Seventeen of them want a figure. Seven are Type A, and those seven have prompts below. The rest are marked and I build them.

### Type B, do not generate. I build these.

| Figure | Competency | Why it is Type B |
|---|---|---|
| Homeostasis, steady state and equilibrium side by side | `w1-homeostasis` | The whole figure is three containers and the arrows between them. |
| **The feedback loop switcher** | `w1-feedback-components`, `w1-feedback-types` | Already built. `loop-switcher.html`. One loop, five sets of labels. |
| Negative against positive feedback, two tracings | `w1-feedback-types` | It is two line graphs. |
| Feedforward on a timeline | `w1-feedforward` | Timeline with a marked anticipation point. |
| Mass balance | `w1-mass-balance` | Boxes, arrows and an equation. |
| Body fluid compartments to scale | `w1-fluid-compartments` | The proportions are the content. Drawn art will get them wrong. |
| Anatomy of a graph | `w1-lab-graphing` | Axes and numbers. |
| Experimental design | `w1-lab-experimental-design` | Boxes. |
| The pH scale with a buffer pair | `w1-ph-buffers` | Numbers on a scale. |
| ATP coupling | `w1-atp-energy` | The coupling arrows are the point. The ATP molecule itself is Type A, see C5. |

### fig-w01-01 Levels of organization
**Type A.** Competency `w1-levels-function`. Notes section 1, opening slide.

```
[HOUSE STYLE BLOCK]

SUBJECT: Six objects in a single horizontal row, evenly spaced, each
one clearly a step larger in scale than the one to its left, with a
plain solid navy arrow pointing right between each pair.
Left to right:
  1. A small ball and stick molecule, six spheres joined by short rods.
  2. A single rounded cell with a visible nucleus and a few organelles.
  3. A small sheet of about nine identical cells packed together.
  4. A simplified stomach, a hollow curved organ shown in cutaway so
     the wall thickness is visible.
  5. A digestive tract as a connected chain: mouth, esophagus,
     stomach, small intestine, large intestine.
  6. A plain human body outline, standing, front view, no facial
     features, no clothing detail, no hair detail.
Everything at the same visual weight so no single step dominates.
Generous white space above and below the row for labels.
```

**Labels to add:** Molecule · Cell · Tissue · Organ · Organ system · Organism
**Alt:** `Six drawings in a row increasing in scale, from a molecule to a whole human body.`
**Caption:** Physiology asks what a thing does. That question has a different answer at every one of these six levels, and part of learning physiology is noticing which level a question is asking about.

### fig-w01-02 Structure fits function
**Type A.** Competency `w1-structure-function`. Notes section 2.

```
[HOUSE STYLE BLOCK]

SUBJECT: Three separate panels side by side, equal size, each showing
one structure in cross section, separated by thin vertical white gutters.
  Panel 1: A single alveolus, a rounded air sac, with one capillary
    pressed against its wall. The shared wall between air space and
    capillary is drawn strikingly thin. Two red biconcave discs sit
    inside the capillary.
  Panel 2: A single red blood cell shown twice, once face on as a
    disc with a pale dimple in the center, once edge on showing the
    biconcave dumbbell profile.
  Panel 3: A cross section of one intestinal lining cell with a dense
    brush of tall thin finger like projections along its top edge, and
    a plain smooth bottom edge for comparison.
Panels are visually parallel: same line weight, same scale of detail.
```

**Labels:** Alveolar air space · Capillary · Thin shared wall · Red blood cell, face on · Red blood cell, edge on · Microvilli · Cell base
**Alt:** `Three panels: an alveolus against a capillary, a red blood cell from two angles, and an intestinal cell with microvilli.`
**Caption:** Three structures, three different jobs, and in each case the shape is the reason the job works. Thin for fast diffusion, dished for surface area and flexibility, folded for absorbing surface.

### fig-w01-07 Local control against reflex control
**Type A.** Competency `w1-control-pathways`. Notes section 7.

```
[HOUSE STYLE BLOCK]

SUBJECT: Two panels side by side, equal size.
  Left panel: A close view of a small patch of tissue. One cell
    releases three small dots that drift to a neighboring cell a
    short distance away. Nothing else in the panel. Confined and local.
  Right panel: A plain human body outline, front view, no facial
    features. A long line runs from a point on the left forearm up to
    the brain, and a second long line runs from the brain down to a
    point on the chest. The two lines are drawn as smooth continuous
    paths, one navy and one brick red so they can be told apart.
Both panels on the same white background with the same line weight.
```

**Labels:** Signaling cell · Target cell nearby · Signal travels a short distance · Receptor in the arm · Signal to the brain · Signal back out to the target · Target organ
**Alt:** `Two panels comparing a signal passing between neighboring cells with a signal traveling the length of the body through the brain.`
**Caption:** Both of these are control. The difference is distance. Local control never leaves the neighborhood, so nothing else in the body knows it happened. A reflex sends the news to a control center and gets an instruction back.

### fig-w01-10 A cell in three solutions
**Type A.** Competency `w1-compartment-shifts`, reused in Week 2 for `w2-osmosis-cell-volume` and `w2-lab-rbc-tonicity`. This one figure earns its keep three times, so make it good.

```
[HOUSE STYLE BLOCK]

SUBJECT: Three red blood cells in a single horizontal row, evenly
spaced, each sitting inside its own rounded rectangle of surrounding
fluid drawn in pale blue gray.
  Left: The cell is visibly swollen, round and taut, close to
    bursting, with its outline stretched smooth. A few small fragments
    float beside it to suggest one has already ruptured. The
    surrounding fluid contains only a few scattered small dots.
  Center: The cell is a normal biconcave disc, relaxed, with a pale
    dimple in the center. The surrounding fluid has a moderate even
    scatter of small dots.
  Right: The cell is visibly shrunken with a spiky crenated outline.
    The surrounding fluid is crowded with small dots.
The dots represent dissolved particles and must differ clearly in
density between the three panels, because that density is the point of
the figure. Cells drawn at identical scale so the size difference is
real and not a drawing accident.
```

**Labels:** Hypotonic solution · Cell swells and may burst · Isotonic solution · Cell keeps its normal shape · Hypertonic solution · Cell shrinks and crenates
**Alt:** `Three red blood cells side by side, one swollen, one normal, one shrunken, in fluids containing increasing numbers of dissolved particles.`
**Caption:** Water moves toward the crowded side. The cell does not decide anything here, and neither does the solute. Count the dots outside and you can predict which way the water goes.

### fig-w01-11 Random against systematic error
**Type A.** Competency `w1-lab-measurement-error`. Lab notes.

```
[HOUSE STYLE BLOCK]

SUBJECT: Four identical archery targets in a two by two grid. Each
target is a set of four concentric circles with a small solid center.
Five small solid dots are scattered on each target as follows:
  Top left: dots tightly grouped right on the center.
  Top right: dots widely scattered but spread evenly all around the
    center.
  Bottom left: dots tightly grouped but sitting well off to the upper
    right, away from the center.
  Bottom right: dots widely scattered and also shifted off to the
    upper right.
Targets identical in size and line weight. Clear white gutters between
them for labels.
```

**Labels:** Accurate and precise · Accurate, not precise · Precise, not accurate · Neither
**Alt:** `Four archery targets showing tight and scattered groupings of shots, on and off center.`
**Caption:** Random error scatters your measurements around the true value. Systematic error moves all of them the same way, so repeating the measurement will not save you. This is why you repeat and average, and also why repeating is not always enough.

### fig-w01-13 Water is polar
**Type A.** Competency `w1-water-properties`. Notes section, chemical foundations.

```
[HOUSE STYLE BLOCK]

SUBJECT: Two panels side by side.
  Left panel: One water molecule enlarged. A large central sphere with
    two smaller spheres attached at an angle of about 105 degrees,
    forming a wide V. A small crescent shading sits near the large
    sphere and a matching crescent near each small sphere, to mark
    that the two ends of the molecule are different. Beside it, three
    more water molecules arranged so that the small sphere of one
    points at the large sphere of the next, joined by short dashed
    lines.
  Right panel: A single positive ion drawn as a plain sphere, with six
    water molecules arranged in a ring around it, each turned so its
    large sphere faces the ion. Next to it a second ion of the same
    size with six water molecules turned the opposite way, small
    spheres facing in.
Dashed lines only between water molecules, solid outlines elsewhere.
```

**Labels:** Oxygen · Hydrogen · Partial negative end · Partial positive end · Hydrogen bond · Sodium ion · Chloride ion · Hydration shell
**Alt:** `A bent water molecule with its two charged ends marked, water molecules hydrogen bonded to each other, and water molecules arranged around a positive and a negative ion.`
**Caption:** Water is bent, and that bend leaves one end slightly negative and one end slightly positive. Everything water does as a solvent follows from that one fact.

### fig-w01-15 Protein structure and denaturation
**Type A.** Competency `w1-protein-function`. Notes section, chemical foundations.

```
[HOUSE STYLE BLOCK]

SUBJECT: Five panels in one horizontal row.
  1. A short chain of eight small spheres in a straight line, joined
     by short rods.
  2. The same kind of chain coiled into a tight regular helix, and
     beside it a second version folded into a flat pleated sheet.
  3. A single chain folded into a compact rounded blob with a clear
     notch or pocket cut into one side.
  4. Two of those compact blobs fitted together as one unit, drawn in
     two different fills from the palette so they can be told apart.
  5. The compact blob from panel 3 shown again but unravelled: loose
     loops, the pocket gone, the outline irregular.
Panel 5 sits slightly apart from the others with a small gap, because
it is a different kind of thing from the first four.
```

**Labels:** Amino acid chain · Alpha helix · Beta pleated sheet · Folded protein · Binding site · Two subunits together · Denatured, binding site lost
**Alt:** `Five panels: a straight amino acid chain, a helix and a sheet, a folded protein with a pocket, two subunits joined, and the same protein unravelled.`
**Caption:** Every protein does its job through a binding site, and the binding site is only a shape. Heat or a pH change loosens the folding, the shape goes, and the function goes with it. Nothing has to break for a protein to stop working.

### fig-w01-16 Enzyme, substrate and inhibitor
**Type A.** Competency `w1-enzyme-function`. Notes section, chemical foundations. This is the figure the label kit ships configured for.

```
[HOUSE STYLE BLOCK]

SUBJECT: Three panels in one horizontal row.
  Panel 1: A large rounded enzyme shape with a distinct notch cut into
    its upper right side. A smaller separate shape that exactly matches
    the notch sits just outside it, approaching. A plain navy arrow
    points from the small shape toward the notch.
  Panel 2: The same enzyme with the small shape now seated in the
    notch, and the notch closed slightly around it so the fit is
    tighter than in panel 1.
  Panel 3: The same enzyme with the notch empty, and two smaller
    shapes outside it: one that matches the notch exactly, and one of
    a clearly different outline that still fits into the notch, drawn
    in brick red so it stands out. Both are approaching the notch.
Enzyme drawn identically in all three panels, same size, same
orientation, so the only change between panels is what is in the notch.
```

**Labels:** Enzyme · Active site · Substrate · Substrate bound, active site closes around it · Competitive inhibitor
**Steps:** 1. The substrate collides with the enzyme and settles into the active site. 2. The active site closes slightly around the substrate, which is what strains the bond and lowers the activation energy. 3. The product leaves and the enzyme returns to its original shape, ready for the next substrate.
**Alt:** `Three panels: a substrate approaching an enzyme's active site, the substrate bound with the site closed around it, and a competitive inhibitor competing for the same site.`
**Caption:** The active site is a shape, not a hole. Anything that fits the shape can sit in it, and while something else is sitting in it the substrate cannot. That is the whole mechanism behind competitive inhibition.

### fig-w01-17 ATP
**Type A, partial.** Competency `w1-atp-energy`. The molecule is Type A. The coupling diagram around it is Type B and I build that part.

```
[HOUSE STYLE BLOCK]

SUBJECT: One panel. A simplified ATP molecule drawn as a chain: a
double ring shape on the left, joined to a five sided ring, joined to
three identical small circles in a row extending to the right. The
bond between the second and third small circle is drawn as a visibly
different line, a wavy or doubled stroke, to mark it out from the
others. Below it, the same molecule shown again after the third small
circle has separated: the chain now ends at the second circle, and the
freed circle sits a short distance away on its own.
Both versions at identical scale and orientation, stacked vertically,
with clear white space to the right of both for labels.
```

**Labels:** Adenine · Ribose · Phosphate groups · The bond that is broken · ADP · Free phosphate
**Alt:** `An ATP molecule with its three phosphate groups, and the same molecule after the third phosphate has been released.`
**Caption:** Breaking that last bond releases energy the cell can put to work. Three kinds of work, in fact: moving things, building things, and generating force.

---

## 12. Week 2 figures

Twenty one competencies. Nine Type A, listed with prompts. The rest are Type B and I build them: Fick's law, transport maximum curves, the ion concentration table, the Nernst calculation, and the membrane potential tracing.

Prompts here are written slightly tighter, since by now the house style block is doing most of the work.

### fig-w02-01 The fluid mosaic membrane
**Type A.** `w2-membrane-structure`.

```
[HOUSE STYLE BLOCK]

SUBJECT: A cross section of a cell membrane running the full width of
the image, drawn as two facing rows of phospholipids. Each
phospholipid is one small round head with two wavy tails. Heads point
outward on both surfaces, tails meet in the middle. Set into this
bilayer:
  A protein that spans the full thickness with a visible channel
    running through it, open at both ends.
  A protein that spans the full thickness with no channel, solid.
  A protein sitting on the upper surface only, not penetrating.
  Two flat rigid four ring shapes wedged between the tails.
  Short branched chains attached to the outer surface of the top row
    of heads, and to the top of the spanning proteins.
Membrane occupies the middle third of the image with clear white space
above and below for labels.
```

**Labels:** Phospholipid head, water loving · Phospholipid tails, water fearing · Channel protein · Integral protein · Peripheral protein · Cholesterol · Carbohydrate chains
**Alt:** `Cross section of a cell membrane showing two rows of phospholipids with several kinds of protein set into them.`
**Caption:** Mosaic because it is made of many different pieces. Fluid because those pieces drift sideways through the layer rather than being fixed in place.

### fig-w02-02 What crosses unaided
**Type A.** `w2-permeability`.

```
[HOUSE STYLE BLOCK]

SUBJECT: A horizontal phospholipid bilayer across the middle of the
image, same construction as the previous figure but with no proteins
in it at all. Five small shapes are positioned in relation to it:
  A very small plain circle, drawn passing straight through the middle
    of the bilayer.
  A second very small plain circle, also passing through.
  A slightly larger shape shown partway into the tails, mid crossing.
  A round shape carrying a small plus sign shaped notch on its side,
    stopped at the outer surface, not entering, with a short blunt
    line in front of it to show it is blocked.
  A clearly larger irregular shape, also stopped at the outer surface,
    not entering, also blocked.
Do not draw a plus or minus symbol as text. Show charge as a notch or
a distinct shape difference instead.
```

**Labels:** Oxygen, small and non polar · Carbon dioxide · Steroid hormone, lipid soluble · Sodium ion, charged, blocked · Glucose, large and polar, blocked
**Alt:** `A phospholipid bilayer with small non polar molecules passing through it and charged or large molecules stopped at the surface.`
**Caption:** Three things decide whether a molecule gets through a bilayer on its own: how big it is, whether it carries a charge, and whether it dissolves in fat. Small, uncharged and fat soluble goes through. Anything else needs help, and that help is the rest of this week.

### fig-w02-03 Channel against carrier
**Type A.** `w2-facilitated-diffusion`.

```
[HOUSE STYLE BLOCK]

SUBJECT: Two panels side by side, each with the same short section of
phospholipid bilayer.
  Left panel: One protein spanning the membrane with a continuous open
    pore running right through it, top to bottom. Four small identical
    particles are shown in a line moving down through the pore, one
    after another.
  Right panel: The same protein position, but the protein is drawn
    three times in a row across the panel, showing three stages: open
    to the top with one particle entering the pocket, closed on both
    sides with the particle held inside, open to the bottom with the
    particle leaving. Only one particle in the whole panel.
```

**Labels:** Channel protein · Open pore · Ions move in single file · Carrier protein · Binding pocket faces out · Both sides closed · Pocket faces in, solute released
**Alt:** `A channel protein with an open pore letting particles through, beside a carrier protein shown in three stages changing shape around a single particle.`
**Caption:** A channel is a hole, so its rate depends only on how many particles arrive. A carrier has to change shape for every single particle it moves, which takes time, which is why a carrier can be saturated and a channel effectively cannot.

### fig-w02-04 The sodium potassium pump
**Type A with numbered steps.** `w2-primary-active-transport`. High value figure. Take the time.

```
[HOUSE STYLE BLOCK]

SUBJECT: One large protein spanning a section of phospholipid
bilayer, drawn six times in a horizontal row, each drawing showing the
same protein at a different stage. Membrane drawn continuously across
all six. In every drawing the space above the membrane is the outside
of the cell and the space below is the inside.
  1. Pocket open downward toward the inside, empty.
  2. Three small circles from below have settled into the pocket.
  3. A small shape attaches to the lower part of the protein and the
     protein has begun to change shape.
  4. Pocket now open upward toward the outside and the three small
     circles are leaving upward.
  5. Two larger circles from above have settled into the now empty
     upward facing pocket, and the small attached shape has detached
     and sits free.
  6. Pocket open downward again and the two larger circles are
     leaving downward.
The three small circles and the two larger circles must be clearly
different sizes and different fills throughout, so they can never be
confused for each other.
```

**Labels:** Outside the cell · Inside the cell · Sodium · Potassium · ATP
**Steps:**
1. Three sodium ions from inside the cell bind to the pump.
2. ATP transfers a phosphate to the pump, which is the energy input for the whole cycle.
3. The pump changes shape and opens to the outside.
4. The three sodium ions are released into the extracellular fluid.
5. Two potassium ions from outside bind, and the phosphate comes off.
6. The pump returns to its original shape and releases the two potassium ions inside the cell.

**Alt:** `A membrane pump drawn in six stages, moving three small ions out of the cell and two larger ions in.`
**Caption:** Three out, two in, one ATP, every cycle. Two things come out of this pump running all day: the sodium and potassium gradients that every excitable cell depends on, and a small standing negative charge inside the cell, because more positive charge leaves than enters.

### fig-w02-05 Symport and antiport
**Type A.** `w2-secondary-active-transport`.

```
[HOUSE STYLE BLOCK]

SUBJECT: Two panels side by side, each with a section of phospholipid
bilayer and one protein spanning it.
  Left panel: The protein carries two different particles, a small
    circle and a larger hexagon, both moving in the same direction,
    from above the membrane to below it. Beside this protein, a second
    separate pump protein is shown moving small circles the opposite
    way, from below to above.
  Right panel: The protein carries a small circle downward from above
    and a different larger particle upward from below, at the same
    time, in opposite directions.
Small circles identical in both panels, since they are the same ion.
```

**Labels:** Sodium moving down its gradient · Glucose moving up its gradient · Sodium potassium pump maintains the gradient · Sodium in · Calcium out
**Alt:** `Two membrane proteins: one carrying two particles in the same direction, one carrying two particles in opposite directions.`
**Caption:** Neither of these proteins uses ATP. They spend the sodium gradient instead, and the pump next door is what pays to keep that gradient there. This is why blocking the pump eventually stops transport that never touched ATP directly.

### fig-w02-06 Vesicular transport
**Type A.** `w2-vesicular-transport`.

```
[HOUSE STYLE BLOCK]

SUBJECT: Four panels in a two by two grid, each showing a section of
cell surface with the cell interior below.
  Top left: The membrane extends two long arms outward that reach
    around a large irregular particle, nearly meeting.
  Top right: A shallow dimple in the membrane containing only fluid
    with a few tiny scattered dots, pinching inward.
  Bottom left: A section of membrane with several small stalk shapes
    projecting from it into the space above, with matching particles
    seated on three of them, and the membrane beneath curving inward
    into a pit.
  Bottom right: A closed round vesicle inside the cell, filled with
    small dots, shown fused with the membrane and open at the top so
    the dots are escaping outward.
```

**Labels:** Phagocytosis · Pinocytosis · Receptor mediated endocytosis · Receptor · Exocytosis
**Alt:** `Four panels showing a cell engulfing a large particle, taking in fluid, taking in particles bound to receptors, and releasing contents from a vesicle.`
**Caption:** All four cost ATP and all four move material without anything crossing the bilayer itself. The difference between the first three is what gets selected: everything, whatever happens to be in the fluid, or only what binds a receptor.

### fig-w02-07 Crossing an epithelium
**Type A.** `w2-transepithelial-transport`. High value figure.

```
[HOUSE STYLE BLOCK]

SUBJECT: Three tall box shaped cells sitting side by side in a row,
joined along their upper side walls by short thick bars where they
touch. Above the cells is an open space. Below the cells is a second
open space with a capillary in it. The center cell is drawn in more
detail than its neighbors and contains:
  On its top edge, a protein carrying two different particles inward
    together.
  On its lower side edge, a pump protein moving small circles outward.
  On its lower side edge, a second protein letting the larger particle
    out into the space below.
A dotted path traces the larger particle from the space above, through
the top of the center cell, across it, out the lower side, and into
the capillary.
```

**Labels:** Lumen · Apical membrane · Tight junction · Basolateral membrane · Interstitial fluid · Capillary · Sodium glucose cotransporter · Sodium potassium pump · Glucose transporter
**Alt:** `Three epithelial cells joined by tight junctions, with a path traced for glucose from the lumen through the center cell into a capillary.`
**Caption:** The trick here is that the two ends of the cell carry different proteins, and the tight junctions stop anything from taking the shortcut between cells. That is what makes the movement one way instead of just back and forth.

### fig-w02-08 Ion channel gating
**Type A.** `w2-ion-channels`.

```
[HOUSE STYLE BLOCK]

SUBJECT: Four panels in a horizontal row, each with a short section of
phospholipid bilayer and one channel protein spanning it.
  1. Channel drawn permanently open, nothing attached to it, particles
     passing through.
  2. Channel shown twice, closed and open, with a small crescent
     shaped charged region on its side that has moved position between
     the two versions.
  3. Channel shown twice, closed and open, with a small particle
     seated in a pocket on its outer face in the open version only.
  4. Channel shown twice, closed and open, with the surrounding
     membrane drawn flat in the closed version and visibly stretched
     and thinned in the open version.
```

**Labels:** Leak channel, always open · Voltage gated channel · Charged sensor region moves · Ligand gated channel · Ligand · Mechanically gated channel · Membrane stretch
**Alt:** `Four channel proteins: one always open, one opened by a moving charged region, one opened by a bound molecule, one opened by stretching of the membrane.`
**Caption:** Same job, four different triggers. When you meet a new channel later in the course, the useful question is not what it lets through but what opens it.

### fig-w02-09 Resting membrane potential
**Type A.** `w2-resting-potential`.

```
[HOUSE STYLE BLOCK]

SUBJECT: One rounded cell filling most of the image, drawn in cross
section so both the inside and the surrounding fluid are visible.
  Inside the cell: many small circles of one fill, a smaller number of
    slightly larger circles of a second fill, and several large
    irregular shapes.
  Outside the cell: many of the larger circles, few of the small ones.
  Set into the membrane: one channel protein with an open pore and
    particles moving outward through it, and one pump protein.
  A thin band of small marks runs along the inner face of the
    membrane, and a matching band along the outer face, with the two
    bands drawn in different fills.
Do not draw plus or minus signs as text. Show the two charge layers as
two different fills or two different mark shapes.
```

**Labels:** Potassium, high inside · Sodium, high outside · Large negatively charged proteins, trapped inside · Potassium leak channel · Sodium potassium pump · Negative charge lines the inner face · Positive charge lines the outer face
**Alt:** `A cell in cross section showing potassium concentrated inside, sodium outside, trapped proteins, a leak channel and a pump, with opposite charges lining the two faces of the membrane.`
**Caption:** The resting potential is a thin layer of charge sitting against the membrane, not a charge filling the whole cell. It sits close to the potassium equilibrium potential because at rest the membrane is far more permeable to potassium than to anything else.

---

## 13. Template for the rest of the course

For every remaining figure, give me or the image app this shape, and the output will match everything above.

```
### fig-wNN-NN slug
**Type A.** Competency `id`. Where it is used.

[HOUSE STYLE BLOCK]

SUBJECT: What the picture shows. Written as a list of concrete objects
and where they sit in relation to each other, not as an idea. Say how
many of each thing. Say which things must look different from each
other and why they must. Say where the empty space goes.

Labels to add:  the exact words, in exam wording
Steps, if any:  one sentence each, in the order they happen
Alt:            one sentence describing the picture
Caption:        one or two sentences teaching the point
```

The three things that make a prompt work, in order of how much they matter:

1. **Count the objects.** "Six phospholipids" beats "some phospholipids". The model will invent a number if you do not supply one, and it usually invents too many.
2. **Say what must look different.** If two things in a figure need to be told apart, say so explicitly and say how, or the model will draw them the same and the figure will teach the wrong thing.
3. **Say where the empty space is.** Labels need somewhere to live. A beautifully filled canvas is a figure you cannot label.

---

## What I still need from you

- **The four Week 1 Type B figures are next in my queue**, ahead of any more notes pages, because the Foundations notes page already has slots for them.
- Once you generate the first two or three Type A plates, send them over and I will label them, wire them into the notes page and hand back the figure blocks for your slides. The first pass is worth doing together, so the label placement conventions settle before you have thirty images to redo.
- If your image app is one where you can save a style preset, save the house style block as one. Every figure that skips it is a figure that will not match the others.

BIO 005 Human Physiology, Yuba College, Fall 2026
