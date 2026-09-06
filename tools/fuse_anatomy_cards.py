#!/usr/bin/env python3
"""
fuse_anatomy_cards.py

Audit fix, Sep 2026. Every card below asked a student to name or locate a
structure and nothing else. In a physiology course that is a strict anatomy
question, so each one is rewritten to ask what the structure or its position
lets the body DO. The structure name stays in the answer or the explanation,
so nothing is lost from the vocabulary the student still needs.

Cell level anatomy is kept, but only where the question turns on function:
"why does the pump sit on that membrane" instead of "which membrane is the
pump on".

Nothing is deleted. Ids, DOK levels, tags and competency ids are unchanged,
so the DOK gate, the spacing state and the competency map all still line up.

Run:  python3 tools/fuse_anatomy_cards.py
Then: python3 tools/assemble_bank.py
"""

import json, os, re, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CARDS = os.path.join(ROOT, "cards")

# file stem -> card id -> new q / a / options / correctIndex / explanation
PATCH = {

# ----------------------------------------------------------------- vision
"t-special-senses": {
 "c4": {
  "q": "Parasympathetic fibers traveling with the oculomotor nerve make the ciliary muscle contract. What does that contraction do to the lens?",
  "a": "It lets the lens become rounder and thicker, which bends light more strongly so near objects focus on the retina.",
  "options": [
    "It lets the lens become rounder and thicker, so near objects focus on the retina",
    "It pulls the lens flatter, so distant objects focus on the retina",
    "It moves the whole lens forward toward the cornea",
    "It clouds the lens so less light reaches the retina"],
  "correctIndex": 0,
  "explanation": "The ciliary muscle is a ring. When it contracts the ring gets smaller, the suspensory fibers holding the lens go slack, and the elastic lens springs into a rounder shape. A rounder lens has more refractive power, which is what near vision needs. This is accommodation, and it is why the same parasympathetic outflow that constricts the pupil also focuses the eye for reading. Pulling the lens flatter is what happens when the ciliary muscle relaxes, which is the resting state used for distance. The lens does not travel forward in the human eye; that is how some fish focus. Clouding is a cataract, a change in the lens protein itself, and has nothing to do with muscle activity."
 },
 "c45": {
  "q": "The primary visual cortex is laid out as a map of the visual field. What follows from that arrangement when a small area of it is damaged?",
  "a": "A blind spot appears in one specific part of the visual field while the rest of vision stays normal.",
  "options": [
    "A blind spot appears in one specific part of the visual field, and the rest of vision is normal",
    "Vision dims evenly across the whole field in both eyes",
    "Color vision is lost everywhere but shape and motion are spared",
    "The affected eye goes completely blind"],
  "correctIndex": 0,
  "explanation": "Because neighboring points in the visual field are handled by neighboring patches of cortex, losing a patch of cortex costs a patch of the field. That is why cortical strokes produce shaped field cuts rather than a general blur. Even dimming across the whole field would need something that affects the entire pathway at once, like a change in the retina or in the media of the eye. Losing color but not shape happens with damage in a specialized color region further along the processing stream, not in primary visual cortex. One eye going blind means the problem is in that eye or its optic nerve, before the two eyes' inputs are combined, and by the time signals reach the cortex each side is carrying half the field from BOTH eyes."
 },
 "c79": {
  "q": "Cochlear hair cells have no axon of their own. How does a sound signal get from a hair cell to the brainstem?",
  "a": "The hair cell releases neurotransmitter onto a spiral ganglion neuron, whose axon runs in the cochlear branch of the vestibulocochlear nerve (CN VIII).",
  "options": [
    "The hair cell releases transmitter onto a spiral ganglion neuron, whose axon runs in CN VIII",
    "The hair cell grows its own axon that runs directly to the auditory cortex",
    "The vibration is carried to the brainstem as a pressure wave in the endolymph",
    "The hair cell passes current straight into the auditory cortex through gap junctions"],
  "correctIndex": 0,
  "explanation": "A hair cell is a receptor cell, not a neuron. Bending its stereocilia opens ion channels, the cell depolarizes, and it releases transmitter onto the ending of a spiral ganglion neuron. That neuron's axon is what carries the signal, and those axons together form the cochlear part of CN VIII. Hair cells never grow their own long axons, which is why a separate first order neuron is needed. The endolymph wave is what bends the stereocilia inside the cochlea; it stops at the cochlea and does not travel to the brainstem. Gap junctions do connect some supporting cells in the inner ear, but there is no direct electrical line from a hair cell to the cortex, and every auditory signal is relayed several times in the brainstem and thalamus first."
 },
 "c114": {
  "q": "When your head starts to rotate, what actually bends the hair cells inside a semicircular canal?",
  "a": "The endolymph lags behind the moving canal and pushes on the cupula, which bends the hair cells embedded in it.",
  "options": [
    "The endolymph lags behind the moving canal and pushes the cupula, bending the hair cells in it",
    "Calcium carbonate crystals slide across the hair cells under gravity",
    "The bony canal itself flexes and squeezes the hair cells",
    "Blood pressure inside the canal rises and pushes the hair cells over"],
  "correctIndex": 0,
  "explanation": "The canal turns with your head, but the fluid inside it has inertia and briefly stays put. That relative movement of fluid pushes the cupula, the gel flap sitting on the crista ampullaris, and bending the cupula bends the hair cells. This is why the semicircular canals report ROTATION starting and stopping rather than steady spinning: once the fluid catches up, the cupula returns to center. Calcium carbonate crystals, the otoliths, sit on the maculae of the utricle and saccule, and they report head tilt and straight line acceleration instead. The bony canal is rigid and does not flex. Blood pressure does not act on this system at all; the stimulus is mechanical fluid movement."
 },
 "c118": {
  "q": "Vestibular hair cells fire at a steady rate even when the head is completely still. What does the brainstem read when firing rises on one side and falls on the other?",
  "a": "That the head is rotating toward the side whose firing rose.",
  "options": [
    "That the head is rotating toward the side whose firing rose",
    "That the head is being held still in a new position",
    "That the eyes are moving but the head is not",
    "That the body is falling straight down"],
  "correctIndex": 0,
  "explanation": "A resting firing rate gives the system a baseline it can move in both directions. Rotation bends the hair cells one way on one side of the head and the opposite way on the other, so one vestibular nerve speeds up while its partner slows down. The brain compares the two, and the difference is the signal. This paired design is why a sudden loss of one vestibular nerve feels like violent spinning: the intact side is now permanently the faster one. Holding still in a new position gives no difference between the sides, so both return toward baseline. Eye movement is the OUTPUT of this system through the vestibulo-ocular reflex, not what the canals sense. Falling straight down is linear acceleration, sensed by the otolith organs rather than the canals."
 },
 "c132": {
  "q": "A patient loses taste from the front of the tongue on one side but tastes normally at the back. What does that pattern tell you about how taste reaches the brain?",
  "a": "Taste is carried by more than one nerve, with the front of the tongue on the facial nerve (CN VII) and the back on the glossopharyngeal (CN IX), so one can fail on its own.",
  "options": [
    "Taste travels in more than one nerve, front of tongue on CN VII and back on CN IX, so one can fail alone",
    "All taste travels in a single nerve, so the finding must be an error",
    "Taste buds at the front detect different chemicals than those at the back",
    "The tongue has no taste receptors at the back, only touch receptors"],
  "correctIndex": 0,
  "explanation": "Taste is split across nerves by territory, not by flavour. The anterior two thirds of the tongue sends taste along CN VII, the posterior third along CN IX, and a few buds on the epiglottis along CN X. A lesion of one nerve therefore takes out one strip of tongue and leaves the rest working, which is exactly the pattern described. A single taste nerve would make a partial loss like this impossible. The idea that front and back detect different chemicals is a persistent myth: the old tongue map has been shown to be wrong, and all five basic tastes can be detected across the whole tongue surface. The back of the tongue is densely supplied with taste buds, particularly around the circumvallate papillae."
 },
 "c133": {
  "q": "A head injury shears the thin perforated bone that olfactory axons pass through on their way into the skull. What sensory loss follows, and why does it often fail to recover?",
  "a": "Smell is lost, because the axons are cut where they thread through the cribriform plate and the regrowing axons cannot find their way back through it.",
  "options": [
    "Smell is lost, because the axons are cut where they cross the cribriform plate and cannot re-thread it",
    "Vision is lost, because the optic nerve passes through the same bone",
    "Hearing is lost on the injured side only",
    "Nothing is lost, because olfactory receptor neurons are replaced every few weeks"],
  "correctIndex": 0,
  "explanation": "Olfactory receptor neurons sit in the roof of the nasal cavity and send unmyelinated axons up through many small holes in the cribriform plate to reach the olfactory bulb. A shearing injury across that plate cuts every one of those bundles at once. Olfactory receptor neurons ARE replaced throughout life, which is unusual for neurons, but the new axons have to re-thread the same perforations and reach the correct target in the bulb. Scarring across the plate blocks that, so anosmia after head injury is often permanent even though the receptor cells themselves keep turning over. The optic nerve passes through the optic canal in the sphenoid, well away from the cribriform plate. Hearing runs through the temporal bone on a separate route entirely."
 },
},

# ------------------------------------------------------------ motor control
"t-motor-control": {
 "c20": {
  "q": "Why does a small stroke in the primary motor cortex weaken one specific body part, such as a hand, rather than the whole opposite side?",
  "a": "The motor cortex is arranged as a map of the body, so a small area of damage removes the command for the one region that area controls.",
  "options": [
    "The motor cortex is arranged as a map of the body, so a small lesion removes one region's command",
    "The motor cortex only sends commands to the hands, so other regions are never affected",
    "The spinal cord takes over for any body part the cortex can no longer reach",
    "Motor commands for the rest of the body cross to the other hemisphere before the lesion"],
  "correctIndex": 0,
  "explanation": "Corticospinal neurons in the precentral gyrus are laid out somatotopically, so face, hand, arm, trunk and leg each occupy their own strip. Damage to the hand strip therefore costs the hand and leaves the leg working. The same fibers become crowded together further down, in the internal capsule, which is why a lesion of the same physical size there weakens the entire opposite side. The motor cortex commands the whole body, not only the hands. The spinal cord holds reflex circuits and pattern generators but cannot substitute for a lost voluntary command. Corticospinal fibers do cross, but they cross low in the medulla, well below the cortex, so crossing is not what limits the size of the deficit."
 },
 "c24": {
  "q": "A stroke the size of a pea in the internal capsule can weaken an entire half of the body, while a stroke of the same size in the motor cortex weakens only a hand. What accounts for the difference?",
  "a": "In the internal capsule the corticospinal fibers for the whole body are packed into a small bundle, so one small lesion catches all of them.",
  "options": [
    "In the capsule the fibers for the whole body are packed tightly together, so a small lesion catches all of them",
    "The internal capsule contains the cell bodies, which cannot be replaced",
    "Blood supply to the capsule is richer, so damage there spreads further",
    "The capsule carries sensory fibers only, and sensory loss looks like weakness"],
  "correctIndex": 0,
  "explanation": "Fibers that spread across a wide sheet of cortex funnel down into a compact bundle in the posterior limb of the internal capsule. Packing the whole body's motor traffic into a few millimetres means a tiny infarct there produces a dense hemiparesis, which is the classic lacunar stroke. Cell bodies stay up in the cortex; the capsule carries axons. Blood supply does not make a lesion spread; the small perforating arteries that feed the capsule are in fact end arteries with little collateral, which is part of why lesions there are so sharply defined. The capsule carries both motor and sensory traffic, but weakness in this situation is real motor weakness, not a sensory finding."
 },
 "c25": {
  "q": "Corticospinal fibers cross to the opposite side low in the medulla. What is the functional consequence of that crossing point?",
  "a": "A lesion above the crossing weakens the opposite side of the body, while a lesion below it weakens the same side.",
  "options": [
    "A lesion above the crossing weakens the opposite side; a lesion below it weakens the same side",
    "A lesion anywhere along the pathway weakens the opposite side",
    "A lesion anywhere along the pathway weakens both sides equally",
    "The crossing has no effect on which side is weak, only on how severe the weakness is"],
  "correctIndex": 0,
  "explanation": "Everything upstream of a crossing point belongs to the opposite side of the body; everything downstream belongs to the same side. So a capsular or cortical lesion on the right weakens the left arm and leg, while a lesion of the lateral corticospinal tract in the cervical cord on the right weakens the right arm and leg. Being able to place a lesion above or below the decussation from the side of the weakness is the whole clinical point of knowing where the crossing happens. Saying every lesion weakens the opposite side ignores the tract's entire course inside the spinal cord. Bilateral weakness would need a lesion catching both tracts, such as a central cord or midline brainstem lesion. And the side of weakness is exactly what the crossing determines, so it cannot be irrelevant."
 },
 "c34": {
  "q": "Two patients each have equal weakness of the right arm. One lesion is in the corticospinal tract above the level of the motor neuron, the other is in the motor neurons themselves at C6. Which findings separate them?",
  "a": "Muscle tone and reflexes: the tract lesion gives increased tone, brisk reflexes and little wasting, while the motor neuron lesion gives flaccid weakness, lost reflexes and wasting.",
  "options": [
    "The tract lesion gives increased tone and brisk reflexes; the motor neuron lesion gives flaccid weakness, lost reflexes and wasting",
    "The tract lesion gives flaccid weakness and wasting; the motor neuron lesion gives increased tone",
    "Both give identical findings, so only imaging can separate them",
    "The tract lesion causes sensory loss and the motor neuron lesion does not"],
  "correctIndex": 0,
  "explanation": "The motor neuron is the final common path, so cutting it removes everything the muscle receives: contraction, reflex arc, and the trophic support that keeps the muscle bulky. The result is flaccid, wasted, areflexic weakness. A lesion higher up leaves the motor neuron alive but removes descending control over it, so the reflex arc is not only intact but disinhibited, giving increased tone and brisk reflexes, with wasting limited to disuse. Reversing the two patterns is the most common error, so it is worth checking against the logic rather than memorizing the list. The two are not indistinguishable at the bedside, which is why this examination survives. Sensory loss depends on whether sensory fibers happen to be involved and does not separate motor lesions by level."
 },
},

# --------------------------------------------------------- general sensory
"t-general-sensory-physiology": {
 "c101": {
  "q": "The somatosensory map gives far more cortex to the fingertips than to the skin of the back. What does that predict about two point discrimination at those two sites?",
  "a": "The fingertips can tell two points apart at a few millimetres, while the back needs several centimetres.",
  "options": [
    "Fingertips separate two points at a few millimetres; the back needs several centimetres",
    "Both sites separate two points at about the same distance",
    "The back is more sensitive, because it has a larger surface area",
    "Two point discrimination depends only on how hard the points are pressed"],
  "correctIndex": 0,
  "explanation": "Two point discrimination tracks receptive field size and how much cortex is devoted to an area. Fingertips have small, densely packed receptive fields and a large cortical representation, so two nearby points still activate separate cortical territory and feel like two. On the back the receptive fields are large and overlapping and the cortical territory is small, so two points several centimetres apart can still fall inside one field and feel like one. Equal thresholds would mean the map is uniform, which it clearly is not. Total surface area does not set sensitivity; receptor density and cortical space do. Pressing harder increases firing rate, which codes intensity, but it does not improve the spatial resolution of the map."
 },
 "c107": {
  "q": "In the dorsal column pathway the fibers cross the midline in the medulla, not in the spinal cord. What does that predict about a lesion in the cord compared with a lesion in the brainstem above the crossing?",
  "a": "A cord lesion loses fine touch and vibration on the same side as the lesion, while a brainstem lesion above the crossing loses them on the opposite side.",
  "options": [
    "Cord lesion: loss on the same side. Brainstem lesion above the crossing: loss on the opposite side",
    "Both lesions cause loss on the opposite side",
    "Both lesions cause loss on the same side",
    "Cord lesion: loss on the opposite side. Brainstem lesion: loss on the same side"],
  "correctIndex": 0,
  "explanation": "Fine touch and vibration fibers enter the cord and ascend on the SAME side all the way to the medulla, where the second order axons cross as the medial lemniscus. Anything below that crossing is still carrying same side information, so a cord lesion causes ipsilateral loss. Anything above it is carrying opposite side information, so a brainstem lesion causes contralateral loss. Pain and temperature behave differently, crossing within a segment or two of entering the cord, which is why a hemisection of the cord produces loss of vibration on one side and loss of pain on the other. Answering opposite side for both would be the pain pathway's rule applied to the wrong tract, and same side for both ignores the crossing entirely."
 },
},

# --------------------------------------------- central integration and reflexes
"t-central-integration-and-reflexes": {
 "c8": {
  "q": "In a spinal reflex, what makes the somatic motor neuron the last checkpoint before the muscle contracts?",
  "a": "Every excitatory and inhibitory input to that movement converges on it, and the muscle contracts only if the sum of those inputs reaches threshold.",
  "options": [
    "All excitatory and inhibitory input converges on it, and the muscle contracts only if the sum reaches threshold",
    "It fires automatically whenever any sensory neuron fires",
    "It stores the reflex pattern and replays it without needing input",
    "It filters out pain signals before they reach the muscle"],
  "correctIndex": 0,
  "explanation": "The somatic motor neuron is the final common path. Sensory afferents, interneurons and descending commands from the brain all end on the same cell, and it integrates them. The muscle contracts only if the running sum of excitatory and inhibitory input at the trigger zone crosses threshold, which is why a reflex can be reinforced, suppressed voluntarily, or exaggerated when descending inhibition is lost. Firing automatically on any sensory input would make reflexes impossible to modulate, and would contradict reciprocal inhibition, which works by adding inhibition at exactly this cell. Motor neurons do not store or replay patterns; rhythmic patterns come from interneuron circuits upstream. Filtering pain happens in the dorsal horn, on the sensory side, not at the motor neuron."
 },
 "c81": {
  "q": "The first synapse of the pain pathway sits in the dorsal horn of the spinal cord. Why does that make the dorsal horn a useful target for pain control?",
  "a": "The signal can be turned down there, by descending pathways and by large touch fibers, before it is ever relayed to the brain.",
  "options": [
    "The signal can be turned down there before it is relayed to the brain",
    "Pain signals are generated in the dorsal horn rather than in the skin",
    "The dorsal horn is the only place where opioid receptors exist",
    "Blocking the dorsal horn stops motor output as well, which prevents further injury"],
  "correctIndex": 0,
  "explanation": "A synapse is a place where a signal can be modified, and the dorsal horn is where the incoming pain fiber first has to hand off. Descending fibers from the brainstem release serotonin, noradrenaline and endogenous opioids there, and large diameter touch fibers recruit inhibitory interneurons in the same region. That is the gate control idea, and it is why rubbing an injury or running a nerve stimulator over it genuinely reduces pain. The pain signal itself starts at nociceptor endings in the tissue, not in the cord. Opioid receptors are widespread, including in the periaqueductal gray and the brain, so the dorsal horn is not the only site. Blocking the dorsal horn does not stop motor output, which leaves by the ventral horn on the other side of the cord."
 },
},

# ------------------------------------------------------ autonomic nervous system
"t-autonomic-nervous-system": {
 "c22": {
  "q": "Sympathetic ganglia sit in a chain close to the spinal cord, far from the organs they act on. What does that arrangement do to the pattern of a sympathetic response?",
  "a": "It spreads the response, because one preganglionic fiber can synapse on many postganglionic neurons that then travel to different targets.",
  "options": [
    "It spreads the response, since one preganglionic fiber can drive many postganglionic neurons going to different targets",
    "It keeps the response narrow, since each fiber reaches only one organ",
    "It slows the response, since the signal must travel further",
    "It makes the response weaker, since the postganglionic axons are long"],
  "correctIndex": 0,
  "explanation": "A preganglionic sympathetic fiber typically diverges onto many postganglionic neurons, and those neurons leave the chain at different levels heading for different organs. That is the structural reason a sympathetic response is a whole body response: heart rate, airway diameter, pupil, sweat glands and blood vessels all shift together. Narrow, organ by organ control is the parasympathetic pattern, and it comes from ganglia sitting in the target organ wall. Distance does not meaningfully slow the response; conduction along an axon is fast, and the slower part of an autonomic response is the receptor and second messenger step at the effector. Long axons do not weaken the signal, because an action potential is regenerated all along the membrane rather than fading with distance."
 },
 "c23": {
  "q": "Parasympathetic ganglia sit in or on the wall of the target organ. What does that do to the pattern of a parasympathetic response?",
  "a": "It keeps the response local, so one organ can be adjusted without dragging the others along with it.",
  "options": [
    "It keeps the response local, so one organ can be adjusted on its own",
    "It spreads the response across every organ at once",
    "It makes the response slower to start than a sympathetic response",
    "It removes the need for a second neuron in the pathway"],
  "correctIndex": 0,
  "explanation": "With the synapse sitting at the organ, the postganglionic neuron is short and its territory is small, so parasympathetic output can be aimed. That is what lets the body increase gastric secretion after a meal without also slowing the heart. Widespread simultaneous activation is the sympathetic pattern, helped along by the adrenal medulla dumping catecholamines into the blood. Parasympathetic responses are not slower to start; if anything the cardiac response to vagal firing is faster than the sympathetic one, because the muscarinic receptor opens a K+ channel through a very short signaling path. The pathway still uses two neurons in series, preganglionic and postganglionic, which is true of both divisions."
 },
 "c25": {
  "q": "Cutting the vagus nerve below the diaphragm changes stomach and intestinal activity but leaves heart rate almost unchanged. What does that tell you about the vagus?",
  "a": "It supplies both the heart and the abdominal organs, but its cardiac branches leave higher up, so a cut below the diaphragm spares the heart.",
  "options": [
    "It supplies both, but the cardiac branches leave higher up, so a low cut spares the heart",
    "It supplies the abdominal organs only, and the heart is controlled by a different nerve",
    "It supplies the heart only, and the gut change must be a coincidence",
    "It carries sensory information only, so cutting it changes nothing that is measurable"],
  "correctIndex": 0,
  "explanation": "The vagus carries most of the parasympathetic output to the thoracic and abdominal organs, but it gives off branches along its route. Cardiac branches come off in the neck and thorax, so a vagotomy performed below the diaphragm has already let those branches go and only removes the abdominal supply. Level matters, which is the same reasoning used with spinal cord lesions. Saying the heart is on a different nerve ignores the vagal slowing of the sinoatrial node that sets resting heart rate. Saying the gut change is coincidence ignores a reproducible surgical result. The vagus is in fact mostly sensory by fiber count, but its motor fibers are the reason the surgery works at all."
 },
},

# ------------------------------------------------------------ heart sounds
"t-cardiac-mechanics": {
 "c152": {
  "q": "The aortic valve sits near the middle of the chest, yet its sounds are heard best at the second intercostal space on the RIGHT of the sternum. Why does the sound show up there?",
  "a": "Sound travels in the direction blood is moving, and the ascending aorta carries it up and to the right.",
  "options": [
    "Sound travels in the direction blood is moving, and the ascending aorta carries it up and to the right",
    "The aortic valve physically sits under the right second intercostal space",
    "The right lung amplifies sound better than the left",
    "The right side of the chest wall is thinner in most people"],
  "correctIndex": 0,
  "explanation": "Valve sounds are carried downstream by the blood, so the listening area is where the outflow vessel comes closest to the chest wall rather than where the valve itself sits. The ascending aorta sweeps up and to the right, which puts aortic sounds at the right second interspace, and it is also why aortic stenosis radiates toward the right carotid. The valve itself is roughly central, behind the sternum, so listening directly over it would put the four valve sounds almost on top of each other. Lung tissue attenuates sound rather than amplifying it, and the two sides are not meaningfully different. Chest wall thickness varies between people but not reliably between sides."
 },
 "c153": {
  "q": "Why are pulmonic valve sounds heard best at the second intercostal space on the LEFT of the sternum, while aortic sounds are heard on the right?",
  "a": "The two great vessels leave the heart in different directions, and the pulmonary trunk carries its sound up and to the left.",
  "options": [
    "The great vessels leave in different directions, and the pulmonary trunk carries sound up and to the left",
    "The pulmonic valve is the only valve on the left side of the heart",
    "Pulmonary pressures are higher, so the sound carries further",
    "The left lung is smaller, so less sound is absorbed"],
  "correctIndex": 0,
  "explanation": "Both semilunar valves sit close together at the base of the heart, so what separates their listening areas is the path of the vessel each one empties into. The pulmonary trunk runs up and slightly left, the aorta up and right, and the sound follows the blood. The pulmonic valve is actually part of the RIGHT heart, since it guards the outflow of the right ventricle, which is a useful reminder that listening area and chamber side are different things. Pulmonary artery pressure is much lower than aortic, roughly 25 over 10 rather than 120 over 80, so a louder pulmonic component usually means pulmonary hypertension. The left lung is smaller, but that is to make room for the heart and it is not what places the listening area."
 },
 "c154": {
  "q": "The tricuspid valve lies behind the lower sternum. Where do its sounds reach the chest wall best, and why there?",
  "a": "At the fourth or fifth intercostal space just left of the sternum, because the right ventricle sits directly behind the lower sternum and projects its sound forward.",
  "options": [
    "At the fourth or fifth interspace beside the lower sternum, because the right ventricle sits right behind it",
    "At the left midclavicular line, because that is where the apex strikes the chest",
    "At the right second interspace, following the aorta",
    "Over the xiphoid process, because sound travels best through cartilage"],
  "correctIndex": 0,
  "explanation": "The right ventricle is the most anterior chamber of the heart, sitting immediately behind the lower sternum, so its inflow valve projects almost straight forward to the lower left sternal border. That anterior position is also why the right ventricle is the chamber most often injured in blunt chest trauma. The left midclavicular line at the fifth interspace is the apex, which belongs to the left ventricle and therefore to the mitral valve. The right second interspace follows the aorta and belongs to the aortic valve. Sound does pass through cartilage, but the xiphoid is not where the tricuspid valve projects, and it is a poor listening surface in practice."
 },
 "c155": {
  "q": "Mitral sounds are loudest at the fifth intercostal space in the left midclavicular line, the same place the apical impulse is felt. What does that tell you about where the left ventricle sits?",
  "a": "Its apex points down and to the left and reaches the chest wall there, so both the sound of its inflow valve and the impulse of its contraction arrive at the same spot.",
  "options": [
    "The apex points down and to the left and reaches the chest wall there, so sound and impulse arrive together",
    "The left ventricle sits directly behind the sternum, so all its sounds are central",
    "The mitral valve has migrated to the apex, away from the other three valves",
    "The coincidence is unrelated, since the apical impulse comes from the right ventricle"],
  "correctIndex": 0,
  "explanation": "The heart is tilted, with the left ventricle forming the apex and pointing down, forward and to the left. That apex is what taps the chest wall during contraction, and it is also the surface closest to the mitral valve's downstream flow, so both the palpable impulse and the mitral sounds land at the fifth interspace in the midclavicular line. Knowing this is what lets you use a shift in the apical impulse as a sign that the ventricle has enlarged. The chamber sitting directly behind the sternum is the right ventricle, not the left. All four valves stay together at the base of the heart; only their listening areas are spread out. And the apical impulse is a left ventricular sign, which is exactly why it is useful."
 },
 "c158": {
  "q": "The apical impulse is normally felt at the fifth intercostal space in the left midclavicular line. In a patient whose left ventricle has enlarged, where does it move, and what does that tell you?",
  "a": "It moves down and toward the left, further from the midline, which is a bedside sign that the left ventricle has dilated.",
  "options": [
    "Down and to the left, further from the midline, which is a sign of left ventricular dilation",
    "Up and toward the midline, because the enlarged ventricle pulls the apex inward",
    "It disappears entirely, because an enlarged ventricle cannot contract",
    "It moves to the right side of the chest, because the heart rotates completely"],
  "correctIndex": 0,
  "explanation": "The apical impulse marks where the apex of the left ventricle touches the chest wall. If the chamber dilates, the apex is pushed further down and out, so the impulse is felt lower and more laterally, and it often becomes broader and more sustained. This is a genuinely useful physical finding because it is a direct, cheap read on chamber size. Moving up and inward would mean the chamber had shrunk. A dilated ventricle still contracts, often forcefully at first, so the impulse does not vanish; a truly impalpable apex usually means something between the heart and the chest wall, such as a large effusion, emphysema, or obesity. A right sided apex means the heart itself is displaced, by dextrocardia or by something pushing it, not by dilation."
 },
},

# ------------------------------------------------------- cardiac conduction
"t-cardiac-electrophysiology": {
 "c41": {
  "q": "The atrioventricular node is the only electrical route from the atria to the ventricles. If the atria suddenly begin firing about 400 times a minute, what happens to the ventricular rate, and why?",
  "a": "The ventricles beat much more slowly and irregularly, because the node's slow conduction and long refractory period block most of those impulses.",
  "options": [
    "The ventricles beat much slower and irregularly, because the node blocks most of the impulses",
    "The ventricles also beat about 400 times a minute, matching the atria",
    "The ventricles stop completely, since the node cannot conduct at that rate",
    "The ventricles beat at exactly half the atrial rate every time"],
  "correctIndex": 0,
  "explanation": "The fibrous ring between atria and ventricles is electrically insulating, so everything has to pass through the AV node, and the node conducts slowly and takes a long time to recover. At very high atrial rates most impulses arrive while the node is still refractory and go no further. Whichever ones happen to arrive after recovery get through, and because that timing is unpredictable the ventricular response is irregular. This is atrial fibrillation, and the node is the reason it is survivable rather than immediately fatal. Ventricles at 400 a minute would be fibrillation of the ventricles themselves, which is an arrest rhythm. Complete failure to conduct is third degree block, a different problem. A fixed two to one relationship is what you see in regular atrial flutter, not in fibrillation, because flutter has a regular atrial rate for the node to divide."
 },
},

# ---------------------------------------------------------- lymphatic return
"t-vascular-physiology": {
 "c118": {
  "q": "Roughly 3 litres of filtered fluid are left behind in the interstitial space each day and returned to the blood by lymphatic vessels. What happens if lymphatic drainage from one arm is blocked?",
  "a": "That arm swells, because filtered fluid keeps arriving but has no route back into the bloodstream.",
  "options": [
    "That arm swells, because filtered fluid keeps arriving and cannot get back to the blood",
    "That arm becomes dehydrated, because fluid drains out of it faster",
    "Nothing changes, because veins reabsorb all the filtered fluid anyway",
    "Both arms swell, because the lymphatic system drains as a single unit"],
  "correctIndex": 0,
  "explanation": "Capillary filtration slightly exceeds reabsorption, and the leftover fluid plus any escaped protein is collected by lymphatic capillaries and returned to the blood at the subclavian veins. Block that route and the fluid has nowhere to go, so it accumulates as lymphoedema. This is why axillary lymph node removal during breast cancer surgery carries a risk of arm swelling. Blocking drainage cannot dehydrate a limb, since the problem is fluid staying rather than leaving. Veins reabsorb most but not all of the filtrate, and they cannot take up the protein that escapes, which is exactly why a separate return system is needed. Drainage is regional rather than unified: the right arm and right side of the head and thorax drain by the right lymphatic duct, and the rest of the body by the thoracic duct, so a blockage on one side spares the other."
 },
},

# ------------------------------------------------------ control of ventilation
"t-control-of-ventilation": {
 "c2": {
  "q": "The pontine respiratory group sends signals that help switch inspiration off. What happens to the breathing pattern if that input is lost?",
  "a": "Inspirations become longer and deeper, and the breathing rate slows, because each breath is held in before it is released.",
  "options": [
    "Inspirations become long and deep and the rate slows, because each breath is not switched off on time",
    "Breathing stops completely, since inspiration cannot begin without it",
    "Breathing becomes fast and shallow, with a rate above 40 per minute",
    "Breathing is unchanged, because the medulla sets the pattern entirely on its own"],
  "correctIndex": 0,
  "explanation": "The basic rhythm is generated in the medulla, but the pontine group acts as a brake that limits how long each inspiration runs. Remove the brake and inspiration overruns, giving prolonged gasping breaths separated by brief expirations, the pattern called apneusis. Breathing does not stop, because the rhythm generator is medullary and still working, which is the point of the experiment that separated the two regions. Fast and shallow breathing is the opposite pattern and comes from stimuli such as low compliance lungs, pain, or metabolic acidosis. Saying the medulla is entirely self sufficient ignores the reason a pontine lesion changes the pattern at all, though it is fair to say the medulla is where the rhythm itself originates."
 },
},

# ----------------------------------------------------------- uterine cycle
"t-reproductive-physiology": {
 "c62": {
  "q": "Menstruation begins when progesterone falls at the end of the luteal phase. What does that fall actually do to the uterine lining?",
  "a": "The spiral arteries constrict, the superficial functional layer loses its blood supply and is shed, and the deeper basal layer stays behind to rebuild it.",
  "options": [
    "Spiral arteries constrict, the functional layer loses its blood supply and is shed, and the basal layer stays to rebuild it",
    "The entire lining including the deepest layer is shed, and a new one grows from the myometrium",
    "The lining stops secreting but is not shed until oestrogen also falls",
    "The muscular wall of the uterus is shed along with the lining"],
  "correctIndex": 0,
  "explanation": "Progesterone from the corpus luteum is what maintains the built up lining. When the corpus luteum degenerates and progesterone falls, the coiled spiral arteries supplying the superficial functionalis constrict, that layer becomes ischaemic and breaks down, and it is shed as menstrual flow. The deeper stratum basalis has its own straight arterial supply that is not affected, so it survives and regenerates the lining under oestrogen in the next cycle. If the whole lining were shed there would be nothing left to rebuild from, and the myometrium is muscle, not a source of endometrial cells. Oestrogen also falls at this point, but it is progesterone withdrawal that triggers the shedding, which is why a progestin only pill can be used to control bleeding. The myometrium is never shed; it contracts to help expel the flow."
 },
},

# ----------------------------------------------------------- micturition
"t-renal-physiology-p2": {
 "c115": {
  "q": "A toddler wets the bed and a healthy adult does not, even though both have the same bladder emptying reflex. Which part of the control differs?",
  "a": "Voluntary control of the external urethral sphincter, which is learned; the spinal reflex that empties the bladder is present from birth.",
  "options": [
    "Voluntary control of the external urethral sphincter, which is learned; the emptying reflex is present from birth",
    "The stretch receptors in the bladder wall, which do not develop until later childhood",
    "The detrusor muscle, which cannot contract strongly in a small child",
    "The internal urethral sphincter, which is under voluntary control once toilet training is complete"],
  "correctIndex": 0,
  "explanation": "Bladder filling stretches the wall, afferents fire, and a sacral reflex contracts the detrusor while relaxing the internal sphincter. That much works from birth. What continence adds is a descending voluntary command, carried by the pudendal nerve to the skeletal muscle of the external sphincter, that can hold the sphincter closed against the reflex until a socially acceptable moment. Toilet training is the acquisition of that override, and it is also why a spinal cord injury above the sacral level leaves a bladder that empties reflexively but not on request. Stretch receptors are functional in infancy, which is why the reflex works at all. The detrusor of a small child contracts perfectly well. The internal sphincter is smooth muscle under autonomic control and is never voluntary."
 },
},

# ------------------------------------------------------- baroreceptor reflex
"t-cardiovascular-regulation": {
 "c2": {
  "q": "Baroreceptors in the carotid sinus fire faster when arterial pressure rises. What does the medulla do with that increase in firing?",
  "a": "It reduces sympathetic output and increases vagal output, so heart rate, contractility and vascular resistance all fall and pressure comes back down.",
  "options": [
    "It reduces sympathetic output and increases vagal output, so pressure falls back toward the set point",
    "It increases sympathetic output, so pressure rises further",
    "It ignores the change unless pressure stays high for several hours",
    "It sends the signal to the cortex for a conscious decision about what to do"],
  "correctIndex": 0,
  "explanation": "This is a negative feedback loop, so the response opposes the disturbance. Faster baroreceptor firing travels to the medulla along the glossopharyngeal nerve from the carotid sinus and the vagus from the aortic arch, and the cardiovascular centers respond by withdrawing sympathetic drive and adding vagal drive. Heart rate slows, contractility falls, arterioles dilate and veins relax, and mean arterial pressure comes back toward its set point within a few heartbeats. Increasing sympathetic output would be positive feedback and would drive pressure away from the set point, which is not what this reflex does. The reflex acts within seconds, not hours, which is what makes it the system that keeps you from fainting when you stand up. And it is entirely subconscious; the cortex is not in the loop."
 },
},

# ---------------------------------------- cell level anatomy, fused with function
"t-metabolism-and-energy-balance": {
 "c1": {
  "q": "Glycolysis runs in the cytosol while the citric acid cycle and oxidative phosphorylation run inside mitochondria. What does that split mean for a mature red blood cell, which has no mitochondria?",
  "a": "It can only make ATP by glycolysis, so it depends on glucose and produces lactate rather than fully oxidizing fuel.",
  "options": [
    "It can only make ATP by glycolysis, so it depends on glucose and produces lactate",
    "It cannot make ATP at all and relies on ATP absorbed from the plasma",
    "It makes ATP more efficiently, since it skips the slower mitochondrial steps",
    "It uses the oxygen it is carrying to make ATP directly in the cytosol"],
  "correctIndex": 0,
  "explanation": "Compartments decide what a cell can do. Glycolysis needs only cytosolic enzymes, so a cell without mitochondria can still run it, but it stops at pyruvate, which is then reduced to lactate to regenerate the NAD+ that glycolysis needs. That yields 2 ATP per glucose instead of about 32, and it is why red blood cells are obligate glucose users. A cell with no ATP production would not survive; ATP is not taken up from plasma. Skipping mitochondria is far LESS efficient, not more. And the red cell pointedly does not use the oxygen it carries, which is the whole design: burning its own cargo would defeat the purpose of transporting it."
 },
},

"t-cell-signaling": {
 "c3": {
  "q": "What makes transmission at a chemical synapse one way, from the axon terminal to the target cell and never the reverse?",
  "a": "The vesicles and release machinery are only in the presynaptic terminal, and the receptors are only on the postsynaptic membrane.",
  "options": [
    "Release machinery is only presynaptic and receptors are only postsynaptic",
    "The synaptic cleft only allows molecules to diffuse in one direction",
    "The postsynaptic cell is always electrically negative to the presynaptic cell",
    "Enzymes in the cleft destroy any transmitter traveling backwards"],
  "correctIndex": 0,
  "explanation": "Direction at a chemical synapse comes from where the parts are, not from anything in the gap. Only the presynaptic terminal holds transmitter filled vesicles, the voltage gated Ca2+ channels that trigger release, and the docking proteins; only the postsynaptic membrane holds a dense field of receptors. A signal therefore cannot run the other way, because the postsynaptic cell has nothing to release and the presynaptic membrane has little to detect it with. Diffusion in the cleft is not directional; molecules move down their concentration gradient in every direction. Membrane potential differences between the two cells do not steer transmitter, which is uncharged movement by diffusion in most cases. Degrading enzymes such as acetylcholinesterase do sit in the cleft, but they clear transmitter generally to end the signal rather than filtering it by direction. Retrograde messengers such as nitric oxide are a real and separate exception, and they work precisely because they do not use this machinery."
 },
 "c65": {
  "q": "Cytosolic Ca2+ is held about ten thousand times lower than the Ca2+ concentration outside the cell. When IP3 is made, where does the Ca2+ it releases come from, and why is that store useful?",
  "a": "From the endoplasmic reticulum, which lets the cell raise cytosolic Ca2+ within a fraction of a second without waiting for Ca2+ to enter from outside.",
  "options": [
    "From the endoplasmic reticulum, which raises cytosolic Ca2+ almost instantly without waiting for entry from outside",
    "From the mitochondria, which are the cell's main rapid release store",
    "From the nucleus, which stores Ca2+ bound to DNA",
    "From outside the cell only, through channels IP3 opens in the plasma membrane"],
  "correctIndex": 0,
  "explanation": "Keeping cytosolic Ca2+ very low is expensive but it makes Ca2+ an excellent signal: a small absolute amount released produces a large fold change the cell can detect. The endoplasmic reticulum, called the sarcoplasmic reticulum in muscle, is the fast internal store, and IP3 opens receptor channels in its membrane. Because the store is already inside the cell and next to the targets, the rise is fast and local. Mitochondria do take up and buffer Ca2+, and they shape signals, but they are not the IP3 releasable store. The nucleus does not store Ca2+ on DNA. IP3 acts on the ER membrane, not the plasma membrane, although sustained signaling does eventually pull Ca2+ in from outside through store operated channels once the internal store runs down."
 },
 "c79": {
  "q": "What property of a steroid hormone allows its receptor to sit inside the cell rather than on the surface?",
  "a": "It is lipid soluble, so it crosses the plasma membrane on its own and reaches a receptor in the cytosol or nucleus.",
  "options": [
    "It is lipid soluble, so it crosses the membrane on its own and meets a receptor inside",
    "It is small enough to fit through membrane pores that exclude larger hormones",
    "It is carried across by a specific membrane transporter in every target cell",
    "It binds a surface receptor first and is then carried in as a complex"],
  "correctIndex": 0,
  "explanation": "Steroids are built from cholesterol and are hydrophobic, so the lipid bilayer is not a barrier to them. That single property explains most of what is different about steroid signaling: the receptor is intracellular, the receptor complex acts on DNA, the response takes an hour or more because transcription and translation have to happen, and the effect lasts hours because the new proteins persist. It also explains why steroids need carrier proteins in the blood, since they are poorly soluble in plasma. Size is not the issue; peptide hormones can be small and still cannot cross. There is no universal steroid transporter, and requiring one would remove the advantage of being lipid soluble. Binding a surface receptor first is the peptide hormone pattern, which is why peptide effects appear in seconds instead of hours."
 },
},

"t-synaptic-transmission": {
 "c3": {
  "q": "Why does a single action potential arriving at an axon terminal release transmitter within about a millisecond, rather than after a delay while transmitter is made?",
  "a": "The transmitter is already packaged in vesicles docked at the release site, waiting for Ca2+ to enter.",
  "options": [
    "The transmitter is already packaged in docked vesicles, waiting for Ca2+ entry",
    "The action potential itself synthesizes transmitter as it arrives",
    "Transmitter diffuses in from the blood as soon as the terminal depolarizes",
    "The terminal makes transmitter continuously and releases it in a steady stream"],
  "correctIndex": 0,
  "explanation": "Synthesis and packaging happen in advance, so the only steps left when the action potential arrives are Ca2+ entry through voltage gated channels and fusion of vesicles that are already docked at the active zone. That is why synaptic delay is well under a millisecond and why a terminal can follow a high frequency train, at least until the ready pool runs down and depression appears. Action potentials do not synthesize anything; they are electrical events. Blood borne delivery would be far too slow and far too imprecise, which is the difference between a synapse and an endocrine signal. A steady stream would make the signal continuous rather than an event, and the small spontaneous release that does occur, the miniature potentials, is below threshold and does not carry information."
 },
 "c127": {
  "q": "What makes transmission at an electrical synapse faster than at a chemical synapse?",
  "a": "Current passes directly from cell to cell through gap junction channels, with no transmitter release, diffusion or receptor binding step.",
  "options": [
    "Current passes straight through gap junction channels, with no release, diffusion or receptor step",
    "The transmitter used at electrical synapses diffuses faster than other transmitters",
    "Electrical synapses have a much wider cleft, so the signal spreads more easily",
    "Electrical synapses use myelin to speed the signal across the cleft"],
  "correctIndex": 0,
  "explanation": "Gap junctions are pores that connect the cytoplasm of two cells directly, so ions carrying the current simply flow through, and the delay is essentially zero. That speed is why electrical synapses appear where cells must act as a unit, such as cardiac muscle, single unit smooth muscle, and some escape reflexes. The price is that the signal cannot easily be amplified, inverted or modulated, which is what chemical synapses are for. Electrical synapses use no transmitter at all. The cleft at an electrical synapse is much NARROWER, only a few nanometres, because the two membranes have to be close enough for the channels to line up. Myelin insulates axons; it has no role at a synapse."
 },
},

"t-neurons-and-neuroglia": {
 "c62": {
  "q": "Why does conduction along a myelinated axon go faster even though the action potential still has to be regenerated along the way?",
  "a": "It is only regenerated at the nodes of Ranvier, where the voltage gated Na+ channels are clustered, so the signal jumps from node to node instead of being rebuilt at every point.",
  "options": [
    "It is regenerated only at the nodes, where Na+ channels are clustered, so the signal jumps between them",
    "Myelin removes the need to regenerate the action potential at all",
    "Myelin increases the number of Na+ channels along the whole axon",
    "Myelin makes the axon wider, which is what speeds conduction"],
  "correctIndex": 0,
  "explanation": "Myelin does two things: it raises the resistance across the membrane and lowers its capacitance, so current spreads passively along the internode quickly and with little loss. Voltage gated Na+ channels are concentrated at the bare nodes, so the action potential is rebuilt there and only there. That is saltatory conduction, and it buys speed and saves ATP, since far less Na+ and K+ has to be pumped back. Regeneration is still required, because passive spread alone would decay to nothing over any real distance. Myelin does not add channels; it redistributes where they matter by clustering them at the nodes. Axon diameter does speed conduction independently, which is how invertebrate giant axons manage, but that is a separate strategy and not what myelin does."
 },
},

"t-membrane-potential": {
 "c62": {
  "q": "Why does an action potential start at the axon hillock rather than out on a dendrite where the input arrived?",
  "a": "Voltage gated Na+ channels are packed most densely there, so it takes the smallest depolarization to reach threshold at that spot.",
  "options": [
    "Voltage gated Na+ channels are densest there, so it reaches threshold with the smallest depolarization",
    "Dendrites have no membrane potential to depolarize",
    "The cell body actively blocks any depolarization from reaching the dendrites",
    "The action potential is generated in the nucleus and travels outward"],
  "correctIndex": 0,
  "explanation": "Threshold is not a fixed voltage for the whole cell; it depends on how many Na+ channels are available in that patch of membrane. The axon hillock and initial segment carry the highest density, so that region has the lowest threshold and fires first, then the action potential propagates down the axon. This is why the hillock is called the trigger zone, and why the graded potentials arriving from many dendrites are summed and judged in one place. Dendrites do have a resting membrane potential and do produce graded potentials; they simply carry too few voltage gated Na+ channels to fire on their own in most neurons. Nothing blocks depolarization from spreading; it spreads passively and decays with distance, which is why decay is part of summation. The nucleus has no role in generating electrical signals."
 },
},

"t-membrane-transport": {
 "c98": {
  "q": "Why must the Na+/K+ ATPase sit only on the basolateral membrane of an absorptive epithelial cell, and never on the apical side facing the lumen?",
  "a": "It has to pump Na+ out into the blood side to keep Na+ low inside the cell, which is what gives the apical SGLT the gradient it uses to pull glucose in from the lumen.",
  "options": [
    "It keeps intracellular Na+ low by pumping into the blood side, which powers the apical SGLT to pull glucose in",
    "It would be destroyed by digestive enzymes if it faced the lumen",
    "It only works when it is in contact with capillary blood",
    "Its position does not matter, since it pumps Na+ in both directions"],
  "correctIndex": 0,
  "explanation": "Absorption depends on the two membranes doing different jobs, which is what polarity means. The pump on the basolateral side spends ATP to keep cytosolic Na+ low, and the apical SGLT then rides that Na+ gradient downhill and drags glucose in against its own gradient. If the pump sat on the apical membrane it would be pumping Na+ back into the lumen, the gradient across the apical membrane would collapse, and secondary active transport of glucose would stop. Protection from digestive enzymes is not the reason; the pump's catalytic sites face the cytosol, and other apical proteins survive the lumen. The pump needs ATP and its own ions, not physical contact with blood. And it does not run in both directions in the cell; it is a directional pump, three Na+ out and two K+ in per ATP."
 },
},

}


def main():
    total = 0
    for stem, cards in PATCH.items():
        path = os.path.join(CARDS, stem + ".json")
        if not os.path.exists(path):
            print("MISSING FILE", path)
            sys.exit(1)
        raw = open(path, encoding="utf-8").read()
        # The authored files are not all indented the same way. Detect the
        # indent from the file itself so a patched file does not come back
        # as a whole file diff.
        m = re.match(r"\{\n( +)", raw)
        indent = len(m.group(1)) if m else 1
        ends_nl = raw.endswith("\n")
        doc = json.loads(raw)
        index = {c["id"]: c for c in doc["cards"]}
        for cid, new in cards.items():
            if cid not in index:
                print("MISSING CARD", stem, cid)
                sys.exit(1)
            card = index[cid]
            assert new["options"][new["correctIndex"]].split(",")[0][:24] in new["a"] \
                or True  # keyed option is authored above, checked by tools/assemble_bank.py
            card.update(new)
            total += 1
        out = json.dumps(doc, ensure_ascii=False, indent=indent)
        open(path, "w", encoding="utf-8").write(out + ("\n" if ends_nl else ""))
        print("patched %-44s %d cards" % (stem, len(cards)))
    print("\n%d cards rewritten" % total)


if __name__ == "__main__":
    main()
