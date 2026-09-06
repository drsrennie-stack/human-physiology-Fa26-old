# The Patient File, instructor guide

BIO 005 Human Physiology. Section BIOL-5-D9286. Fall 2026, Sep 8 to Dec 16.
Dr. Sharilyn Rennie.

One HTML file. Fifteen weeks. Eight hidden conditions. Each student gets a different patient, assigned from their own name, and unlocks one week at a time with a code you post in Canvas.

---

## 1. What the student experiences

They type their name once. That name is hashed into one of eight patients, so the same name always opens the same patient and two students in a section of thirty usually do not share one. They see the patient's age, occupation, and file number, and nothing else. No diagnosis is ever displayed, in any week, including Week 15.

Every week runs the same six steps.

1. **Commit a prediction.** Before a single result exists on the page, they write what they think is wrong and why. Minimum 120 characters. Once locked it is read only, and it prints on the PDF with its timestamp.
2. **Place orders against a budget.** Five or six tokens a week. Tests cost one, two, or three. Ordering everything is not possible, so triage is forced.
3. **Commit before each reveal.** Choosing a test opens a dialog: what do you expect and why, which order are you giving up to place this one, and why this rather than that. The result is not in the page until they submit. Then it appears.
4. **Log what changed.** The order menu closes until they write what the last result changed. No shotgunning.
5. **Draw.** In browser with pen, thick pen, and eraser, or on paper and photographed. Either way they must also write the figure in words, which is both the accessible equivalent and a second piece of evidence.
6. **Synthesize and close.** Pull down menus force a commitment, the written prompts ask for the mechanism. The week locks and prints.

---

## 2. Why this is hard to hand to a chatbot

I want to be straight with you about what this does and does not do, because the difference matters when a student challenges a grade.

**What it genuinely defeats.** The prediction has to be written before the data exists. There is nothing on the page to screenshot at that moment, because the result has not been rendered and is not in the document. A student who pastes the page into a chatbot at step one gets a page with no results on it. That is the single strongest mechanic here, and it is the one your instruction pointed at.

**What it makes expensive.** The budget means every order costs something, so "ask for everything and let the machine sort it" does not work. The give up field forces an explicit trade, which is a judgment a model cannot make for them without knowing what they have already spent. The eight variants mean an answer shared in a group chat is wrong for seven students out of eight. The timestamps show the order in which decisions were actually made.

**What it does not do.** The results are obfuscated in the file rather than encrypted, so a determined student who opens the source and works at it can extract the value table. That raises the effort well above copy and paste, but it is not a lock. And no mechanism stops a student from writing a prediction with a chatbot's help. What you are grading is the fit between the prediction, the order sequence, and the revision, across fifteen weeks. That coherence is hard to fake and easy to see when it is faked, which is why the rubric below puts most of the weight there.

If you want a harder guarantee later, the honest answer is a short oral defense in Week 15 rather than a stronger file.

---

## 3. Week codes

Post one code per week in a Canvas announcement. The student types it into the unlock box.

| Week | Title | Dates | Code | Tokens |
|---|---|---|---|---|
| 1 | Foundations of Physiology | Sep 8 to 13 | `HOMEO-01` | 6 |
| 2 | Molecules, Water, and Energy | Sep 14 to 20 | `BIOMOL-02` | 5 |
| 3 | Membranes, Transport, and Compartments | Sep 21 to 27 | `MEMBRA-03` | 5 |
| 4 | Electrical Signaling | Sep 28 to Oct 4 | `ACTPOT-04` | 5 |
| 5 | The Nervous System | Oct 5 to 11 | `NEURAL-05` | 5 |
| 6 | Muscle | Oct 12 to 18 | `SARCOM-06` | 5 |
| 7 | Chemical Signaling and Endocrine Control | Oct 19 to 25 | `ENDOAX-07` | 6 |
| 8 | Reproductive Physiology | Oct 26 to Nov 1 | `GONADS-08` | 4 |
| 9 | Digestion, Absorption, and Energy Balance | Nov 2 to 8 | `ABSORB-09` | 6 |
| 10 | Cardiac Function and Blood | Nov 9 to 15 | `CARDIO-10` | 6 |
| 11 | Circulation and Blood Pressure | Nov 16 to 22 | `HEMODY-11` | 6 |
| 12 | Fluid, Electrolyte, and Acid Base Chemistry | Nov 23 to 29 | `ACIDBA-12` | 6 |
| 13 | Respiration | Nov 30 to Dec 6 | `VENTIL-13` | 6 |
| 14 | Renal Function | Dec 7 to 13 | `NEPHRO-14` | 6 |
| 15 | Case Conference | Dec 14 to 16 | `CONFER-15` | 3 |

**Master code: `RENNIE-KEY-2026`.** Typed into any week's unlock box, it opens all fifteen at once so you can walk a patient end to end. Do not post it. If it leaks, change `masterCode` in `sim-data.js` and rebuild.

Codes are checked case insensitively. To change any of them, edit `code` in the `WEEKS` array in `sim-data.js` and run `node build-sim.js`.

---

## 4. The eight patients

Each condition was chosen because it surfaces across several systems over several weeks rather than announcing itself in Week 1. The full abnormal value list for each is in `BIO005-patient-file-KEY.md`.

| ID | Patient | Hidden condition | What it teaches |
|---|---|---|---|
| A | Marisol V., 34, warehouse picker | Iron deficiency anemia from chronic occult gastrointestinal blood loss, aggravated by daily NSAID use | Microcytic anemia, oxygen delivery, iron balance, low store against low intake |
| B | Dana W., 47, bookkeeper | Primary hypothyroidism, Hashimoto thyroiditis, with hyponatraemia and myopathy | Axis localisation, basal metabolic rate, why a hormone value without its tropic hormone says nothing |
| C | Theo G., 19, student | New onset type 1 diabetes with early ketoacidosis | Osmolarity, anion gap acidosis, respiratory compensation, fuel metabolism without insulin |
| D | Ruben A., 61, retired mail carrier | Chronic kidney disease stage 3b with secondary hyperparathyroidism | Filtration, mineral bone axis, non gap acidosis, erythropoietin |
| E | June H., 66, retired kitchen manager | Chronic obstructive pulmonary disease with carbon dioxide retention and secondary polycythaemia | Obstructive ventilation, chronic respiratory acidosis with renal compensation, oxygen carriage |
| F | Alina P., 44, dental hygienist | Primary hyperaldosteronism with hypokalaemia and metabolic alkalosis | Renin angiotensin aldosterone axis, distal potassium and hydrogen handling, resistant hypertension |
| G | Walter B., 58, long haul driver | Heart failure with reduced ejection fraction and neurohormonal activation | Cardiac output, Starling forces, baroreflex, dilutional hyponatraemia |
| H | Priya R., 29, veterinary technician | Primary adrenal insufficiency, Addison disease | Adrenal axis, sodium and potassium handling, glucose regulation, why the skin darkens |

Across thirty simulated names the distribution ran between one and six per variant. It is a hash, not a shuffle, so it will not be perfectly even. If a variant is unrepresented in your section, that is expected and harmless.

**Editing a patient.** Every value lives in the `VARIANTS` array in `sim-data.js`. Anything you do not override falls back to the normal value in `NORMALS`, so a variant only needs its abnormal results listed. Add a ninth patient by adding one object to the array. Rebuild after any change.

---

## 5. Grading

The graded object is the reasoning trail, not the diagnosis. A student who lands on the wrong condition with a clean trail should out score a student who names it in Week 3 with three unexplained orders.

**Weekly PDF, 20 points.**

| Element | Points | What full credit looks like |
|---|---|---|
| Prediction, locked before data | 5 | Names a specific variable and a direction, gives the mechanism, and is falsifiable. Not "something is wrong with her blood." |
| Order sequence and trade offs | 5 | Each order follows from the last result. The give up field names a real alternative and the reason distinguishes the two. |
| Revision after each result | 5 | Says what the result changed, including "nothing changed, and here is why that is informative." Vague agreement earns half. |
| Figure and its description | 3 | Labels present, arrow directions stated, and the written description matches what was drawn. |
| Synthesis | 2 | Pull downs consistent with the trail. Written answers give mechanism, not vocabulary. |

**Half credit rule, applied everywhere:** a correct number with no explanation earns half. This is worth saying out loud in Week 1 and again in Week 3.

**Term total.** Fifteen weekly files at 20 points is 300. Week 15 is worth double if you want the case conference to carry weight.

**What a fabricated file looks like.** Predictions that are eloquent but never wrong. Revisions that restate the result instead of changing a position. An order sequence with no dead ends. Real reasoning has dead ends in it, and the rubric should reward the student who says "I ordered the thyroid panel in Week 7 because I was still chasing the fatigue, and it was normal, which is what finally made me look at the kidney."

---

## 6. Canvas setup

1. Upload `BIO005-patient-file.html` to Files.
2. Create a Page. Use the HTML editor and embed it:

   ```html
   <iframe src="/courses/COURSEID/files/FILEID/download?download_frd=1"
           id="bio005-patient-file" width="100%" height="1400"
           style="border:0" title="BIO 005 Progressive Patient File"></iframe>
   ```

   The file sends its height to the parent on load, on resize, and whenever the page grows, so if you add the standard listener the frame will size itself. If you do not, a fixed height of 1400 works and the frame scrolls.

3. Create fifteen assignments, one per week, file upload type, and tell students to upload the PDF the file exports.
4. Post the week code in an announcement on the Monday.

**Nothing is stored anywhere but the student's own browser.** There is no server, no account, no analytics, and no student name in any file you or I hold. Work persists in that browser through `localStorage`, and the save code lets them move to another machine. Neither leaves their device.

---

## 7. What to tell students in Week 1

The student handout is `BIO005-patient-file-student-instructions.md`. The three things they must hear from you directly:

- **Type your name the same way every week.** A different spelling opens a different patient.
- **Export the PDF every week and upload it.** That PDF is the assignment. The browser copy is a convenience, not a submission.
- **Copy your save code somewhere safe.** It carries your typed work to another computer. It does not carry your drawings, which is another reason to export the PDF.

---

## 8. Known limits, plainly

- **The save code does not include drawings.** Including them made the code enormous. Drawings live in the browser and in the exported PDF.
- **Browser storage can be cleared.** A student in a private window, or on a shared campus machine that resets, will lose the browser copy. The save code and the weekly PDF are the recovery path. Say this in Week 1, not Week 9.
- **The result table is obfuscated, not encrypted.** See section 2.
- **Reopening a closed week is allowed and counted.** The PDF prints how many times a week was reopened. Treat a high count as a conversation, not an accusation.
- **The drawing canvas needs a pointer.** A student who cannot use a pointer uses the written description and, if they wish, uploads a photograph or a described figure. The written description is required of everyone, so nobody is graded on drawing ability.

---

## 9. Rebuilding

```
node build-sim.js
```

Reads `sim-data.js` and `template.html`, writes `out/BIO005-patient-file.html` and `out/BIO005-patient-file-KEY.md`. The build strips every em dash and refuses to run if the data placeholder is missing. Condition names and teaching notes exist only in `sim-data.js` and the key, never in the shipped HTML.
