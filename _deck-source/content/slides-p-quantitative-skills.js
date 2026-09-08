/* BIO 005 Human Physiology, Week 1, Unit 1
   Deck P: Quantitative Skills for Physiology
   Dr. Sharilyn Rennie

   Covers the four quantitative competencies for week 1. All four are
   lab flagged, so nearly every slide carries a lab annotation that has
   to read correctly on a printed handout.

   Worked examples are hers, taken from week-01.html section "The math
   you need for physiology", the mass balance section, the twelve
   patient vitals dataset in src/weeks/parts/w1-d-vitals.js, the
   standing challenge in w1-e-case.js and the oxygen curve panel in
   w1-f-curve.js. Numbers are not invented here.
*/

/* ---------- figures ---------- */

const FIG_GRAPH = `
<svg viewBox="0 0 720 430" role="img" aria-labelledby="x1-t x1-d">
  <title id="x1-t">Mean arterial pressure after a healthy 24 year old stands up</title>
  <desc id="x1-d">A line graph. The x axis is time after standing up, in seconds, running from 0 to 30 with labeled ticks at 0, 10, 20 and 30. The y axis is mean arterial pressure in mmHg, running from 60 to 100 with labeled ticks every 10. The dark red line sits flat at 92 mmHg from 0 to 10 seconds. A gold dashed vertical line at 10 seconds marks the moment of standing. The line then falls steeply to 84 mmHg at 12 seconds, 76 at 14 seconds and 68 at 16 seconds, which is the lowest point. It then recovers to 78 at 20 seconds, 86 at 24 seconds and 91 by 30 seconds. A teal dashed right angled triangle is drawn on the falling stretch between 12 and 16 seconds. Its horizontal leg is 4 seconds and its vertical leg is 16 mmHg, so the slope on that stretch is 4 mmHg lost every second.</desc>
  <rect x="90" y="50" width="580" height="290" fill="#FFFFFF"/>
  <line x1="90" y1="50" x2="670" y2="50" stroke="#EDF1F3" stroke-width="2"/>
  <line x1="90" y1="123" x2="670" y2="123" stroke="#EDF1F3" stroke-width="2"/>
  <line x1="90" y1="195" x2="670" y2="195" stroke="#EDF1F3" stroke-width="2"/>
  <line x1="90" y1="268" x2="670" y2="268" stroke="#EDF1F3" stroke-width="2"/>
  <line x1="90" y1="50" x2="90" y2="340" stroke="#3D4860" stroke-width="2"/>
  <line x1="90" y1="340" x2="670" y2="340" stroke="#3D4860" stroke-width="2"/>
  <text x="90" y="30" font-family="Plus Jakarta Sans, sans-serif" font-size="15" font-weight="700" fill="#0B1530">Mean arterial pressure after a healthy 24 year old stands up</text>
  <text x="80" y="345" text-anchor="end" font-family="Plus Jakarta Sans, sans-serif" font-size="13" fill="#3D4860">60</text>
  <text x="80" y="273" text-anchor="end" font-family="Plus Jakarta Sans, sans-serif" font-size="13" fill="#3D4860">70</text>
  <text x="80" y="200" text-anchor="end" font-family="Plus Jakarta Sans, sans-serif" font-size="13" fill="#3D4860">80</text>
  <text x="80" y="128" text-anchor="end" font-family="Plus Jakarta Sans, sans-serif" font-size="13" fill="#3D4860">90</text>
  <text x="80" y="55" text-anchor="end" font-family="Plus Jakarta Sans, sans-serif" font-size="13" fill="#3D4860">100</text>
  <text x="90" y="364" text-anchor="middle" font-family="Plus Jakarta Sans, sans-serif" font-size="13" fill="#3D4860">0</text>
  <text x="280" y="364" text-anchor="middle" font-family="Plus Jakarta Sans, sans-serif" font-size="13" fill="#3D4860">10</text>
  <text x="470" y="364" text-anchor="middle" font-family="Plus Jakarta Sans, sans-serif" font-size="13" fill="#3D4860">20</text>
  <text x="660" y="364" text-anchor="middle" font-family="Plus Jakarta Sans, sans-serif" font-size="13" fill="#3D4860">30</text>
  <text x="380" y="396" text-anchor="middle" font-family="Plus Jakarta Sans, sans-serif" font-size="14" font-weight="700" fill="#0B1530">Time after standing up (seconds)</text>
  <text x="24" y="195" text-anchor="middle" transform="rotate(-90 24 195)" font-family="Plus Jakarta Sans, sans-serif" font-size="14" font-weight="700" fill="#0B1530">Mean arterial pressure (mmHg)</text>
  <line x1="280" y1="50" x2="280" y2="340" stroke="#C9A14A" stroke-width="3" stroke-dasharray="7 5"/>
  <text x="287" y="68" font-family="Plus Jakarta Sans, sans-serif" font-size="13" fill="#0B1530">stands up</text>
  <polyline points="90,108 166,108 242,108 280,108 318,166 356,224 394,282 470,210 546,152 622,123 660,115" fill="none" stroke="#8B3A2E" stroke-width="3"/>
  <circle cx="90" cy="108" r="4" fill="#8B3A2E"/>
  <circle cx="166" cy="108" r="4" fill="#8B3A2E"/>
  <circle cx="242" cy="108" r="4" fill="#8B3A2E"/>
  <circle cx="280" cy="108" r="4" fill="#8B3A2E"/>
  <circle cx="318" cy="166" r="4" fill="#8B3A2E"/>
  <circle cx="356" cy="224" r="4" fill="#8B3A2E"/>
  <circle cx="394" cy="282" r="5" fill="#8B3A2E"/>
  <circle cx="470" cy="210" r="4" fill="#8B3A2E"/>
  <circle cx="546" cy="152" r="4" fill="#8B3A2E"/>
  <circle cx="622" cy="123" r="4" fill="#8B3A2E"/>
  <circle cx="660" cy="115" r="4" fill="#8B3A2E"/>
  <text x="100" y="100" font-family="Plus Jakarta Sans, sans-serif" font-size="13" fill="#8B3A2E">92 mmHg</text>
  <text x="394" y="304" text-anchor="middle" font-family="Plus Jakarta Sans, sans-serif" font-size="13" fill="#8B3A2E">68 mmHg</text>
  <line x1="318" y1="166" x2="394" y2="166" stroke="#1F4E55" stroke-width="2" stroke-dasharray="5 4"/>
  <line x1="394" y1="166" x2="394" y2="282" stroke="#1F4E55" stroke-width="2" stroke-dasharray="5 4"/>
  <text x="356" y="158" text-anchor="middle" font-family="Plus Jakarta Sans, sans-serif" font-size="13" fill="#1F4E55">4 s</text>
  <text x="402" y="228" font-family="Plus Jakarta Sans, sans-serif" font-size="13" fill="#1F4E55">16 mmHg</text>
  <text x="420" y="326" font-family="Plus Jakarta Sans, sans-serif" font-size="13" font-weight="700" fill="#1F4E55">4 mmHg lost every second</text>
</svg>`;

const FIG_SCALE = `
<svg viewBox="0 0 720 400" role="img" aria-labelledby="x2-t x2-d">
  <title id="x2-t">The same five sodium values plotted on two different y axis scales</title>
  <desc id="x2-d">Two line graphs side by side showing exactly the same data, serum sodium on five consecutive days: 139, 140, 141, 140 and 142 mEq/L. In the left panel the y axis runs from 0 to 150 mEq/L, so all five points sit crowded together near the top of the plot and the line looks perfectly flat. In the right panel the y axis runs only from 138 to 143 mEq/L, so the same five points spread across the whole height of the plot and the line looks like a steep climb with a dip on day four. The data are identical. Only the chosen y axis range differs.</desc>
  <rect x="70" y="50" width="270" height="250" fill="#FFFFFF"/>
  <rect x="410" y="50" width="270" height="250" fill="#FFFFFF"/>
  <text x="70" y="34" font-family="Plus Jakarta Sans, sans-serif" font-size="14" font-weight="700" fill="#0B1530">y axis 0 to 150</text>
  <text x="410" y="34" font-family="Plus Jakarta Sans, sans-serif" font-size="14" font-weight="700" fill="#8B3A2E">y axis 138 to 143</text>
  <line x1="70" y1="50" x2="70" y2="300" stroke="#3D4860" stroke-width="2"/>
  <line x1="70" y1="300" x2="340" y2="300" stroke="#3D4860" stroke-width="2"/>
  <line x1="70" y1="220" x2="340" y2="220" stroke="#EDF1F3" stroke-width="2"/>
  <line x1="70" y1="140" x2="340" y2="140" stroke="#EDF1F3" stroke-width="2"/>
  <line x1="70" y1="60" x2="340" y2="60" stroke="#EDF1F3" stroke-width="2"/>
  <text x="62" y="305" text-anchor="end" font-family="Plus Jakarta Sans, sans-serif" font-size="13" fill="#3D4860">0</text>
  <text x="62" y="225" text-anchor="end" font-family="Plus Jakarta Sans, sans-serif" font-size="13" fill="#3D4860">50</text>
  <text x="62" y="145" text-anchor="end" font-family="Plus Jakarta Sans, sans-serif" font-size="13" fill="#3D4860">100</text>
  <text x="62" y="65" text-anchor="end" font-family="Plus Jakarta Sans, sans-serif" font-size="13" fill="#3D4860">150</text>
  <text x="22" y="175" text-anchor="middle" transform="rotate(-90 22 175)" font-family="Plus Jakarta Sans, sans-serif" font-size="13" font-weight="700" fill="#0B1530">Serum sodium (mEq/L)</text>
  <polyline points="85,78 145,76 205,74 265,76 325,73" fill="none" stroke="#8B3A2E" stroke-width="3"/>
  <circle cx="85" cy="78" r="4" fill="#8B3A2E"/>
  <circle cx="145" cy="76" r="4" fill="#8B3A2E"/>
  <circle cx="205" cy="74" r="4" fill="#8B3A2E"/>
  <circle cx="265" cy="76" r="4" fill="#8B3A2E"/>
  <circle cx="325" cy="73" r="4" fill="#8B3A2E"/>
  <text x="85" y="324" text-anchor="middle" font-family="Plus Jakarta Sans, sans-serif" font-size="13" fill="#3D4860">1</text>
  <text x="145" y="324" text-anchor="middle" font-family="Plus Jakarta Sans, sans-serif" font-size="13" fill="#3D4860">2</text>
  <text x="205" y="324" text-anchor="middle" font-family="Plus Jakarta Sans, sans-serif" font-size="13" fill="#3D4860">3</text>
  <text x="265" y="324" text-anchor="middle" font-family="Plus Jakarta Sans, sans-serif" font-size="13" fill="#3D4860">4</text>
  <text x="325" y="324" text-anchor="middle" font-family="Plus Jakarta Sans, sans-serif" font-size="13" fill="#3D4860">5</text>
  <text x="205" y="352" text-anchor="middle" font-family="Plus Jakarta Sans, sans-serif" font-size="13" font-weight="700" fill="#0B1530">Day in hospital</text>
  <line x1="375" y1="50" x2="375" y2="300" stroke="#DCE0E6" stroke-width="2"/>
  <line x1="410" y1="50" x2="410" y2="300" stroke="#3D4860" stroke-width="2"/>
  <line x1="410" y1="300" x2="680" y2="300" stroke="#3D4860" stroke-width="2"/>
  <line x1="410" y1="252" x2="680" y2="252" stroke="#EDF1F3" stroke-width="2"/>
  <line x1="410" y1="204" x2="680" y2="204" stroke="#EDF1F3" stroke-width="2"/>
  <line x1="410" y1="156" x2="680" y2="156" stroke="#EDF1F3" stroke-width="2"/>
  <line x1="410" y1="108" x2="680" y2="108" stroke="#EDF1F3" stroke-width="2"/>
  <line x1="410" y1="60" x2="680" y2="60" stroke="#EDF1F3" stroke-width="2"/>
  <text x="402" y="305" text-anchor="end" font-family="Plus Jakarta Sans, sans-serif" font-size="13" fill="#3D4860">138</text>
  <text x="402" y="257" text-anchor="end" font-family="Plus Jakarta Sans, sans-serif" font-size="13" fill="#3D4860">139</text>
  <text x="402" y="209" text-anchor="end" font-family="Plus Jakarta Sans, sans-serif" font-size="13" fill="#3D4860">140</text>
  <text x="402" y="161" text-anchor="end" font-family="Plus Jakarta Sans, sans-serif" font-size="13" fill="#3D4860">141</text>
  <text x="402" y="113" text-anchor="end" font-family="Plus Jakarta Sans, sans-serif" font-size="13" fill="#3D4860">142</text>
  <text x="402" y="65" text-anchor="end" font-family="Plus Jakarta Sans, sans-serif" font-size="13" fill="#3D4860">143</text>
  <text x="364" y="175" text-anchor="middle" transform="rotate(-90 364 175)" font-family="Plus Jakarta Sans, sans-serif" font-size="13" font-weight="700" fill="#0B1530">Serum sodium (mEq/L)</text>
  <polyline points="425,252 485,204 545,156 605,204 665,108" fill="none" stroke="#8B3A2E" stroke-width="3"/>
  <circle cx="425" cy="252" r="4" fill="#8B3A2E"/>
  <circle cx="485" cy="204" r="4" fill="#8B3A2E"/>
  <circle cx="545" cy="156" r="4" fill="#8B3A2E"/>
  <circle cx="605" cy="204" r="4" fill="#8B3A2E"/>
  <circle cx="665" cy="108" r="4" fill="#8B3A2E"/>
  <text x="425" y="324" text-anchor="middle" font-family="Plus Jakarta Sans, sans-serif" font-size="13" fill="#3D4860">1</text>
  <text x="485" y="324" text-anchor="middle" font-family="Plus Jakarta Sans, sans-serif" font-size="13" fill="#3D4860">2</text>
  <text x="545" y="324" text-anchor="middle" font-family="Plus Jakarta Sans, sans-serif" font-size="13" fill="#3D4860">3</text>
  <text x="605" y="324" text-anchor="middle" font-family="Plus Jakarta Sans, sans-serif" font-size="13" fill="#3D4860">4</text>
  <text x="665" y="324" text-anchor="middle" font-family="Plus Jakarta Sans, sans-serif" font-size="13" fill="#3D4860">5</text>
  <text x="545" y="352" text-anchor="middle" font-family="Plus Jakarta Sans, sans-serif" font-size="13" font-weight="700" fill="#0B1530">Day in hospital</text>
  <text x="360" y="382" text-anchor="middle" font-family="Plus Jakarta Sans, sans-serif" font-size="14" font-weight="700" fill="#1F4E55">Identical data. 139, 140, 141, 140, 142 mEq/L.</text>
</svg>`;

const FIG_ERROR = `
<svg viewBox="0 0 720 420" role="img" aria-labelledby="x3-t x3-d">
  <title id="x3-t">Five repeated osmometer readings from two instruments, against the true value</title>
  <desc id="x3-d">A dot plot with a single vertical scale of osmometer reading in mOsm/kg, labeled from 285 to 310. A thick gold horizontal line across the whole figure marks the true value of 305 mOsm/kg. On the left, instrument A gives five readings of 303, 307, 304, 306 and 305, scattered on both sides of the gold line. A teal dashed line marks their average of 305, which lands on the gold line. On the right, instrument B gives five readings of 288, 291, 289, 292 and 290. They are tightly grouped but all of them sit well below the gold line. A teal dashed line marks their average of 290, and a short dark red vertical bar shows the 15 mOsm/kg gap between that average and the true value.</desc>
  <rect x="100" y="80" width="590" height="260" fill="#FFFFFF"/>
  <line x1="100" y1="80" x2="100" y2="340" stroke="#3D4860" stroke-width="2"/>
  <line x1="92" y1="303" x2="100" y2="303" stroke="#3D4860" stroke-width="2"/>
  <line x1="92" y1="266" x2="100" y2="266" stroke="#3D4860" stroke-width="2"/>
  <line x1="92" y1="229" x2="100" y2="229" stroke="#3D4860" stroke-width="2"/>
  <line x1="92" y1="191" x2="100" y2="191" stroke="#3D4860" stroke-width="2"/>
  <line x1="92" y1="154" x2="100" y2="154" stroke="#3D4860" stroke-width="2"/>
  <line x1="92" y1="117" x2="100" y2="117" stroke="#3D4860" stroke-width="2"/>
  <text x="86" y="308" text-anchor="end" font-family="Plus Jakarta Sans, sans-serif" font-size="13" fill="#3D4860">285</text>
  <text x="86" y="271" text-anchor="end" font-family="Plus Jakarta Sans, sans-serif" font-size="13" fill="#3D4860">290</text>
  <text x="86" y="234" text-anchor="end" font-family="Plus Jakarta Sans, sans-serif" font-size="13" fill="#3D4860">295</text>
  <text x="86" y="196" text-anchor="end" font-family="Plus Jakarta Sans, sans-serif" font-size="13" fill="#3D4860">300</text>
  <text x="86" y="159" text-anchor="end" font-family="Plus Jakarta Sans, sans-serif" font-size="13" fill="#3D4860">305</text>
  <text x="86" y="122" text-anchor="end" font-family="Plus Jakarta Sans, sans-serif" font-size="13" fill="#3D4860">310</text>
  <text x="30" y="210" text-anchor="middle" transform="rotate(-90 30 210)" font-family="Plus Jakarta Sans, sans-serif" font-size="14" font-weight="700" fill="#0B1530">Osmometer reading (mOsm/kg)</text>
  <line x1="100" y1="154" x2="690" y2="154" stroke="#C9A14A" stroke-width="4"/>
  <text x="690" y="144" text-anchor="end" font-family="Plus Jakarta Sans, sans-serif" font-size="13" font-weight="700" fill="#0B1530">True value, 305 mOsm/kg</text>
  <line x1="375" y1="80" x2="375" y2="340" stroke="#DCE0E6" stroke-width="2"/>
  <line x1="115" y1="151" x2="325" y2="151" stroke="#1F4E55" stroke-width="2" stroke-dasharray="6 4"/>
  <circle cx="130" cy="169" r="7" fill="#0B1530"/>
  <circle cx="175" cy="139" r="7" fill="#0B1530"/>
  <circle cx="220" cy="162" r="7" fill="#0B1530"/>
  <circle cx="265" cy="147" r="7" fill="#0B1530"/>
  <circle cx="310" cy="154" r="7" fill="#0B1530"/>
  <text x="220" y="205" text-anchor="middle" font-family="Plus Jakarta Sans, sans-serif" font-size="13" font-weight="700" fill="#1F4E55">Average 305, sitting on the truth</text>
  <line x1="415" y1="266" x2="625" y2="266" stroke="#1F4E55" stroke-width="2" stroke-dasharray="6 4"/>
  <circle cx="430" cy="281" r="7" fill="#0B1530"/>
  <circle cx="475" cy="258" r="7" fill="#0B1530"/>
  <circle cx="520" cy="273" r="7" fill="#0B1530"/>
  <circle cx="565" cy="251" r="7" fill="#0B1530"/>
  <circle cx="610" cy="266" r="7" fill="#0B1530"/>
  <text x="520" y="306" text-anchor="middle" font-family="Plus Jakarta Sans, sans-serif" font-size="13" font-weight="700" fill="#1F4E55">Average 290, and it stays there</text>
  <line x1="645" y1="154" x2="645" y2="266" stroke="#8B3A2E" stroke-width="3"/>
  <line x1="639" y1="154" x2="651" y2="154" stroke="#8B3A2E" stroke-width="3"/>
  <line x1="639" y1="266" x2="651" y2="266" stroke="#8B3A2E" stroke-width="3"/>
  <text x="654" y="214" font-family="Plus Jakarta Sans, sans-serif" font-size="13" font-weight="700" fill="#8B3A2E">15 low</text>
  <text x="220" y="372" text-anchor="middle" font-family="Plus Jakarta Sans, sans-serif" font-size="14" font-weight="700" fill="#0B1530">Instrument A, five readings</text>
  <text x="520" y="372" text-anchor="middle" font-family="Plus Jakarta Sans, sans-serif" font-size="14" font-weight="700" fill="#0B1530">Instrument B, five readings</text>
  <text x="220" y="396" text-anchor="middle" font-family="Plus Jakarta Sans, sans-serif" font-size="13" fill="#3D4860">Scatter on both sides of the line</text>
  <text x="520" y="396" text-anchor="middle" font-family="Plus Jakarta Sans, sans-serif" font-size="13" fill="#3D4860">Tight group, every one of them low</text>
</svg>`;

/* ---------- deck ---------- */

module.exports = {
  id: "slides-p-quantitative-skills",
  letter: "P",
  type: "Physiology",
  week: 1,
  unit: 1,
  topic: "Quantitative Skills for Physiology",
  title: "The math this course actually needs",
  subtitle: "Units, graphs, controls, and the two kinds of error",

  slides: [

    /* ============ 1 ============ */
    {
      k: "title",
      variant: "terra",
      kicker: "Week 1, Unit 1",
      h: "The math this course actually needs",
      lede: "Four skills. All four get used in lab this week, and all four keep showing up on every exam after that.",
      terms: [
        { t: "Molarity", c: "t" },
        { t: "Osmolarity", c: "t" },
        { t: "Milliequivalents", c: "g" },
        { t: "mmHg", c: "g" },
        { t: "Slope", c: "l" },
        { t: "Control condition", c: "l" },
        { t: "Systematic error", c: "l" }
      ],
      big: "None of this is new arithmetic. All of it has to be fast.",
      covers: ["w1-units-conversion", "w1-lab-graphing", "w1-lab-experimental-design", "w1-lab-measurement-error"]
    },

    /* ============ 2 ============ */
    {
      k: "text",
      kicker: "Where this is going",
      h: "What you should be able to do by Sunday",
      lede: "There is not much of it. You just need it to be automatic, because a question about the kidney should never turn into a question about unit conversion.",
      list: [
        "Convert between the units physiology actually uses: molarity, osmolarity, milliequivalents, mmHg, liters per minute, and percent solutions.",
        "Build a graph with the right variable on the right axis, then read the slope, the direction and the trend off a real data set.",
        "Look at any experiment and name the hypothesis, what was changed, what was measured, and the control. Then say what the control rules out.",
        "Tell random error from systematic error, and say why we repeat a measurement and average it."
      ],
      body: [
        "Every one of these is a hand skill. You do not learn it by reading it, you learn it by doing about six of them. So most of this hour is worked problems and most of the answers are numbers."
      ],
      big: "Nobody in this room lacks the arithmetic. What people lack is the speed.",
      lab: "All four of these are lab skills, so all four get used in the Week 1 lab. You will convert osmolarities, work the blood pressure formula twenty four times, plot a standing test, name the parts of that experiment, and repeat one measurement to see what repeating buys you.",
      covers: ["w1-units-conversion", "w1-lab-graphing", "w1-lab-experimental-design", "w1-lab-measurement-error"]
    },

    /* ============ 3 ============ */
    {
      k: "text",
      variant: "dark",
      kicker: "Start here",
      h: "What does 140 mean?",
      lede: "Nothing yet. Say the unit.",
      body: [
        "140 mEq/L is a serum sodium, and it is comfortably normal. 140 mg/dL is a blood glucose, and it is a little high. 140 mmHg is a systolic blood pressure, and it is a lot high. 140 beats per minute in an adult sitting still is somebody I want to go and look at.",
        "Same digits, four different pieces of physiology and four different conversations with a patient. The unit is not decoration on the end of the number. It carries half the meaning."
      ],
      big: "A number without a unit is not an answer. It is a digit."
    },

    /* ============ 4 ============ */
    {
      k: "table",
      kicker: "The whole list",
      h: "The units you will actually see",
      caption: "Six unit families. That is the entire vocabulary for this course.",
      cols: ["Unit", "What it counts", "Watch out for"],
      rows: [
        ["Molar, M", "Moles per liter", "Times 1,000 gives you millimolar, mM. Body concentrations are nearly always written in mM."],
        ["Osmolar, OsM", "Particles per liter, not molecules", "This is the one that gets people. 1 M glucose is 1 OsM because it does not split. 1 M sodium chloride is close to 2 OsM because it does. Your plasma sits at about **290 mOsm/L**."],
        ["Milliequivalents, mEq", "Charge", "Na+ and K+ carry one charge each, so mEq and mM come out the same number. Ca2+ carries two, so 1 mM is 2 mEq."],
        ["mmHg", "Pressure", "Blood pressure, and the pressure of a gas. Weeks 11 and 12 are built on it."],
        ["L/min", "Flow", "Your heart puts out about **5 L/min** sitting still. Week 11."],
        ["Percent solution", "Grams per 100 mL", "0.9 percent saline is 9 grams of salt in a liter, not 0.9 grams. Getting this backwards is off by a factor of ten."]
      ],
      big: "Six rows. Learn the middle column and the right column takes care of itself.",
      lab: "Every number on the Week 1 lab worksheet is carrying one of these units. Write the unit next to every answer you put in the box. An answer with no unit does not get marked correct, and that rule is not me being fussy, it is the reason 0.9 percent saline gets mixed up with 9 percent saline in real hospitals.",
      covers: ["w1-units-conversion"]
    },

    /* ============ 5 ============ */
    {
      k: "cards",
      kicker: "Molarity against osmolarity",
      h: "Answer these three out loud before you click",
      lede: "This is the distinction people collapse, and every fluid problem for the rest of the course sits on top of it.",
      cols: 3,
      cards: [
        {
          label: "One",
          labelClass: "terra",
          h: "You dissolve 1 mole of glucose in a liter of water. How many osmoles?",
          p: ["One. Glucose stays in one piece in water, so a mole of molecules gives you a mole of particles. 1 M glucose is 1 OsM."]
        },
        {
          label: "Two",
          labelClass: "terra",
          h: "Now 1 mole of sodium chloride in a liter. How many osmoles?",
          p: ["Close to two. Sodium chloride comes apart into Na+ and Cl-, so one mole of salt puts about two moles of particles into the water."]
        },
        {
          label: "Three",
          labelClass: "teal",
          h: "So which of those two solutions pulls harder on water across a membrane?",
          p: ["The salt, by about double. Water does not care what the particle is, it only counts how many there are. That is the entire reason **osmolarity** exists as a separate unit from molarity."]
        }
      ],
      lab: "In the Week 1 lab you decide which bag of fluid belongs in which patient. Every one of those decisions is this question wearing a clinical hat, so get it clean here and the lab becomes arithmetic instead of guesswork.",
      covers: ["w1-units-conversion"]
    },

    /* ============ 6 ============ */
    {
      k: "formula",
      kicker: "The conversion",
      h: "Molarity to osmolarity, in one multiplication",
      eq: "osmolarity = molarity x number of particles the solute breaks into",
      note: "For this course you need three of those numbers and no more. Glucose and urea give 1. NaCl gives 2. CaCl2 gives 3.",
      after: [
        "Plasma runs at about **290 mOsm/L**, and your body defends that number to within about one percent. Everything you will do with cells swelling and shrinking is downstream of it.",
        "Notice what the multiplication does not care about. Not the size of the particle, not its charge, not whether it is a sugar or an ion. Osmosis counts heads."
      ],
      big: "Molarity counts what you put in. Osmolarity counts what ended up floating around.",
      lab: "The osmometer in lab reports osmolality, in mOsm/kg, by measuring how far the freezing point of your sample drops. Osmolality is counted per kilogram of water rather than per liter of solution, and in dilute body fluids the two land close enough together to compare. So the reading will still not agree with the number on the bottle unless you have done this multiplication, and when it comes out roughly double what the label says, that is the salt splitting, not the machine being broken.",
      covers: ["w1-units-conversion"]
    },

    /* ============ 7 ============ */
    {
      k: "work",
      variant: "paper",
      kicker: "Worked example",
      h: "What is the osmolarity of normal saline?",
      badges: [{ t: "Work it with me" }, { t: "3 min", cls: "time" }],
      given: "A bag of 0.9 percent sodium chloride, the one hanging in every emergency department in the country. Sodium chloride weighs 58.5 grams per mole.",
      steps: [
        "Percent means grams per 100 mL. So 0.9 percent is 0.9 g in 100 mL, which is 9 g in a liter.",
        "Turn grams into moles. 9 divided by 58.5 is 0.154 moles per liter, so 154 mmol/L.",
        "Now count particles. Sodium chloride splits into Na+ and Cl-, so multiply by 2.",
        "154 times 2 is 308."
      ],
      ans: "308 mOsm/L. Plasma sits at about 290, so this bag very nearly matches you, and that is exactly why it can go straight into a vein without bursting a single red cell.",
      timer: 180,
      big: "This is why it is called normal saline. Not because it is normal. Because it matches.",
      lab: "You will run this exact calculation on the Week 1 lab worksheet before you are allowed to hang anything, and you will measure the same bag on the osmometer afterwards. It comes back near **286 mOsm/kg**, not 308. That gap is chemistry, not the instrument. Na+ and Cl- do not drift about as two fully independent particles, because each one is still slightly held by the other, and the osmotic coefficient for sodium chloride is about 0.93. 308 times 0.93 is 286. **This is not a reason to calibrate the machine.** 308 is the particle count you calculated, and 286 is what those particles actually do.",
      covers: ["w1-units-conversion"]
    },

    /* ============ 8 ============ */
    {
      k: "work",
      variant: "paper",
      kicker: "Worked example",
      h: "Now the other bag on the shelf",
      badges: [{ t: "Work it with me" }, { t: "3 min", cls: "time" }],
      given: "5 percent dextrose in water, written D5W on the label. Glucose weighs 180 grams per mole. Same question, then a harder one.",
      steps: [
        "5 percent is 5 g in 100 mL, so 50 g in a liter.",
        "50 divided by 180 is 0.278 moles per liter, so 278 mmol/L.",
        "Glucose does not split, so multiply by 1. The osmolarity in the bag is 278 mOsm/L, near enough to plasma.",
        "Now go and read a real bag, which prints **252 mOsm/L**. It is made with dextrose monohydrate, which carries a water along and weighs 198 g per mole rather than 180, so the same 50 g is fewer moles. 50 divided by 198 is 0.252 moles per liter. Same arithmetic, heavier molecule.",
        "Here is the harder one. Twenty minutes after it goes in, your cells have pulled the glucose out of that water and burned it. What is left inside the blood vessel?"
      ],
      ans: "278 mOsm/L on the shelf, and plain water in the patient. D5W is **free water in disguise**, which is why it is the wrong bag for somebody who is bleeding and the right bag for somebody whose sodium is too high.",
      timer: 180,
      big: "Two bags, both isosmotic in the bag, completely different once the body gets hold of them.",
      lab: "This is the trap on the fluid choice task in the Week 1 lab. Read what the solute is, not just what the osmolarity is, because a solute that gets metabolised stops counting the moment it is metabolised.",
      covers: ["w1-units-conversion"]
    },

    /* ============ 9 ============ */
    {
      k: "work",
      variant: "paper",
      kicker: "Worked example",
      h: "Milliequivalents, and when they stop matching",
      badges: [{ t: "Work it with me" }, { t: "2 min", cls: "time" }],
      given: "Three values off one chart. Convert each one into the other unit. Sodium 140 mEq/L. Bicarbonate 24 mEq/L. Ionized calcium 1.2 mmol/L.",
      steps: [
        "Milliequivalents count charge, not particles. So mEq equals mmol times the number of charges the ion carries.",
        "Na+ carries one charge. 140 mEq/L is 140 mmol/L. Same number.",
        "HCO3- carries one charge. 24 mEq/L is 24 mmol/L. Same number again.",
        "Ca2+ carries two. 1.2 mmol/L times 2 is 2.4 mEq/L. Different number."
      ],
      ans: "For sodium, potassium, chloride and bicarbonate you can stop worrying, because mEq and mmol land on the same value. For **calcium and magnesium they do not**, and that is where the mistakes live.",
      timer: 120,
      big: "Charge and particles are the same count only when the ion carries one charge.",
      lab: "The Week 1 lab worksheet deliberately reports potassium in mEq/L and calcium in mmol/L, which is exactly how a real chart does it. Convert before you compare, or the calcium will look half the size it really is.",
      covers: ["w1-units-conversion"]
    },

    /* ============ 10 ============ */
    {
      k: "hook",
      kicker: "Say it out loud",
      h: "One sentence that settles molarity against osmolarity for good",
      hook: {
        icon: "?",
        iconClass: "terra",
        label: "Memory hook",
        h: "Packets and pieces",
        say: "Molarity counts packets. Osmolarity counts pieces.",
        p: [
          "Picture a bag of sugar and a bag of salt sitting on the counter. One mole in each. Tip them both into a liter of water. The sugar goes in as whole molecules and stays that way, one packet, one piece. The salt comes apart on the way down, one packet, two pieces.",
          "Water has no idea what the pieces are and no interest in finding out. It only counts them. So the salt water pulls twice as hard, and that is the whole difference between the two units."
        ]
      },
      big: "Packets go in. Pieces do the pulling.",
      covers: ["w1-units-conversion"]
    },

    /* ============ 11 ============ */
    {
      k: "formula",
      kicker: "The one you will use most",
      h: "Mean arterial pressure, and why it is not the average of the two numbers",
      eq: "MAP = DBP + (pulse pressure / 3)",
      note: "Pulse pressure is just SBP minus DBP. Start at the bottom number and add back a third of the gap.",
      after: [
        "A cuff reading of 120 over 90 has a gap of 30. A third of 30 is 10. So the mean arterial pressure is 90 plus 10, which comes out at **100 mmHg**.",
        "Why a third and not a half? Because the heart spends about twice as long filling as it does ejecting, so for most of every beat the pressure is sitting down near the diastolic. Averaging the two numbers gives you a value the artery never actually spends much time at."
      ],
      big: "The monitor gives you two numbers. The one that decides whether the kidney is being perfused is neither of them.",
      lab: "In the Week 1 lab the monitor hands you a cuff reading and a heart rate for twelve patients, and it does not give you the mean arterial pressure or the pulse pressure. You work out both columns by hand for all twelve. Then five more charts arrive with only the mean and the swing recorded, and you rearrange this formula to get the cuff reading back.",
      covers: ["w1-units-conversion"]
    },

    /* ============ 12 ============ */
    {
      k: "work",
      variant: "paper",
      kicker: "Worked example",
      h: "Two patients. Which one do you go and look at?",
      badges: [{ t: "Work it with me" }, { t: "3 min", cls: "time" }],
      given: "Two of the twelve from your lab dataset. Work out the mean arterial pressure and the pulse pressure for each, then decide.",
      steps: [
        "Patient one, routine physical, no complaints, reads 118 over 76. The gap is 42. A third of 42 is 14. MAP is 76 plus 14, so 90.",
        "Patient two, bleeding after a fall, reads 74 over 54. The gap is 20. A third of 20 is about 7. MAP is 54 plus 7, so 61.",
        "Now the pulse pressures, which are just the gaps. 42 mmHg for the first. 20 mmHg for the second.",
        "The floor for organ perfusion is a MAP of about **65 mmHg**. One of these two is under it."
      ],
      ans: "Patient two, at a MAP of 61 with a swing of only 20. Small beats and a mean under the floor together mean the kidneys and the brain have run out of room to protect their own blood flow, and are now taking whatever pressure they are given.",
      timer: 180,
      big: "Two cuff readings, thirty seconds of arithmetic, and one of them turns into an emergency.",
      lab: "The Week 1 lab flags every patient whose MAP comes out under 65, and then walks your lowest one down a decision chart. The chart only works if your arithmetic is right, so the first box of the chart is the MAP you calculated yourself.",
      covers: ["w1-units-conversion"]
    },

    /* ============ 13 ============ */
    {
      k: "work",
      variant: "paper",
      kicker: "Worked example",
      h: "Flow, and the number you have to know cold",
      badges: [{ t: "Work it with me" }, { t: "2 min", cls: "time" }],
      given: "Your heart rate right now is about 72 beats a minute, and each beat pushes out about 70 mL. What is your cardiac output in liters per minute?",
      steps: [
        "Cardiac output is heart rate times stroke volume. Beats per minute times mL per beat gives mL per minute.",
        "72 times 70 is 5,040 mL per minute.",
        "There are 1,000 mL in a liter, so divide by 1,000. That gives 5.04 L/min.",
        "Now sprint for a bus. Heart rate 160, stroke volume 110 mL. 160 times 110 is 17,600 mL per minute, which is 17.6 L/min."
      ],
      ans: "About **5 L/min** at rest, and over three times that running. Memorize the resting number. Every cardiovascular question for the rest of this course starts from it.",
      timer: 120,
      big: "Your whole blood volume, all five liters of it, goes round once every minute while you sit still.",
      lab: "You will convert mL/min to L/min repeatedly in the Week 1 lab, because the monitors report one and the charts report the other. Getting the decimal point in the wrong place here is the single most common slip on the worksheet.",
      covers: ["w1-units-conversion"]
    },

    /* ============ 14 ============ */
    {
      k: "rows",
      kicker: "Graphs",
      h: "Three questions, and you can read any figure in this course",
      lede: "Answer each one yourself before you click it open. Graphing is half your lab work and it is where the easy marks live.",
      rows: [
        {
          dot: "1",
          dotClass: "navy",
          h: "You have two variables. Which one goes on the x axis?",
          p: [
            "What you changed. What you measured goes on the y. Putting them backwards is the single most common thing I mark wrong on a lab submission.",
            "If you set it, chose it, or dialled it, it is the **independent variable** and it belongs across the bottom."
          ]
        },
        {
          dot: "2",
          dotClass: "navy",
          h: "A figure opens in front of you. What do you read first?",
          p: [
            "The axes, before you look at the line at all. What is plotted, in what units, over what range.",
            "The same curve looks dramatic or boring depending on the scale somebody picked, and in two slides you are going to watch that happen to a set of numbers that never changed."
          ]
        },
        {
          dot: "3",
          dotClass: "terra",
          h: "What is a slope actually telling you?",
          p: [
            "A rate. How much y changes for every one unit of x. Where a curve is steep, a small change in x buys a big change in y. Where it is flat, it buys almost nothing.",
            "In week 12 the entire point of the oxygen curve is **which part of it you are standing on**."
          ]
        }
      ],
      big: "Axes, units, range. Then look at the line.",
      lab: "In the Week 1 lab you plot the standing test yourself, on paper, with your own axes. Both axes have to carry a unit and the independent variable has to be along the bottom, and those two things are graded before anything else on the figure is looked at.",
      covers: ["w1-lab-graphing"]
    },

    /* ============ 15 ============ */
    {
      k: "fig",
      kicker: "What a finished graph looks like",
      h: "Everything on this figure is doing a job",
      lede: "A healthy 24 year old lies still for ten seconds, then stands up. Standing drops 500 to 800 mL of blood into the legs in about one second, and the reflex has to catch it.",
      svg: FIG_GRAPH,
      cap: "Time is on the x axis because time is what was allowed to run. Mean arterial pressure is on the y because pressure is what was measured. Both axes carry units. The gold line marks the one event in the experiment. The teal triangle is how you get a slope off a curve by hand.",
      big: "If a marker cannot tell what was changed and what was measured, the graph has not been labeled.",
      lab: "Your Week 1 lab figure has to look like this one. Title, both axes named with units, the moment of standing marked, and the steepest stretch identified. Draw it in pencil first and label the axes before you plot a single point.",
      covers: ["w1-lab-graphing"]
    },

    /* ============ 16 ============ */
    {
      k: "work",
      variant: "paper",
      kicker: "Worked example",
      h: "Read the slope off the figure you just looked at",
      badges: [{ t: "Work it with me" }, { t: "3 min", cls: "time" }],
      given: "Her mean arterial pressure was 84 mmHg two seconds after she stood, and 68 mmHg six seconds after she stood. What is the slope on that stretch, and what does it mean?",
      steps: [
        "Slope is the change in y divided by the change in x. Always that order, and always subtract the earlier one from the later one.",
        "Change in y is 68 minus 84, which is minus 16 mmHg.",
        "Change in x is 6 seconds minus 2 seconds, which is 4 seconds.",
        "Minus 16 divided by 4 is minus 4."
      ],
      ans: "Minus 4 mmHg per second. The sign tells you the direction, and minus means falling. The size tells you whether to care, because the same 16 mmHg spread over 40 seconds would be 0.4 mmHg per second and nobody faints from that.",
      timer: 180,
      big: "Direction from the sign. Urgency from the size. Both come out of the same division.",
      lab: "The Week 1 lab asks you for the steepest slope on your own trace, in mmHg per second, with the sign. Mark the two points you used on the figure so somebody else could check your arithmetic.",
      covers: ["w1-lab-graphing"]
    },

    /* ============ 17 ============ */
    {
      k: "fig",
      kicker: "Read the axes first",
      h: "Same five numbers. Which panel would worry you?",
      lede: "Serum sodium on five consecutive days in hospital: 139, 140, 141, 140, 142 mEq/L. Both panels plot exactly that.",
      svg: FIG_SCALE,
      cap: "Neither panel is lying. The left one starts the y axis at zero and the sodium looks like a flat line. The right one starts at 138 and the same sodium looks like a crisis. Every value here is inside the normal range of 135 to 145 mEq/L, so the honest reading is the flat one.",
      big: "Before you decide a line is dramatic, look at what the y axis let it do.",
      lab: "You will pick the y axis range on your own Week 1 lab figure. Choose it so a reader can see the change without being told a story that is not there, then write one line under the figure saying why you chose that range.",
      covers: ["w1-lab-graphing"]
    },

    /* ============ 18 ============ */
    {
      k: "cards",
      kicker: "Reading a curve",
      h: "Three questions about the oxygen curve. Answer before you click.",
      lede: "You will meet this curve properly in week 12. Right now it is just the best example in the course of a slope that changes as you move along it.",
      cols: 3,
      cards: [
        {
          label: "The flat top",
          labelClass: "teal",
          h: "A finger clip reads 96 percent. How much does that tell you about the oxygen pressure?",
          p: ["Less than you would like. Up on the flat part the seats are nearly all taken, so saturation barely moves however the pressure moves. The clip itself is only good to about two points either way, so a displayed 96 percent is consistent with a true saturation of anywhere from about **94 to 98 percent**, and that band covers oxygen pressures from roughly 70 up past 120. It cannot tell you where in that stretch you are, and it cannot tell you it has been falling all morning."]
        },
        {
          label: "The knee",
          labelClass: "teal",
          h: "A saturation of 90 percent sounds nearly normal. What oxygen pressure is sitting behind it?",
          p: ["About **60 mmHg**, and that is the knee of the curve. Above it you still have margin. Below it the line turns steep and saturation falls fast for every further point of pressure lost."]
        },
        {
          label: "The steep part",
          labelClass: "terra",
          h: "Why does the same 10 mmHg drop matter more at a PO2 of 40 than at a PO2 of 100?",
          p: ["Because slope is not constant along a curve. At 100 you are on the flat and lose almost nothing. At 40 you are on the steep part, where every point of pressure is worth real saturation. Same drop, different consequence, and the only thing that tells you which one you are in is the graph."]
        }
      ],
      big: "On a straight line the slope is a fact. On a curve it is a question about where you are standing.",
      lab: "The oxygen curve panel in the Week 1 lab lets you pick a pressure and watch where it lands, then slide the whole curve and see what that same pressure is now worth. Do the picking before you read the readout, every time.",
      covers: ["w1-lab-graphing"]
    },

    /* ============ 19 ============ */
    {
      k: "hook",
      kicker: "Say it out loud",
      h: "The sentence that stops you putting the axes backwards",
      hook: {
        icon: "?",
        iconClass: "teal",
        label: "Memory hook",
        h: "Cause across the bottom",
        say: "What I did goes across the bottom. What happened goes up the side.",
        p: [
          "Left to right is the direction you read, and it is the direction cause runs. The thing you set is the thing your eye crosses first.",
          "Then say the units out loud with the name. Not just time, but time in seconds. Not just pressure, but mean arterial pressure in mmHg. If you cannot say the unit, you have not finished labeling that axis."
        ]
      },
      big: "Cause across the bottom, consequence up the side, units on both.",
      covers: ["w1-lab-graphing"]
    },

    /* ============ 20 ============ */
    {
      k: "rows",
      kicker: "Experimental design",
      h: "Four parts. Every experiment in this course has all four.",
      lede: "Say your own answer first, then open it. These four are what you will be asked to name on every lab write up this semester.",
      rows: [
        {
          dot: "H",
          dotClass: "navy",
          h: "What makes something a hypothesis rather than just a question?",
          p: [
            "It has to be a claim you could turn out to be wrong about, and it has to commit to a direction. **A hypothesis predicts which way.**",
            "Not: does posture affect blood pressure. Instead: standing will lower her mean arterial pressure further and for longer than it should, because one limb of her reflex is not answering."
          ]
        },
        {
          dot: "I",
          dotClass: "navy",
          h: "What is the independent variable?",
          p: [
            "The one thing you deliberately changed. In the standing test it is posture, lying down and then standing.",
            "It is the thing you set, so it goes on the x axis. That is the same rule you just learned about graphs, arriving from the other direction."
          ]
        },
        {
          dot: "D",
          dotClass: "navy",
          h: "What is the dependent variable?",
          p: [
            "The thing you measured to see whether it responded. Here it is mean arterial pressure and heart rate.",
            "It depends on what you did, which is where the name comes from, and it goes up the y axis."
          ]
        },
        {
          dot: "C",
          dotClass: "terra",
          h: "What is the control condition, and what is it there for?",
          p: [
            "It is the condition that rules out some other explanation. In the standing test it is the same manoeuvre run on a healthy 24 year old with an intact reflex.",
            "When you read any study, ask **what its control rules out**. If you cannot answer that, the control was not doing anything."
          ]
        }
      ],
      big: "Hypothesis, changed, measured, control. Four questions, in that order, every time.",
      lab: "Your Week 1 lab write up opens with these four lines, filled in for the standing test, before any data appears. Write them before you run anything, because a hypothesis written after you have seen the result is not a hypothesis.",
      covers: ["w1-lab-experimental-design"]
    },

    /* ============ 21 ============ */
    {
      k: "cards",
      kicker: "Now do it on a real one",
      h: "Rosa is 71. She stood up from her bed this morning, went lightheaded, and fell.",
      lede: "In lab you run the standing test on her. Name all four parts yourself before you open a single card.",
      cols: 4,
      cards: [
        {
          label: "Hypothesis",
          labelClass: "terra",
          h: "What are you claiming, and which way?",
          p: ["That standing will drop Rosa's mean arterial pressure further and for longer than it should, because one limb of her baroreflex is not answering. It says what will happen and it says why, so a result can contradict it."]
        },
        {
          label: "Independent",
          h: "What did you change?",
          p: ["Posture. Two minutes lying flat, then standing. That is the only thing you touched, and it goes across the bottom of your graph."]
        },
        {
          label: "Dependent",
          h: "What did you measure?",
          p: ["Mean arterial pressure and heart rate, every few seconds for a minute. You need both. The pressure tells you whether the reflex succeeded, and the heart rate tells you whether it even tried."]
        },
        {
          label: "Control",
          labelClass: "terra",
          h: "What do you run first, and why first?",
          p: ["The same test on a healthy 24 year old. Standing shifts 500 to 800 mL of blood into the legs in about a second in **everybody**, so without that run you cannot tell a normal wobble from a failed reflex."]
        }
      ],
      big: "Run the healthy reflex first, so you know what catching it looks like.",
      lab: "The Week 1 lab will not let you run Rosa until you have run the healthy reflex. That is not the software being awkward. It is the control, and your write up has to say in one sentence what it ruled out.",
      covers: ["w1-lab-experimental-design"]
    },

    /* ============ 22 ============ */
    {
      k: "cards",
      kicker: "The question that matters",
      h: "Not what is the control. What does the control rule out?",
      lede: "Three experiments you will meet this semester. Same question on all three.",
      cols: 3,
      cards: [
        {
          label: "Osmotic fragility",
          labelClass: "teal",
          h: "Red cells go into tubes of saline from 0.9 percent down to 0.3 percent. The 0.9 percent tube is the control. What does it rule out?",
          p: ["That the cells were already broken before the test started. If they burst in 0.9 percent saline, which matches them, then nothing you did to the other tubes explains anything and the whole run is scrap."]
        },
        {
          label: "Drug trial",
          labelClass: "teal",
          h: "Half the patients get the blood pressure drug and half get an identical tablet with nothing in it. What does the dummy tablet rule out?",
          p: ["That the improvement came from being in a study. Being measured every week, being asked how you are, and expecting to get better all move blood pressure on their own. **The control makes the two groups differ in exactly one thing.**"]
        },
        {
          label: "Enzyme assay",
          labelClass: "terra",
          h: "You run one tube with everything in it except the enzyme. What does that rule out?",
          p: ["That the reaction runs on its own. If product shows up in the tube with no enzyme in it, your assay is measuring something other than the enzyme, and every number you collected today is about that something else."]
        }
      ],
      big: "A control is a rival explanation, named in advance and then killed.",
      lab: "Every task in the Week 1 lab has a control condition somewhere in it. Find it before you start the task and write down, in your own words, the specific rival explanation it exists to kill.",
      covers: ["w1-lab-experimental-design"]
    },

    /* ============ 23 ============ */
    {
      k: "text",
      variant: "dark",
      kicker: "The habit to build",
      h: "If you cannot say what the control rules out, there was no control",
      lede: "There was just a second tube.",
      body: [
        "This is the question I will ask you about every experiment this semester, and it is the question worth asking for the rest of your life whenever somebody tells you something about health. A supplement lowered blood pressure. Compared with what? Measured by whom, on which instrument, in people who knew which group they were in?",
        "Controls are not a ritual you perform because the lab manual says so. Each one is a specific rival explanation that somebody thought of, wrote down, and then deliberately eliminated. That is the difference between a result and an anecdote."
      ],
      big: "Name the rival explanation. Then name the thing that killed it.",
      covers: ["w1-lab-experimental-design"]
    },

    /* ============ 24 ============ */
    {
      k: "cards",
      kicker: "Two kinds of error",
      h: "Two situations. Name the error and say whether repeating helps.",
      lede: "You are about to measure things for fifteen weeks. These two behave completely differently and they need completely different fixes.",
      cols: 2,
      cards: [
        {
          label: "Kind one",
          labelClass: "teal",
          h: "Your readings scatter on both sides of the truth. What is that called, and does repeating help?",
          p: [
            "**Random error.** It falls either side of the true value and it averages out if you repeat. That is why you repeat.",
            "It comes from noise in the instrument, your hand not being steady, rounding, and the last digit you had to guess. Repeating and averaging is the fix, and it genuinely works."
          ]
        },
        {
          label: "Kind two",
          labelClass: "terra",
          h: "Every reading is off in the same direction by about the same amount. What is that called, and does repeating help?",
          p: [
            "**Systematic error.** It pushes every reading the same way and it never averages out. A cuff that reads 8 mmHg high reads 8 high a thousand times in a row.",
            "Repeating does not help at all. It just gives you a very confident wrong answer. Calibration is the fix."
          ]
        }
      ],
      big: "Averaging fixes scatter. Only calibration fixes a lean.",
      lab: "In the Week 1 lab you take several measurements on purpose and record all of them, not just the one you liked. Then you look at the set and decide, in one line, whether the problem in front of you is something averaging can fix.",
      covers: ["w1-lab-measurement-error"]
    },

    /* ============ 25 ============ */
    {
      k: "fig",
      kicker: "See the difference",
      h: "Two osmometers, five readings each, one true value",
      lede: "Both instruments were used carefully by the same person on the same solution. Only one of them can be trusted.",
      svg: FIG_ERROR,
      cap: "Instrument A scatters on both sides of the gold line and its average lands on the truth. That is random error and repeating handled it. Instrument B gives a beautifully tight group, and every reading in it is about 15 mOsm/kg low. Tight is not the same as accurate.",
      big: "The neat looking instrument is the broken one.",
      lab: "Before you record anything on the Week 1 lab osmometer, you run a solution whose osmolarity you already calculated. If the machine comes back consistently low, you have found a systematic error, and you calibrate rather than collect more data.",
      covers: ["w1-lab-measurement-error"]
    },

    /* ============ 26 ============ */
    {
      k: "work",
      variant: "paper",
      kicker: "Worked example",
      h: "Your lab partner measures the same solution five times",
      badges: [{ t: "Work it with me" }, { t: "3 min", cls: "time" }],
      given: "The readings are 288, 291, 289, 292 and 290 mOsm/kg. The real value is 305. Random error, systematic error, or both?",
      steps: [
        "Look at the spread first. The five readings sit between 288 and 292, so they scatter about two either side of their own middle. That scatter is random error.",
        "Now average them. 288 plus 291 plus 289 plus 292 plus 290 is 1,450. Divide by 5.",
        "The average is 290.",
        "Compare that average against the truth. 290 against 305 is 15 low, and it will still be 15 low after another fifty readings."
      ],
      ans: "Both, and the systematic one is the problem. The small scatter from 288 to 292 is random, and averaging already dealt with it. The 15 point gap is systematic, no amount of repeating will move it, and **the instrument needs calibrating**.",
      timer: 180,
      big: "Spread tells you about random error. Distance from the truth tells you about systematic error.",
      lab: "This is exactly the check you run at the start of the Week 1 lab. Five readings of a known solution, average them, compare against what you calculated. Write both numbers on the worksheet even when they agree, because that record is what makes the rest of your data believable.",
      covers: ["w1-lab-measurement-error"]
    },

    /* ============ 27 ============ */
    {
      k: "text",
      variant: "dark",
      kicker: "The third kind of variation",
      h: "One blood pressure reading is a snapshot of a moving thing",
      lede: "And this one is not error at all.",
      body: [
        "Your blood pressure swings by 20 mmHg or more across an ordinary day. It is at its lowest in the middle of the night and it climbs before you wake up. Cortisol does the same thing, which is why the lab slip tells you what time to draw it. Serum potassium shifts after you eat. None of that is a mistake by anybody. That is the body running.",
        "So treating a single reading as the truth is a clinical error as much as a statistical one. It is why high blood pressure is diagnosed on repeated readings taken on separate days, often on a monitor the patient wears for a full 24 hours, and never on the one number that got taken while somebody was sitting in a clinic being anxious about a needle."
      ],
      big: "Repeat for random error. Calibrate for systematic error. And measure again tomorrow for the body.",
      lab: "One of your twelve Week 1 patients is anxious about a needle, and their reading shows it. When you write up which patients concerned you, say which readings you would want repeated before you acted on them.",
      covers: ["w1-lab-measurement-error"]
    },

    /* ============ 28 ============ */
    {
      k: "hook",
      kicker: "Say it out loud",
      h: "The picture that keeps the two errors apart",
      hook: {
        icon: "?",
        iconClass: "terra",
        label: "Memory hook",
        h: "The dartboard",
        say: "Scatter I can average away. Bias I have to fix.",
        p: [
          "Three darts spread all around the bullseye is random error. Your aim is honest and your hand is not steady, but the middle of the group is still the middle of the board. Throw more darts and the middle gets clearer.",
          "Three darts in a tight group up in the top left corner is systematic error. Your hand is perfectly steady. The dart is bent. Throwing a hundred more gives you a beautiful tight group in the top left corner and nothing else."
        ]
      },
      big: "A tight group in the wrong place is the most convincing wrong answer there is.",
      covers: ["w1-lab-measurement-error"]
    },

    /* ============ 29 ============ */
    {
      k: "activity",
      kicker: "In class now",
      h: "All four skills on one small data set",
      badges: [{ t: "In pairs" }, { t: "10 min", cls: "time" }],
      lede: "Red cells go into five tubes of saline, each tube a different concentration, and you count what percent of the cells burst. Work out loud, and swap who holds the pencil after step three.",
      listLabel: "What to do",
      list: [
        "Write the data down. The tubes are 0.9, 0.7, 0.5, 0.4 and 0.3 percent sodium chloride. The percent of cells lysed came out 0, 0, 8, 55 and 100.",
        "Convert the first tube. 0.9 percent into grams per liter, then into mOsm/L. You did this one earlier, so it should take thirty seconds and the answer should be 308.",
        "Sketch the graph. Decide which variable goes on the x axis before you draw anything, and put a unit on both axes.",
        "Find the steepest stretch of your curve and say in one sentence what that steepness means about a red cell.",
        "Name the hypothesis, the independent variable, the dependent variable and the control condition. Then say out loud what the control rules out.",
        "Last one. The 0.4 percent tube was run three times and gave 51, 55 and 59 percent lysed. Which kind of error is that, and what do you do about it?"
      ],
      timer: 600,
      big: "If you can do those six things on this data set, you can do them on any data set in this course.",
      lab: "This is a dry run of the first hour of the Week 1 lab, on smaller numbers. Keep your sketch. Compare it against the figure you produce in lab and see which axis you got right the first time.",
      covers: ["w1-units-conversion", "w1-lab-graphing", "w1-lab-experimental-design", "w1-lab-measurement-error"]
    },

    /* ============ 30 ============ */
    {
      k: "close",
      kicker: "Before next class",
      h: "Three numbers cold, two problems redone, one habit started",
      lede: "This is the shortest homework you will get from me all semester, and it is the one that pays back the most.",
      list: [
        "Learn three numbers so well you do not have to think about them. Plasma osmolarity, **290 mOsm/L**.",
        "Resting cardiac output, **5 L/min**. And the floor for organ perfusion, a **MAP of 65**.",
        "Redo tonight's two saline problems without looking at your notes. 0.9 percent sodium chloride into mOsm/L, and 5 percent dextrose into mOsm/L. If you get 308 and 278 from the formula weights I gave you, you are finished.",
        "Then go and look at a real D5W bag, which prints **252 mOsm/L**. You are not wrong and neither is the label. The bag is made with dextrose monohydrate at 198 g per mole, and knowing why the two numbers differ is worth more than either number.",
        "Work the mean arterial pressure formula on your own blood pressure if you know it, or on 118 over 76 if you do not. Then run it backwards from the mean and the swing back to the cuff reading.",
        "Read the section called The math you need for physiology on the week 1 page. It is short, and every worked example in this deck came out of it.",
        "Bring a calculator and paper to lab. You will be working the pressure formula twenty four times before you touch anything else."
      ],
      big: "None of this is hard. It just has to be automatic before the physiology starts.",
      bigVariant: "terra",
      covers: ["w1-units-conversion", "w1-lab-graphing", "w1-lab-experimental-design", "w1-lab-measurement-error"]
    }

  ]
};
