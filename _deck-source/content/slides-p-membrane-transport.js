/* BIO 005 Human Physiology, Week 2, Unit 1.
   P deck, Membrane Transport.
   The middle third of "How things get in and out of a cell":
   what happens when diffusion alone will not do it.
   Dr. Sharilyn Rennie */

const FIG_CURVE = `<svg viewBox="0 0 780 480" role="img" aria-labelledby="x1-t x1-d">
  <title id="x1-t">Rate of transport plotted against concentration outside the cell</title>
  <desc id="x1-d">Two lines start together at the origin. The teal line for simple diffusion is straight and keeps climbing to the top right corner with no upper limit. The maroon line for carrier mediated transport climbs steeply at first, bends over between one third and one half of the way across, and then runs flat for the rest of the graph. A gold dashed horizontal line sits on that flat top and is labeled transport maximum. The horizontal axis is concentration outside the cell and the vertical axis is rate of transport into the cell.</desc>
  <rect x="0" y="0" width="780" height="480" fill="#FFFFFF"/>
  <line x1="100" y1="400" x2="730" y2="400" stroke="#0B1530" stroke-width="2.5"/>
  <line x1="100" y1="400" x2="100" y2="65" stroke="#0B1530" stroke-width="2.5"/>
  <polygon points="730,392 746,400 730,408" fill="#0B1530"/>
  <polygon points="92,65 100,49 108,65" fill="#0B1530"/>
  <line x1="100" y1="163" x2="722" y2="163" stroke="#C9A14A" stroke-width="2.5" stroke-dasharray="10 7"/>
  <path d="M 100 400 C 170 300, 230 220, 320 190 C 430 172, 540 166, 700 163" fill="none" stroke="#8B3A2E" stroke-width="4"/>
  <line x1="100" y1="400" x2="700" y2="90" stroke="#1F4E55" stroke-width="4"/>
  <text x="430" y="118" font-family="Plus Jakarta Sans, sans-serif" font-size="17" font-weight="700" fill="#1F4E55">Simple diffusion</text>
  <text x="430" y="222" font-family="Plus Jakarta Sans, sans-serif" font-size="17" font-weight="700" fill="#8B3A2E">Carrier mediated</text>
  <text x="722" y="150" text-anchor="end" font-family="Plus Jakarta Sans, sans-serif" font-size="15" font-weight="700" fill="#0B1530">Transport maximum</text>
  <text x="415" y="447" text-anchor="middle" font-family="Plus Jakarta Sans, sans-serif" font-size="15" fill="#3D4860">Concentration outside the cell</text>
  <text x="44" y="232" text-anchor="middle" transform="rotate(-90 44 232)" font-family="Plus Jakarta Sans, sans-serif" font-size="15" fill="#3D4860">Rate of transport into the cell</text>
  <text x="466" y="292" font-family="Plus Jakarta Sans, sans-serif" font-size="14" fill="#3D4860">No binding site, so nothing to fill up</text>
  <line x1="462" y1="286" x2="420" y2="243" stroke="#3D4860" stroke-width="2"/>
</svg>`;

const FIG_PUMP = `<svg viewBox="0 0 780 470" role="img" aria-labelledby="x2-t x2-d">
  <title id="x2-t">The sodium potassium ATPase in the cell membrane</title>
  <desc id="x2-d">A horizontal membrane band crosses the picture with the outside of the cell above it and the inside below it. A pump protein spans the band in the middle. To the left of the pump a maroon arrow points upward and out of the cell carrying three sodium ions, from about 12 millimolar inside to about 145 millimolar outside. To the right of the pump a teal arrow points downward into the cell carrying two potassium ions, from about 4 millimolar outside to about 140 millimolar inside. A gold box below the pump marks one ATP hydrolyzed per cycle. Three positive charges leave and two return, so one net positive charge leaves per cycle.</desc>
  <rect x="0" y="0" width="780" height="470" fill="#FFFFFF"/>
  <rect x="40" y="170" width="700" height="130" fill="#EDF1F3" stroke="#3D4860" stroke-width="2"/>
  <text x="60" y="52" font-family="Plus Jakarta Sans, sans-serif" font-size="15" font-weight="800" fill="#0B1530">OUTSIDE THE CELL</text>
  <text x="60" y="345" font-family="Plus Jakarta Sans, sans-serif" font-size="15" font-weight="800" fill="#0B1530">INSIDE THE CELL</text>
  <text x="742" y="52" text-anchor="end" font-family="Plus Jakarta Sans, sans-serif" font-size="15" fill="#8B3A2E">Na+ about 145 mM</text>
  <text x="742" y="76" text-anchor="end" font-family="Plus Jakarta Sans, sans-serif" font-size="15" fill="#1F4E55">K+ about 4 mM</text>
  <text x="742" y="378" text-anchor="end" font-family="Plus Jakarta Sans, sans-serif" font-size="15" fill="#8B3A2E">Na+ about 12 mM</text>
  <text x="742" y="402" text-anchor="end" font-family="Plus Jakarta Sans, sans-serif" font-size="15" fill="#1F4E55">K+ about 140 mM</text>
  <rect x="300" y="140" width="170" height="190" rx="16" fill="#1F4E55" stroke="#0B1530" stroke-width="2.5"/>
  <text x="385" y="222" text-anchor="middle" font-family="Plus Jakarta Sans, sans-serif" font-size="19" font-weight="800" fill="#FFFFFF">Na+ / K+</text>
  <text x="385" y="250" text-anchor="middle" font-family="Plus Jakarta Sans, sans-serif" font-size="19" font-weight="800" fill="#C9A14A">ATPase</text>
  <line x1="230" y1="340" x2="230" y2="126" stroke="#8B3A2E" stroke-width="5"/>
  <polygon points="218,126 230,102 242,126" fill="#8B3A2E"/>
  <text x="230" y="88" text-anchor="middle" font-family="Plus Jakarta Sans, sans-serif" font-size="19" font-weight="800" fill="#8B3A2E">3 Na+ out</text>
  <line x1="545" y1="126" x2="545" y2="340" stroke="#1F4E55" stroke-width="5"/>
  <polygon points="533,340 545,364 557,340" fill="#1F4E55"/>
  <text x="545" y="88" text-anchor="middle" font-family="Plus Jakarta Sans, sans-serif" font-size="19" font-weight="800" fill="#1F4E55">2 K+ in</text>
  <rect x="322" y="348" width="126" height="40" rx="8" fill="#C9A14A" stroke="#0B1530" stroke-width="2"/>
  <text x="385" y="375" text-anchor="middle" font-family="Plus Jakarta Sans, sans-serif" font-size="17" font-weight="800" fill="#0B1530">1 ATP</text>
  <line x1="385" y1="346" x2="385" y2="336" stroke="#0B1530" stroke-width="2.5"/>
  <polygon points="377,336 385,320 393,336" fill="#0B1530"/>
  <text x="60" y="440" font-family="Plus Jakarta Sans, sans-serif" font-size="14" fill="#3D4860">Three positive charges out, two back in, so one net positive charge leaves per cycle.</text>
</svg>`;

const FIG_RENAL = `<svg viewBox="0 0 800 500" role="img" aria-labelledby="x3-t x3-d">
  <title id="x3-t">Renal glucose titration, filtered, reabsorbed and excreted against plasma glucose</title>
  <desc id="x3-d">Plasma glucose runs from 0 to 600 milligrams per decilitre along the bottom and rate runs from 0 to 800 milligrams per minute up the side. The navy filtered load line is straight from the origin and reaches about 750 milligrams per minute at a plasma glucose of 600. The teal reabsorption line follows the filtered line exactly at low values, bends over near a plasma glucose of 300, and then runs flat at a transport maximum of about 375 milligrams per minute. The maroon excretion line sits on zero until a plasma glucose near 180 to 200, marked by a gold dashed vertical line called the renal threshold, then curves upward and finally runs parallel to the filtered line, reaching about 375 milligrams per minute at a plasma glucose of 600.</desc>
  <rect x="0" y="0" width="800" height="500" fill="#FFFFFF"/>
  <line x1="110" y1="420" x2="756" y2="420" stroke="#0B1530" stroke-width="2.5"/>
  <line x1="110" y1="420" x2="110" y2="66" stroke="#0B1530" stroke-width="2.5"/>
  <polygon points="756,412 772,420 756,428" fill="#0B1530"/>
  <polygon points="102,66 110,50 118,66" fill="#0B1530"/>
  <line x1="110" y1="261" x2="748" y2="261" stroke="#C9A14A" stroke-width="2.5" stroke-dasharray="10 7"/>
  <line x1="320" y1="420" x2="320" y2="150" stroke="#C9A14A" stroke-width="2.5" stroke-dasharray="10 7"/>
  <path d="M 110 420 L 740 101" fill="none" stroke="#0B1530" stroke-width="4"/>
  <path d="M 110 420 L 360 293 Q 425 261 500 261 L 740 261" fill="none" stroke="#1F4E55" stroke-width="4"/>
  <path d="M 110 420 L 320 420 C 380 418, 430 408, 477 393 L 740 261" fill="none" stroke="#8B3A2E" stroke-width="4"/>
  <text x="688" y="92" text-anchor="end" font-family="Plus Jakarta Sans, sans-serif" font-size="16" font-weight="700" fill="#0B1530">Filtered load</text>
  <text x="556" y="292" font-family="Plus Jakarta Sans, sans-serif" font-size="16" font-weight="700" fill="#1F4E55">Reabsorbed</text>
  <text x="590" y="362" font-family="Plus Jakarta Sans, sans-serif" font-size="16" font-weight="700" fill="#8B3A2E">Excreted</text>
  <text x="748" y="248" text-anchor="end" font-family="Plus Jakarta Sans, sans-serif" font-size="14" font-weight="700" fill="#0B1530">Transport maximum, about 375 mg/min</text>
  <text x="332" y="142" font-family="Plus Jakarta Sans, sans-serif" font-size="14" font-weight="700" fill="#0B1530">Renal threshold, about 180 to 200 mg/dL</text>
  <text x="110" y="442" text-anchor="middle" font-family="Plus Jakarta Sans, sans-serif" font-size="13" fill="#3D4860">0</text>
  <text x="320" y="442" text-anchor="middle" font-family="Plus Jakarta Sans, sans-serif" font-size="13" fill="#3D4860">200</text>
  <text x="530" y="442" text-anchor="middle" font-family="Plus Jakarta Sans, sans-serif" font-size="13" fill="#3D4860">400</text>
  <text x="740" y="442" text-anchor="middle" font-family="Plus Jakarta Sans, sans-serif" font-size="13" fill="#3D4860">600</text>
  <text x="100" y="425" text-anchor="end" font-family="Plus Jakarta Sans, sans-serif" font-size="13" fill="#3D4860">0</text>
  <text x="100" y="340" text-anchor="end" font-family="Plus Jakarta Sans, sans-serif" font-size="13" fill="#3D4860">200</text>
  <text x="100" y="170" text-anchor="end" font-family="Plus Jakarta Sans, sans-serif" font-size="13" fill="#3D4860">600</text>
  <text x="425" y="472" text-anchor="middle" font-family="Plus Jakarta Sans, sans-serif" font-size="15" fill="#3D4860">Plasma glucose (mg/dL)</text>
  <text x="46" y="245" text-anchor="middle" transform="rotate(-90 46 245)" font-family="Plus Jakarta Sans, sans-serif" font-size="15" fill="#3D4860">Rate (mg/min)</text>
</svg>`;

const FIG_EPI = `<svg viewBox="0 0 820 470" role="img" aria-labelledby="x4-t x4-d">
  <title id="x4-t">A polarized gut cell moving glucose from the lumen to the blood</title>
  <desc id="x4-d">A single tall cell sits between the gut lumen on the left and the blood on the right. Its left wall is the apical membrane and carries two proteins: SGLT1 near the top, bringing sodium and glucose into the cell together, and CFTR near the bottom, letting chloride out into the lumen. Its right wall is the basolateral membrane and carries GLUT2 near the top, letting glucose leave into the blood, and the sodium potassium ATPase below it, pumping three sodium out to the blood and two potassium in. Gold blocks at the top corners of the cell mark the tight junctions that keep the two faces different. A long arrow beneath the cell shows water following by osmosis from lumen to blood.</desc>
  <rect x="0" y="0" width="820" height="470" fill="#FFFFFF"/>
  <text x="410" y="28" text-anchor="middle" font-family="Plus Jakarta Sans, sans-serif" font-size="14" fill="#3D4860">Tight junctions at the top of the cell stop the proteins of one face from drifting to the other.</text>
  <rect x="200" y="70" width="400" height="310" fill="#EDF1F3" stroke="#3D4860" stroke-width="2"/>
  <line x1="200" y1="70" x2="200" y2="380" stroke="#8B3A2E" stroke-width="6"/>
  <line x1="600" y1="70" x2="600" y2="380" stroke="#1F4E55" stroke-width="6"/>
  <rect x="186" y="58" width="28" height="20" fill="#C9A14A" stroke="#0B1530" stroke-width="2"/>
  <rect x="586" y="58" width="28" height="20" fill="#C9A14A" stroke="#0B1530" stroke-width="2"/>
  <text x="208" y="100" font-family="Plus Jakarta Sans, sans-serif" font-size="13" font-weight="800" fill="#8B3A2E">APICAL, faces the lumen</text>
  <text x="592" y="100" text-anchor="end" font-family="Plus Jakarta Sans, sans-serif" font-size="13" font-weight="800" fill="#1F4E55">BASOLATERAL, faces the blood</text>
  <text x="40" y="60" font-family="Plus Jakarta Sans, sans-serif" font-size="16" font-weight="800" fill="#0B1530">GUT LUMEN</text>
  <text x="780" y="60" text-anchor="end" font-family="Plus Jakarta Sans, sans-serif" font-size="16" font-weight="800" fill="#0B1530">BLOOD</text>
  <rect x="168" y="130" width="64" height="76" rx="10" fill="#8B3A2E" stroke="#0B1530" stroke-width="2"/>
  <text x="200" y="174" text-anchor="middle" font-family="Plus Jakarta Sans, sans-serif" font-size="14" font-weight="800" fill="#FFFFFF">SGLT1</text>
  <line x1="92" y1="168" x2="262" y2="168" stroke="#8B3A2E" stroke-width="4"/>
  <polygon points="262,158 282,168 262,178" fill="#8B3A2E"/>
  <text x="86" y="150" text-anchor="end" font-family="Plus Jakarta Sans, sans-serif" font-size="15" fill="#8B3A2E">2 Na+</text>
  <text x="86" y="178" text-anchor="end" font-family="Plus Jakarta Sans, sans-serif" font-size="15" fill="#8B3A2E">glucose</text>
  <rect x="168" y="278" width="64" height="64" rx="10" fill="#3D4860" stroke="#0B1530" stroke-width="2"/>
  <text x="200" y="316" text-anchor="middle" font-family="Plus Jakarta Sans, sans-serif" font-size="14" font-weight="800" fill="#FFFFFF">CFTR</text>
  <line x1="262" y1="310" x2="112" y2="310" stroke="#3D4860" stroke-width="4"/>
  <polygon points="112,300 92,310 112,320" fill="#3D4860"/>
  <text x="86" y="315" text-anchor="end" font-family="Plus Jakarta Sans, sans-serif" font-size="15" fill="#3D4860">Cl-</text>
  <rect x="568" y="130" width="64" height="76" rx="10" fill="#1F4E55" stroke="#0B1530" stroke-width="2"/>
  <text x="600" y="174" text-anchor="middle" font-family="Plus Jakarta Sans, sans-serif" font-size="14" font-weight="800" fill="#FFFFFF">GLUT2</text>
  <line x1="538" y1="168" x2="714" y2="168" stroke="#1F4E55" stroke-width="4"/>
  <polygon points="714,158 734,168 714,178" fill="#1F4E55"/>
  <text x="742" y="173" font-family="Plus Jakarta Sans, sans-serif" font-size="15" fill="#1F4E55">glucose</text>
  <rect x="556" y="252" width="88" height="92" rx="10" fill="#0B1530" stroke="#0B1530" stroke-width="2"/>
  <text x="600" y="292" text-anchor="middle" font-family="Plus Jakarta Sans, sans-serif" font-size="14" font-weight="800" fill="#FFFFFF">Na+ / K+</text>
  <text x="600" y="314" text-anchor="middle" font-family="Plus Jakarta Sans, sans-serif" font-size="14" font-weight="800" fill="#C9A14A">ATPase</text>
  <line x1="538" y1="272" x2="700" y2="272" stroke="#0B1530" stroke-width="4"/>
  <polygon points="700,262 720,272 700,282" fill="#0B1530"/>
  <text x="728" y="277" font-family="Plus Jakarta Sans, sans-serif" font-size="15" fill="#0B1530">3 Na+</text>
  <line x1="700" y1="326" x2="666" y2="326" stroke="#0B1530" stroke-width="4"/>
  <polygon points="666,316 646,326 666,336" fill="#0B1530"/>
  <text x="728" y="331" font-family="Plus Jakarta Sans, sans-serif" font-size="15" fill="#0B1530">2 K+</text>
  <line x1="120" y1="412" x2="694" y2="412" stroke="#1F4E55" stroke-width="4" stroke-dasharray="12 8"/>
  <polygon points="694,402 714,412 694,422" fill="#1F4E55"/>
  <text x="410" y="450" text-anchor="middle" font-family="Plus Jakarta Sans, sans-serif" font-size="15" font-weight="700" fill="#1F4E55">Water follows by osmosis. It is never pumped.</text>
</svg>`;

module.exports = {
  id: "slides-p-membrane-transport",
  letter: "P",
  type: "Physiology",
  week: 2,
  unit: 1,
  topic: "Membrane Transport",
  title: "What a cell does when diffusion is not enough",
  subtitle: "Carriers, pumps, and the sodium gradient that pays for almost everything in this course.",

  slides: [

    /* 1 */
    {
      k: "title",
      variant: "terra",
      kicker: "Physiology, Unit 1, Week 2",
      h: "What a cell does when **diffusion is not enough**",
      lede: "Oxygen and carbon dioxide cross a membrane on their own. Glucose does not. Sodium will not go the way the cell needs it to go, and a bacterium will not fit through anything. So the cell hires proteins, and for some of them it pays cash. Today you find out who works for free, who takes a wage, and who gets paid out of somebody else's wages.",
      terms: [
        { t: "Facilitated diffusion", c: "l" },
        { t: "Channel", c: "l" },
        { t: "Carrier", c: "t" },
        { t: "Primary active transport", c: "t" },
        { t: "Secondary active transport", c: "t" },
        { t: "Symport", c: "g" },
        { t: "Antiport", c: "g" },
        { t: "Transport maximum", c: "g" },
        { t: "Endocytosis", c: "l" },
        { t: "Exocytosis", c: "l" }
      ],
      big: "Downhill is free. Uphill costs, and somebody always pays."
    },

    /* 2 */
    {
      k: "rows",
      kicker: "Where we are going",
      h: "Six questions. By the end of the hour you can answer all six out loud",
      lede: "Open a box to see the answer. You are not memorizing this slide, you are just finding out where we are headed.",
      rows: [
        { dot: "1", dotClass: "navy", h: "Why does a carrier run out of capacity when simple diffusion never does?", p: "Facilitated diffusion. Channels, carriers, and the binding site that puts a ceiling on the whole thing." },
        { dot: "2", dotClass: "navy", h: "Where does a resting cell spend a quarter of all the energy it makes?", p: "The sodium potassium ATPase. Three Na+ out, two K+ in, one ATP, over and over, for as long as you are alive." },
        { dot: "3", dotClass: "terra", h: "How do you move glucose uphill without spending any ATP on it?", p: "Secondary active transport. You let sodium fall downhill and you make it carry glucose up on the way past." },
        { dot: "4", dotClass: "terra", h: "Why does sugar appear in the urine once blood glucose gets near 180 mg/dL?", p: "Transport maximum, and splay. The busiest nephrons run out of carriers first, so glucose starts spilling into the urine well before the kidney as a whole is saturated." },
        { dot: "5", dotClass: "navy", h: "How does a drink of salt and sugar save a life when plain water would not?", p: "Transepithelial transport. In at the apical face, out at the basolateral face, and water follows the salt the whole way." },
        { dot: "6", dotClass: "navy", h: "What do you do when the cargo is too big for any protein?", p: "Vesicular transport. The membrane wraps around it and swallows it whole." }
      ],
      big: "Every one of those six is a question about where the energy came from."
    },

    /* 3 */
    {
      k: "text",
      kicker: "The case",
      h: "Kofi is still in front of you",
      lede: "Twenty four years old, back from travel, passing liter after liter of clear rice water stool for two days now. Last week you did the whole body arithmetic on him. This week you go to the membrane.",
      body: [
        "At 70 kg his total body water is about **42 L**, two thirds inside cells and one third outside. Of the 14 L outside, only about 3 L is plasma, and that is the part holding his blood pressure up.",
        "About eight liters out over two days, and next to nothing staying down by mouth, so he is down about 8 L net. That is more than ten percent of his body mass, and it drained out of the compartment that could least afford to lose it.",
        "Last week the question was how much he lost. This week the question is harder and more useful. What physically pushed that water out of him, and what is going to pull it back?"
      ],
      big: "Every liter of that stool was moved by a transporter. So is every liter of the cure."
    },

    /* 4 */
    {
      k: "cards",
      cols: 3,
      kicker: "Why we need the rest of the hour",
      h: "Three jobs simple diffusion cannot do",
      lede: "Simple diffusion moves a molecule down its own gradient, straight through the lipid, with no protein and no ATP. It is fast, it is free, and it fails at exactly three things.",
      cards: [
        {
          label: "Problem one", labelClass: "terra",
          h: "Glucose is a small molecule. Why can it not just diffuse in?",
          p: [
            "Small, yes, but covered in hydroxyl groups, so it is polar. The middle of the bilayer is greasy, and polar molecules do not dissolve into grease.",
            "Anything charged or strongly polar needs a protein to get across. That includes every single ion in this course."
          ]
        },
        {
          label: "Problem two",
          h: "What if the cell needs to move something the wrong way?",
          p: [
            "Diffusion only ever goes downhill. It stops the moment the two sides are equal, and it can never build a gradient that was not already there.",
            "But the cell lives on gradients. Sodium high outside and potassium high inside are not accidents, and no downhill process could have made them."
          ]
        },
        {
          label: "Problem three",
          h: "What about cargo bigger than any pore?",
          p: [
            "A bacterium, a droplet of extracellular fluid, an LDL particle, a packaged hormone. Nothing that size fits through a channel, no matter how the channel is built.",
            "For those the membrane itself has to move, wrapping around the cargo and pinching off behind it. That is the last section of the hour."
          ]
        }
      ],
      big: "Three problems, three answers: a protein, a pump, or the membrane itself."
    },

    /* 5 */
    {
      k: "cards",
      cols: 2,
      kicker: "Facilitated diffusion",
      h: "Two ways a protein helps something across",
      lede: "Transport through a membrane protein, down the gradient, with no ATP spent, is **facilitated diffusion**. Both kinds below are still diffusion, so both go downhill only and both stop dead when the two sides are equal.",
      cards: [
        {
          label: "Channel", labelClass: "teal",
          h: "What is a channel, in one sentence?",
          p: [
            "A water filled pore that goes all the way through the protein. When it is open the ion falls through, and the protein does not have to change shape around it.",
            "Fast, and fast here means fast. One open potassium channel passes tens of millions of ions per second. Its selectivity comes from the size and the charge of the pore, not from grabbing anything."
          ],
          list: ["Aquaporin, for water", "CFTR, for Cl-", "Potassium leak channels, which set the resting membrane potential in the third deck this week"]
        },
        {
          label: "Carrier", labelClass: "terra",
          h: "What does a carrier do that a channel never does?",
          p: [
            "It binds. The solute sits down in a binding site, the protein changes shape, and the solute is released on the other side. The path is never open to both sides at once.",
            "That binding step is the whole story of this deck. Binding is why carriers are picky, why they can be blocked, and why they run out of capacity."
          ],
          list: ["GLUT2, glucose into a liver cell", "GLUT4, glucose into muscle and fat when insulin says so", "Every pump and every cotransporter you meet today is a carrier"]
        }
      ],
      covers: ["w2-facilitated-diffusion"],
      big: "Channels do not bind. Carriers do, and everything else follows from that one difference."
    },

    /* 6 */
    {
      k: "fig",
      kicker: "Read the graph",
      h: "Put the two on the same axes and the difference is obvious",
      lede: "Concentration outside along the bottom, rate of entry up the side. One line climbs forever. The other hits a ceiling and stays there.",
      svg: FIG_CURVE,
      cap: "Simple diffusion, in teal, is a straight line. Double the gradient and you double the rate, with no upper limit anywhere. Carrier mediated transport, in maroon, climbs steeply at first and then flattens out at the transport maximum, marked by the gold dashed line.",
      covers: ["w2-facilitated-diffusion", "w2-transport-maximum"],
      big: "A flat top on a transport graph is the fingerprint of a binding site."
    },

    /* 7 */
    {
      k: "text",
      kicker: "Why the ceiling exists",
      h: "There are only so many carriers, and each one has to let go before it can grab again",
      lede: "This is the part worth slowing down for, because three exam properties all come out of one physical fact.",
      body: [
        "Picture the membrane. There is a fixed number of carrier proteins sitting in it, and each one runs a cycle: bind, change shape, release, change back. That cycle takes time.",
        "At a low outside concentration most carriers are empty and waiting, so raising the concentration finds them more work and the rate climbs. Keep raising it and eventually every carrier is occupied every moment. Now adding more solute changes nothing at all, because there is nothing left to bind to. That ceiling is the **transport maximum**.",
        "Simple diffusion has no protein, so there is nothing to saturate. No binding site to fill, no cycle to wait for, which is exactly why its line just keeps going up.",
        "The same binding site hands you two more properties. **Specificity**, because the site fits one shape and not another, which is why GLUT carries glucose and galactose well and does essentially nothing with an amino acid. And competition, because two molecules that fit the same site get in each other's way, so adding one slows the other down."
      ],
      covers: ["w2-facilitated-diffusion"],
      big: "Saturation, specificity, competition. Three words, one cause: the binding site."
    },

    /* 8 */
    {
      k: "hook",
      kicker: "Memory hook",
      h: "One picture for channel against carrier",
      hook: {
        icon: "?",
        iconClass: "teal",
        label: "Memory hook",
        h: "The propped door and the revolving door",
        say: "A channel is a door propped open. A carrier is a revolving door, and a revolving door has a maximum number of people per minute.",
        p: [
          "Prop a door open and the crowd pours through as fast as it arrives. Twice the crowd, twice the flow. Nobody has to be admitted one at a time and the door never gets tired. That is a channel, and it is why channels are so fast.",
          "A revolving door takes one person into a compartment, turns, and lets them out the other side. At a quiet moment the door is waiting for people, so more people means more flow. At rush hour the door is already turning as fast as it turns. The queue outside gets longer and longer while the flow through the door stays exactly the same.",
          "Both doors only work in the direction the crowd is already going. Neither one pushes anybody uphill. For that you need the next section."
        ]
      },
      big: "Rush hour at the revolving door is the transport maximum."
    },

    /* 9 */
    {
      k: "table",
      kicker: "Side by side",
      h: "The three unassisted and assisted routes across a membrane",
      caption: "Simple diffusion, channel mediated diffusion and carrier mediated diffusion, compared on the features you will be asked about.",
      cols: ["What you are asking", "Simple diffusion", "Channel mediated", "Carrier mediated"],
      rows: [
        ["Protein needed?", "No, straight through the lipid", "Yes, a pore", "Yes, a binding protein"],
        ["ATP needed?", "No", "No", "Not for facilitated diffusion. Yes for a pump."],
        ["Direction", "Downhill only", "Downhill only", "Downhill for facilitated diffusion, either way for a pump"],
        ["Does it saturate?", "No, the line stays straight", "Effectively no", "Yes, at the transport maximum"],
        ["Is it specific?", "No, anything lipid soluble crosses", "Selective by size and charge", "Yes, and it can be competed for"],
        ["Typical speed", "Depends on lipid solubility", "Very fast, millions of ions per second", "Slower, thousands per second"],
        ["Examples", "O2, CO2, steroid hormones, alcohol", "Aquaporin, CFTR, K+ leak channels", "GLUT1, GLUT2, GLUT4"]
      ],
      covers: ["w2-facilitated-diffusion"],
      big: "If it saturates, something bound it. If it does not, nothing did."
    },

    /* 10 */
    {
      k: "cards",
      cols: 3,
      kicker: "Where you meet it",
      h: "The GLUT family, and one of them takes orders",
      lede: "All the GLUT carriers move glucose down its gradient, and none of them uses ATP. Which one a tissue puts in its membrane tells you how that tissue wants to be treated.",
      cards: [
        {
          label: "GLUT1", labelClass: "teal",
          h: "Which tissues cannot afford to wait for a signal?",
          p: [
            "Brain and red blood cells. GLUT1 sits in the membrane all the time and binds glucose tightly, so those cells keep taking it up even when blood glucose is running low.",
            "This is why the brain has no glucose store and no patience. It does not stockpile anything, it just keeps drawing."
          ]
        },
        {
          label: "GLUT4",
          h: "Which one only shows up when insulin tells it to?",
          p: [
            "GLUT4, in skeletal muscle and in fat. At rest most of it is parked in vesicles inside the cell, not in the surface membrane at all.",
            "Insulin binds its receptor, those vesicles fuse with the surface, and now there are more carriers, so uptake climbs. That is exocytosis being used as a volume knob, and you will meet it again at the end of the hour.",
            "In type 2 diabetes the insulin arrives and this step answers weakly. The carrier itself is fine. The order is not getting through."
          ]
        },
        {
          label: "GLUT2", labelClass: "terra",
          h: "Which one is deliberately bad at its job?",
          p: [
            "GLUT2, in the liver and in the pancreatic beta cell. It binds glucose loosely, so it only moves glucose quickly when glucose is high.",
            "That is the point of it. The beta cell uses GLUT2 as a sensor: uptake rises with blood glucose, ATP rises inside, and insulin gets released. A carrier that saturated at a normal blood glucose could not report anything at all."
          ]
        }
      ],
      big: "Same sugar, same direction, three different jobs. The carrier is the decision."
    },

    /* 11 */
    {
      k: "text",
      variant: "dark",
      kicker: "Active transport",
      h: "Downhill is free. Uphill has to be paid for",
      lede: "Everything so far moved a solute down its own gradient. Now the cell wants the opposite, and that is not a matter of finding a better protein. It is a matter of energy.",
      body: [
        "Moving a solute against its electrochemical gradient is work, and work needs energy. There are exactly two ways a cell pays for it, and telling them apart is most of what this section is about.",
        "In **primary active transport** the carrier hydrolyses ATP itself. The protein is an enzyme as well as a carrier, which is why the name ends in ATPase. Energy in, gradient out.",
        "In **secondary active transport** no ATP touches the carrier at all. One solute is allowed to fall down the gradient it already has, and the energy released by that fall drags a second solute uphill alongside it.",
        "Secondary is not free, though, and this is the sentence students miss. Somebody built the gradient it is spending, and that somebody was a pump burning ATP. Secondary active transport is ATP energy arriving second hand."
      ],
      big: "Primary charges the battery. Secondary spends it."
    },

    /* 12 */
    {
      k: "fig",
      kicker: "Primary active transport",
      h: "The sodium potassium ATPase, three out and two in",
      lede: "It is in the membrane of every cell you own. One cycle, one ATP, three Na+ out, two K+ in, and it does not stop while you are alive.",
      svg: FIG_PUMP,
      cap: "The pump spans the membrane. On the left, three Na+ leave against a gradient that runs from about 12 mM inside up to about 145 mM outside. On the right, two K+ enter against a gradient that runs from about 4 mM outside up to about 140 mM inside. One ATP is hydrolyzed per cycle.",
      lab: "In the Week 2 lab you classify this pump on the transporter table for Kofi's gut cell. Three columns: carrier or channel, passive or active, and if active, primary or secondary. It is a carrier, it is active, and it is primary, and the reason it is primary is that the transport protein hydrolyses the ATP itself.",
      covers: ["w2-primary-active-transport"],
      big: "**3 Na+ out, 2 K+ in, 1 ATP.** Say it until it is boring."
    },

    /* 13 */
    {
      k: "rows",
      kicker: "One cycle",
      h: "What actually happens in the pump, in five steps",
      lede: "Do not memorize the words. Follow what the phosphate group does to the shape, because the shape is doing all the work.",
      rows: [
        { dot: "1", dotClass: "navy", h: "Where does the cycle start?", p: "The pump is open to the inside of the cell, and three Na+ from the cytosol bind to it. Inside Na+ is low, about 12 mM, so those three are relatively hard to come by. That is not a design flaw, it is the point." },
        { dot: "2", dotClass: "navy", h: "What does the ATP actually do?", p: "ATP is hydrolyzed and a phosphate group is attached to the pump. That phosphorylation is what changes the protein's shape. The ATP is not burned to shove sodium anywhere, it is burned to buy a change of shape." },
        { dot: "3", dotClass: "terra", h: "How do those three sodium ions get out into 145 mM?", p: "The new shape opens to the outside and holds Na+ much more loosely, so the three ions are simply released into a solution that is already ten times more concentrated. The shape change did the uphill work before the ions ever left." },
        { dot: "4", dotClass: "navy", h: "What comes back in?", p: "Two K+ bind from the outside, where K+ is only about 4 mM. Their binding is what triggers removal of the phosphate group." },
        { dot: "5", dotClass: "navy", h: "And then?", p: "With the phosphate gone the pump snaps back to facing inward, its grip on K+ loosens, and the two K+ are released into a cytosol that already holds about 140 mM. The pump is back where it started and the cycle runs again." }
      ],
      covers: ["w2-primary-active-transport"],
      big: "The ATP buys a change of shape. The change of shape buys the gradient."
    },

    /* 14 */
    {
      k: "cards",
      cols: 3,
      kicker: "Why it is worth the money",
      h: "Three things you get for that ATP",
      lede: "This is the competency in one slide. Name the two gradients, then say what else the pump is quietly doing while it maintains them.",
      cards: [
        {
          label: "Job one", labelClass: "terra",
          h: "Which two gradients does the pump maintain?",
          p: [
            "The sodium gradient, high outside at about 145 mM and low inside at about 12 mM. And the potassium gradient, high inside at about 140 mM and low outside at about 4 mM.",
            "Those four numbers answer half the questions in the next three weeks. The Na+ gradient powers every secondary active transporter in the body, and the K+ gradient is what the resting membrane potential is built on."
          ]
        },
        {
          label: "Job two",
          h: "Why is the pump called electrogenic?",
          p: [
            "Three positive charges leave and only two come back, so every cycle moves one net positive charge out of the cell.",
            "That contributes directly to the resting membrane potential, but only a few millivolts of it. The far bigger contribution is indirect: without the pump the K+ gradient would run down, and the resting potential really rests on the K+ gradient."
          ]
        },
        {
          label: "Job three",
          h: "What happens to a cell whose pump stops?",
          p: [
            "It swells. A cell is packed with proteins and phosphates that cannot leave, so it is always osmotically pulling water inward. Holding Na+ outside is how the cell offsets that pull.",
            "Stop the pump and Na+ leaks in, the osmolarity inside climbs, water follows, and the cell swells and eventually bursts. That is a large part of what happens to tissue in ischemia, when the ATP runs out."
          ]
        }
      ],
      covers: ["w2-primary-active-transport"],
      big: "This one protein spends **20 to 25 percent** of your resting energy budget. In a firing neuron it can reach 70 percent."
    },

    /* 15 */
    {
      k: "hook",
      kicker: "Memory hook",
      h: "Why the cell bothers paying that bill",
      hook: {
        icon: "?",
        iconClass: "terra",
        label: "Memory hook",
        h: "The tank on the roof",
        say: "The pump lifts water up to a tank on the roof. Everything else in the building runs on that water falling back down.",
        p: [
          "Lifting water to the roof costs real energy and produces nothing you can use up there. Nobody drinks on the roof. What you bought was height, and height is stored energy sitting quietly, waiting.",
          "Now every tap, every shower and every mill wheel in the building runs off that water coming back down, and not one of them needs a motor of its own. The sodium gradient is the cell's rooftop tank. The pump fills it using ATP, and the transporters in the rest of this deck spend it without ever touching ATP themselves.",
          "Break the pump and nothing downstream is broken. It just runs out of water, which is why it takes a few minutes rather than a few seconds."
        ]
      },
      covers: ["w2-primary-active-transport"],
      big: "Carry this one out of the room. Sodium falling downhill is how the cell pays for almost everything."
    },

    /* 16 */
    {
      k: "text",
      kicker: "Secondary active transport",
      h: "Two solutes, one carrier, and the only question is which way each one goes",
      lede: "A secondary active transporter is a carrier that will not move either solute on its own. It has to bind both, and then it moves them together.",
      body: [
        "When both solutes move in the **same** direction across the membrane, the carrier is a **symport**, also called a cotransporter.",
        "When they move in opposite directions, one in and one out, the carrier is an **antiport**, also called an exchanger.",
        "In everything in this course, and in most of the body, one of the two solutes is sodium, and sodium is the one moving downhill. Its fall supplies the energy. The other solute is the one you actually wanted to move, and it goes uphill, which is why this counts as active transport even though no ATP is consumed anywhere on this slide.",
        "The names do the work for you. Sym means together, anti means against. If you can say which way each of the two solutes is going, you have already named the carrier."
      ],
      covers: ["w2-secondary-active-transport"],
      big: "Same direction, symport. Opposite directions, antiport. Sodium is falling in both."
    },

    /* 17 */
    {
      k: "cards",
      cols: 2,
      kicker: "The two you must know",
      h: "One brings sugar in, one throws calcium out",
      lede: "These are the two examples on your course list, and they are also the two that show up in real medicine on the next slide and in Kofi's cure at the end of the hour.",
      cards: [
        {
          label: "Symport", labelClass: "teal",
          big: "SGLT",
          h: "How does a gut cell pull glucose in when it already holds more glucose than the lumen does?",
          p: [
            "The sodium glucose cotransporter binds one glucose and two Na+ on the outside face and carries all three inward together. Na+ is falling from about 145 mM outside to about 12 mM inside, and that fall is strong enough to drag glucose uphill on the way.",
            "This is how the small intestine strips the last of the glucose out of a meal instead of leaving some behind. SGLT1 does it in the gut and in the late proximal tubule of the kidney. SGLT2 does the bulk of the reabsorption in the early proximal tubule.",
            "Block the sodium potassium ATPase and glucose uptake stops within minutes. No Na+ gradient, no glucose uptake, even though SGLT itself was never touched."
          ]
        },
        {
          label: "Antiport", labelClass: "terra",
          big: "NCX",
          h: "How does a heart muscle cell get calcium back out between beats?",
          p: [
            "The sodium calcium exchanger lets three Na+ fall into the cell and throws one Ca2+ out in exchange. Opposite directions, one carrier, no ATP.",
            "Cytosolic free Ca2+ has to be held around 0.0001 mM against about 1.2 mM of free ionized Ca2+ outside. That is roughly a ten thousand fold gradient, and it is exactly what makes calcium useful as a signal, because a tiny amount entering is an enormous relative change.",
            "In cardiac muscle, calcium leaving through NCX is a large part of how the cell relaxes between beats. Hold on to that for the next slide."
          ]
        }
      ],
      covers: ["w2-secondary-active-transport"],
      big: "Both of them run on the same falling sodium. Neither one burns a molecule of ATP."
    },

    /* 18 */
    {
      k: "cards",
      cols: 3,
      variant: "dark",
      kicker: "Real medicine",
      h: "Digoxin, a drug that works by poisoning the pump on purpose",
      lede: "Digoxin comes from the foxglove plant and it has been in use for more than two hundred years. It partly blocks the sodium potassium ATPase in cardiac muscle. Follow the consequence in three steps and you will never need to memorize what it does.",
      cards: [
        {
          label: "Step 1", labelClass: "terra",
          h: "The pump is partly blocked. What happens to sodium inside the cell?",
          p: [
            "Intracellular Na+ rises. Only a little, and that matters, because a fully blocked pump kills the cell rather than treating anybody.",
            "The sodium gradient across the membrane gets shallower. Outside is still about 145 mM. Inside is no longer 12 mM."
          ],
          dark: true
        },
        {
          label: "Step 2",
          h: "What does a shallower sodium gradient do to NCX?",
          p: [
            "NCX runs on sodium falling inward. Make that fall smaller and the exchanger has less energy to work with, so it moves less calcium out per second.",
            "Nothing blocked NCX. Its fuel just got more expensive."
          ],
          dark: true
        },
        {
          label: "Step 3",
          h: "So what does the heart do?",
          p: [
            "Calcium builds up inside the cell and gets loaded into the sarcoplasmic reticulum, so each beat releases more of it. More calcium per beat means a stronger contraction, which is the whole therapeutic point.",
            "The danger is written into the same sentence. Push it a little too far and the cell is calcium overloaded and starts producing rhythms nobody asked for, which is why digoxin toxicity is a real and common clinical problem."
          ],
          dark: true
        }
      ],
      covers: ["w2-primary-active-transport", "w2-secondary-active-transport"],
      big: "Break one pump, and the transporter three steps downstream is the one that changes the patient."
    },

    /* 19 */
    {
      k: "fig",
      kicker: "Transport maximum",
      h: "The cleanest transport maximum in all of medicine is in your kidney",
      lede: "Your kidney filters glucose out of the blood all day long and then reclaims every bit of it with SGLT carriers. Plot the three lines against plasma glucose and the entire idea sits on one graph.",
      svg: FIG_RENAL,
      cap: "Plasma glucose along the bottom, rate up the side. Filtered load, in navy, is a straight line, because whatever is in the plasma gets filtered in proportion to it. Reabsorption, in teal, follows the filtered line exactly until the carriers saturate and then flattens at a transport maximum near 375 mg/min. Excretion, in maroon, is zero until plasma glucose reaches the renal threshold near 180 to 200 mg/dL, and then climbs parallel to the filtered load. Look at how gradually the teal line bends over instead of turning a sharp corner. That gentle bend is called **splay**, and it is there because nephrons are not identical. The busiest ones run out of carriers first and start spilling glucose while the rest of the kidney still has capacity to spare.",
      lab: "In the Week 2 lab you sketch this curve by hand and label the threshold and the transport maximum on it. Draw all three lines. The one students leave out is the filtered load, and without it the other two lines make no sense at all.",
      covers: ["w2-transport-maximum"],
      big: "Below the threshold, no glucose in the urine. Above it, everything extra washes out."
    },

    /* 20 */
    {
      k: "work",
      variant: "paper",
      kicker: "Work it",
      h: "Why an uncontrolled diabetic patient is up all night in the bathroom",
      badges: [{ t: "Work it with me" }, { t: "4 min", cls: "time" }],
      lede: "This is the calculation behind a positive urine glucose. Do it once properly and you own the transport maximum for good.",
      given: "Take a filtration rate of 125 mL/min, which is normal. The glucose transport maximum in the proximal tubule is about 375 mg/min. Work out what gets excreted at a plasma glucose of 100 mg/dL, and then at 400 mg/dL.",
      steps: [
        "Filtered load is plasma concentration times filtration rate. At 100 mg/dL that is 100 mg per 100 mL, which is 1 mg/mL. Times 125 mL/min gives 125 mg/min filtered.",
        "125 mg/min is well under the transport maximum of 375, so the carriers handle all of it. Reabsorption is 125 mg/min and excretion is zero. A normal dipstick reads negative for glucose, and now you know exactly why.",
        "Now do 400 mg/dL. That is 4 mg/mL, times 125 mL/min, which is 500 mg/min filtered.",
        "The carriers still cap out at 375 mg/min, because there is a fixed number of them and they are all working. Reabsorption is 375, not 500.",
        "Excretion is what was filtered minus what was reabsorbed. 500 minus 375 leaves 125 mg/min of glucose going out in the urine.",
        "Now finish with the osmosis. That glucose is stranded in the tubule and cannot cross the wall, so it holds water in the tubule alongside it. Urine volume goes up, and the patient urinates constantly and is thirsty constantly.",
        "One loose end, and it is worth thirty seconds. Divide the transport maximum by the filtration rate and the whole kidney should not saturate until a plasma glucose of 300 mg/dL, yet the first glucose turns up in the urine at 180. The gap between those two numbers is **splay**. Nephrons are not identical, so the busiest ones run out of carriers first and spill while the rest are still coping."
      ],
      ans: "125 mg/min of glucose in the urine, and all the water it drags along with it. The two symptoms that classically bring an undiagnosed diabetic patient to a clinic, passing far too much urine and being unable to stop drinking, are a transport maximum being exceeded.",
      timer: 240,
      lab: "This is the arithmetic behind the urine dipstick you read in lab. Watch for the reverse case: glucose on the stick with a normal plasma glucose means the load was fine, so the transport maximum itself must have been lowered. That separates a delivery problem from a transporter problem, which is the whole reason we teach transport maximum at all.",
      covers: ["w2-transport-maximum"],
      big: "The first glucose appears somewhere between **180 and 200 mg/dL**. That number is the renal threshold."
    },

    /* 21 */
    {
      k: "text",
      kicker: "Real medicine",
      h: "A whole drug class that works by breaking a transporter you just learned",
      lede: "The SGLT2 inhibitors, the drugs whose names end in flozin, are among the most prescribed diabetes drugs written today. Their entire mechanism is on the last two slides.",
      body: [
        "SGLT2 sits in the apical membrane of the early proximal tubule and does most of the glucose reabsorption in the kidney. Inhibit it and the kidney's capacity to reclaim filtered glucose drops.",
        "On the titration curve you just read, that means the transport maximum falls and the threshold falls with it. Glucose now appears in the urine at a plasma level that would previously have been handled without any trouble, so the patient loses glucose, and the calories in it, and water, every single day.",
        "It is a strange idea the first time you meet it. The treatment for a high blood glucose is to deliberately produce the finding you were taught to worry about. Blood glucose comes down because the sugar is leaving in the urine.",
        "Two consequences fall straight out of the mechanism, with no memorizing required. Sugary urine feeds yeast, so genital fungal infection is the common side effect. And glucose holding water in the tubule is a mild diuretic, which is part of why this drug class turned out to help patients with heart failure as well."
      ],
      covers: ["w2-transport-maximum", "w2-secondary-active-transport"],
      big: "Same curve, same threshold, moved on purpose by a tablet."
    },

    /* 22 */
    {
      k: "fig",
      kicker: "Transepithelial transport",
      h: "One cell, two different membranes, and that is the whole trick",
      lede: "A cell sitting in a sheet is not the same all the way round. The **apical** membrane faces the lumen, the basolateral membrane faces the blood, and tight junctions between neighboring cells stop the proteins of one face from drifting round to the other.",
      svg: FIG_EPI,
      cap: "One gut cell between the lumen on the left and the blood on the right. SGLT1 and CFTR sit in the apical membrane. GLUT2 and the sodium potassium ATPase sit in the basolateral membrane. Glucose comes in at the apical face with sodium and leaves at the basolateral face on its own.",
      covers: ["w2-transepithelial-transport"],
      big: "Different proteins on the two faces is what turns a cell into a one way street."
    },

    /* 23 */
    {
      k: "rows",
      kicker: "Trace it",
      h: "Glucose from the gut lumen into the blood, in four steps",
      lede: "For every step, say which membrane it happens at and what kind of transport it is. That pair of answers is the competency.",
      rows: [
        { dot: "1", dotClass: "terra", h: "Apical membrane. How does glucose get in from the lumen?", p: "SGLT1, a symport, carries glucose in together with two Na+. Sodium is falling downhill and glucose is being pushed uphill on the same carrier. This step is secondary active transport, and it happens only at the apical face." },
        { dot: "2", dotClass: "navy", h: "Basolateral membrane. How does glucose get out and reach the blood?", p: "GLUT2, an ordinary carrier. By this point glucose is concentrated inside the cell, higher than in the interstitial fluid outside, so it leaves downhill. This step is plain facilitated diffusion and costs nothing." },
        { dot: "3", dotClass: "terra", h: "What keeps step 1 possible minute after minute?", p: "The sodium potassium ATPase, also on the basolateral face, pumping out the sodium that came in at the apical face. That is what keeps intracellular Na+ low, and low intracellular Na+ is what keeps the apical gradient steep. Primary active transport, quietly paying for the whole arrangement." },
        { dot: "4", dotClass: "navy", h: "And the water?", p: "Sodium and glucose have both been moved from lumen to blood, so the blood side is now the more concentrated side. Water follows by osmosis, through aquaporins and between the cells. Nothing pumps water. Water never has to be pumped." }
      ],
      covers: ["w2-transepithelial-transport"],
      big: "Apical in, basolateral out, and a pump on the blood side paying for both."
    },

    /* 24 */
    {
      k: "text",
      variant: "dark",
      kicker: "The disease",
      h: "How cholera gets eight liters out of a person in two days",
      lede: "Kofi's stool is clear because it is not really stool. It is secreted fluid, and the cell is secreting it because a toxin jammed one channel open.",
      body: [
        "Cholera toxin locks an enzyme on inside the gut cell, so cAMP inside the cell rises and stays high. High cAMP holds the apical **CFTR** chloride channel open, and open is the problem.",
        "Cl- pours out of the cell into the lumen through CFTR and keeps pouring, because the cell keeps refilling itself with Cl- from the blood side using NKCC1, a symporter that brings in Na+, K+ and two Cl- on the falling sodium gradient.",
        "Now the lumen is filling with negative charge, so Na+ follows it out between the cells to balance it. Salt is now traveling the wrong way, lumen bound, and water follows the salt by osmosis. At the peak of it, a liter an hour.",
        "Notice what the sodium potassium ATPase is doing in that cascade. It never touches the lumen, and yet if you blocked it the secretion would stop, because NKCC1 runs on the sodium gradient the pump maintains. That exact question is waiting for you in this week's lab packet."
      ],
      covers: ["w2-transepithelial-transport"],
      big: "Water is never pumped anywhere. It follows the salt, and the toxin sent the salt the wrong way."
    },

    /* 25 */
    {
      k: "work",
      variant: "paper",
      kicker: "Work it",
      h: "Why a drink of salt and sugar works while the gut is still pouring water out",
      badges: [{ t: "Work it with me" }, { t: "5 min", cls: "time" }],
      lede: "This is the best story in physiology for secondary active transport, and it is worth doing slowly. Everything you need is already on the slides behind you.",
      given: "Cholera toxin opens CFTR. It does not touch SGLT1. Kofi is losing about 1 L per hour at the peak of it. You have WHO reduced osmolarity oral rehydration solution: Na+ 75 mM, Cl- 65 mM, glucose 75 mM, K+ 20 mM, and citrate counted as 10 mOsm/L.",
      steps: [
        "Add the osmolarity up first. 75 plus 65 plus 75 plus 20 plus 10 gives 245 mOsm/L. Plasma is about 290 mOsm/L, so this drink is mildly hypotonic, which is deliberate and is what the word reduced in the name is pointing at.",
        "Now the transport. In the lumen you have Na+ at 75 mM and glucose at 75 mM sitting right next to an apical membrane whose SGLT1 is completely untouched by the toxin.",
        "SGLT1 binds glucose and Na+ together and carries both into the cell, powered by the sodium gradient, which is still steep because the basolateral pump is still running normally.",
        "Glucose leaves the far side of the cell through GLUT2 into the blood. Sodium leaves the far side through the sodium potassium ATPase into the blood.",
        "Salt and sugar have now been moved from lumen to blood, so the blood side is more concentrated than the lumen. Water follows by osmosis in the absorbing direction, at the same time as the toxin is driving secretion in the other direction.",
        "Add the two flows together. Secretion is still happening and nobody has cured anything. But absorption through SGLT1 is happening too, and while absorption is the larger of the two the patient rehydrates with the disease still running."
      ],
      ans: "Sodium alone would not do it and glucose alone would not do it. SGLT1 cannot carry either one on its own, so both have to be in the lumen at the same moment. That is why the recipe is salt and sugar, and why it is not salt or sugar.",
      timer: 300,
      covers: ["w2-transepithelial-transport", "w2-secondary-active-transport"],
      big: "Oral rehydration therapy has saved tens of millions of lives, and this slide is the whole mechanism."
    },

    /* 26 */
    {
      k: "work",
      variant: "paper",
      kicker: "Work it",
      h: "A caregiver mixes the drink at home. Eight teaspoons of sugar and a pinch of salt",
      badges: [{ t: "Predict first" }, { t: "4 min", cls: "time" }],
      lede: "Commit to an answer before you start the arithmetic. Does this drink help Kofi, do nothing, or make him worse?",
      given: "Eight level teaspoons of sugar in a liter is about 32 g. Table sugar is sucrose, molar mass 342, and the gut splits every molecule of it into glucose and fructose before it absorbs anything. A pinch of salt is roughly 30 mM NaCl. Estimate the osmolarity, classify it against plasma, and predict the effect.",
      steps: [
        "Do the sugar first. 32 g divided by 342 g/mol is about 94 mmol, so about 94 mM sucrose in the glass. Sucrose does not dissociate in water, so as poured that is about 94 mOsm/L.",
        "NaCl splits into two particles, Na+ and Cl-, so 30 mM gives about 60 mOsm/L. In the glass the total is about 155 mOsm/L.",
        "Now let the gut do its work, because that is where the osmolarity peaks. Sucrase splits each sucrose into two, so the sugar term roughly doubles to about 190 mOsm/L and the total climbs to about 250 mOsm/L.",
        "Classify it. Plasma is about 290 mOsm/L, so even at its most concentrated this drink is **mildly hypotonic**, not hypertonic. So the tonicity is not what is wrong with it, and this is the half most people guess wrong.",
        "Now check the transporter, and this is where the answer actually lives. SGLT1 cannot move glucose without sodium, and a pinch of salt is nowhere near enough sodium. Sugar that SGLT1 cannot carry is sugar that is never absorbed, and unabsorbed solute sitting in the lumen holds water in the lumen with it."
      ],
      ans: "It does not help him, and it can easily make him worse. Not because it is hypertonic, because it is not, but because SGLT1 cannot work without sodium. Sugar nobody absorbs stays in the lumen holding water there, so the drink adds to the diarrhea instead of treating it. More sugar does not make a stronger drink, it makes a laxative.",
      timer: 240,
      lab: "Question 4 in Part 3 of your lab packet is this exact drink. Show the arithmetic in pen, take the sugar all the way through to what the gut does to it, classify it against plasma, and then say what is actually wrong with the drink, which is not its osmolarity.",
      covers: ["w2-transepithelial-transport"],
      big: "The WHO formula sits at 245 mOsm/L for a reason. Getting the ratio of salt to sugar right matters far more than getting a lot of sugar in."
    },

    /* 27 */
    {
      k: "cards",
      cols: 2,
      kicker: "One channel, two diseases",
      h: "CFTR jammed open, and CFTR that never arrives",
      lede: "The same chloride channel is the villain in both of these, and the two diseases are mirror images of each other. If you understand the channel you get both for the price of one.",
      cards: [
        {
          label: "Held open", labelClass: "terra",
          h: "Cholera. What does far too much CFTR activity look like?",
          p: [
            "Cl- pours into the lumen, Na+ follows it out to balance the charge, and water follows the salt. The gut secretes liters an hour and the patient dies of dehydration rather than of infection.",
            "The bacterium never enters the bloodstream. Everything that is hurting Kofi is osmosis obeying a channel that will not close."
          ]
        },
        {
          label: "Never arrives", labelClass: "teal",
          h: "Cystic fibrosis. What does far too little CFTR activity look like?",
          p: [
            "The commonest mutation, a deletion called delta F508, means CFTR never folds properly and never reaches the membrane at all. Chloride cannot get out, so salt does not reach the surface, so water does not either.",
            "Secretions on every epithelial surface come out thick instead of watery. Airways clog and get infected, pancreatic ducts block, and sweat is abnormally salty because the sweat duct cannot reclaim chloride on the way up. The sweat chloride test is still the standard diagnosis, and it is a membrane transport measurement."
          ]
        }
      ],
      big: "Too much of one channel drowns you. Too little of the very same channel dries you out."
    },

    /* 28 */
    {
      k: "cards",
      cols: 4,
      kicker: "Vesicular transport",
      h: "When the cargo is too big for any protein",
      lede: "All four of these move the membrane itself, and all four cost ATP. Sort them by what starts them and by what they are carrying.",
      cards: [
        {
          label: "Phagocytosis", labelClass: "terra",
          h: "Which one is cell eating?",
          p: [
            "A large solid particle, a bacterium or a dead cell, binds the surface and the cell throws arms of membrane around it until it is swallowed whole.",
            "Triggered by binding, so it is specific, and only certain cells do it. Neutrophils, macrophages, dendritic cells."
          ]
        },
        {
          label: "Pinocytosis",
          h: "Which one is cell drinking?",
          p: [
            "Small patches of membrane pinch inward continuously, taking a sip of whatever extracellular fluid happens to be sitting there.",
            "No trigger and no selection at all. Most cells do it all the time. The cargo is fluid and anything dissolved in it."
          ]
        },
        {
          label: "Receptor mediated", labelClass: "teal",
          h: "Which one goes shopping with a list?",
          p: [
            "One specific molecule binds one specific receptor, the loaded receptors gather into a coated pit, and that patch pinches off carrying a concentrated load of exactly the thing you wanted.",
            "This is how you take up LDL cholesterol, iron riding on transferrin, and vitamin B12. Efficient, specific, and breakable."
          ]
        },
        {
          label: "Exocytosis",
          h: "Which one is the only one going out?",
          p: [
            "A vesicle already inside the cell fuses with the plasma membrane and empties its contents outside. Usually triggered by a rise in intracellular Ca2+.",
            "Insulin release, neurotransmitter release, digestive enzyme release, and adding brand new protein to the surface membrane, which is how GLUT4 gets there."
          ]
        }
      ],
      covers: ["w2-vesicular-transport"],
      big: "Three ways in, one way out, and every one of them costs ATP."
    },

    /* 29 */
    {
      k: "table",
      kicker: "Side by side",
      h: "The four vesicular processes, by trigger, cargo and energy",
      caption: "The comparison the competency asks for. Read down the trigger column first, because that is the one that separates all four cleanly.",
      cols: ["Process", "What starts it", "What it carries", "Specific?", "ATP?"],
      rows: [
        ["Phagocytosis", "A large particle binding surface receptors", "Bacteria, debris, dead cells", "Yes, and only certain cells can do it", "Yes"],
        ["Pinocytosis", "Nothing. It runs continuously", "Extracellular fluid and whatever is dissolved in it", "No", "Yes"],
        ["Receptor mediated endocytosis", "A ligand binding its own receptor", "LDL, transferrin with iron, vitamin B12", "Yes, one cargo per receptor", "Yes"],
        ["Exocytosis", "Usually a rise in intracellular Ca2+", "Hormones, neurotransmitters, enzymes, new membrane protein", "Yes, the cell packaged it on purpose", "Yes"]
      ],
      covers: ["w2-vesicular-transport"],
      big: "If a question gives you the trigger, it is asking you to separate these four."
    },

    /* 30 */
    {
      k: "text",
      kicker: "Real medicine",
      h: "What happens when the receptor is the broken part",
      lede: "Familial hypercholesterolaemia is an inherited fault in the LDL receptor. Everything else about the cell is completely normal, which is what makes it such a clean example.",
      body: [
        "LDL particles carry cholesterol around in the blood. A liver cell pulls them out of circulation by receptor mediated endocytosis: LDL binds the LDL receptor, the coated pit pinches off, and the cholesterol is delivered inside.",
        "In this condition the receptor is missing, or misfolded, or unable to bind. The endocytosis machinery is intact and the LDL is right there in the blood, but nothing binds it, so nothing gets taken up.",
        "LDL accumulates in the circulation instead. Untreated, people with one faulty copy commonly run a total cholesterol above 300 mg/dL, and people with two faulty copies can have heart attacks in childhood.",
        "This is the value of knowing a mechanism rather than a name. One broken protein, one blocked step, and the consequence shows up as a number on a lipid panel and as coronary disease decades early. Statins work partly by making the liver put more LDL receptors on its surface, which only helps if there are receptors worth making."
      ],
      covers: ["w2-vesicular-transport"],
      big: "The cargo was in the blood the whole time. There was nothing there to grab it."
    },

    /* 31 */
    {
      k: "table",
      kicker: "The lab",
      h: "Two experiments tell you which kind of transport you are watching",
      caption: "The simulation will not tell you what is in the membrane. You work it out from how it behaves, and there are only two experiments that actually settle it.",
      cols: ["If you do this", "Simple diffusion", "Facilitated diffusion", "Active transport"],
      rows: [
        ["Raise the outside concentration a long way", "Rate keeps rising, straight line, no ceiling", "Rate rises then flattens at a maximum", "Rate rises then flattens at a maximum"],
        ["Reverse the gradient", "Net movement reverses direction", "Net movement reverses direction", "Net movement does not reverse. It keeps going the same way, uphill"],
        ["Add a poison that stops ATP production", "No change", "No change", "Stops. Primary stops directly, secondary runs down as its gradient collapses"],
        ["Add a competing molecule of similar shape", "No change", "Rate falls", "Rate falls"]
      ],
      lab: "The two decisive rows are gradient reversal and metabolic poison. Reversal separates active from passive, because only active transport keeps pushing uphill after you flip the gradient. The poison confirms it. The other two rows narrow things down without ever settling the question, so do not stop there.",
      covers: ["w2-lab-transport-sim"],
      big: "Reversal separates active from passive. Saturation separates carrier from simple. Run both."
    },

    /* 32 */
    {
      k: "rows",
      kicker: "The lab",
      h: "What you will actually do at the bench in Week 2",
      lede: "Four runs, and a written prediction before each one. Open each box and say the answer before you read it.",
      rows: [
        { dot: "1", dotClass: "navy", h: "Start the unknown at a low concentration and keep doubling. What are you looking for?", p: "Record the rate, double the outside concentration, record again, and keep going. Plot rate against concentration on the same axes you saw earlier in this deck. A straight line means no protein was involved. A curve that flattens means a carrier, and the height where it flattens is your transport maximum." },
        { dot: "2", dotClass: "terra", h: "Now flip the gradient. What does that one move tell you?", p: "Make the inside the concentrated side instead of the outside. Anything passive now runs the other way, because passive means the gradient decides. Anything that keeps moving solute in the original direction, against the new gradient, is active transport, and you have your answer in one run." },
        { dot: "3", dotClass: "terra", h: "Add the metabolic poison. What should you predict before you press the button?", p: "Write the prediction down first. A poison that stops ATP production leaves simple and facilitated diffusion alone and stops primary active transport immediately. Secondary active transport is the interesting case, because it never used ATP itself and it still fails, as soon as the gradient it was spending runs down." },
        { dot: "4", dotClass: "navy", h: "Add a competing solute of similar shape. What does a fall in rate prove?", p: "It proves there was a binding site, which means there was a carrier. Nothing competes for a hole in the lipid. It is the same logic as two sugars fighting over one GLUT." }
      ],
      lab: "Bring your prediction sheet with a written prediction for every run, made before the run. The prediction is the graded part, not the result. The result is whatever the simulation does. The prediction is the only evidence of what you understood.",
      covers: ["w2-lab-transport-sim"],
      big: "Predict first, then run it. A result you did not predict teaches you twice as much."
    },

    /* 33 */
    {
      k: "activity",
      kicker: "Your turn",
      h: "Four transporters, no names given. Work out what each one is",
      badges: [{ t: "In pairs" }, { t: "8 min", cls: "time" }],
      lede: "For each one, say passive or active. If active, say primary or secondary. If secondary, say symport or antiport. Then, and this is the part that matters, say what would stop it.",
      listLabel: "What to do",
      list: [
        "Transporter A moves urea across the membrane. It goes faster whenever you raise urea outside, it has shown no ceiling at any concentration you tried, and a poison that stops ATP does nothing to it.",
        "Transporter B moves H+ out of the cell and K+ in, and it hydrolyses ATP to do it. It is in your stomach lining, and it is the target of a proton pump inhibitor.",
        "Transporter C moves Na+ into the cell and H+ out of it, and it slows down within minutes of blocking the sodium potassium ATPase.",
        "Transporter D moves Ca2+ out of the cell using ATP directly, and changing extracellular sodium does nothing to it at all.",
        "Then, for each one, write down the single experiment that would prove your answer to somebody who disagreed with you."
      ],
      timer: 480,
      big: "If you can say what would stop it, you have understood how it runs."
    },

    /* 34 */
    {
      k: "close",
      kicker: "Before next class",
      h: "What to do between now and Thursday",
      lede: "None of this is memorizing a list of transporters. It is being able to look at one you have never seen and say where its energy is coming from.",
      list: [
        "Say the pump out loud until it is automatic. Three Na+ out, two K+ in, one ATP, and the two gradients it maintains.",
        "Draw one gut cell from memory. Apical face with SGLT1 and CFTR, basolateral face with GLUT2, the sodium potassium ATPase and NKCC1, and an arrow on every one. That drawing is in your lab packet this week, in pen.",
        "Work Parts 2 and 3 of the Week 2 lab packet, including the WHO oral rehydration arithmetic and the eight teaspoons question.",
        "Sketch the renal glucose titration curve with all three lines, and mark the threshold and the transport maximum on it.",
        "Come in with one transporter you could not classify. Bring it written down, not in your head."
      ],
      big: "Next time, the gradients this deck paid for become a voltage, and the cell starts using it to talk.",
      bigVariant: "terra"
    }

  ]
};
