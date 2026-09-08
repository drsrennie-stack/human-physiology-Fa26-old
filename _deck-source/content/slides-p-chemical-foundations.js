/* BIO 005 Human Physiology, Week 1, Unit 1
   Slide deck P, Physiology: Chemical Foundations
   Dr. Sharilyn Rennie */

module.exports = {
  id: "slides-p-chemical-foundations",
  letter: "P",
  type: "Physiology",
  week: 1,
  unit: 1,
  topic: "Chemical Foundations",
  title: "The chemistry you actually need, and why it is almost always a rate",
  subtitle: "Water, pH and buffers, protein shape, enzymes, and ATP. Five pieces of chemistry that earn their place in a physiology course, anchored to tests you will actually order.",

  slides: [

    /* ---------------------------------------------------------- 1 */
    {
      k: "title",
      variant: "terra",
      kicker: "Week 1 . Unit 1 . Chemical Foundations",
      h: "The chemistry you actually need",
      lede: "This is not a chemistry course, and I am not going to teach it like one. These five pieces are here because you cannot do the physiology without them. Everything else got cut.",
      terms: [
        { t: "Hydrogen bond", c: "l" },
        { t: "pH", c: "t" },
        { t: "Buffer", c: "t" },
        { t: "Denaturation", c: "g" },
        { t: "Activation energy", c: "l" },
        { t: "Saturation", c: "g" },
        { t: "ATP coupling", c: "t" }
      ],
      big: "Almost nothing in physiology is about how much of something there is. It is about how fast it is being made and used."
    },

    /* ---------------------------------------------------------- 2 */
    {
      k: "text",
      kicker: "What is in here",
      h: "Five pieces of chemistry, and what each one buys you",
      lede: "If the chemistry check flagged something for you, this is where you come first. Read the right hand side of each line, because that is the physiology you are buying with it.",
      list: [
        "**Water.** Polar, hydrogen bonding. It decides what dissolves, which builds your membrane in week 2 and decides how a hormone travels in week 9.",
        "**pH and buffers.** Your arterial blood lives in a window one tenth of a pH unit wide. Week 14 is one long argument about how it is held there.",
        "**Protein shape.** Shape is function. Every receptor, every channel, every enzyme in this course is a shape with a hole in it.",
        "**Enzymes.** Rate control. Nothing in you happens fast enough without one, and almost every drug you will ever hear about acts on one.",
        "**ATP.** The coupling that pays for transport, movement and building. You meet all three by week 6."
      ],
      big: "Five pieces. Not a chemistry course, a physiology course that needs five things.",
      covers: ["w1-water-properties", "w1-ph-buffers", "w1-protein-function", "w1-enzyme-function", "w1-atp-energy", "w1-lab-enzyme-assay"]
    },

    /* ---------------------------------------------------------- 3 */
    {
      k: "text",
      variant: "dark",
      kicker: "The framing for the whole week",
      h: "It is a rate, not an amount",
      lede: "This is the single hardest habit to build in first semester, so I am putting it on slide three and I will keep coming back to it.",
      body: [
        "Almost nothing in physiology is about how much of something there is. It is about **how fast it is being made and how fast it is being used**. A number that sits still is not sitting still. It is being held there.",
        "Your fasting glucose reads 90 mg/dL. That is not a stockpile. That is a number where glucose entering the blood exactly matches glucose leaving it, and it will read 90 again in an hour only because both rates changed together.",
        "Your lactate reads 1.2 mmol/L. That is not an amount either. It is production by glycolysis matched against clearance by the liver. Change either side and the number moves, and the number does not tell you which side moved."
      ],
      list: [
        "An enzyme assay measures product per minute. One reading at the end is not a rate.",
        "A steady concentration means two rates are equal, not that nothing is happening.",
        "When a value drifts, ask which rate changed. Do not ask how much got used up."
      ],
      big: "When a number moves, your first question is never how much. It is which rate changed."
    },

    /* ---------------------------------------------------------- 4 */
    {
      k: "text",
      kicker: "Water and solution properties",
      h: "Water is polar, and it makes hydrogen bonds",
      lede: "One fact, and then a surprising amount of physiology falls out of it for free.",
      body: [
        "Oxygen pulls the shared electrons harder than hydrogen does, so the oxygen end of a water molecule carries a slight negative charge and the hydrogen ends carry a slight positive charge. That separation is what **polar** means.",
        "Because of it, water molecules stick to each other with weak attractions called **hydrogen bonds**. Individually they are feeble. There are so many of them that together they run the show.",
        "The consequence is the whole point: **polar and charged things dissolve in water, and nonpolar things do not**. Nonpolar things get shoved together, not because they attract each other, but because water is far more comfortable hydrogen bonding with itself."
      ],
      big: "Water does not push oil away. Water pulls itself together, and the oil is what is left over.",
      covers: ["w1-water-properties"]
    },

    /* ---------------------------------------------------------- 5 */
    {
      k: "fig",
      kicker: "Water and solution properties",
      h: "What a hydrogen bond actually looks like",
      lede: "Two molecules, one weak attraction between them. Multiply this by every water molecule in your 42 L and you have the reason blood is liquid at all.",
      svg: `<svg viewBox="0 0 900 430" role="img" aria-labelledby="x1-t x1-d" xmlns="http://www.w3.org/2000/svg">
  <title id="x1-t">A water molecule and a hydrogen bond to a second water molecule</title>
  <desc id="x1-d">Two bent water molecules are drawn as circles. In each one a large teal oxygen circle sits above two smaller gold hydrogen circles, joined by thick solid lines at a bent angle of about 105 degrees. The oxygen of the left molecule is labeled delta minus, and both of its hydrogens are labeled delta plus, showing that charge is unevenly shared. A dashed maroon line runs from a hydrogen of the upper right molecule to the oxygen of the left molecule and is labeled hydrogen bond. A note at the bottom states that each water molecule can hydrogen bond with up to four neighbors, and that polar and charged solutes dissolve while nonpolar solutes are shoved together.</desc>
  <rect x="0" y="0" width="900" height="430" fill="#FFFFFF"/>

  <line x1="250" y1="175" x2="149" y2="253" stroke="#0B1530" stroke-width="9"/>
  <line x1="250" y1="175" x2="351" y2="253" stroke="#0B1530" stroke-width="9"/>
  <circle cx="149" cy="253" r="31" fill="#C9A14A" stroke="#0B1530" stroke-width="3"/>
  <circle cx="351" cy="253" r="31" fill="#C9A14A" stroke="#0B1530" stroke-width="3"/>
  <circle cx="250" cy="175" r="50" fill="#1F4E55" stroke="#0B1530" stroke-width="3"/>
  <text x="250" y="184" text-anchor="middle" font-family="Plus Jakarta Sans, sans-serif" font-size="30" font-weight="700" fill="#FFFFFF">O</text>
  <text x="149" y="262" text-anchor="middle" font-family="Plus Jakarta Sans, sans-serif" font-size="22" font-weight="700" fill="#0B1530">H</text>
  <text x="351" y="262" text-anchor="middle" font-family="Plus Jakarta Sans, sans-serif" font-size="22" font-weight="700" fill="#0B1530">H</text>
  <text x="250" y="103" text-anchor="middle" font-family="Plus Jakarta Sans, sans-serif" font-size="19" font-weight="700" fill="#1F4E55">delta minus</text>
  <text x="149" y="313" text-anchor="middle" font-family="Plus Jakarta Sans, sans-serif" font-size="17" font-weight="700" fill="#8B3A2E">delta plus</text>
  <text x="351" y="313" text-anchor="middle" font-family="Plus Jakarta Sans, sans-serif" font-size="17" font-weight="700" fill="#8B3A2E">delta plus</text>

  <line x1="620" y1="145" x2="533" y2="218" stroke="#0B1530" stroke-width="9"/>
  <line x1="620" y1="145" x2="715" y2="212" stroke="#0B1530" stroke-width="9"/>
  <circle cx="533" cy="218" r="27" fill="#C9A14A" stroke="#0B1530" stroke-width="3"/>
  <circle cx="715" cy="212" r="27" fill="#C9A14A" stroke="#0B1530" stroke-width="3"/>
  <circle cx="620" cy="145" r="44" fill="#1F4E55" stroke="#0B1530" stroke-width="3"/>
  <text x="620" y="154" text-anchor="middle" font-family="Plus Jakarta Sans, sans-serif" font-size="26" font-weight="700" fill="#FFFFFF">O</text>
  <text x="533" y="226" text-anchor="middle" font-family="Plus Jakarta Sans, sans-serif" font-size="20" font-weight="700" fill="#0B1530">H</text>
  <text x="715" y="220" text-anchor="middle" font-family="Plus Jakarta Sans, sans-serif" font-size="20" font-weight="700" fill="#0B1530">H</text>

  <line x1="507" y1="223" x2="301" y2="185" stroke="#8B3A2E" stroke-width="5" stroke-dasharray="12 10"/>
  <text x="430" y="118" text-anchor="middle" font-family="Plus Jakarta Sans, sans-serif" font-size="15" fill="#3D4860">weak on its own, decisive in bulk</text>
  <text x="430" y="142" text-anchor="middle" font-family="Plus Jakarta Sans, sans-serif" font-size="19" font-weight="700" fill="#8B3A2E">hydrogen bond</text>

  <line x1="70" y1="352" x2="830" y2="352" stroke="#DCE0E6" stroke-width="3"/>
  <text x="70" y="382" font-family="Plus Jakarta Sans, sans-serif" font-size="17" font-weight="700" fill="#0B1530">Each water molecule can hydrogen bond with up to four neighbors.</text>
  <text x="70" y="408" font-family="Plus Jakarta Sans, sans-serif" font-size="16" fill="#3D4860">Polar and charged solutes join that network and dissolve. Nonpolar solutes cannot, so they get shoved together.</text>
</svg>`,
      cap: "The oxygen end is slightly negative and the hydrogen ends are slightly positive, so water molecules cling to one another. Anything that can join that network dissolves. Anything that cannot gets pushed out of the way.",
      covers: ["w1-water-properties"]
    },

    /* ---------------------------------------------------------- 6 */
    {
      k: "cards",
      cols: 4,
      kicker: "Water and solution properties",
      h: "Hydrophilic or hydrophobic? Call each one before you open it",
      lede: "The test is always the same. Can it hydrogen bond or carry a charge? If yes, water takes it in. If no, water squeezes it out.",
      cards: [
        {
          label: "Na+",
          labelClass: "teal",
          h: "A sodium ion in plasma",
          p: ["**Hydrophilic.** It carries a full positive charge, so water molecules turn their negative oxygen ends toward it and wrap it in a shell. It dissolves freely and travels in plasma with no help at all.", "This is why sodium sets your extracellular osmolality. It is dissolved, all of it, all the time."]
        },
        {
          label: "Glucose",
          labelClass: "teal",
          h: "A glucose molecule at 90 mg/dL",
          p: ["**Hydrophilic.** It is covered in hydroxyl groups, every one of which hydrogen bonds with water. It dissolves easily.", "Which is also its problem. Being water loving means it cannot cross a lipid membrane on its own, so it needs a transport protein. That is week 2."]
        },
        {
          label: "Cortisol",
          labelClass: "terra",
          h: "A steroid hormone in blood",
          p: ["**Hydrophobic.** Steroids are built from a fused ring skeleton with almost nothing polar on it, so water will not take it up.", "So it rides through blood bound to a carrier protein, slips straight through the membrane, and finds its receptor inside the cell. Slower to act, much longer lasting. Week 9."]
        },
        {
          label: "Oxygen",
          labelClass: "terra",
          h: "Dissolved oxygen gas",
          p: ["**Hydrophobic**, and only barely soluble. Two identical atoms share their electrons evenly, so there is no charge separation to grab onto.", "That is exactly why you need hemoglobin. Plasma alone carries almost no oxygen, which is the whole reason week 12 exists."]
        }
      ],
      big: "Charge or hydrogen bonds means it dissolves. Neither one means it does not.",
      covers: ["w1-water-properties"]
    },

    /* ---------------------------------------------------------- 7 */
    {
      k: "cards",
      cols: 3,
      kicker: "Water and solution properties",
      h: "Three things solubility decides for you, for free",
      lede: "You do not have to memorize these three separately. They are all the same fact wearing different clothes.",
      cards: [
        {
          h: "Why does a membrane form at all, when nothing is holding it together?",
          p: ["A phospholipid has a polar head and two nonpolar tails. Drop a pile of them into water and the heads join the hydrogen bond network while the tails get shoved out of it.", "The cheapest arrangement available is a double layer with the tails tucked inside and the heads facing the water on both sides. **Nothing holds them there. It is just what costs the least energy.** Week 2."]
        },
        {
          h: "Why does a fat soluble hormone act slowly and last for hours?",
          p: ["It cannot dissolve in plasma, so it needs a carrier protein just to travel. Then it crosses the membrane without asking and binds a receptor inside the cell.", "Inside the cell means it changes which genes get read, and that takes time and then persists. A water soluble hormone hits a surface receptor instead: fast on, fast off. Week 9."]
        },
        {
          h: "Why can oxygen cross a membrane freely when glucose cannot?",
          p: ["The membrane interior is nonpolar, so it is a friendly place for nonpolar things and a wall for polar ones.", "Oxygen and carbon dioxide slide straight through. Glucose, amino acids and every ion need a protein to carry them. **The membrane is selective because it is greasy in the middle**, not because it is choosy."]
        }
      ],
      big: "One property of water, three chapters of this course.",
      covers: ["w1-water-properties"]
    },

    /* ---------------------------------------------------------- 8 */
    {
      k: "hook",
      kicker: "Memory hook",
      h: "Say this one out loud before you leave the slide",
      hook: {
        icon: "!",
        iconClass: "teal",
        label: "Memory hook",
        h: "The salad dressing bottle",
        say: "Like dissolves like, and everything else gets shoved together.",
        p: [
          "Oil and vinegar in one bottle. Shake it hard and it looks mixed. Set it down and in a minute it has sorted itself out again, oil on top, vinegar underneath.",
          "Nobody separated them. The vinegar, which is mostly water, simply prefers its own company, and the oil ends up together because it is what is left over.",
          "Every membrane in your body was built by that same laziness. So was the reason a steroid hormone needs a taxi and sodium does not."
        ]
      },
      big: "Water is not pushing anything away. It is pulling itself together.",
      covers: ["w1-water-properties"]
    },

    /* ---------------------------------------------------------- 9 */
    {
      k: "formula",
      kicker: "Counting what is dissolved",
      h: "If water dissolves it, you can count it",
      lede: "Osmolality is a headcount of dissolved particles per kilogram of water, and your body defends it to within about one percent. Normal serum runs **275 to 295 mOsm/kg**. You can predict most of that number from three values on an ordinary chemistry panel.",
      eq: "estimated osmolality = 2 x Na+ + glucose/18 + BUN/2.8",
      note: "Na+ in mEq/L. Glucose and blood urea nitrogen in mg/dL. The 18 and the 2.8 convert weight into particle count.",
      after: [
        "Sodium gets doubled because it never travels alone. Every sodium drags a negative partner with it, usually chloride or bicarbonate, so counting sodium twice counts the pair.",
        "Glucose and urea get divided because the lab reports them by weight and osmolality wants a headcount. Those two numbers are just the conversion.",
        "Then the useful part. **Osmolal gap = measured minus estimated**, and a normal gap is under about 10. If the measured value is far above what you predicted, there is something dissolved in that plasma you did not count."
      ],
      big: "Estimate what should be there. Measure what is there. The difference is the interesting part.",
      covers: ["w1-units-conversion"]
    },

    /* ---------------------------------------------------------- 10 */
    {
      k: "work",
      variant: "paper",
      kicker: "Work it with me",
      h: "Two panels, two very different stories",
      lede: "Both patients have an osmolality above the normal band. Only one of them is a mystery. Do the arithmetic and the difference is obvious.",
      badges: [{ t: "Work it with me" }, { t: "4 min", cls: "time" }],
      given: "Patient A: Na+ 140 mEq/L, glucose 108 mg/dL, BUN 14 mg/dL, measured osmolality 322 mOsm/kg. Patient B: Na+ 132 mEq/L, glucose 594 mg/dL, BUN 28 mg/dL, measured osmolality 310 mOsm/kg.",
      steps: [
        "Patient A, double the sodium. 2 x 140 = 280.",
        "Glucose over 18. 108 divided by 18 = 6. Urea nitrogen over 2.8. 14 divided by 2.8 = 5.",
        "Add them. 280 + 6 + 5 = **291 mOsm/kg estimated**, which is squarely normal.",
        "Gap for A. 322 measured minus 291 estimated = **31**. Normal is under about 10, so this is a large gap.",
        "Patient B, same three steps. 2 x 132 = 264. 594 divided by 18 = 33. 28 divided by 2.8 = 10. Total 307 mOsm/kg estimated.",
        "Gap for B. 310 minus 307 = **3**. Normal.",
        "Now read them. B is hyperosmolar and you can account for every particle: the glucose is doing it, all 33 mOsm of it. A is hyperosmolar and you cannot account for it at all."
      ],
      ans: "A large osmolal gap does not name a substance. It tells you something osmotically active is dissolved in that plasma that your three measured solutes do not explain, and that is a statement worth making before you know what it is.",
      timer: 240,
      big: "A normal gap in a hyperosmolar patient is reassuring. A large gap is a question you have to answer.",
      covers: ["w1-units-conversion"]
    },

    /* ---------------------------------------------------------- 11 */
    {
      k: "text",
      kicker: "pH and buffers",
      h: "pH is a hydrogen ion headcount, on a scale that lies to you",
      lede: "The scale is logarithmic, which is the part that trips people. One pH unit is a tenfold change in hydrogen ion. Lower pH means more hydrogen ion, so more acidic.",
      body: [
        "**pH** is a measure of how much free hydrogen ion is in a solution, written on a log scale so the numbers stay small. Pure water at 7 has an H+ concentration of 0.0000001 mol/L. Writing 7 is easier.",
        "Your arterial blood sits between **7.35 and 7.45**. That is not a comfortable range, it is a knife edge, and your lungs and kidneys spend all day defending it. Below 7.35 is acidemia. Above 7.45 is alkalemia. Outside roughly 6.8 to 7.8 you do not survive long.",
        "The reason the window is so tight is proteins. Hydrogen ions stick to the charged groups on a protein and **change its shape**, and a protein with the wrong shape does the wrong job or no job at all. Every enzyme, every channel, every receptor you meet this semester is a shape that pH can ruin."
      ],
      lab: "In the Week 1 lab you will run your enzyme assay at several pH values and plot rate against pH. The curve you draw is the practical version of this slide: you will watch a protein stop working because the hydrogen ion concentration around it changed, and nothing else did.",
      big: "pH is not a background detail. It is the setting your proteins are tuned to.",
      covers: ["w1-ph-buffers"]
    },

    /* ---------------------------------------------------------- 12 */
    {
      k: "fig",
      kicker: "pH and buffers",
      h: "The whole scale, and then the part you actually live in",
      lede: "Look at how much of the scale exists, and then look at how much of it you are allowed to use.",
      svg: `<svg viewBox="0 0 900 540" role="img" aria-labelledby="x2-t x2-d" xmlns="http://www.w3.org/2000/svg">
  <title id="x2-t">The pH scale from 0 to 14 with a magnified view of the arterial blood range</title>
  <desc id="x2-d">A horizontal bar runs from pH 0 on the left to pH 14 on the right, labeled acid at the left end, neutral at 7 in the middle, and base at the right end. Markers show stomach acid at about pH 2, urine spanning pH 4.5 to 8, and arterial blood as a very narrow tick just above pH 7.4. Dashed lines funnel down from that narrow tick to a second, magnified bar spanning only pH 6.8 to 7.8. On the magnified bar the range 7.35 to 7.45 is filled gold and labeled normal arterial blood, the zone from 6.8 to 7.35 is labeled acidemia, the zone from 7.45 to 7.8 is labeled alkalemia, and both outer ends at 6.8 and 7.8 are marked in maroon as survival limits.</desc>
  <rect x="0" y="0" width="900" height="540" fill="#FFFFFF"/>

  <rect x="70" y="112" width="760" height="42" fill="#EDF1F3" stroke="#3D4860" stroke-width="2"/>
  <rect x="70" y="112" width="380" height="42" fill="#DCE0E6"/>
  <line x1="450" y1="104" x2="450" y2="162" stroke="#0B1530" stroke-width="3"/>

  <text x="70" y="98" font-family="Plus Jakarta Sans, sans-serif" font-size="17" font-weight="700" fill="#8B3A2E">more acid</text>
  <text x="830" y="98" text-anchor="end" font-family="Plus Jakarta Sans, sans-serif" font-size="17" font-weight="700" fill="#1F4E55">more base</text>

  <line x1="70" y1="154" x2="70" y2="168" stroke="#3D4860" stroke-width="2"/>
  <line x1="179" y1="154" x2="179" y2="168" stroke="#3D4860" stroke-width="2"/>
  <line x1="287" y1="154" x2="287" y2="168" stroke="#3D4860" stroke-width="2"/>
  <line x1="396" y1="154" x2="396" y2="168" stroke="#3D4860" stroke-width="2"/>
  <line x1="504" y1="154" x2="504" y2="168" stroke="#3D4860" stroke-width="2"/>
  <line x1="613" y1="154" x2="613" y2="168" stroke="#3D4860" stroke-width="2"/>
  <line x1="721" y1="154" x2="721" y2="168" stroke="#3D4860" stroke-width="2"/>
  <line x1="830" y1="154" x2="830" y2="168" stroke="#3D4860" stroke-width="2"/>
  <text x="70" y="190" text-anchor="middle" font-family="Plus Jakarta Sans, sans-serif" font-size="16" fill="#3D4860">0</text>
  <text x="179" y="190" text-anchor="middle" font-family="Plus Jakarta Sans, sans-serif" font-size="16" fill="#3D4860">2</text>
  <text x="287" y="190" text-anchor="middle" font-family="Plus Jakarta Sans, sans-serif" font-size="16" fill="#3D4860">4</text>
  <text x="396" y="190" text-anchor="middle" font-family="Plus Jakarta Sans, sans-serif" font-size="16" fill="#3D4860">6</text>
  <text x="504" y="190" text-anchor="middle" font-family="Plus Jakarta Sans, sans-serif" font-size="16" fill="#3D4860">8</text>
  <text x="613" y="190" text-anchor="middle" font-family="Plus Jakarta Sans, sans-serif" font-size="16" fill="#3D4860">10</text>
  <text x="721" y="190" text-anchor="middle" font-family="Plus Jakarta Sans, sans-serif" font-size="16" fill="#3D4860">12</text>
  <text x="830" y="190" text-anchor="middle" font-family="Plus Jakarta Sans, sans-serif" font-size="16" fill="#3D4860">14</text>

  <circle cx="179" cy="133" r="11" fill="#8B3A2E"/>
  <text x="179" y="76" text-anchor="middle" font-family="Plus Jakarta Sans, sans-serif" font-size="16" font-weight="700" fill="#8B3A2E">stomach, about 2</text>
  <rect x="314" y="121" width="191" height="24" fill="#C9A14A" stroke="#0B1530" stroke-width="2"/>
  <text x="410" y="48" text-anchor="middle" font-family="Plus Jakarta Sans, sans-serif" font-size="16" font-weight="700" fill="#0B1530">urine, 4.5 to 8</text>
  <line x1="410" y1="56" x2="410" y2="118" stroke="#0B1530" stroke-width="2"/>
  <rect x="468" y="106" width="8" height="54" fill="#0B1530"/>
  <text x="612" y="76" text-anchor="middle" font-family="Plus Jakarta Sans, sans-serif" font-size="16" font-weight="700" fill="#0B1530">arterial blood, all of it, right here</text>
  <line x1="500" y1="82" x2="478" y2="108" stroke="#0B1530" stroke-width="2"/>

  <line x1="468" y1="162" x2="70" y2="322" stroke="#3D4860" stroke-width="2" stroke-dasharray="10 8"/>
  <line x1="476" y1="162" x2="830" y2="322" stroke="#3D4860" stroke-width="2" stroke-dasharray="10 8"/>
  <text x="450" y="255" text-anchor="middle" font-family="Plus Jakarta Sans, sans-serif" font-size="17" font-weight="700" fill="#3D4860">magnified, 6.8 to 7.8</text>

  <rect x="70" y="326" width="760" height="56" fill="#EDF1F3" stroke="#3D4860" stroke-width="2"/>
  <rect x="70" y="326" width="418" height="56" fill="#DCE0E6"/>
  <rect x="488" y="326" width="76" height="56" fill="#C9A14A" stroke="#0B1530" stroke-width="3"/>
  <rect x="70" y="326" width="14" height="56" fill="#8B3A2E"/>
  <rect x="816" y="326" width="14" height="56" fill="#8B3A2E"/>

  <text x="526" y="313" text-anchor="middle" font-family="Plus Jakarta Sans, sans-serif" font-size="17" font-weight="700" fill="#0B1530">7.35 to 7.45</text>
  <text x="279" y="408" text-anchor="middle" font-family="Plus Jakarta Sans, sans-serif" font-size="17" font-weight="700" fill="#8B3A2E">acidemia</text>
  <text x="690" y="408" text-anchor="middle" font-family="Plus Jakarta Sans, sans-serif" font-size="17" font-weight="700" fill="#1F4E55">alkalemia</text>
  <text x="70" y="440" font-family="Plus Jakarta Sans, sans-serif" font-size="16" font-weight="700" fill="#8B3A2E">6.8</text>
  <text x="830" y="440" text-anchor="end" font-family="Plus Jakarta Sans, sans-serif" font-size="16" font-weight="700" fill="#8B3A2E">7.8</text>
  <text x="450" y="440" text-anchor="middle" font-family="Plus Jakarta Sans, sans-serif" font-size="16" fill="#3D4860">the maroon ends are roughly where survival stops</text>

  <line x1="70" y1="466" x2="830" y2="466" stroke="#DCE0E6" stroke-width="3"/>
  <text x="70" y="496" font-family="Plus Jakarta Sans, sans-serif" font-size="17" font-weight="700" fill="#0B1530">The gold band is one tenth of a pH unit wide.</text>
  <text x="70" y="522" font-family="Plus Jakarta Sans, sans-serif" font-size="16" fill="#3D4860">Your whole lifetime of blood chemistry happens inside it, defended by your lungs and your kidneys every minute.</text>
</svg>`,
      cap: "The top bar is every pH there is. The bottom bar is one pH unit, magnified, and the gold sliver on it is the only part your blood is allowed to visit.",
      covers: ["w1-ph-buffers"]
    },

    /* ---------------------------------------------------------- 13 */
    {
      k: "cards",
      cols: 3,
      kicker: "pH and buffers",
      h: "What actually goes wrong when you leave the window",
      lede: "Not vague harm. Specific, mechanical, protein shaped harm. Each card names one.",
      cards: [
        {
          label: "pH 7.15",
          labelClass: "terra",
          h: "Why does severe acidemia drop the blood pressure?",
          p: ["Extra hydrogen ions bind the contractile and receptor proteins in vascular smooth muscle and in cardiac muscle and bend them out of shape.", "Vessels stop responding normally to noradrenaline and the heart contracts less forcefully. **The catecholamines are still there. The receptors just stopped answering.** That is a shape problem, not a signaling problem."]
        },
        {
          label: "pH 7.60",
          labelClass: "teal",
          h: "Why does hyperventilating give you tingling hands and cramps?",
          p: ["Blowing off carbon dioxide drives pH up. With fewer hydrogen ions competing for the negatively charged sites on albumin, more calcium binds to albumin instead of floating free.", "Total calcium has not changed at all. **Ionized calcium falls**, and ionized calcium is the fraction nerves and muscle actually use. Hence the tingling and the spasm."]
        },
        {
          label: "K+ 6.1",
          labelClass: "terra",
          h: "Why does acidemia push potassium up in the blood?",
          p: ["Hydrogen ions move into cells to be buffered there, and potassium moves out to keep the charge balanced. Cells are not empty containers, they trade.", "So a patient with an acid problem often arrives with a potassium problem attached. **Fix the acid and the potassium moves back.** This one returns in week 4."]
        }
      ],
      big: "Every one of these is the same sentence: hydrogen ions changed a protein's shape.",
      covers: ["w1-ph-buffers"]
    },

    /* ---------------------------------------------------------- 14 */
    {
      k: "formula",
      kicker: "pH and buffers",
      h: "A buffer is a weak acid and its partner base, sitting in the same solution",
      lede: "Add acid and the base half soaks it up. Add base and the acid half gives up hydrogen ions. The pH still moves. It just moves far less than it would have.",
      eq: "CO2 + H2O  <->  H2CO3  <->  H+ + HCO3-",
      note: "The bicarbonate pair. Normal arterial values: PCO2 35 to 45 mmHg, HCO3- 22 to 26 mEq/L, pH 7.35 to 7.45.",
      after: [
        "Read it in both directions, because it runs in both. Throw acid in from the right and the reaction runs left: H+ grabs a bicarbonate, becomes carbonic acid, becomes carbon dioxide and water. The hydrogen ion is gone from solution.",
        "Here is what makes this pair special, and it is the reason week 14 exists. **The two halves are controlled by two different organs, independently.** Your lungs set the carbon dioxide, minute by minute, by how hard you breathe. Your kidney sets the bicarbonate, over hours to days, by how much it reclaims and how much new it makes.",
        "Two knobs on the same equation, on two different timescales. That is why blood pH is a whole body problem and not a chemistry problem, and why you can be in trouble on one knob while the other one is frantically compensating."
      ],
      lab: "Your lab bench version of this is the buffered tube next to the unbuffered one. You will add the same acid to both and watch the meter, and the two readings are the whole argument on this slide in about ninety seconds.",
      big: "A buffer limits the damage. It does not prevent it.",
      covers: ["w1-ph-buffers"]
    },

    /* ---------------------------------------------------------- 15 */
    {
      k: "work",
      variant: "paper",
      kicker: "Work it with me",
      h: "Same acid load, buffered and unbuffered",
      lede: "Ten millimoles of strong acid, dumped into one liter. Once into plain water, once into blood. Watch the difference the bicarbonate pair makes.",
      badges: [{ t: "Work it with me" }, { t: "4 min", cls: "time" }],
      given: "10 mmol of H+ added to 1 L. Blood starts at pH 7.40, with HCO3- 24 mEq/L and PCO2 40 mmHg.",
      steps: [
        "Plain water first. 10 mmol/L of H+ is 0.010 mol/L, and pH is just the negative log of that. **pH goes from 7.00 to 2.00.**",
        "Say that as a fold change. Five pH units is ten to the fifth, so the hydrogen ion concentration went up a hundred thousand fold. Nothing was there to stop it.",
        "Now blood, and I am going to hand the whole load to bicarbonate to keep the arithmetic clean: each H+ pairs with a HCO3-, so bicarbonate falls from 24 to **14 mEq/L** and the H+ leaves solution as carbonic acid and then as carbon dioxide.",
        "That is a deliberate simplification. In real blood **hemoglobin and plasma protein buffer a share of the same load**, so bicarbonate falls by less than the full 10 and the pH lands a little higher than the numbers below. The shape of the answer does not change.",
        "pH tracks the ratio of bicarbonate to dissolved carbon dioxide. At the start that ratio is 20 to 1, which is what a pH of 7.40 means.",
        "If the lungs did nothing, the ratio would drop to about 11.7 to 1 and **pH would land near 7.17**. Acidemic and unwell, but alive and treatable.",
        "The lungs do not do nothing. Chemoreceptors sense the acid, breathing deepens, PCO2 falls from 40 to about 30 mmHg. That lifts the ratio back toward 15.6 to 1.",
        "**pH ends up around 7.29.**"
      ],
      ans: "Same insult. Unbuffered, pH 7.00 to 2.00, a hundred thousand fold change. Buffered and then defended by the lungs, pH 7.40 to about 7.29. The buffer did not prevent the fall, it bought time, and the lung response used that time.",
      timer: 240,
      big: "The chemistry buys you seconds. The organs use them.",
      covers: ["w1-ph-buffers"]
    },

    /* ---------------------------------------------------------- 16 */
    {
      k: "hook",
      kicker: "Memory hook",
      h: "The one sentence to carry out of the buffer material",
      hook: {
        icon: "!",
        iconClass: "terra",
        label: "Memory hook",
        h: "The shock absorber",
        say: "A buffer does not fill in the pothole. It stops the pothole from breaking the axle.",
        p: [
          "Drive over a pothole with good shocks and you still feel it. The car dips, then settles. Drive over the same pothole with the shocks gone and something in the suspension breaks.",
          "That is the whole function of a buffer. The pH still moved. It moved from 7.40 to 7.29 instead of from 7.00 to 2.00.",
          "So when a patient's pH is abnormal, do not say the buffers failed. Say the load was bigger than the buffers could absorb, and then go find the load."
        ]
      },
      big: "A normal pH does not mean nothing happened. It means something was absorbed.",
      covers: ["w1-ph-buffers"]
    },

    /* ---------------------------------------------------------- 17 */
    {
      k: "rows",
      kicker: "Protein structure and function",
      h: "Four levels of structure, and only the last one does any work",
      lede: "Each level exists to produce the next. What you actually care about is the final three dimensional shape, because that shape is the binding site.",
      rows: [
        {
          dot: "1",
          dotClass: "navy",
          h: "Primary. What decides everything downstream?",
          p: ["The order of the amino acids, written by the gene. That is all it is, a sequence.", "Change one amino acid and you can change every level above it. Sickle cell disease is one substitution in the beta globin chain, and the consequence is a hemoglobin that polymerises and a red cell that deforms."]
        },
        {
          dot: "2",
          dotClass: "navy",
          h: "Secondary. What do local hydrogen bonds along the backbone produce?",
          p: ["Alpha helices and beta sheets, formed by hydrogen bonds between parts of the backbone that sit near each other in the chain.", "These are the local shapes. They are the building blocks the protein folds up out of, not the finished object."]
        },
        {
          dot: "3",
          dotClass: "terra",
          h: "Tertiary. What actually makes the binding site?",
          p: ["The whole chain folding into one compact three dimensional shape, driven largely by the hydrophobic amino acids hiding from water in the middle. Same water rule as slide four.", "**This is the level that matters.** The fold brings amino acids that were far apart in the sequence right next to each other, and the pocket they form together is the active site or the receptor site."]
        },
        {
          dot: "4",
          dotClass: "terra",
          h: "Quaternary. What do you get when several folded chains assemble?",
          p: ["Two or more finished chains joining into one functional unit. Hemoglobin is four chains.", "This is where cooperation becomes possible, because one subunit binding something can change the shape of its neighbors. That is the whole reason the oxygen curve is a sigmoid and not a straight line. Week 12."]
        }
      ],
      lab: "In the Week 1 lab your enzyme is a tertiary structure with a pocket in it, and every condition you change on the bench is an attack on that pocket. Keep this ladder in the front of your lab notebook while you run the assay.",
      big: "Sequence makes shape. Shape makes the pocket. The pocket is the function.",
      covers: ["w1-protein-function"]
    },

    /* ---------------------------------------------------------- 18 */
    {
      k: "cards",
      cols: 3,
      kicker: "Protein structure and function",
      h: "Denaturation, and three places you have already seen it",
      lede: "**Denaturation** is losing the three dimensional shape, from heat or from a pH swing, and it is often permanent. When shape goes, function goes with it, because they were never two separate things.",
      cards: [
        {
          label: "About 41 C",
          labelClass: "terra",
          h: "Why is a fever above 41 C an emergency rather than a symptom?",
          p: ["Heat is molecular motion. Above roughly 41 C the motion is enough to shake apart the weak interactions holding a protein's fold together, and enzymes start to unfold across every tissue at once.", "**They do not refold when you cool the patient down.** That is why heat stroke is treated as time critical and why the treatment is cooling, immediately, not later."]
        },
        {
          label: "pH 6.9",
          labelClass: "terra",
          h: "Why does the last stretch of a severe acidosis get worse so fast?",
          p: ["Not by unfolding anything. Hydrogen ions load onto the charged side chains of a protein and change how tightly it grips, so enzymes work badly at pH 6.9. Blood proteins do not come apart there. **That change of charge is reversible**, which is why patients are brought back from an arterial pH near 6.8 with the same proteins they went down with.", "What makes the last stretch accelerate is mechanical. The liver clears lactate more slowly as the pH falls, phosphofructokinase is inhibited so glycolysis stalls, and the heart contracts less forcefully so delivery drops. Less clearance and less delivery, so **acid arrives faster than it leaves**. That loop is why these patients crash, and it unwinds when you treat what started it."]
        },
        {
          label: "The kitchen",
          labelClass: "teal",
          h: "Why does a fried egg never turn clear again?",
          p: ["Egg white is mostly ovalbumin, transparent because the folded protein is small and soluble. Heat unfolds it, the buried hydrophobic parts come to the surface, and they stick to each other.", "You get an opaque solid, and no amount of cooling brings the clear liquid back. Ovalbumin is not the molecule your lab reports at 3.5 to 5.0 g/dL, and it is not even from your species. **It is the same kind of protein under the same rules**, which is the only reason a frying pan is allowed to teach you anything about serum."]
        }
      ],
      lab: "Your Week 1 assay will show you this directly. As you raise the temperature the rate climbs and then falls off a cliff, and the tube that fell off the cliff does not recover when you cool it. That irreversibility is the finding, not a technique error.",
      big: "Shape is function. Lose the shape and there is nothing left to lose.",
      covers: ["w1-protein-function"]
    },

    /* ---------------------------------------------------------- 19 */
    {
      k: "cards",
      cols: 2,
      kicker: "Protein structure and function",
      h: "The two protein numbers you will actually see on a panel",
      lede: "You will not be handed a protein structure in clinic. You will be handed two concentrations, and they are only useful read together.",
      cards: [
        {
          label: "3.5 to 5.0 g/dL",
          labelClass: "teal",
          h: "Serum albumin. Why does it turn up on almost every panel?",
          p: ["It is the main plasma protein, made only by the liver, and it generates most of the colloid osmotic pressure that holds water inside the blood vessel.", "**Low albumin shifts Starling forces toward filtration**, so fluid leaves the vessels and collects in tissue. That is the swelling. Its half life is about 20 days, so it moves slowly and tells you about weeks, not hours."]
        },
        {
          label: "6.0 to 8.3 g/dL",
          labelClass: "teal",
          h: "Serum total protein. Why is it almost meaningless on its own?",
          p: ["It is albumin plus every globulin, summed. Two independent pools with different sources, added together into one number.", "So a normal total protein can hide a low albumin sitting next to a high globulin. **Always read total protein with the albumin next to it**, or you are reading a sum and calling it a measurement."]
        }
      ],
      big: "Two numbers, two pools. Never read the sum without the parts.",
      covers: ["w1-protein-function"]
    },

    /* ---------------------------------------------------------- 20 */
    {
      k: "text",
      variant: "dark",
      kicker: "Enzyme activity and regulation",
      h: "What an enzyme does, and the two things it cannot do",
      lede: "Get the boundaries right first, because most enzyme mistakes on an exam are boundary mistakes rather than mechanism mistakes.",
      body: [
        "An **enzyme** lowers the energy hill a reaction has to get over to start. That hill is the **activation energy**, and lowering it means a far greater fraction of the molecules have enough energy to react at any moment. The reaction goes faster. That is the entire job.",
        "It does it by holding the substrates in a pocket, in the right orientation, in a chemical environment that stabilises the awkward halfway state. The pocket is the tertiary fold from three slides ago."
      ],
      list: [
        "**It cannot change the products.** Whatever the reaction was going to make, it still makes.",
        "**It cannot make an impossible reaction happen.** If the energetics say no, an enzyme does not argue. It only changes how fast a possible reaction goes.",
        "It is not consumed. One enzyme molecule turns over substrate after substrate, thousands of times a second in some cases.",
        "It is not used up by being regulated either. Inhibition slows it, it does not destroy it."
      ],
      big: "Enzymes do not change what happens. They change how fast, which in a body is the same as changing whether.",
      covers: ["w1-enzyme-function"]
    },

    /* ---------------------------------------------------------- 21 */
    {
      k: "fig",
      kicker: "Enzyme activity and regulation",
      h: "The hill, with and without the enzyme",
      lede: "Notice what moves and what does not. The peak comes down. The two ends stay exactly where they were.",
      svg: `<svg viewBox="0 0 900 500" role="img" aria-labelledby="x3-t x3-d" xmlns="http://www.w3.org/2000/svg">
  <title id="x3-t">Energy against reaction progress, showing activation energy with and without an enzyme</title>
  <desc id="x3-d">Energy is on the vertical axis and reaction progress on the horizontal axis. Two curves start together at the reactant energy level, rise over a hump, and finish together at a lower product energy level. The upper maroon curve, labeled no enzyme, peaks high. The lower teal curve, labeled with enzyme, peaks much lower. Two vertical double headed arrows measure the height from the reactant level to each peak: a tall maroon one labeled large activation energy and a short teal one labeled smaller activation energy. Dashed horizontal lines mark the reactant level and the lower product level, with a note that the enzyme lowers the peak but does not move either end, so the products and the overall energy change are unchanged.</desc>
  <rect x="0" y="0" width="900" height="500" fill="#FFFFFF"/>

  <line x1="70" y1="50" x2="70" y2="432" stroke="#0B1530" stroke-width="3"/>
  <line x1="70" y1="432" x2="860" y2="432" stroke="#0B1530" stroke-width="3"/>
  <text transform="rotate(-90 26 250)" x="26" y="250" text-anchor="middle" font-family="Plus Jakarta Sans, sans-serif" font-size="17" font-weight="700" fill="#0B1530">energy</text>
  <text x="465" y="462" text-anchor="middle" font-family="Plus Jakarta Sans, sans-serif" font-size="17" font-weight="700" fill="#0B1530">reaction progress</text>

  <line x1="90" y1="300" x2="850" y2="300" stroke="#DCE0E6" stroke-width="3" stroke-dasharray="10 8"/>
  <line x1="90" y1="380" x2="850" y2="380" stroke="#DCE0E6" stroke-width="3" stroke-dasharray="10 8"/>
  <text x="96" y="290" font-family="Plus Jakarta Sans, sans-serif" font-size="16" font-weight="700" fill="#3D4860">reactants</text>
  <text x="844" y="405" text-anchor="end" font-family="Plus Jakarta Sans, sans-serif" font-size="16" font-weight="700" fill="#3D4860">products</text>

  <path d="M 90 300 C 240 300 330 100 450 100 C 570 100 660 380 810 380" fill="none" stroke="#8B3A2E" stroke-width="5"/>
  <path d="M 90 300 C 240 300 340 215 450 215 C 560 215 660 380 810 380" fill="none" stroke="#1F4E55" stroke-width="5"/>
  <text x="450" y="78" text-anchor="middle" font-family="Plus Jakarta Sans, sans-serif" font-size="17" font-weight="700" fill="#8B3A2E">no enzyme</text>
  <text x="596" y="207" font-family="Plus Jakarta Sans, sans-serif" font-size="17" font-weight="700" fill="#1F4E55">with enzyme</text>

  <line x1="450" y1="300" x2="450" y2="100" stroke="#8B3A2E" stroke-width="3"/>
  <polygon points="450,92 444,108 456,108" fill="#8B3A2E"/>
  <polygon points="450,308 444,292 456,292" fill="#8B3A2E"/>
  <text x="436" y="258" text-anchor="end" font-family="Plus Jakarta Sans, sans-serif" font-size="16" font-weight="700" fill="#8B3A2E">large</text>
  <text x="436" y="279" text-anchor="end" font-family="Plus Jakarta Sans, sans-serif" font-size="16" font-weight="700" fill="#8B3A2E">activation energy</text>

  <line x1="500" y1="300" x2="500" y2="230" stroke="#1F4E55" stroke-width="3"/>
  <polygon points="500,222 494,238 506,238" fill="#1F4E55"/>
  <polygon points="500,308 494,292 506,292" fill="#1F4E55"/>
  <text x="514" y="258" font-family="Plus Jakarta Sans, sans-serif" font-size="16" font-weight="700" fill="#1F4E55">smaller</text>
  <text x="514" y="279" font-family="Plus Jakarta Sans, sans-serif" font-size="16" font-weight="700" fill="#1F4E55">activation energy</text>

  <line x1="70" y1="482" x2="860" y2="482" stroke="#FFFFFF" stroke-width="2"/>
  <text x="90" y="492" font-family="Plus Jakarta Sans, sans-serif" font-size="16" fill="#3D4860">The peak comes down. Neither end moves, so the products and the overall energy change are identical.</text>
</svg>`,
      cap: "Only the height of the hump changes. Start and finish are fixed, which is the picture behind the two things an enzyme cannot do.",
      covers: ["w1-enzyme-function"]
    },

    /* ---------------------------------------------------------- 22 */
    {
      k: "formula",
      kicker: "Enzyme activity and regulation",
      h: "Two numbers describe an enzyme, and they move independently",
      lede: "Add substrate and the rate climbs, then flattens out, because every enzyme molecule is already busy. That flattening is **saturation**, and this equation is its arithmetic.",
      eq: "v = (Vmax x [S]) / (Km + [S])",
      note: "v is the reaction rate. Vmax is the ceiling rate. Km is the substrate concentration that gets you halfway to the ceiling. [S] is substrate concentration.",
      after: [
        "**Vmax is about how many workers you have.** It is set by how much enzyme is present. Double the enzyme and you double the ceiling.",
        "**Km is about how good each worker is at catching.** A low Km means the enzyme grabs its substrate tightly, so it hits half speed at very little substrate. A high Km means it grabs loosely and needs a lot of substrate to get going.",
        "Check the equation against itself. Put [S] equal to Km and you get v = Vmax x Km divided by 2Km, which is half of Vmax. That is not a coincidence, it is the definition of Km falling out of the algebra."
      ],
      big: "Vmax is how many. Km is how tightly. Two different questions, two different answers.",
      covers: ["w1-enzyme-function"]
    },

    /* ---------------------------------------------------------- 23 */
    {
      k: "fig",
      kicker: "Enzyme activity and regulation",
      h: "One curve, then the two ways to spoil it",
      lede: "Three curves on one pair of axes. Before you read the labels, look at which ceilings match and which do not.",
      svg: `<svg viewBox="0 0 900 560" role="img" aria-labelledby="x4-t x4-d" xmlns="http://www.w3.org/2000/svg">
  <title id="x4-t">Michaelis Menten curves with no inhibitor, a competitive inhibitor and a non competitive inhibitor</title>
  <desc id="x4-d">Reaction rate is on the vertical axis from 0 to 100 micromol per minute and substrate concentration on the horizontal axis from 0 to 100 mmol per liter. Three curves all start at the origin and rise steeply then flatten. The navy curve, no inhibitor, climbs fastest and approaches a ceiling of 100, marked by a gold dashed line labeled Vmax equals 100; it reaches half of that ceiling, a rate of 50, at a substrate concentration of 5, marked as Km. The maroon curve, competitive inhibitor, rises more slowly but is still heading for the same ceiling of 100; it reaches a rate of 50 only at a substrate concentration of 20, marked as apparent Km. The teal curve, non competitive inhibitor, flattens early against its own much lower dashed ceiling at a rate of 60, and no amount of extra substrate lifts it above that line.</desc>
  <rect x="0" y="0" width="900" height="560" fill="#FFFFFF"/>

  <line x1="90" y1="60" x2="90" y2="440" stroke="#0B1530" stroke-width="3"/>
  <line x1="90" y1="440" x2="866" y2="440" stroke="#0B1530" stroke-width="3"/>
  <text transform="rotate(-90 30 250)" x="30" y="250" text-anchor="middle" font-family="Plus Jakarta Sans, sans-serif" font-size="16" font-weight="700" fill="#0B1530">rate, micromol/min</text>
  <text x="478" y="500" text-anchor="middle" font-family="Plus Jakarta Sans, sans-serif" font-size="16" font-weight="700" fill="#0B1530">substrate concentration, mmol/L</text>

  <text x="78" y="446" text-anchor="end" font-family="Plus Jakarta Sans, sans-serif" font-size="15" fill="#3D4860">0</text>
  <text x="78" y="276" text-anchor="end" font-family="Plus Jakarta Sans, sans-serif" font-size="15" fill="#3D4860">50</text>
  <text x="78" y="106" text-anchor="end" font-family="Plus Jakarta Sans, sans-serif" font-size="15" fill="#3D4860">100</text>
  <text x="90" y="466" text-anchor="middle" font-family="Plus Jakarta Sans, sans-serif" font-size="15" fill="#3D4860">0</text>
  <text x="394" y="466" text-anchor="middle" font-family="Plus Jakarta Sans, sans-serif" font-size="15" fill="#3D4860">40</text>
  <text x="546" y="466" text-anchor="middle" font-family="Plus Jakarta Sans, sans-serif" font-size="15" fill="#3D4860">60</text>
  <text x="698" y="466" text-anchor="middle" font-family="Plus Jakarta Sans, sans-serif" font-size="15" fill="#3D4860">80</text>
  <text x="850" y="466" text-anchor="middle" font-family="Plus Jakarta Sans, sans-serif" font-size="15" fill="#3D4860">100</text>

  <line x1="90" y1="100" x2="866" y2="100" stroke="#C9A14A" stroke-width="3" stroke-dasharray="12 9"/>
  <text x="866" y="88" text-anchor="end" font-family="Plus Jakarta Sans, sans-serif" font-size="16" font-weight="700" fill="#0B1530">Vmax = 100</text>
  <line x1="90" y1="236" x2="866" y2="236" stroke="#1F4E55" stroke-width="3" stroke-dasharray="12 9"/>
  <text x="866" y="226" text-anchor="end" font-family="Plus Jakarta Sans, sans-serif" font-size="16" font-weight="700" fill="#1F4E55">lower ceiling, 60</text>

  <line x1="90" y1="270" x2="242" y2="270" stroke="#3D4860" stroke-width="2" stroke-dasharray="8 7"/>
  <line x1="128" y1="270" x2="128" y2="440" stroke="#3D4860" stroke-width="2" stroke-dasharray="8 7"/>
  <line x1="242" y1="270" x2="242" y2="440" stroke="#3D4860" stroke-width="2" stroke-dasharray="8 7"/>
  <text x="122" y="486" text-anchor="middle" font-family="Plus Jakarta Sans, sans-serif" font-size="15" font-weight="700" fill="#0B1530">Km 5</text>
  <text x="256" y="486" font-family="Plus Jakarta Sans, sans-serif" font-size="15" font-weight="700" fill="#8B3A2E">apparent Km 20</text>

  <polyline points="90,440 105,343 128,270 166,213 204,185 242,168 318,149 394,138 546,126 698,120 850,116" fill="none" stroke="#0B1530" stroke-width="5"/>
  <polyline points="90,440 105,409 128,372 166,327 204,294 242,270 318,236 394,213 546,185 698,168 850,157" fill="none" stroke="#8B3A2E" stroke-width="5"/>
  <polyline points="90,440 105,382 128,338 166,304 204,287 242,277 318,265 394,259 546,252 698,248 850,246" fill="none" stroke="#1F4E55" stroke-width="5"/>

  <line x1="96" y1="524" x2="146" y2="524" stroke="#0B1530" stroke-width="5"/>
  <text x="156" y="530" font-family="Plus Jakarta Sans, sans-serif" font-size="15" font-weight="700" fill="#0B1530">no inhibitor</text>
  <line x1="300" y1="524" x2="350" y2="524" stroke="#8B3A2E" stroke-width="5"/>
  <text x="360" y="530" font-family="Plus Jakarta Sans, sans-serif" font-size="15" font-weight="700" fill="#8B3A2E">competitive</text>
  <line x1="520" y1="524" x2="570" y2="524" stroke="#1F4E55" stroke-width="5"/>
  <text x="580" y="530" font-family="Plus Jakarta Sans, sans-serif" font-size="15" font-weight="700" fill="#1F4E55">non competitive</text>
</svg>`,
      cap: "The competitive curve is heading for the same ceiling, it just takes more substrate to get there. The non competitive curve has a lower ceiling and no amount of substrate lifts it.",
      covers: ["w1-enzyme-function"]
    },

    /* ---------------------------------------------------------- 24 */
    {
      k: "work",
      variant: "paper",
      kicker: "Work it with me",
      h: "Read the curve with numbers instead of adjectives",
      lede: "Same enzyme, three conditions. Do the arithmetic and the difference between the two inhibitors stops being a definition you memorized and becomes a thing you can see.",
      badges: [{ t: "Work it with me" }, { t: "5 min", cls: "time" }],
      given: "Uninhibited enzyme: Vmax 100 micromol/min, Km 5 mmol/L. Work every rate at a substrate concentration of 15 mmol/L.",
      steps: [
        "Uninhibited, [S] = 15. v = (100 x 15) / (5 + 15) = 1500/20 = **75 micromol/min**. Three quarters of the ceiling already, on 15 mmol/L.",
        "Sanity check the Km. Put [S] = 5. v = (100 x 5)/(5 + 5) = 50, which is half of Vmax. Km behaves the way it is defined to.",
        "Add a competitive inhibitor. It sits in the active site, so substrate has to out muscle it. Vmax is unchanged at 100, but apparent Km rises from 5 to 20.",
        "Competitive, [S] = 15. v = (100 x 15)/(20 + 15) = 1500/35 = **43 micromol/min**. The rate fell by nearly half.",
        "Now rescue it with substrate. What [S] gets you back to 75 with the inhibitor there? You need S/(20 + S) = 0.75, so S = **60 mmol/L**. Four times as much substrate, full rate restored.",
        "Now a non competitive inhibitor. It binds somewhere else and bends the shape, so fewer working enzymes. Vmax falls from 100 to 60, Km stays 5.",
        "Non competitive, [S] = 15. v = (60 x 15)/(5 + 15) = 900/20 = **45 micromol/min**. Similar rate to the competitive case at this point, so far it looks the same.",
        "Try the same rescue. Push [S] to 500 mmol/L. v = (60 x 500)/(5 + 500) = 30000/505 = 59.4. Push it to a million and you get 60. **The ceiling is the ceiling.**"
      ],
      ans: "The two inhibitors looked almost identical at one substrate concentration, 43 against 45. They are only distinguishable when you vary substrate. Competitive raises Km and leaves Vmax alone, and more substrate outcompetes it. Non competitive lowers Vmax and leaves Km alone, and no amount of substrate touches it.",
      lab: "This is exactly the reading you will be asked for on your lab kinetics curve, and the four questions are always the same four: what are the axes and units, what is the shape, what physically produces that shape, and what would move it and which way.",
      timer: 300,
      big: "One point on a curve cannot tell the two inhibitors apart. You need the whole curve.",
      covers: ["w1-enzyme-function", "w1-lab-enzyme-assay"]
    },

    /* ---------------------------------------------------------- 25 */
    {
      k: "table",
      kicker: "Enzyme activity and regulation",
      h: "Competitive against allosteric, side by side",
      caption: "How the two kinds of inhibition differ on every question that matters",
      cols: ["Question", "Competitive", "Allosteric, non competitive"],
      rows: [
        ["Where does it bind?", "In the active site, the same pocket the substrate wants", "Somewhere else entirely, at a separate regulatory site"],
        ["What does it change?", "Nothing about the enzyme. It just occupies the seat", "The enzyme's shape, which deforms the active site from a distance"],
        ["Km", "Rises. It takes more substrate to reach half speed", "Unchanged. The pocket that is left still grips normally"],
        ["Vmax", "Unchanged. Flood it with substrate and you get full speed", "Falls. Fewer functional enzymes, so a lower ceiling"],
        ["Can more substrate rescue it?", "**Yes.** Whichever is more plentiful wins the seat", "**No.** More substrate cannot fix a shape problem"],
        ["Where do you actually meet it?", "**Where most drugs live.** Statins and fomepizole both sit in the seat, and a drug can be dosed to stay ahead of the substrate", "**Most of your own regulation.** Endogenous control is mostly allosteric, because it works at any substrate level"]
      ],
      big: "If piling on substrate brings the rate back, the drug was in the active site. That one test settles it.",
      covers: ["w1-enzyme-function"]
    },

    /* ---------------------------------------------------------- 26 */
    {
      k: "cards",
      cols: 2,
      kicker: "Enzyme activity and regulation",
      h: "Two real drugs, and which mechanism each one uses",
      lede: "This is not a pharmacology aside. The reason these drugs work at the doses they do is sitting in the last two slides.",
      cards: [
        {
          label: "Statins",
          labelClass: "terra",
          h: "Why does a statin have to be taken every day, forever?",
          p: ["A statin is a competitive inhibitor of HMG CoA reductase, the rate limiting enzyme of cholesterol synthesis. Its shape mimics the natural substrate closely enough to sit in the same pocket.", "Competitive means reversible and means it can be outcompeted, so the effect lasts exactly as long as the drug concentration does. **Stop the drug and the enzyme is untouched and goes straight back to work.** Nothing was destroyed."]
        },
        {
          label: "Fomepizole",
          labelClass: "terra",
          h: "Why do you treat antifreeze poisoning by blocking an enzyme rather than removing the poison?",
          p: ["Ethylene glycol is not what hurts you. Alcohol dehydrogenase converts it into acids that wreck the kidney, so the metabolite is the poison.", "Fomepizole is a competitive inhibitor that occupies alcohol dehydrogenase with far higher affinity than ethylene glycol has. The enzyme is busy, the toxic conversion nearly stops, and the parent compound leaves in the urine unchanged. **You block the reaction and let the kidney do the removing.**"]
        }
      ],
      big: "Both of these are one molecule sitting in a pocket that something else wanted.",
      covers: ["w1-enzyme-function"]
    },

    /* ---------------------------------------------------------- 27 */
    {
      k: "cards",
      cols: 2,
      kicker: "Enzyme activity and regulation",
      h: "Temperature and pH do not do the same thing to a rate",
      lede: "Both curves rise to a peak and come back down, so students often lump them together. The mechanism on the way down is completely different, and so is whether you get the enzyme back.",
      cards: [
        {
          label: "Temperature",
          labelClass: "terra",
          h: "Why does the rate climb steadily and then fall off a cliff?",
          p: ["On the way up, heat is just more molecular motion, so substrate and enzyme collide more often and more of those collisions carry enough energy. That part is gradual and it is reversible.", "Just past the optimum, near **37 C** for most human enzymes, the fall is modest and largely reversible: at 45 C your own run loses about a fifth of its rate and much of that comes back when you cool it. Keep going and the fold gives way for good. By 55 C there is essentially nothing left and **cooling that tube brings nothing back**. That far end is denaturation, and that is where the cliff is."]
        },
        {
          label: "pH",
          labelClass: "teal",
          h: "Why does an enzyme have a pH optimum at all?",
          p: ["The active site works because specific side chains carry specific charges. Move the pH and you add or strip hydrogen ions from those side chains, and the pocket loses its grip on the substrate.", "Mild shifts are reversible: bring the pH back and the rate returns. Extreme shifts unfold the protein and it does not. Pepsin in the stomach peaks near **pH 2**, pancreatic enzymes in the small intestine near **pH 8**. Same logic, tuned to where each one works."]
        }
      ],
      lab: "This slide is the prediction you write down before you touch a pipette. In the Week 1 lab you run one of these two variables, plot rate against it, and mark the optimum on your own graph. Write the predicted shape in your notebook first, then see whether your data agrees.",
      big: "Both curves have a peak. Only one of them destroys the enzyme on the way down.",
      covers: ["w1-enzyme-function", "w1-lab-enzyme-assay"]
    },

    /* ---------------------------------------------------------- 28 */
    {
      k: "hook",
      kicker: "Memory hook",
      h: "Learn this curve once. You will be paid for it three times",
      hook: {
        icon: "!",
        iconClass: "teal",
        label: "Memory hook",
        h: "Every checkout lane is already open",
        say: "Learn the shape once, use it three times.",
        p: [
          "A shop has ten checkout lanes. Send in more customers and the queue moves faster, up to a point. Once all ten lanes are busy, adding customers does nothing to how fast the shop serves people. It only makes the line longer.",
          "That flattening is **saturation**, and the ceiling is set by how many lanes there are, not by how many customers show up.",
          "The same curve comes back for transport proteins in week 2, and again for the kidney handling glucose in week 13, where the lanes running out is exactly why glucose appears in the urine of a diabetic. Same shape, three chapters."
        ]
      },
      big: "The ceiling is never about how much substrate. It is about how many workers.",
      covers: ["w1-enzyme-function"]
    },

    /* ---------------------------------------------------------- 29 */
    {
      k: "rows",
      kicker: "Enzyme assay",
      h: "Four rules for building an assay that actually measures a rate",
      lede: "The lab asks you for a rate, so set the experiment up like one from the start. Most of the marks lost on this exercise are lost in the design, before any liquid moves.",
      rows: [
        {
          dot: "1",
          dotClass: "navy",
          h: "What is the difference between a measurement and a rate?",
          p: ["An assay measures how fast product appears, or how fast substrate disappears, **per unit time**. Absorbance change per minute. One reading at the end of ten minutes is not a rate, it is a total, and a total cannot tell you when things slowed down.", "Read at fixed intervals and take the slope of the early, straight part of the line. That is your rate."]
        },
        {
          dot: "2",
          dotClass: "navy",
          h: "How many things are you allowed to change at once?",
          p: ["One. Substrate, or temperature, or pH. Hold everything else still.", "If you change temperature and pH in the same run, you have produced a number you cannot interpret. **Change one thing at a time or you cannot say what caused what.**"]
        },
        {
          dot: "3",
          dotClass: "terra",
          h: "Which tube is your control, and what is it for?",
          p: ["The tube with everything in it **except the enzyme**. It tells you how much of the reaction happens on its own, without help.", "Subtract that from every other reading. Whatever is left is what your enzyme did, which is what you were trying to measure."]
        },
        {
          dot: "4",
          dotClass: "terra",
          h: "What should you expect at the high temperature end?",
          p: ["The rate climbs, peaks, then falls off a cliff, because the enzyme denatures. Expect it and write the prediction down before you run it.", "**That drop is not a mistake in your technique. That drop is the result.** A student who reports it as an error has thrown away the most interesting data point on their graph."]
        }
      ],
      lab: "This is your Week 1 lab build project. You are designing and writing a tool that both simulates an enzyme assay and analyzes it, and it has to report interpretation and clinical relevance, not just a number. Design the program yourself, and log every AI exchange you have while building it.",
      big: "Rate, one variable, a no enzyme control, and a predicted shape. Write all four down before you start.",
      covers: ["w1-lab-enzyme-assay"]
    },

    /* ---------------------------------------------------------- 30 */
    {
      k: "table",
      kicker: "Enzyme assay",
      h: "Here is a temperature run. Find the optimum and say what happened after it",
      caption: "Absorbance change per minute at 340 nm, one enzyme, five temperatures, everything else held constant",
      cols: ["Tube", "Temperature", "Change in absorbance per minute", "Corrected rate"],
      rows: [
        ["Control, no enzyme", "37 C", "0.003", "not applicable, this is the baseline"],
        ["A", "20 C", "0.042", "0.039"],
        ["B", "30 C", "0.081", "0.078"],
        ["C", "37 C", "0.118", "**0.115**, the highest"],
        ["D", "45 C", "0.096", "0.093"],
        ["E", "55 C", "0.009", "0.006, essentially nothing left"]
      ],
      lab: "Plot corrected rate on the vertical axis against temperature on the horizontal axis, join the points, and mark the peak. Your Week 1 lab write up asks for exactly this graph plus one sentence saying why tube E cannot be rescued by cooling it back to 37 C.",
      big: "The optimum is 37 C. The collapse between 45 and 55 is denaturation, and it is permanent.",
      covers: ["w1-lab-enzyme-assay"]
    },

    /* ---------------------------------------------------------- 31 */
    {
      k: "cards",
      cols: 3,
      kicker: "ATP and energy coupling",
      h: "ATP does not power anything. It pays for things",
      lede: "Splitting ATP releases energy, and the cell **couples** that release to work it could not otherwise do. Coupling is the important word: the two reactions are physically joined on the same protein, so the favourable one drags the unfavourable one along with it. Three categories of work, and you meet all three by week 6.",
      cards: [
        {
          label: "Transport",
          labelClass: "teal",
          h: "What work is being paid for when a pump moves an ion uphill?",
          p: ["Moving something against its concentration gradient, which will never happen on its own. The sodium potassium pump is the standard example: three Na+ out and two K+ in per ATP, both against their gradients.", "That pump is running in every cell you own, right now, and it uses a substantial share of your resting energy budget. **Everything electrical in week 3 is paid for by it.**"]
        },
        {
          label: "Mechanical",
          labelClass: "teal",
          h: "What work is being paid for when a muscle shortens?",
          p: ["Moving something physically. The crossbridge cycle: myosin binds actin, pulls, and then needs an ATP just to let go again.", "Which is exactly why rigor mortis happens. **ATP is required for the release step, not the pulling step**, so when ATP runs out the muscle locks rather than relaxing. Week 5."]
        },
        {
          label: "Chemical",
          labelClass: "teal",
          h: "What work is being paid for when a cell builds something?",
          p: ["Making a large molecule out of small ones, which costs energy every time. Linking amino acids into a protein, glucose into glycogen, or synthesising a neurotransmitter.", "Your body is rebuilt continuously, not once. Every one of those bonds was paid for with ATP, which is why building tissue costs calories and why starvation eats muscle."]
        }
      ],
      big: "Transport, mechanical, chemical. Pump, muscle, building a protein. Say the three out loud.",
      covers: ["w1-atp-energy"]
    },

    /* ---------------------------------------------------------- 32 */
    {
      k: "text",
      variant: "dark",
      kicker: "ATP and energy coupling",
      h: "You are carrying about 250 g of ATP, and you will use all of it in five minutes",
      lede: "This is the rate framing from slide three, in its cleanest form. The stock is trivially small. The flow through it is enormous.",
      body: [
        "There is roughly **250 g of ATP** in your whole body at any moment. That is about half a cup, and since ATP weighs about 507 g per mole, it is about half a mole.",
        "Over a day at rest you turn over something close to **your own body weight in ATP**. For a 70 kg adult that is about 140 moles a day, which works out at about a tenth of a mole every minute.",
        "Half a mole sitting in the pool, a tenth of a mole leaving it every minute. The whole stock would be gone in about five minutes if nothing replaced it. During hard exercise the turnover goes up several fold, and the pool still never gets bigger. Every molecule in it is spent and rebuilt hundreds of times a day.",
        "You met this shape already, as the coffee shop that always has about forty people in it. The count on the floor stays the same. Nobody in there is the same person they were an hour ago."
      ],
      list: [
        "The amount of ATP tells you almost nothing about a cell's energy state.",
        "The rate of ATP production against the rate of ATP demand tells you everything.",
        "Which is why the interesting clinical question is never how much ATP is there. It is whether supply is keeping up with demand."
      ],
      big: "A tiny pool, turned over furiously. That is not an exception in physiology. That is the pattern.",
      covers: ["w1-atp-energy"]
    },

    /* ---------------------------------------------------------- 33 */
    {
      k: "cards",
      cols: 2,
      kicker: "Anchoring it to real tests",
      h: "Right now against the last three months",
      lede: "Two blood tests, one variable. This pair is the sharpest example in the whole course of why you have to ask what window a number is reporting on before you interpret it.",
      cards: [
        {
          label: "70 to 99 mg/dL",
          labelClass: "teal",
          big: "Serum glucose",
          h: "What window is this number reporting on?",
          p: ["This second. It is the free glucose concentration in plasma at the moment the needle went in, and it is a regulated variable, defended by insulin on one side and by glucagon, adrenaline, cortisol and growth hormone on the other.", "It moves with the last meal, with stress, with a night of poor sleep. **A single glucose is a snapshot of a controlled variable, and controlled variables are the ones that move most.**"]
        },
        {
          label: "4 to 5.6 percent",
          labelClass: "terra",
          big: "Hemoglobin A1c",
          h: "What window is this number reporting on?",
          p: ["The last two to three months. Glucose sticks to hemoglobin slowly and non enzymatically, and once it is stuck it stays stuck for the life of the red cell. A1c is the fraction that got glycated.", "**It is not regulated at all.** Nothing defends it, nothing corrects it. It is a cumulative chemical record, the integral of glucose exposure rather than its current value."]
        },
        {
          label: "About 120 days",
          labelClass: "terra",
          big: "The catch",
          h: "How can an A1c change when the glucose has not moved at all?",
          p: ["Because A1c measures exposure time, and exposure time is set by how long red cells live. Red cells normally last **about 120 days**.", "Shorten that lifespan and cells are replaced before they can accumulate glycation, so **A1c reads falsely low in a patient whose glucose has not changed by a single mg/dL**. Haemolysis does it. So does a recent transfusion, or blood loss, or iron replacement kicking off a burst of new red cells."]
        },
        {
          label: "Read them together",
          labelClass: "teal",
          big: "The rule",
          h: "So what do you do when the two disagree?",
          p: ["Do not pick the one you like. Ask what would make each of them wrong, and check whether that thing is present in this patient.", "A high glucose with a normal A1c says something happened recently. A normal glucose with a high A1c says the last three months were worse than today is. **A disagreement between them is information, not an error.**"]
        }
      ],
      big: "Before you read any lab value, ask what window it reports on. Right now, or the last three months?"
    },

    /* ---------------------------------------------------------- 34 */
    {
      k: "text",
      kicker: "Anchoring it to real tests",
      h: "Lactate is not a label. It is supply against demand",
      lede: "Resting lactate runs **0.5 to 2.2 mmol/L**. It goes up when glycolysis outruns the mitochondria, and that sentence has two halves, both of which matter.",
      body: [
        "Lactate is the end product of anaerobic glycolysis. It accumulates when the rate of glycolysis exceeds the rate at which the mitochondria can take the pyruvate and finish the job with oxygen. **It is a rate mismatch made visible**, which is why it belongs in this deck and not in a metabolism deck.",
        "So a raised lactate does not mean one thing. It means production has beaten clearance, and there are three separate ways to arrive there. Oxygen is not being delivered fast enough. Or oxygen is arriving fine but the cell cannot use it. Or the liver, which normally recycles lactate back to glucose, is not clearing it.",
        "This is the reason lactate is one of the most useful early numbers in an unwell patient. Blood pressure can still look acceptable while tissue is already short. The lactate rises before the pressure falls, because the tissue notices before the arithmetic of the cuff does."
      ],
      list: [
        "Delivery problem: the pump or the volume is failing, so blood is not arriving.",
        "Use problem: blood is arriving but the mitochondria cannot use the oxygen in it.",
        "Clearance problem: the liver is not doing its share, so normal production piles up.",
        "The number cannot tell you which. **The number tells you to go and find out which.**"
      ],
      big: "Never read lactate as a diagnosis. Read it as a question about supply and demand, then go answer it."
    },

    /* ---------------------------------------------------------- 35 */
    {
      k: "activity",
      kicker: "Your turn",
      h: "Ten minutes. Design one row of your assay, on paper, before you touch anything",
      badges: [{ t: "In class" }, { t: "10 min", cls: "time" }],
      lede: "Work with the person next to you. Pick either temperature or pH as your variable, and build the design out loud. You are not running anything today, you are proving you know what a rate experiment looks like.",
      listLabel: "What to do",
      list: [
        "Pick one variable, temperature or pH. Say out loud why you are not doing both.",
        "Write the five conditions you would test, with actual values. Real numbers, not a range.",
        "Name your control tube and say what you will subtract and why.",
        "Write down what you will read and how often. Give it units. If your answer has no per minute in it, you have written a total, not a rate.",
        "Sketch the shape you predict, before any data exists. Mark where you think the optimum sits.",
        "Then one sentence: if your curve comes back flat with no peak at all, name two things that could have caused that."
      ],
      timer: 600,
      big: "Predict first. A prediction you wrote down before the data is worth ten explanations you wrote after it.",
      covers: ["w1-lab-enzyme-assay"]
    },

    /* ---------------------------------------------------------- 36 */
    {
      k: "close",
      kicker: "Before next class",
      h: "Four things to do before we meet again",
      lede: "None of these take long. All of them are worth more than rereading the slides, because every one of them makes you produce something instead of recognize something.",
      list: [
        "Say the two rules out loud with the slides shut: **like dissolves like**, and **arterial pH 7.35 to 7.45**. If you have to check, you have not got them yet.",
        "Work one osmolality by hand. Make up a panel, estimate it, then invent a measured value and take the gap. Two minutes, and it never leaves you after that.",
        "Draw the Michaelis Menten curve from memory, then add the competitive and the non competitive curves on top. Label Km and Vmax on all three. This is the single most likely figure to be in front of you again.",
        "Write your assay design from the activity into your lab notebook, cleanly, before lab. Come to the bench with the prediction already on paper.",
        "Then tick off water, pH and buffers, protein structure, enzymes and ATP on the course list, honestly. **If you can only do it with the page open, it does not count as ticked.**"
      ],
      big: "Almost nothing here is about how much. It is about how fast, and now you have the five pieces that set the speed.",
      bigVariant: "terra"
    }

  ]
};
