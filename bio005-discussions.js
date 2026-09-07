/* ============================================================
   BIO 005 Human Physiology, Fall 2026
   bio005-discussions.js

   One discussion per week. Week 1 is the vision board and lives on
   its own page; weeks 2 to 15 are here, fourteen of them.

   THE RULE, and every prompt below is built on it: one post, not two.
   The post works through something from that week's physiology AND
   says something honest about the student's own thinking on that same
   material. Not a content post plus a separate reflection. One post
   carrying both, which is why every entry has `work` and `think` and
   they are about the same object.

   `pick`   what they choose from, so no two posts are identical
   `work`   the physiology they have to actually do
   `think`  the metacognition, tied to that same piece of work
   `attach` anything that must be submitted with the post
   `reply`  what a reply has to do to count

   Read by assignment-discussion.html through ?week=N.
   ============================================================ */

window.BIO005_DISCUSSIONS = {

  "2": {
    title: "The chemistry that does work in the body",
    eyebrow: "Reading a graph before you trust it",
    pick: "The graphing worksheet gives you three figures. Pick the one that gave you the most trouble, not the one you found easiest.",
    work: "Post your reading of that figure: what is on each axis and in what units, what the shape of the line actually says, and one thing the figure does NOT tell you that a reader might assume it does. Name the value you would need before you could act on it clinically.",
    think: "Then the honest part. What did you think the figure said on first look, before you worked through the axes? If your first read was right, say what made it obvious. If it was wrong, say what you were assuming that made the wrong reading feel correct. That gap between the glance and the careful read is the whole skill this week.",
    attach: "Your completed graphing worksheet, photographed or scanned, attached to the post. Handwritten. The post does not count without it.",
    reply: "Reply to two people who worked a different figure than you did. Say one thing their reading gave you that yours did not."
  },

  "3": {
    title: "Getting across the membrane",
    eyebrow: "Predict, then check",
    pick: "Pick one: a red cell dropped into distilled water, a red cell into 3 percent saline, or a patient given a liter of 0.45 percent saline.",
    work: "Before you look anything up, write your prediction of what happens to cell volume and why. Then work it properly: name the tonicity, say which way water moves and what drives it, and explain why osmolarity alone does not settle the question until you know whether the solute can cross. Give the clinical consequence in one sentence.",
    think: "Now compare the two. Was your prediction right, half right, or wrong? Name the specific idea that had to change. Students most often trip on treating osmolarity and tonicity as the same thing, so if that was you, say so plainly. Getting it wrong first and knowing why is worth more here than getting it right by luck.",
    attach: "",
    reply: "Reply to two classmates who picked a different solution. Ask about the step in their reasoning you are least sure you could reproduce yourself."
  },

  "4": {
    title: "How cells talk, and the electrical signal",
    eyebrow: "Where the voltage comes from",
    pick: "Pick one change: raise extracellular potassium, block the sodium-potassium pump, or block voltage-gated sodium channels.",
    work: "Work out what your change does to the resting membrane potential and to the cell's ability to fire, and say why in terms of gradients and permeability rather than by naming a rule. Be specific about which one you are changing, the gradient or the permeability, because they are not the same lever. Then name a real situation where this happens in a patient.",
    think: "Say which part of that chain you could rebuild from memory tomorrow and which part you would have to look up again. Be specific. \"The whole thing\" is not an answer, and neither is \"I get it now.\" Point at the actual step that is still soft.",
    attach: "",
    reply: "Reply to two people who changed something different from you. Between the three changes, what do all of them have in common?"
  },

  "5": {
    title: "Synapses and central integration",
    eyebrow: "Adding signals up",
    pick: "Pick one: temporal summation, spatial summation, or an inhibitory input arriving at the same time as an excitatory one.",
    work: "Draw the situation in words: which inputs arrive, when, where on the neuron, and what the membrane does at the trigger zone. Say whether the cell fires and why that answer depends on timing and position rather than on how many inputs there were. One sentence on what would flip your answer the other way.",
    think: "Where did your intuition disagree with the physiology? A common one is expecting more inputs to always mean more firing. Name the assumption you had to give up, or if you had none, name the thing that still feels arbitrary to you about how the cell decides.",
    attach: "",
    reply: "Reply to two classmates. Take their scenario and change one thing about the timing, then ask them what they think happens."
  },

  "6": {
    title: "Sensing the world, and the responses you do not control",
    eyebrow: "Why you stop noticing",
    pick: "Pick one: receptor adaptation, two-point discrimination, or an autonomic reflex you can observe in yourself.",
    work: "Explain the mechanism, then use it to explain something you have actually experienced: why you stop feeling your watch, why your fingertips can tell apart what your back cannot, why your heart rate changes before you have consciously registered a fright. Name the receptor or the pathway, not just the feeling.",
    think: "This week is the one where the physiology explains something you already knew without knowing why. Say what you had an everyday explanation for that now has a mechanism underneath it, and whether the mechanism matched what you had assumed. If it did not, say where your old explanation was wrong rather than just replacing it.",
    attach: "",
    reply: "Reply to two people. Tell them a second everyday experience their mechanism also explains, and check whether it really does."
  },

  "7": {
    title: "Muscle, and how movement gets commanded",
    eyebrow: "Force is a choice the nervous system makes",
    pick: "Pick one: the length-tension relationship, motor unit recruitment, or the difference between a twitch and tetanus.",
    work: "Explain how your mechanism sets the force a muscle produces, at the level of filaments or motor units, whichever your topic needs. Then apply it: why does a muscle stretched too far produce less force, or why can you pick up an egg and a suitcase with the same hand? Be concrete about the numbers or the geometry.",
    think: "Muscle is where drawing usually beats describing. Say whether you understood this better after you drew it than after you read it, and what specifically the drawing made visible that the words did not. If the drawing did not help, say that too and say what did.",
    attach: "",
    reply: "Reply to two people whose mechanism was different. Ask how their mechanism and yours would interact in a single real movement."
  },

  "8": {
    title: "Hormones and reproduction, the slow control system",
    eyebrow: "The one loop that runs the other way",
    pick: "Pick one: a negative feedback hormone axis, the positive feedback that triggers ovulation, or what happens when a feedback loop is broken by disease or by an exogenous hormone.",
    work: "Draw the loop out in words: the stimulus, the sensor, the integrator, the effector, the response, and the signal that closes it. Say what the loop is defending. Then say what happens if you cut it at one named point, and why that particular break produces the symptoms it does.",
    think: "Positive feedback is the one students say clicks late. Say where you are on it. If it clicked, name the moment it did and what triggered it. If it has not, say exactly what still bothers you about a loop that runs away on purpose, because naming that is how it gets fixed.",
    attach: "",
    reply: "Reply to two people, one of whom worked a different kind of loop than you. What does their loop defend that yours does not?"
  },

  "9": {
    title: "The heart as a pump",
    eyebrow: "Pressure decides everything",
    pick: "Pick one moment in the cardiac cycle: a valve opening, a valve closing, or isovolumetric contraction.",
    work: "Say what the pressures are doing in the atrium, the ventricle and the great vessel at that moment, and why that pressure relationship, and only that one, produces the event. Then say what you would hear, see on a tracing, or measure at that instant. Pressure causes the valve, not the other way round; make sure your explanation says so.",
    think: "This week rewards keeping several numbers in your head at once. Say what you did to hold them there, and whether it worked. A table, a drawing, saying it out loud, walking through it in order. Be specific enough that a classmate could try your method.",
    attach: "",
    reply: "Reply to two classmates who chose a different moment. Put your moment and theirs in order and say what has to happen in between."
  },

  "10": {
    title: "Pressure, flow, and holding blood pressure steady",
    eyebrow: "The reflex that catches you",
    pick: "Pick one: standing up quickly, hemorrhage, or a vessel narrowed by disease.",
    work: "Work the baroreceptor reflex through your situation step by step: what is sensed, where, what the integrator does, which effectors respond, and what happens to heart rate, contractility and vessel radius. Then say what the reflex is defending and what it is willing to sacrifice to defend it. Use the relationship between flow, pressure and resistance rather than describing it in words alone.",
    think: "Say which step of that reflex you would most likely leave out if you were rushing, and why that step is easy to skip. Everyone has one. Naming it now is cheaper than finding it on the midterm.",
    attach: "",
    reply: "Reply to two people with different situations. Does the reflex do the same thing in their case as in yours? If not, why not?"
  },

  "11": {
    title: "Blood and how the body defends itself",
    eyebrow: "Reading a panel like a clinician",
    pick: "Pick one pattern from a CBC: a low hematocrit, a raised white count with a left shift, or a low platelet count.",
    work: "Say what the number actually measures, physiologically, and what the body would have to be doing for it to move that way. Give two different mechanisms that could produce the same number, and say what other value on the panel you would look at to tell them apart. Do not diagnose; explain what is being measured and what high or low means.",
    think: "This is the first week where the answer is a range rather than a fact. Say how that changed the way you studied it, and whether you found yourself wanting a single right answer. That pull toward one right answer is worth noticing, because clinical data rarely gives you one.",
    attach: "",
    reply: "Reply to two people. Offer a third mechanism that could produce their number, and say what would rule it in or out."
  },

  "12": {
    title: "Digestion, and how you use food for fuel",
    eyebrow: "One meal, all the way through",
    pick: "Pick one macronutrient, and one real meal you actually ate this week that contains it.",
    work: "Follow it: where digestion of that nutrient starts, which enzymes act where and what they need to work, how the products cross the epithelium, and where they go next. Then say what happens to that pathway if one named step fails, whether that is a missing enzyme, a removed organ, or an absent bile salt.",
    think: "This week sits on the holiday, which means you are working it in a week that is not like other weeks. Say honestly how you handled that, what you did differently, and whether it worked. If it did not, say what you would do differently, because there is a week 13 coming.",
    attach: "",
    reply: "Reply to two people who followed a different nutrient. Where do your two pathways meet?"
  },

  "13": {
    title: "Breathing, gas transport, and the fast pH lever",
    eyebrow: "Minutes, not days",
    pick: "Pick one: a right shift of the hemoglobin dissociation curve, hyperventilation, or hypoventilation.",
    work: "Explain what your change does to oxygen loading in the lung and unloading at the tissue, or to carbon dioxide and therefore to pH. Give the direction of the pH change and the mechanism behind it, not just the label. Then name a situation where this is the body doing the right thing rather than something going wrong.",
    think: "Respiratory compensation is fast and renal compensation is slow, and this week is the fast half. Say what you did to keep the two levers separate in your head, given that week 15 brings the slow one back. If you have not built anything to keep them apart yet, say that, and say what you will try.",
    attach: "",
    reply: "Reply to two classmates. Take their change and ask what the kidney would eventually do about it."
  },

  "14": {
    title: "The kidney and body fluid balance",
    eyebrow: "Filter everything, take back what you need",
    pick: "Pick one substance: glucose, sodium, water, or a drug.",
    work: "Follow it through the nephron: is it filtered, is it reabsorbed, is it secreted, and where along the tubule does each of those happen. Say what regulates the step that matters most for your substance. Then say what appears in the urine when that regulation fails, and why that particular finding follows from that particular failure.",
    think: "By now you have fourteen weeks of loops. Say which earlier week your substance made you go back to, and whether going back was quick or whether you had to relearn it. Where the material is thinnest is useful information for you right now, with one week left.",
    attach: "",
    reply: "Reply to two people with different substances. Does the nephron treat theirs and yours the same way anywhere along its length?"
  },

  "15": {
    title: "The slow pH lever, and putting it all together",
    eyebrow: "The last one, and it looks backwards",
    pick: "Pick one disturbance: a metabolic acidosis, a respiratory acidosis, or a metabolic alkalosis.",
    work: "Say what the primary problem is, which system compensates, in which direction, and over what time course. Be explicit about which value is the disturbance and which is the compensation, because reading them the wrong way round is the single most common error here. Then say what full compensation would look like and whether it would return pH all the way to normal.",
    think: "Last post of the term, so make it count. Look back at what you wrote in week 2 or week 3. What can you now explain that you could not then, and what is still not solid? Be specific in both directions. Nobody finishes a physiology course with everything solid, and saying which parts are not is a more useful skill than pretending otherwise.",
    attach: "",
    reply: "Reply to two people with different disturbances. Say which of the two levers, fast or slow, is doing the work in their case."
  }

};
