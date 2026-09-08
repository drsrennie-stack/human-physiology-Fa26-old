/* BIO 005 Human Physiology
   Week 2, Unit 1, the last third of the week: Membrane Potential.
   Continues the Kofi M. case from Week 1 fluid loss and Week 2 transport,
   and hands off to the action potential in Week 4.
   Dr. Sharilyn Rennie */

/* ---------- figures ---------- */

const FIG_IONS = `
<svg viewBox="0 0 900 470" role="img" aria-labelledby="x1-t x1-d">
  <title id="x1-t">Where the four main ions sit across the cell membrane</title>
  <desc id="x1-d">A wide diagram split by a vertical membrane band down the middle. The left side is labeled outside the cell, the right side is labeled inside the cell, and a narrow column on the far left names the ion. Values are in millimoles per liter. Potassium is 4 outside and 140 inside. Sodium is 145 outside and 12 inside. Chloride is 100 outside and 10 inside. Free calcium is 1.2 outside and 0.0001 inside. Potassium is the only one of the four that is higher inside than outside, and calcium shows the largest difference, about ten thousand fold.</desc>
  <rect x="0" y="0" width="900" height="470" fill="#FFFFFF"/>

  <line x1="30" y1="178" x2="870" y2="178" stroke="#DCE0E6" stroke-width="2"/>
  <line x1="30" y1="253" x2="870" y2="253" stroke="#DCE0E6" stroke-width="2"/>
  <line x1="30" y1="328" x2="870" y2="328" stroke="#DCE0E6" stroke-width="2"/>
  <line x1="170" y1="70" x2="170" y2="400" stroke="#DCE0E6" stroke-width="2"/>

  <text x="40" y="100" font-family="Plus Jakarta Sans, sans-serif" font-size="15" font-weight="700" fill="#3D4860">ION</text>
  <text x="295" y="100" text-anchor="middle" font-family="Plus Jakarta Sans, sans-serif" font-size="17" font-weight="700" fill="#0B1530">Outside the cell (mmol/L)</text>
  <text x="680" y="100" text-anchor="middle" font-family="Plus Jakarta Sans, sans-serif" font-size="17" font-weight="700" fill="#0B1530">Inside the cell (mmol/L)</text>

  <text x="40" y="152" font-family="Plus Jakarta Sans, sans-serif" font-size="19" font-weight="700" fill="#1F4E55">K+</text>
  <text x="295" y="152" text-anchor="middle" font-family="Plus Jakarta Sans, sans-serif" font-size="24" font-weight="700" fill="#3D4860">4</text>
  <text x="680" y="152" text-anchor="middle" font-family="Plus Jakarta Sans, sans-serif" font-size="24" font-weight="700" fill="#1F4E55">140</text>

  <text x="40" y="227" font-family="Plus Jakarta Sans, sans-serif" font-size="19" font-weight="700" fill="#8B3A2E">Na+</text>
  <text x="295" y="227" text-anchor="middle" font-family="Plus Jakarta Sans, sans-serif" font-size="24" font-weight="700" fill="#8B3A2E">145</text>
  <text x="680" y="227" text-anchor="middle" font-family="Plus Jakarta Sans, sans-serif" font-size="24" font-weight="700" fill="#3D4860">12</text>

  <text x="40" y="302" font-family="Plus Jakarta Sans, sans-serif" font-size="19" font-weight="700" fill="#3D4860">Cl-</text>
  <text x="295" y="302" text-anchor="middle" font-family="Plus Jakarta Sans, sans-serif" font-size="24" font-weight="700" fill="#3D4860">100</text>
  <text x="680" y="302" text-anchor="middle" font-family="Plus Jakarta Sans, sans-serif" font-size="24" font-weight="700" fill="#3D4860">10</text>

  <text x="40" y="377" font-family="Plus Jakarta Sans, sans-serif" font-size="19" font-weight="700" fill="#8B3A2E">Ca2+</text>
  <text x="295" y="377" text-anchor="middle" font-family="Plus Jakarta Sans, sans-serif" font-size="24" font-weight="700" fill="#8B3A2E">1.2</text>
  <text x="680" y="377" text-anchor="middle" font-family="Plus Jakarta Sans, sans-serif" font-size="24" font-weight="700" fill="#8B3A2E">0.0001</text>

  <rect x="420" y="60" width="44" height="350" fill="#EDF1F3" stroke="#0B1530" stroke-width="3"/>
  <line x1="434" y1="60" x2="434" y2="410" stroke="#DCE0E6" stroke-width="2"/>
  <line x1="450" y1="60" x2="450" y2="410" stroke="#DCE0E6" stroke-width="2"/>
  <text x="442" y="44" text-anchor="middle" font-family="Plus Jakarta Sans, sans-serif" font-size="15" font-weight="700" fill="#0B1530">Cell membrane</text>

  <text x="30" y="443" font-family="Plus Jakarta Sans, sans-serif" font-size="16" font-weight="700" fill="#8B3A2E">Free calcium inside is about 10,000 times lower than the free calcium outside. Nothing else is held that tightly.</text>
</svg>`;

const FIG_TRACE = `
<svg viewBox="0 0 900 520" role="img" aria-labelledby="x2-t x2-d">
  <title id="x2-t">One membrane potential tracing with every phase labeled</title>
  <desc id="x2-d">A graph of membrane potential in millivolts against time in milliseconds. The vertical axis runs from plus 40 at the top to minus 90 at the bottom, with marked lines at zero, at threshold of minus 55, and at the resting potential of minus 70. The trace sits flat at minus 70, rises past threshold, shoots steeply up to a peak of about plus 30 which is above zero and is called the overshoot, falls just as steeply back down through the resting line, dips to a trough of about minus 80 which is the hyperpolarization, then drifts slowly back up to minus 70 and stays there. Two ticks on the time axis mark zero milliseconds at the foot of the upstroke and three milliseconds where the trace has fallen back through the resting line, so the spike itself takes about three milliseconds.</desc>
  <rect x="0" y="0" width="900" height="520" fill="#FFFFFF"/>

  <line x1="110" y1="60" x2="110" y2="440" stroke="#0B1530" stroke-width="3"/>
  <line x1="110" y1="440" x2="860" y2="440" stroke="#0B1530" stroke-width="3"/>

  <line x1="104" y1="60" x2="110" y2="60" stroke="#0B1530" stroke-width="2"/>
  <line x1="104" y1="177" x2="110" y2="177" stroke="#0B1530" stroke-width="2"/>
  <line x1="104" y1="381" x2="110" y2="381" stroke="#0B1530" stroke-width="2"/>
  <text x="98" y="66" text-anchor="end" font-family="Plus Jakarta Sans, sans-serif" font-size="15" fill="#3D4860">+40</text>
  <text x="98" y="183" text-anchor="end" font-family="Plus Jakarta Sans, sans-serif" font-size="15" fill="#3D4860">0</text>
  <text x="98" y="387" text-anchor="end" font-family="Plus Jakarta Sans, sans-serif" font-size="15" fill="#3D4860">-70</text>
  <text x="98" y="446" text-anchor="end" font-family="Plus Jakarta Sans, sans-serif" font-size="15" fill="#3D4860">-90</text>

  <line x1="110" y1="177" x2="860" y2="177" stroke="#DCE0E6" stroke-width="2"/>
  <line x1="110" y1="338" x2="860" y2="338" stroke="#3D4860" stroke-width="2" stroke-dasharray="8 6"/>
  <line x1="110" y1="381" x2="860" y2="381" stroke="#1F4E55" stroke-width="2" stroke-dasharray="3 5"/>

  <text x="856" y="332" text-anchor="end" font-family="Plus Jakarta Sans, sans-serif" font-size="15" font-weight="700" fill="#3D4860">Threshold, -55 mV</text>
  <text x="856" y="403" text-anchor="end" font-family="Plus Jakarta Sans, sans-serif" font-size="15" font-weight="700" fill="#1F4E55">Resting potential, -70 mV</text>

  <path d="M 110 381 L 250 381 C 268 381 278 356 288 338 C 300 300 315 130 340 89 C 362 120 400 300 425 370 C 440 400 470 411 500 411 C 570 411 640 388 700 381 L 860 381"
        fill="none" stroke="#8B3A2E" stroke-width="4" stroke-linejoin="round"/>

  <circle cx="340" cy="89" r="6" fill="#C9A14A" stroke="#0B1530" stroke-width="2"/>
  <text x="352" y="82" font-family="Plus Jakarta Sans, sans-serif" font-size="16" font-weight="700" fill="#0B1530">Overshoot, peak about +30 mV</text>
  <text x="352" y="104" font-family="Plus Jakarta Sans, sans-serif" font-size="15" fill="#3D4860">the part of the rise that is above 0 mV</text>

  <text x="150" y="368" font-family="Plus Jakarta Sans, sans-serif" font-size="16" font-weight="700" fill="#1F4E55">Resting</text>
  <text x="196" y="250" font-family="Plus Jakarta Sans, sans-serif" font-size="16" font-weight="700" fill="#8B3A2E">Depolarization</text>
  <text x="196" y="272" font-family="Plus Jakarta Sans, sans-serif" font-size="15" fill="#3D4860">less negative</text>
  <text x="452" y="250" font-family="Plus Jakarta Sans, sans-serif" font-size="16" font-weight="700" fill="#8B3A2E">Repolarization</text>
  <text x="452" y="272" font-family="Plus Jakarta Sans, sans-serif" font-size="15" fill="#3D4860">back toward rest</text>

  <circle cx="500" cy="411" r="6" fill="#C9A14A" stroke="#0B1530" stroke-width="2"/>
  <text x="516" y="440" font-family="Plus Jakarta Sans, sans-serif" font-size="16" font-weight="700" fill="#0B1530">Hyperpolarization, about -80 mV</text>
  <text x="516" y="462" font-family="Plus Jakarta Sans, sans-serif" font-size="15" fill="#3D4860">past rest, more negative than it started</text>

  <line x1="250" y1="440" x2="250" y2="452" stroke="#0B1530" stroke-width="2"/>
  <line x1="430" y1="440" x2="430" y2="452" stroke="#0B1530" stroke-width="2"/>
  <text x="250" y="470" text-anchor="middle" font-family="Plus Jakarta Sans, sans-serif" font-size="15" fill="#3D4860">0</text>
  <text x="430" y="470" text-anchor="middle" font-family="Plus Jakarta Sans, sans-serif" font-size="15" fill="#3D4860">3</text>
  <text x="485" y="500" text-anchor="middle" font-family="Plus Jakarta Sans, sans-serif" font-size="16" font-weight="700" fill="#0B1530">Time (ms)</text>
  <text x="30" y="250" text-anchor="middle" transform="rotate(-90 30 250)" font-family="Plus Jakarta Sans, sans-serif" font-size="16" font-weight="700" fill="#0B1530">Membrane potential (mV)</text>
</svg>`;

const FIG_CHANNELS = `
<svg viewBox="0 0 900 420" role="img" aria-labelledby="x3-t x3-d">
  <title id="x3-t">The four channel types and what opens each one</title>
  <desc id="x3-d">Four panels side by side, each showing a slab of membrane with a protein pore in it. Panel one, leak channel, pore drawn open with ions passing through, opens because it has no gate at all, found in every cell at rest. Panel two, voltage gated, pore drawn blocked with plus signs beside it, opens when membrane voltage changes, found in axons and heart muscle. Panel three, ligand gated, pore drawn blocked with a small round molecule sitting above it, opens when a chemical binds, found at the neuromuscular junction. Panel four, mechanically gated, pore drawn blocked with two tether lines pulling on it, opens when the membrane is stretched or bent, found in the hair cells of the inner ear.</desc>
  <rect x="0" y="0" width="900" height="420" fill="#FFFFFF"/>

  <g>
    <rect x="20" y="46" width="200" height="330" rx="10" fill="#FFFFFF" stroke="#DCE0E6" stroke-width="2"/>
    <text x="120" y="82" text-anchor="middle" font-family="Plus Jakarta Sans, sans-serif" font-size="18" font-weight="700" fill="#1F4E55">Leak</text>
    <rect x="30" y="150" width="180" height="44" fill="#EDF1F3" stroke="#0B1530" stroke-width="2"/>
    <rect x="100" y="150" width="14" height="44" fill="#1F4E55"/>
    <rect x="126" y="150" width="14" height="44" fill="#1F4E55"/>
    <circle cx="120" cy="132" r="7" fill="#C9A14A" stroke="#0B1530" stroke-width="2"/>
    <circle cx="120" cy="212" r="7" fill="#C9A14A" stroke="#0B1530" stroke-width="2"/>
    <text x="120" y="250" text-anchor="middle" font-family="Plus Jakarta Sans, sans-serif" font-size="14" font-weight="700" fill="#3D4860">WHAT OPENS IT</text>
    <text x="120" y="276" text-anchor="middle" font-family="Plus Jakarta Sans, sans-serif" font-size="16" fill="#0B1530">Nothing. It has</text>
    <text x="120" y="298" text-anchor="middle" font-family="Plus Jakarta Sans, sans-serif" font-size="16" fill="#0B1530">no gate at all.</text>
    <text x="120" y="344" text-anchor="middle" font-family="Plus Jakarta Sans, sans-serif" font-size="15" font-weight="700" fill="#8B3A2E">Every cell, at rest</text>
  </g>

  <g>
    <rect x="240" y="46" width="200" height="330" rx="10" fill="#FFFFFF" stroke="#DCE0E6" stroke-width="2"/>
    <text x="340" y="82" text-anchor="middle" font-family="Plus Jakarta Sans, sans-serif" font-size="18" font-weight="700" fill="#1F4E55">Voltage gated</text>
    <rect x="250" y="150" width="180" height="44" fill="#EDF1F3" stroke="#0B1530" stroke-width="2"/>
    <rect x="320" y="150" width="14" height="44" fill="#1F4E55"/>
    <rect x="346" y="150" width="14" height="44" fill="#1F4E55"/>
    <rect x="334" y="164" width="12" height="16" fill="#8B3A2E"/>
    <text x="300" y="132" text-anchor="middle" font-family="Plus Jakarta Sans, sans-serif" font-size="17" font-weight="700" fill="#8B3A2E">+ +</text>
    <text x="380" y="132" text-anchor="middle" font-family="Plus Jakarta Sans, sans-serif" font-size="17" font-weight="700" fill="#8B3A2E">+ +</text>
    <text x="340" y="250" text-anchor="middle" font-family="Plus Jakarta Sans, sans-serif" font-size="14" font-weight="700" fill="#3D4860">WHAT OPENS IT</text>
    <text x="340" y="276" text-anchor="middle" font-family="Plus Jakarta Sans, sans-serif" font-size="16" fill="#0B1530">A change in the</text>
    <text x="340" y="298" text-anchor="middle" font-family="Plus Jakarta Sans, sans-serif" font-size="16" fill="#0B1530">membrane voltage.</text>
    <text x="340" y="344" text-anchor="middle" font-family="Plus Jakarta Sans, sans-serif" font-size="15" font-weight="700" fill="#8B3A2E">Axons, heart muscle</text>
  </g>

  <g>
    <rect x="460" y="46" width="200" height="330" rx="10" fill="#FFFFFF" stroke="#DCE0E6" stroke-width="2"/>
    <text x="560" y="82" text-anchor="middle" font-family="Plus Jakarta Sans, sans-serif" font-size="18" font-weight="700" fill="#1F4E55">Ligand gated</text>
    <rect x="470" y="150" width="180" height="44" fill="#EDF1F3" stroke="#0B1530" stroke-width="2"/>
    <rect x="540" y="150" width="14" height="44" fill="#1F4E55"/>
    <rect x="566" y="150" width="14" height="44" fill="#1F4E55"/>
    <rect x="554" y="164" width="12" height="16" fill="#8B3A2E"/>
    <circle cx="560" cy="126" r="13" fill="#C9A14A" stroke="#0B1530" stroke-width="2"/>
    <text x="560" y="250" text-anchor="middle" font-family="Plus Jakarta Sans, sans-serif" font-size="14" font-weight="700" fill="#3D4860">WHAT OPENS IT</text>
    <text x="560" y="276" text-anchor="middle" font-family="Plus Jakarta Sans, sans-serif" font-size="16" fill="#0B1530">A chemical binds</text>
    <text x="560" y="298" text-anchor="middle" font-family="Plus Jakarta Sans, sans-serif" font-size="16" fill="#0B1530">to the protein.</text>
    <text x="560" y="344" text-anchor="middle" font-family="Plus Jakarta Sans, sans-serif" font-size="15" font-weight="700" fill="#8B3A2E">Neuromuscular junction</text>
  </g>

  <g>
    <rect x="680" y="46" width="200" height="330" rx="10" fill="#FFFFFF" stroke="#DCE0E6" stroke-width="2"/>
    <text x="780" y="82" text-anchor="middle" font-family="Plus Jakarta Sans, sans-serif" font-size="18" font-weight="700" fill="#1F4E55">Mechanically gated</text>
    <rect x="690" y="150" width="180" height="44" fill="#EDF1F3" stroke="#0B1530" stroke-width="2"/>
    <rect x="760" y="150" width="14" height="44" fill="#1F4E55"/>
    <rect x="786" y="150" width="14" height="44" fill="#1F4E55"/>
    <rect x="774" y="164" width="12" height="16" fill="#8B3A2E"/>
    <line x1="700" y1="112" x2="762" y2="148" stroke="#1F4E55" stroke-width="3"/>
    <line x1="860" y1="112" x2="798" y2="148" stroke="#1F4E55" stroke-width="3"/>
    <text x="780" y="250" text-anchor="middle" font-family="Plus Jakarta Sans, sans-serif" font-size="14" font-weight="700" fill="#3D4860">WHAT OPENS IT</text>
    <text x="780" y="276" text-anchor="middle" font-family="Plus Jakarta Sans, sans-serif" font-size="16" fill="#0B1530">Physical force,</text>
    <text x="780" y="298" text-anchor="middle" font-family="Plus Jakarta Sans, sans-serif" font-size="16" fill="#0B1530">stretch or bending.</text>
    <text x="780" y="344" text-anchor="middle" font-family="Plus Jakarta Sans, sans-serif" font-size="15" font-weight="700" fill="#8B3A2E">Hair cells in the ear</text>
  </g>
</svg>`;

const FIG_KPLOT = `
<svg viewBox="0 0 900 500" role="img" aria-labelledby="x4-t x4-d">
  <title id="x4-t">Resting potential against extracellular potassium, measured against the Nernst prediction</title>
  <desc id="x4-d">A graph with extracellular potassium on a logarithmic horizontal axis running from 1 to 100 millimoles per liter, and resting membrane potential on the vertical axis running from 0 at the top to minus 140 millivolts at the bottom. The Nernst prediction is a perfectly straight line rising from minus 131 millivolts at a potassium of 1, through minus 94 at a potassium of 4, to minus 9 at a potassium of 100. The measured cell values form a curve that sits above the line at low potassium, about minus 80 millivolts at a potassium of 1 and minus 70 at a potassium of 4, and then bends down to meet the straight line at high potassium. Two points are marked, the normal value at potassium 4 and minus 70 millivolts, and Kofi at potassium 2.5 and about minus 75 millivolts.</desc>
  <rect x="0" y="0" width="900" height="500" fill="#FFFFFF"/>

  <line x1="120" y1="60" x2="120" y2="420" stroke="#0B1530" stroke-width="3"/>
  <line x1="120" y1="420" x2="860" y2="420" stroke="#0B1530" stroke-width="3"/>

  <line x1="114" y1="60" x2="120" y2="60" stroke="#0B1530" stroke-width="2"/>
  <line x1="114" y1="137" x2="120" y2="137" stroke="#0B1530" stroke-width="2"/>
  <line x1="114" y1="214" x2="120" y2="214" stroke="#0B1530" stroke-width="2"/>
  <line x1="114" y1="291" x2="120" y2="291" stroke="#0B1530" stroke-width="2"/>
  <line x1="114" y1="369" x2="120" y2="369" stroke="#0B1530" stroke-width="2"/>
  <text x="108" y="66" text-anchor="end" font-family="Plus Jakarta Sans, sans-serif" font-size="15" fill="#3D4860">0</text>
  <text x="108" y="143" text-anchor="end" font-family="Plus Jakarta Sans, sans-serif" font-size="15" fill="#3D4860">-30</text>
  <text x="108" y="220" text-anchor="end" font-family="Plus Jakarta Sans, sans-serif" font-size="15" fill="#3D4860">-60</text>
  <text x="108" y="297" text-anchor="end" font-family="Plus Jakarta Sans, sans-serif" font-size="15" fill="#3D4860">-90</text>
  <text x="108" y="375" text-anchor="end" font-family="Plus Jakarta Sans, sans-serif" font-size="15" fill="#3D4860">-120</text>

  <line x1="120" y1="420" x2="120" y2="426" stroke="#0B1530" stroke-width="2"/>
  <line x1="228" y1="420" x2="228" y2="426" stroke="#0B1530" stroke-width="2"/>
  <line x1="337" y1="420" x2="337" y2="426" stroke="#0B1530" stroke-width="2"/>
  <line x1="480" y1="420" x2="480" y2="426" stroke="#0B1530" stroke-width="2"/>
  <line x1="588" y1="420" x2="588" y2="426" stroke="#0B1530" stroke-width="2"/>
  <line x1="732" y1="420" x2="732" y2="426" stroke="#0B1530" stroke-width="2"/>
  <line x1="840" y1="420" x2="840" y2="426" stroke="#0B1530" stroke-width="2"/>
  <text x="120" y="448" text-anchor="middle" font-family="Plus Jakarta Sans, sans-serif" font-size="15" fill="#3D4860">1</text>
  <text x="228" y="448" text-anchor="middle" font-family="Plus Jakarta Sans, sans-serif" font-size="15" fill="#3D4860">2</text>
  <text x="337" y="448" text-anchor="middle" font-family="Plus Jakarta Sans, sans-serif" font-size="15" fill="#3D4860">4</text>
  <text x="480" y="448" text-anchor="middle" font-family="Plus Jakarta Sans, sans-serif" font-size="15" fill="#3D4860">10</text>
  <text x="588" y="448" text-anchor="middle" font-family="Plus Jakarta Sans, sans-serif" font-size="15" fill="#3D4860">20</text>
  <text x="732" y="448" text-anchor="middle" font-family="Plus Jakarta Sans, sans-serif" font-size="15" fill="#3D4860">50</text>
  <text x="840" y="448" text-anchor="middle" font-family="Plus Jakarta Sans, sans-serif" font-size="15" fill="#3D4860">100</text>

  <line x1="120" y1="397" x2="840" y2="83" stroke="#8B3A2E" stroke-width="4"/>
  <polyline points="120,266 263,253 337,241 424,223 480,209 588,175 732,123 840,83" fill="none" stroke="#1F4E55" stroke-width="4" stroke-linejoin="round"/>

  <circle cx="337" cy="241" r="8" fill="#C9A14A" stroke="#0B1530" stroke-width="2"/>
  <text x="349" y="234" font-family="Plus Jakarta Sans, sans-serif" font-size="16" font-weight="700" fill="#0B1530">Normal: K+ out 4, rest -70 mV</text>
  <circle cx="263" cy="253" r="8" fill="#C9A14A" stroke="#0B1530" stroke-width="2"/>
  <text x="150" y="296" font-family="Plus Jakarta Sans, sans-serif" font-size="16" font-weight="700" fill="#0B1530">Kofi: K+ out 2.5, rest about -75 mV</text>

  <text x="620" y="330" font-family="Plus Jakarta Sans, sans-serif" font-size="16" font-weight="700" fill="#8B3A2E">Nernst prediction</text>
  <text x="620" y="352" font-family="Plus Jakarta Sans, sans-serif" font-size="15" fill="#3D4860">a straight line on a log axis</text>
  <text x="150" y="200" font-family="Plus Jakarta Sans, sans-serif" font-size="16" font-weight="700" fill="#1F4E55">What the cell actually does</text>

  <text x="490" y="480" text-anchor="middle" font-family="Plus Jakarta Sans, sans-serif" font-size="16" font-weight="700" fill="#0B1530">Extracellular potassium (mmol/L, log scale)</text>
  <text x="34" y="240" text-anchor="middle" transform="rotate(-90 34 240)" font-family="Plus Jakarta Sans, sans-serif" font-size="16" font-weight="700" fill="#0B1530">Resting potential (mV)</text>
</svg>`;

/* ---------- deck ---------- */

module.exports = {
  id: "slides-p-membrane-potential",
  letter: "P",
  type: "Physiology",
  week: 2,
  unit: 1,
  topic: "Membrane Potential",
  title: "Membrane potential, the voltage every cell is holding before anything happens",
  subtitle: "The last third of Week 2, and the bridge into the action potential in Week 4.",

  slides: [

    /* 1 */
    {k:"title", variant:"terra",
      kicker:"P . Physiology . Unit 1 . Week 2",
      h:"Membrane potential, the voltage every cell is holding before anything happens",
      lede:"You have spent this week getting things across the membrane. Here is the part nobody warns you about: the moving is not free, and it leaves charge sitting on either side. That charge is a battery, and in Week 4, every nerve impulse and every heartbeat you study will be that battery being spent.",
      terms:[{t:"Electrochemical gradient", c:"t"},{t:"Nernst equation", c:"g"},{t:"Equilibrium potential", c:"l"},{t:"Resting membrane potential", c:"t"},{t:"Ion channel gating", c:"g"},{t:"Depolarization", c:"l"}],
      big:"Dr. Sharilyn Rennie . BIO 005 Human Physiology"},

    /* 2 */
    {k:"cards", cols:3,
      kicker:"Where we are going",
      h:"Six things you should be able to do by the end of this deck",
      lede:"Open a box to see what is inside it. Do not memorize this slide. Just know what we are building and in what order.",
      cards:[
        {label:"One", labelClass:"terra", h:"What is actually different about the inside of a cell?", p:["Four ions, four concentration differences, and a set of numbers you will use for the rest of the course. Potassium in, sodium out, and calcium held almost absurdly low."]},
        {label:"Two", labelClass:"terra", h:"What two separate forces push on an ion?", p:["Concentration pushes it one way. Voltage pushes it another. Those are two different forces, and the whole topic falls apart if you blur them together."]},
        {label:"Three", labelClass:"terra", h:"Is there one voltage that would satisfy an ion completely?", p:["Yes, and the Nernst equation tells you what it is. That number is the equilibrium potential, and the sign of it tells you which way the ion will move at any other voltage."]},
        {label:"Four", labelClass:"teal", h:"Why is the resting potential negative, and why that exact number?", p:["Because at rest the membrane is far more open to potassium than to anything else, so the cell settles close to the potassium equilibrium potential. Change the permeability and it moves."]},
        {label:"Five", labelClass:"teal", h:"What makes a channel open?", p:["Four answers: nothing, voltage, a chemical, or a physical push. Each one has a place in the body where it is the whole story."]},
        {label:"Six", labelClass:"teal", h:"What do we call it when the voltage moves?", p:["Depolarization, repolarization, hyperpolarization, overshoot. Four words, one tracing, and you will label them by hand this week."]}
      ]},

    /* 3 */
    {k:"text", variant:"dark",
      kicker:"The patient, continued",
      h:"Kofi lost water in Week 1 and salt this week. Now it is electrical",
      lede:"Kofi M., 24. You have been with him for two weeks. Cholera toxin held a chloride channel open, water followed salt into his gut, and he lost about 8 L. We rehydrated him and the volume problem is fixed.",
      body:[
        "But diarrhea does not only cost water. Stool is rich in potassium, and after two days his plasma potassium has fallen from a normal 3.5 to 5.0 down to **2.5 mmol/L**. He feels weak. The monitor shows an irregular heartbeat.",
        "Here is why that one number matters more than almost any other on his chart. Potassium is the ion that sets the resting membrane potential. Move potassium and you have not changed a chemistry value, you have changed the voltage every excitable cell in his body is sitting at.",
        "So this deck is Kofi's chart read as electricity. By the end you will have calculated exactly what his cells feel and predicted the danger."
      ],
      big:"A fluid problem became a salt problem, and a salt problem is now a voltage problem."},

    /* 4 */
    {k:"table",
      kicker:"The numbers",
      h:"Learn these four rows and half of this course gets easier",
      caption:"Typical concentrations in a human cell at 37 C, in mmol/L. Round numbers on purpose, because you will use them to estimate. Plasma chloride runs about 100 to 105 on a real chemistry panel and we round it to 100 here, and the calcium row is free ionized calcium on both sides, not the total calcium your lab reports.",
      cols:["Ion","Inside the cell","Outside the cell","Which side wins","Where you meet it"],
      rows:[
        ["K+","140","4","Inside, 35 to 1","Sets the resting potential"],
        ["Na+","12","145","Outside, 12 to 1","Drives depolarization"],
        ["Cl-","10","100","Outside, 10 to 1","Steadies and inhibits"],
        ["Ca2+","0.0001 free","1.2 free","Outside, about 10,000 to 1","Triggers secretion and contraction"]
      ],
      big:"Potassium is the only one of the four that is higher inside. That single exception is what makes the inside negative.",
      covers:["w2-electrochemical-gradient"]},

    /* 5 */
    {k:"fig",
      kicker:"See it once",
      h:"The same four numbers, drawn across the membrane",
      lede:"Look at the gap on each row. The size of the gap is the size of the chemical force, and that force is stored energy the cell paid for.",
      svg:FIG_IONS,
      cap:"Concentrations in mmol/L. Potassium is high inside, sodium and chloride are high outside, and free calcium inside is so low it takes four decimal places to write.",
      big:"Every one of these gaps is a battery the cell charged with ATP.",
      covers:["w2-electrochemical-gradient"]},

    /* 6 */
    {k:"hook",
      kicker:"Memory hook",
      h:"You already have the sentence for this one",
      lede:"We used this in Week 1 when we talked about steady state disequilibrium. It is the same sentence, and it still does the job.",
      hook:{icon:"K", iconClass:"teal", label:"Memory hook", h:"Banana inside, salt water outside",
        say:"Banana inside, salt water outside, and calcium locked out almost completely.",
        p:[
          "Potassium is the banana ion and it lives inside the cell. Sodium and chloride are table salt and sea water, and they live outside. Calcium is the one held out on purpose, at a concentration so low you need four decimal places.",
          "If you can hold that one sentence, you can rebuild the resting potential, the action potential, and most of the electrolyte problems you will ever meet in a clinic."
        ]},
      covers:["w2-electrochemical-gradient"]},

    /* 7 */
    {k:"text",
      kicker:"The ratio nobody forgets",
      h:"Calcium is held about 10,000 times lower inside than outside",
      lede:"Compare it to the others. Potassium is off by a factor of 35. Sodium by 12. Free calcium is off by about 10,000, and the cell spends energy every second of your life to keep it that way.",
      body:[
        "Why go to that trouble? Because a signal is only loud if the background is quiet. Free calcium inside sits at **0.0001 mmol/L**, so when a calcium channel opens for a single millisecond, the concentration inside can jump ten fold or more from almost nothing.",
        "That jump is what fuses a vesicle at a synapse, what starts a muscle contraction, and what makes a gland secrete. Calcium is not a bulk ion in this course, it is a trigger.",
        "Keep the contrast straight. Sodium and potassium move the voltage. Calcium carries the message once the voltage has moved."
      ],
      big:"Quiet background, loud signal. That is the entire reason calcium is kept so low.",
      covers:["w2-electrochemical-gradient"]},

    /* 8 */
    {k:"cards", cols:2,
      kicker:"Two forces, not one",
      h:"Every ion at the membrane is being pushed by two different things",
      lede:"Students lose points here more than anywhere else in this unit, and always for the same reason: they treat the concentration difference as the whole story. It is half of it.",
      cards:[
        {label:"Force one", labelClass:"teal", h:"What does the concentration difference do?", p:["It pushes the ion from where it is crowded toward where it is not. This is the **chemical driving force**, and it does not care at all what the charge on the ion is. Put 140 potassium inside and 4 outside and potassium wants out, full stop."]},
        {label:"Force two", labelClass:"terra", h:"What does the membrane voltage do?", p:["The inside of a resting cell is negative, and negative attracts positive. So the voltage pulls positive ions in and pushes negative ions out. This is the **electrical driving force**, and it does not care about concentration at all."]}
      ],
      big:"Put both together and you have the electrochemical gradient. Net movement follows the sum, never one half of it.",
      covers:["w2-electrochemical-gradient"]},

    /* 9 */
    {k:"rows",
      kicker:"Work it ion by ion",
      h:"At a resting potential of -70 mV, which way is each ion being pushed?",
      lede:"Say each one out loud. Chemical force first, then electrical force, then the sum. Four ions, four different answers.",
      rows:[
        {dot:"K+", dotClass:"navy", h:"The two forces almost cancel. Almost.", p:["Chemical force pushes potassium **out**, because there is 35 times more inside. The electrical force pulls it back **in**, because inside is negative and potassium is positive. These nearly balance, so the net leak of potassium out is small. Nearly balanced is not balanced, which is the whole reason a pump exists."]},
        {dot:"Na+", dotClass:"terra", h:"Both forces point the same way, and that is the point.", p:["Chemical force pushes sodium in, because there is 12 times more outside. The electrical force also pulls it in, because it is positive and the inside is negative. Nothing opposes it. Sodium is straining to get in at all times, and the only thing stopping it is that almost no sodium channels are open at rest."]},
        {dot:"Cl-", dotClass:"navy", h:"The forces oppose, because the charge is negative.", p:["Chemical force pushes chloride in, since there is 10 times more outside. The electrical force pushes it back out, because a negative ion is repelled by a negative interior. In many cells these come close to balancing at rest, which is why chloride tends to stabilize a membrane rather than move it."]},
        {dot:"Ca2+", dotClass:"terra", h:"The largest driving force on any ion in the body.", p:["Chemical force pushes calcium in, by a factor of about 10,000. The electrical force also pulls it in, and calcium carries two positive charges so it feels the voltage twice as hard. Open a calcium channel and calcium floods in. That is a feature, not a leak."]}
      ],
      big:"Sodium and calcium are the two ions where both forces point the same way. That is exactly why the body uses them as triggers.",
      covers:["w2-electrochemical-gradient"]},

    /* 10 */
    {k:"formula",
      kicker:"The equation",
      h:"The Nernst equation asks one question: what voltage would satisfy this ion completely?",
      lede:"Pick one ion. Ignore every other ion in the universe. Ask what membrane voltage would make the electrical force exactly cancel the chemical force, so there is no net movement at all. That voltage is the equilibrium potential for that ion, and the Nernst equation calculates it.",
      eq:"E ion = (61 / z) x log (concentration outside / concentration inside)",
      note:"E ion comes out in mV. The 61 is the whole physical constant bundle worked out for a body temperature of 37 C. z is the charge on the ion: +1 for K+ and Na+, -1 for Cl-, +2 for Ca2+. The log is base 10, the one on your calculator marked log, not ln.",
      after:[
        "Three habits will save you every time. Put **outside on top**, always, even when it makes the number ugly. Keep the sign, because the sign is the physiology. And check the ratio before you reach for the calculator, because if outside is smaller than inside the log is negative and your answer has to come out negative.",
        "One warning about the equation. It answers a question about a single ion in isolation. No real cell is permeable to only one ion, so no real cell sits exactly at any equilibrium potential. That gap between what Nernst predicts and what a cell actually does is not a flaw, it is the most useful thing in this deck."
      ],
      big:"Equilibrium potential is the voltage at which an ion would stop moving. Nothing more, nothing less.",
      lab:"You will use this exact form of the equation, the 61 over z log form, in the membrane potential lab. Every Nernst calculation on that packet is worked by hand in pen. Bring a calculator that has a log key on it, and write the ratio down before you press anything.",
      covers:["w2-nernst"]},

    /* 11 */
    {k:"work", variant:"paper",
      kicker:"Worked example one",
      h:"Calculate the potassium equilibrium potential at normal concentrations",
      badges:[{t:"Work it with me"},{t:"3 min", cls:"time"}],
      given:"A normal cell. Potassium is 140 mmol/L inside and 4 mmol/L outside. Potassium carries one positive charge, so z is +1. Body temperature, so the constant is 61.",
      steps:[
        "Write the equation before you write any numbers. E K = (61 / z) x log (K outside / K inside).",
        "Put in z. Potassium is +1, so 61 divided by 1 is just 61. E K = 61 x log (4 / 140).",
        "Do the ratio first, on its own. 4 divided by 140 is 0.0286. Stop here for a second: the ratio is less than 1, so the log will be negative, so your answer has to be negative. If it is not, you flipped the fraction.",
        "Take the log. log (0.0286) = -1.54.",
        "Multiply. 61 x -1.54 = -94 mV."
      ],
      ans:"E K = about -94 mV. Carry -94 mV for the rest of the course.",
      timer:180,
      big:"Read the sign as an instruction. At any voltage less negative than -94 mV, potassium leaves the cell.",
      covers:["w2-nernst"]},

    /* 12 */
    {k:"work", variant:"paper",
      kicker:"Worked example two",
      h:"Now calculate the sodium equilibrium potential, and watch the sign flip",
      badges:[{t:"Work it with me"},{t:"3 min", cls:"time"}],
      given:"The same cell. Sodium is 12 mmol/L inside and 145 mmol/L outside. Sodium also carries one positive charge, so z is +1 again.",
      steps:[
        "Same equation, same order. E Na = 61 x log (Na outside / Na inside).",
        "Ratio first. 145 divided by 12 is 12.1. This time the ratio is bigger than 1, so the log is positive and the answer will be positive. Predict that before you calculate it.",
        "Take the log. log (12.1) = 1.08.",
        "Multiply. 61 x 1.08 = +66 mV.",
        "A note on textbook variation. Some books use 15 mmol/L inside instead of 12, which gives about +60 mV, and your lab packet is one of them. Either is fine, as long as you write down which one you used. What is not fine is losing the plus sign, because the plus sign is the entire result."
      ],
      ans:"E Na = about +66 mV. Large, and positive.",
      timer:180,
      big:"Sodium would only stop moving in if the inside of the cell were 66 mV positive. It never is, so sodium is always trying to get in.",
      covers:["w2-nernst"]},

    /* 13 */
    {k:"work", variant:"paper",
      kicker:"Worked example three, the patient",
      h:"Recalculate the potassium equilibrium potential for Kofi at K+ 2.5 mmol/L",
      badges:[{t:"Work it with me"},{t:"4 min", cls:"time"}],
      given:"Kofi's plasma potassium is 2.5 mmol/L after two days of cholera. Inside the cell potassium is still 140 mmol/L, because he has lost a small fraction of an enormous intracellular store. Only the outside number changed.",
      steps:[
        "E K = 61 x log (2.5 / 140).",
        "Ratio. 2.5 divided by 140 is 0.0179. Smaller than the normal ratio of 0.0286, so this answer must come out more negative than -94 mV. Predict the direction before you calculate the size.",
        "Take the log. log (0.0179) = -1.75.",
        "Multiply. 61 x -1.75 = -107 mV.",
        "Compare to normal. E K went from -94 mV to -107 mV, so it moved 13 mV more negative. The resting potential follows it in the same direction, but not the whole way, because the small sodium leak is still pulling the other way. A real cell goes from about -70 mV to about -75 mV."
      ],
      ans:"E K = about -107 mV. Kofi's resting potential is more negative than yours. His cells are hyperpolarized.",
      timer:240,
      big:"Low potassium outside means a more negative resting potential, which means farther from threshold, which means harder to fire.",
      lab:"On the membrane potential lab packet you will do this same recalculation in pen for Kofi at 2.5 mmol/L and again for a hyperkalemia contrast at 7.0 mmol/L, then write which way the resting potential moves in each case. Show the ratio, the log, and the multiplication as three separate lines so a reader can find your error if there is one.",
      covers:["w2-nernst","w2-resting-potential"]},

    /* 14 */
    {k:"table",
      kicker:"All four, side by side",
      h:"The equilibrium potentials, and why they are so far apart",
      caption:"Calculated with E ion = (61 / z) x log (outside / inside) at 37 C, using the concentrations from earlier in this deck. Your lab packet puts Na+ at 15 mmol/L inside rather than 12, so on the packet E Na comes out near +60 mV instead of +66 mV. Use the packet's number on the packet and say which one you used.",
      cols:["Ion","z","Outside / inside","E ion","What the sign is telling you"],
      rows:[
        ["K+","+1","4 / 140","-94 mV","Above -94 mV, potassium leaves"],
        ["Na+","+1","145 / 12","+66 mV","Below +66 mV, sodium enters"],
        ["Cl-","-1","100 / 10","-61 mV","Close to rest, so it opposes change"],
        ["Ca2+","+2","1.2 / 0.0001","+124 mV","Calcium enters at any voltage a cell ever reaches"]
      ],
      big:"A real cell sits at about -70 mV. Look how far that is from every number in this column except potassium.",
      covers:["w2-nernst","w2-electrochemical-gradient"]},

    /* 15 */
    {k:"text",
      kicker:"Reading the answer",
      h:"What the sign of an equilibrium potential actually tells you",
      lede:"Do not read the equilibrium potential as a prediction of where the cell will sit. Read it as a target the ion is pulling toward.",
      body:[
        "The rule is short enough to say out loud. If the membrane potential is **more negative** than an ion's equilibrium potential, a positive ion will move into the cell. If it is less negative, that ion will move out. The ion moves in whichever direction takes the membrane toward that ion's own equilibrium potential.",
        "Try it on Kofi. His resting potential is about -75 mV and his E K is -107 mV. The membrane is less negative than E K, so potassium leaves the cell whenever a potassium channel opens. Same as normal, just harder.",
        "Try it on sodium. Resting potential -70 mV, E Na is +66 mV. The membrane is far more negative than E Na, so sodium rushes in the instant a sodium channel opens, and it is a much bigger push than the one on potassium because the gap is 136 mV wide rather than 24 mV."
      ],
      list:[
        "The size of the gap between the membrane potential and E ion is the driving force on that ion.",
        "A large gap means a hard push. Sodium at rest has one of the largest gaps in the body.",
        "An ion sitting at its own equilibrium potential has no driving force at all, no matter how lopsided the concentrations look."
      ],
      big:"Ions always move toward their own equilibrium potential, and they drag the membrane potential with them.",
      covers:["w2-nernst"]},

    /* 16 */
    {k:"cards", cols:3,
      kicker:"The resting potential",
      h:"Why does a resting cell sit near the potassium equilibrium potential?",
      lede:"A resting neuron measures about -70 mV. E K is -94 mV and E Na is +66 mV. The resting potential is not halfway between them, it is close to one end. Three questions get you the whole answer.",
      cards:[
        {label:"Question one", labelClass:"teal", h:"Which ion has the most open doors at rest?", p:["Potassium, by a long way. A resting membrane is packed with potassium **leak channels** that are open all the time, and it has very few open sodium channels. The membrane is roughly 25 to 40 times more permeable to potassium than to sodium."]},
        {label:"Question two", labelClass:"teal", h:"So why is it not exactly -94 mV?", p:["Because the sodium permeability is small, not zero. That trickle of sodium leaking in is positive charge arriving, and it holds the membrane about 24 mV less negative than pure potassium would. The resting potential is a compromise, weighted by permeability."]},
        {label:"Question three", labelClass:"terra", h:"What stops the gradients running down?", p:["The Na+/K+ ATPase, the pump you met earlier this week. It exports 3 Na+ and imports 2 K+ per cycle, so it undoes the leak and, because it moves one net positive charge out per cycle, it adds a few mV of its own. Stop the pump and the resting potential decays."]}
      ],
      big:"The resting potential belongs to whichever ion has the most open channels. At rest, that is potassium.",
      covers:["w2-resting-potential"]},

    /* 17 */
    {k:"rows",
      kicker:"Predict it",
      h:"Change one thing and say which way the resting potential moves",
      lede:"This is the exam question, in all four of its disguises. In every case the answer comes from the same sentence: the membrane moves toward the equilibrium potential of whichever ion just got more permeable.",
      rows:[
        {dot:"1", dotClass:"teal", h:"You open more potassium channels. What happens?", p:["Potassium permeability rises, so the membrane is pulled harder toward E K, which is -94 mV. The cell becomes **more negative**, which is hyperpolarization. It is now farther from threshold and harder to fire. This is exactly what many inhibitory signals do."]},
        {dot:"2", dotClass:"terra", h:"You double sodium permeability. What happens?", p:["The membrane is pulled toward E Na, which is +66 mV. The cell becomes less negative, which is depolarization, and it is now closer to threshold. Do this hard enough and fast enough and you have the opening of an action potential."]},
        {dot:"3", dotClass:"teal", h:"You raise extracellular potassium from 4 to 7 mmol/L. What happens?", p:["You shrank the potassium gradient, so E K moves from -94 mV toward -79 mV. The resting potential follows it up to about -64 mV. The cell depolarizes and sits closer to threshold. Note that you changed a concentration here, not a permeability, and the direction rule still works."]},
        {dot:"4", dotClass:"terra", h:"You block the Na+/K+ ATPase. What happens?", p:["Nothing dramatic in the first second, because the pump only contributes a few mV directly. Then the gradients themselves start to run down, sodium accumulates inside, potassium leaks away, and the resting potential decays toward zero over minutes. That collapse is how ischemic tissue dies once the ATP runs out. It is not how digoxin works. Digoxin blocks only a fraction of the pumps, and what changes the patient is downstream: a shallower sodium gradient means NCX moves less calcium out, so the heart contracts harder."]}
      ],
      big:"Whichever ion gets more permeable wins, and the membrane walks toward that ion's equilibrium potential.",
      covers:["w2-resting-potential"]},

    /* 18 */
    {k:"hook",
      kicker:"Memory hook",
      h:"How to hold the resting potential in one image",
      hook:{icon:"V", iconClass:"terra", label:"Memory hook", h:"The membrane potential is a vote, and the votes are open channels",
        say:"Whichever ion has the most open channels holds the most votes, and the membrane sits where that ion wants it.",
        p:[
          "At rest, potassium holds almost all the ballots, so the result lands near the potassium equilibrium potential of -94 mV. Sodium has a few votes, and those few votes pull the result about 24 mV toward the sodium side, which is how you end up at -70 mV.",
          "Now open a pile of sodium channels. Sodium suddenly holds the majority and the result swings hard toward +66 mV. That swing is the action potential, and it is the whole of Week 4.",
          "Nothing about the concentrations changed during that swing. Only the number of open doors changed. Hold onto that, because it is the single most common misunderstanding on this exam."
        ]},
      big:"Concentrations set the targets. Permeability decides which target wins.",
      covers:["w2-resting-potential"]},

    /* 19 */
    {k:"fig",
      kicker:"The experiment behind the theory",
      h:"Plot the resting potential against extracellular potassium and you get a straight line, mostly",
      lede:"This is the classic experiment, and it is the one you will reproduce in the simulation this week. Change the potassium outside a cell, measure the resting potential, plot it against potassium on a log axis, and compare it to what Nernst predicted.",
      svg:FIG_KPLOT,
      cap:"The maroon line is the Nernst prediction for potassium alone, which is perfectly straight on a log axis. The teal curve is what a real cell does. The two agree at high potassium and separate at low potassium.",
      big:"Where the real cell leaves the line, the sodium leak is the reason. That gap is the sodium permeability made visible.",
      lab:"In the membrane potential simulation you will set extracellular potassium to at least five values, from about 1 up to about 20 mmol/L, record the resting potential each time, and plot your points by hand on semi log paper against the Nernst line you calculated. Expect your measured points to sit above the line at the low end. Do not correct them, explain them.",
      covers:["w2-resting-potential","w2-lab-membrane-potential"]},

    /* 20 */
    {k:"cards", cols:2,
      kicker:"Kofi, and the opposite case",
      h:"Two derangements, opposite directions, and only one of them feels intuitive",
      lede:"Both of these are potassium problems. Both change the resting potential. They do it in opposite directions, and the more negative one is not the safer one.",
      cards:[
        {label:"Kofi, K+ 2.5 mmol/L", labelClass:"teal", big:"E K = -107 mV", h:"Hypokalemia. Which way does the resting potential go?", p:["More negative. E K falls from -94 to -107 mV and the resting potential follows from about -70 to about -75 mV. The cell is now farther from the threshold of -55 mV, so a bigger stimulus is needed to fire it. That is his weakness."]},
        {label:"Contrast, K+ 7.0 mmol/L", labelClass:"terra", big:"E K = -79 mV", h:"Hyperkalemia. Which way does the resting potential go?", p:["Less negative. E K rises from -94 to -79 mV and the resting potential follows to about -64 mV. The cell is now closer to threshold. At first that makes it easier to fire, and then, as you will see next slide, it makes it impossible."]}
      ],
      big:"Potassium outside goes up, the cell depolarizes. Potassium outside goes down, the cell hyperpolarizes. Say it until it is automatic.",
      covers:["w2-resting-potential","w2-nernst"]},

    /* 21 */
    {k:"text", variant:"dark",
      kicker:"Why this is an emergency",
      h:"High potassium first makes the heart easier to fire, then it stops it",
      lede:"Follow the resting potential up. At K+ 6 mmol/L a cardiac cell sits around -65 mV, closer to threshold, and it is easier to excite. Push higher and something else happens.",
      body:[
        "Voltage gated sodium channels do not just open in response to depolarization, they also **inactivate** if the membrane stays depolarized. A cell that is held at -60 mV or above has a growing fraction of its sodium channels stuck in the inactivated state, and inactivated channels cannot open no matter how strong the stimulus is.",
        "So the sequence is: easier to fire, then harder to fire, then not firing at all. On an electrocardiogram you watch it happen. Early hyperkalemia gives tall, narrow, **peaked T waves**, because repolarization is fast. Higher still and the P wave flattens and disappears, the QRS widens as conduction slows, and eventually the tracing merges into a sine wave and the heart stops.",
        "This is why a potassium infusion is never pushed fast. Potassium given as a rapid bolus reaches the heart at a concentration nothing in the body ever normally produces, and it depolarizes cardiac cells straight into inactivation. The same milliequivalents given slowly over hours are safe and lifesaving. The physiology on this slide is the entire reason for that rule."
      ],
      big:"Peaked T waves are the first thing potassium writes on an electrocardiogram. Learn that pairing now, you will meet it again in Week 10.",
      covers:["w2-resting-potential"]},

    /* 22 */
    {k:"text",
      kicker:"Back to Kofi",
      h:"So why is a hyperpolarized heart having an irregular rhythm?",
      lede:"This is a fair objection and you should raise it. If low potassium moves cells farther from threshold, it should make everything quieter, not more chaotic. Kofi's monitor says otherwise.",
      body:[
        "In skeletal muscle the simple story holds. His cells sit farther from threshold, motor units are harder to recruit, and he feels weak and tired. Severe hypokalemia can go as far as flaccid paralysis, and it will slow the gut down too.",
        "Cardiac muscle adds a second effect. The potassium currents that repolarize a cardiac cell depend on extracellular potassium, and when potassium outside falls, those currents get **slower**, not faster. Repolarization drags out, the cell takes longer to reset, and on the tracing you see a flattened T wave, a U wave appearing after it, and a long QT interval.",
        "A heart cell that repolarizes slowly and unevenly is a heart cell that can be re excited at the wrong moment by a stray beat. That is the irregular rhythm on his monitor, and it is why his potassium of 2.5 mmol/L gets treated before he feels much worse."
      ],
      list:[
        "Skeletal muscle in hypokalemia: farther from threshold, weak.",
        "Cardiac muscle in hypokalemia: slow, uneven repolarization, prone to extra beats.",
        "Both come from the same number, 2.5 mmol/L, acting on two tissues with different channel populations."
      ],
      big:"Same ion, same patient, two tissues, two different answers. Physiology rarely gives you one rule for the whole body.",
      covers:["w2-resting-potential"]},

    /* 23 */
    {k:"text",
      kicker:"The bill for all of this",
      h:"None of these gradients are free, and one pump pays for all of them",
      lede:"You met the Na+/K+ ATPase earlier this week as a transporter. Look at it again now that you know what the gradients are for.",
      body:[
        "Every cycle it moves **3 Na+ out and 2 K+ in**, and it spends one ATP to do it. That is what keeps sodium low inside and potassium high inside against everything you drew on the ion diagram. Around 20 to 25 percent of your resting energy budget goes to this one job, and in a working neuron the share is far higher.",
        "It is also slightly electrogenic. Three positive charges out for two in is a net loss of one positive charge per cycle, and that contributes a few mV of the negativity you measure at rest. Only a few, so do not oversell it in an exam answer. The pump's real contribution is maintaining the gradients that potassium leak then converts into voltage.",
        "Here is the connection worth carrying. The pump does not create the membrane potential. It builds the gradients, and the open potassium channels turn those gradients into a voltage. Two different steps, done by two different proteins."
      ],
      big:"The pump charges the battery. The leak channels are what plug the battery in.",
      covers:["w2-resting-potential","w2-electrochemical-gradient"]},

    /* 24 */
    {k:"cards", cols:4,
      kicker:"Ion channels",
      h:"Four kinds of gate, and the only thing that separates them is what opens them",
      lede:"Every channel in this course fits one of these four. Do not memorize them as a list. Memorize the question, which is: what has to happen before this pore lets ions through?",
      cards:[
        {label:"Leak", labelClass:"teal", h:"What opens a leak channel?", p:["Nothing does. It has no gate to open, so it is open all the time and ions move through it whenever there is a driving force. The potassium leak channel is why the resting potential exists at all."], note:"Found in: every cell, and it is the dominant channel at rest."},
        {label:"Voltage gated", labelClass:"terra", h:"What opens a voltage gated channel?", p:["A change in the membrane voltage. The protein carries charged segments that physically move when the field across the membrane changes, and that movement swings the gate. Depolarization is the usual trigger."], note:"Found in: axons, skeletal muscle, and every cell of the heart."},
        {label:"Ligand gated", labelClass:"terra", h:"What opens a ligand gated channel?", p:["A chemical binding to it. The channel is also a receptor, so the molecule that opens it is the message. It can be a neurotransmitter arriving from outside or a second messenger arriving from inside."], note:"Found in: the neuromuscular junction, and every chemical synapse in the brain."},
        {label:"Mechanically gated", labelClass:"teal", h:"What opens a mechanically gated channel?", p:["Physical force on the membrane. Stretch, pressure, bending, vibration. The membrane deforms and the pore is pulled open, which turns a mechanical event directly into an electrical one."], note:"Found in: hair cells of the inner ear, baroreceptors, touch receptors in skin."}
      ],
      big:"Four gates, four triggers. Nothing, voltage, a chemical, a push.",
      covers:["w2-ion-channels"]},

    /* 25 */
    {k:"fig",
      kicker:"See all four at once",
      h:"The same pore, four different reasons to open",
      lede:"Notice that the channel protein itself looks similar in all four panels. It is the gating mechanism, not the pore, that gives each type its name.",
      svg:FIG_CHANNELS,
      cap:"Left to right: leak, open with no gate. Voltage gated, held shut until the field across the membrane changes. Ligand gated, held shut until a molecule binds. Mechanically gated, held shut until the membrane is pulled or bent.",
      big:"Ask what opens it. That one question sorts every channel in the course.",
      covers:["w2-ion-channels"]},

    /* 26 */
    {k:"rows",
      kicker:"Where each one earns its living",
      h:"A real place in the body for every channel type",
      lede:"A channel type you cannot locate is a channel type you will forget by Friday. Here is one location for each, and each of these four locations comes back later in the course.",
      rows:[
        {dot:"1", dotClass:"teal", h:"Leak channels: what are they doing in a resting neuron?", p:["Holding the resting potential at -70 mV, continuously. Potassium leak channels are open every second of your life, and the steady trickle of potassium out is what makes the inside negative in the first place. They are also the reason the resting potential tracks extracellular potassium so tightly, which is the whole of Kofi's problem."]},
        {dot:"2", dotClass:"terra", h:"Voltage gated channels: what does the dentist block?", p:["Voltage gated **sodium** channels. Lidocaine and the other local anesthetics enter the channel and plug it, so the nerve under that injection cannot depolarize past threshold no matter how much the drill does. The signal never starts, so no pain reaches your brain. Nothing about the tooth changed, only a channel did."]},
        {dot:"3", dotClass:"terra", h:"Ligand gated channels: what happens when a nerve tells a muscle to contract?", p:["Acetylcholine is released at the neuromuscular junction and binds the nicotinic receptor on the muscle fiber, which is a ligand gated channel. It opens, sodium enters, the muscle depolarizes. Curare blocks that receptor and the muscle cannot be told to contract, which is how paralysis without loss of consciousness works."]},
        {dot:"4", dotClass:"teal", h:"Mechanically gated channels: how does sound become an electrical signal?", p:["A sound wave bends the stereocilia on a hair cell in the cochlea, and the bending physically pulls tiny channels open. Ions rush in and the cell depolarizes. There is no chemical step and no voltage step at the start, just a mechanical event converted straight into voltage. This is where Week 7 begins."]}
      ],
      big:"Local anesthetic, curare, and hearing are three channel stories. Learn the channel and you have all three.",
      covers:["w2-ion-channels"]},

    /* 27 */
    {k:"cards", cols:4,
      kicker:"The vocabulary",
      h:"Four words for what the voltage is doing, and students mix up two of them constantly",
      lede:"Every one of these describes a direction of movement from where the membrane started. None of them names a fixed voltage, and that is why a question can only be answered by looking at the tracing.",
      cards:[
        {label:"Depolarization", labelClass:"terra", big:"Toward zero", h:"Which direction is depolarization?", p:["The membrane potential becomes **less negative**, moving from -70 mV toward 0 mV. It is usually positive charge entering the cell, most often sodium or calcium. Depolarization moves a cell closer to threshold and makes it easier to fire."]},
        {label:"Repolarization", labelClass:"teal", big:"Back to rest", h:"Which direction is repolarization?", p:["The membrane returns toward the resting potential after having been depolarized. It is usually potassium leaving the cell, carrying positive charge out. Repolarization only ever describes coming back, so a cell that was never depolarized cannot repolarize."]},
        {label:"Hyperpolarization", labelClass:"teal", big:"Past rest", h:"Which direction is hyperpolarization?", p:["The membrane potential becomes **more negative than the resting potential**, for example -80 mV when rest is -70 mV. Potassium leaving or chloride entering will do it. A hyperpolarized cell is farther from threshold and harder to fire. Kofi's cells are sitting like this right now."]},
        {label:"Overshoot", labelClass:"terra", big:"Above 0 mV", h:"What exactly is the overshoot?", p:["The part of a depolarization that carries the inside of the cell above 0 mV, so the interior is briefly positive. During an action potential the peak reaches about +30 mV. Overshoot is a piece of depolarization, not a separate phase that follows it."]}
      ],
      big:"Repolarization goes back to rest. Hyperpolarization goes past it. That one distinction is the most commonly lost mark in this unit.",
      lab:"On the membrane potential lab packet you will hand plot one action potential on a grid running from -90 to +40 mV and label all four of these terms on your own curve, plus the resting line at -70 mV and the threshold line at -55 mV. Draw the two horizontal lines first, before the curve. Everyone who draws the curve first ends up redrawing it.",
      covers:["w2-potential-terms"]},

    /* 28 */
    {k:"fig",
      kicker:"Label it",
      h:"One tracing with every term on it",
      lede:"This is the figure to be able to draw from memory by the end of the week. Cover the labels, redraw it on scratch paper, then check yourself.",
      svg:FIG_TRACE,
      cap:"A single action potential. Rest at -70 mV, threshold at -55 mV, a peak at about +30 mV, and an undershoot to about -80 mV before it settles back. The two ticks on the time axis are 0 and 3 ms, so the spike itself, up and back down through the resting line, lasts about 3 ms. The drift back up out of the undershoot takes longer than the spike did.",
      big:"You will draw this by hand in Week 4 and explain every phase by which channels are open. Today, just be able to name the parts.",
      lab:"This is the same set of axes as the plotting page in your membrane potential lab packet. On paper you also mark where voltage gated sodium channels open, where they inactivate, and where voltage gated potassium channels open. Bring this figure to the packet.",
      covers:["w2-potential-terms"]},

    /* 29 */
    {k:"table",
      kicker:"The exam version",
      h:"Four terms, sorted by direction and by cause",
      caption:"Read the middle column first. Every one of these terms is defined by a direction from a starting point, not by a number.",
      cols:["Term","Direction from where it started","What usually causes it","An example you already know"],
      rows:[
        ["Depolarization","Less negative, toward 0 mV","Na+ or Ca2+ entering","Hyperkalemia sits a cell at -64 mV"],
        ["Repolarization","Back toward the resting potential","K+ leaving","The falling phase of an action potential"],
        ["Hyperpolarization","More negative than rest","K+ leaving or Cl- entering","Kofi at K+ 2.5 mmol/L, resting near -75 mV"],
        ["Overshoot","Above 0 mV, interior briefly positive","Na+ entering fast through open voltage gated channels","The peak at about +30 mV"]
      ],
      big:"Two of these move the cell toward threshold and two move it away. Sort them that way and they stop blurring.",
      covers:["w2-potential-terms"]},

    /* 30 */
    {k:"hook",
      kicker:"Memory hook",
      h:"Say the prefixes out loud until they stop needing thought",
      hook:{icon:"4", iconClass:"teal", label:"Memory hook", h:"De is away, re is back, hyper is past, over is above",
        say:"De goes away from rest toward zero, re goes back to rest, hyper goes past rest, and over goes above zero.",
        p:[
          "Four prefixes, four directions, one starting point. The starting point is always the resting potential, which is why none of these words can be assigned to a fixed voltage.",
          "Test yourself with a trap. A cell moves from -85 mV to -75 mV. Is that depolarization or repolarization? It is depolarization, because the membrane became less negative, and it is also repolarization if the cell had previously been hyperpolarized to -85 and is now returning. One movement, two correct names, and which one you use depends entirely on what came before it on the tracing."
        ]},
      big:"None of these four words means a number. All four mean a direction from where the cell was.",
      covers:["w2-potential-terms"]},

    /* 31 */
    {k:"work", variant:"paper",
      kicker:"Quick reading practice",
      h:"Name the move, four times, out loud",
      badges:[{t:"Work it with me"},{t:"3 min", cls:"time"}],
      given:"A neuron with a resting potential of -70 mV and a threshold of -55 mV. For each change, name the term and say whether the cell is now closer to threshold or farther from it.",
      steps:[
        "The membrane goes from -70 mV to -60 mV. Depolarization. Less negative, so closer to threshold. Easier to fire.",
        "The membrane goes from +30 mV to -40 mV. Repolarization. It is heading back toward rest from the peak, and it is being driven by potassium leaving.",
        "The membrane goes from -70 mV to -82 mV. Hyperpolarization. More negative than rest, so farther from threshold. Harder to fire, and this is Kofi.",
        "The membrane goes from -10 mV to +25 mV. Still depolarization, and the part above 0 mV is the overshoot. The interior of the cell is briefly positive."
      ],
      ans:"If you got all four, you can label the tracing. If step 2 or step 3 tripped you, the fix is the same: ask where the cell started, then ask which direction it moved.",
      timer:180,
      big:"Start point, then direction. That is the whole method.",
      covers:["w2-potential-terms"]},

    /* 32 */
    {k:"rows",
      kicker:"The lab this week",
      h:"What you will actually do in the membrane potential simulation",
      lede:"The simulation gives you a cell with a microelectrode in it and two dials, one for extracellular potassium and one for extracellular sodium. Your job is to test the Nernst prediction against a real membrane and explain where they disagree.",
      rows:[
        {dot:"1", dotClass:"navy", h:"What do you do before you touch a dial?", p:["Calculate. Work out E K by hand for every potassium value you plan to set, using the 61 over z log form, before the simulation shows you anything. A prediction written after the fact is not a prediction, and the lab is graded on the ones you wrote first."]},
        {dot:"2", dotClass:"navy", h:"What do you change, and what do you record?", p:["Set extracellular potassium to about 1, 2.5, 4, 7 and 20 mmol/L in turn, letting the trace settle each time, and record the resting potential to the nearest millivolt. Keep the intracellular potassium fixed at 140 mmol/L, because a patient's cells do not empty out over two days either."]},
        {dot:"3", dotClass:"terra", h:"What does the sodium dial teach you that the potassium dial cannot?", p:["Change extracellular sodium over the same kind of range and watch how little the resting potential moves. That near flat result is the direct evidence that a resting membrane is barely permeable to sodium, and it is the cleanest demonstration of permeability weighting you will get all term."]},
        {dot:"4", dotClass:"navy", h:"What goes on the page at the end?", p:["Your measured points and the Nernst line plotted together against potassium on a log axis, in pen, plus two or three sentences saying where they agreed, where they separated, and which ion is responsible for the gap. Hand plotted and hand labeled, like everything else in this course."]}
      ],
      big:"You are not confirming the equation. You are finding the exact place where a single ion equation stops describing a real cell.",
      lab:"This is the membrane potential lab task in full. Print the packet, calculate before you simulate, record in pen, and plot by hand. The synthesis question at the end asks you to trace Kofi from a hijacked chloride channel in Week 2, through the water and salt he lost, to the shifted E K you just measured, using at least two of your own calculated numbers as evidence.",
      covers:["w2-lab-membrane-potential","w2-nernst","w2-resting-potential"]},

    /* 33 */
    {k:"activity",
      kicker:"Your turn",
      h:"Five minutes, one patient, no notes",
      badges:[{t:"On paper"},{t:"5 min", cls:"time"}],
      lede:"A patient in renal failure arrives with a plasma potassium of 7.0 mmol/L. Intracellular potassium is 140 mmol/L. Work it through in order and write one line for each step. When the timer stops, you should have five lines on the page.",
      listLabel:"What to do",
      list:[
        "Calculate E K at 7.0 mmol/L using E K = 61 x log (7 / 140). Show the ratio, the log and the product on separate lines.",
        "Compare it to the normal E K of -94 mV and say which direction it moved and by how many mV.",
        "State which way the resting potential moves and whether the cell is now closer to threshold or farther from it.",
        "Predict what happens to excitability first, and then what happens as voltage gated sodium channels inactivate.",
        "Name the one change on an electrocardiogram you would expect to see earliest, and say which phase of the cardiac cycle it belongs to."
      ],
      timer:300,
      big:"Check yourself: E K = -79 mV, about 15 mV less negative, resting potential near -64 mV, easier to fire and then impossible to fire, peaked T waves from fast repolarization.",
      covers:["w2-nernst","w2-resting-potential","w2-potential-terms"]},

    /* 34 */
    {k:"close",
      kicker:"Before next class",
      h:"What to carry out of here, and where it goes next",
      lede:"This deck closes Week 2. You started the week getting molecules across a membrane and you are ending it with a voltage, which is what the movement of those molecules leaves behind.",
      list:[
        "Memorize the four rows: K+ 140 in and 4 out, Na+ 12 in and 145 out, Cl- 10 in and 100 out, free Ca2+ 0.0001 in and 1.2 out.",
        "Be able to write the Nernst equation from memory in the 61 over z log form and calculate E K and E Na without looking anything up. Your lab packet uses Na+ 15 mmol/L inside, so expect about +60 mV there rather than the +66 mV in this deck.",
        "Be able to say in one sentence why the resting potential sits near E K, and predict the direction it moves when potassium or sodium permeability changes.",
        "Finish the membrane potential lab packet in pen: the calculations, the simulation results, the hand plot, and the labeled tracing.",
        "Bring one question about Kofi to the discussion board. His story is not finished."
      ],
      big:"In Week 4 you let the gradients go. Open the voltage gated sodium channels and the membrane swings from -70 mV toward +66 mV in under a millisecond. That is the action potential, and everything in this deck was the setup for it.",
      bigVariant:"terra",
      covers:["w2-resting-potential","w2-ion-channels","w2-lab-membrane-potential"]}

  ]
};
