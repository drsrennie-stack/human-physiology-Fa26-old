/* BIO 005 Human Physiology, Week 1, Unit 1
   Slide deck P, Mission 1, Maintain Control

   Rebuilt Sep 5 2026 to serve lecture-mission-01-maintain-control.html.
   The narrative carries the argument. These slides carry the content she points at.
   Titles name the topic, not a thesis. No closing tagline except where a line
   genuinely earns the wall. Card labels are plain nouns.
   Order matches the narrative: foundations, control, communication, method.

   Dr. Sharilyn Rennie */

module.exports = {
  id: "slides-p-mission-01-maintain-control",
  letter: "P",
  type: "Physiology",
  week: 1,
  unit: 1,
  topic: "Mission 1, Maintain Control",
  title: "Mission 1, Maintain Control",
  subtitle: "Homeostasis, mass balance, the reflex pathway, feedback, and how signals travel. Silverthorn chapter 1 with the homeostasis and communication material from chapter 6. Thirteen concepts, recorded one at a time.",

  slides: [

    /* ================================================= OPENING */
    /* 1 */
    {
      k: "title",
      variant: "terra",
      kicker: "Week 1 . Unit 1 . Mission 1",
      h: "Maintain control",
      lede: "The body has one job: keep conditions inside steady enough that cells can keep working. This week is how that gets done.",
      terms: [
        { t: "Internal environment", c: "t" },
        { t: "Homeostasis", c: "t" },
        { t: "Mass balance", c: "l" },
        { t: "Reflex pathway", c: "g" },
        { t: "Negative feedback", c: "g" },
        { t: "Feedforward", c: "l" }
      ],
      qr: {
        h: "Open this deck on your phone or tablet",
        p: [
          "Scan to follow along beside the video, or to draw on it yourself with a stylus.",
          "drsrennie-stack.github.io, human-physiology-Fa26"
        ],
        svg: `<svg viewBox="0 0 41 41" role="img" aria-labelledby="qrT qrD" shape-rendering="crispEdges">
  <title id="qrT">QR code to this deck</title>
  <desc id="qrD">Scans to the Mission 1 slide deck on the BIO 005 course site, so you can open it on a phone or tablet.</desc>
  <rect width="41" height="41" fill="#FFFFFF"/>
  <path d="M0 0h7v1h-7zM11 0h1v1h-1zM13 0h1v1h-1zM15 0h7v1h-7zM23 0h4v1h-4zM28 0h1v1h-1zM30 0h2v1h-2zM34 0h7v1h-7zM0 1h1v1h-1zM6 1h1v1h-1zM9 1h2v1h-2zM13 1h1v1h-1zM16 1h2v1h-2zM20 1h2v1h-2zM24 1h1v1h-1zM27 1h2v1h-2zM32 1h1v1h-1zM34 1h1v1h-1zM40 1h1v1h-1zM0 2h1v1h-1zM2 2h3v1h-3zM6 2h1v1h-1zM8 2h2v1h-2zM12 2h1v1h-1zM15 2h4v1h-4zM20 2h4v1h-4zM27 2h1v1h-1zM30 2h2v1h-2zM34 2h1v1h-1zM36 2h3v1h-3zM40 2h1v1h-1zM0 3h1v1h-1zM2 3h3v1h-3zM6 3h1v1h-1zM8 3h2v1h-2zM11 3h1v1h-1zM13 3h3v1h-3zM19 3h1v1h-1zM21 3h1v1h-1zM23 3h4v1h-4zM28 3h2v1h-2zM32 3h1v1h-1zM34 3h1v1h-1zM36 3h3v1h-3zM40 3h1v1h-1zM0 4h1v1h-1zM2 4h3v1h-3zM6 4h1v1h-1zM8 4h1v1h-1zM10 4h1v1h-1zM14 4h1v1h-1zM16 4h4v1h-4zM21 4h3v1h-3zM25 4h2v1h-2zM28 4h1v1h-1zM31 4h2v1h-2zM34 4h1v1h-1zM36 4h3v1h-3zM40 4h1v1h-1zM0 5h1v1h-1zM6 5h1v1h-1zM8 5h3v1h-3zM13 5h1v1h-1zM15 5h3v1h-3zM20 5h1v1h-1zM25 5h4v1h-4zM34 5h1v1h-1zM40 5h1v1h-1zM0 6h7v1h-7zM8 6h1v1h-1zM10 6h1v1h-1zM12 6h1v1h-1zM14 6h1v1h-1zM16 6h1v1h-1zM18 6h1v1h-1zM20 6h1v1h-1zM22 6h1v1h-1zM24 6h1v1h-1zM26 6h1v1h-1zM28 6h1v1h-1zM30 6h1v1h-1zM32 6h1v1h-1zM34 6h7v1h-7zM8 7h2v1h-2zM12 7h1v1h-1zM14 7h2v1h-2zM18 7h1v1h-1zM21 7h2v1h-2zM24 7h1v1h-1zM27 7h2v1h-2zM30 7h1v1h-1zM0 8h1v1h-1zM2 8h5v1h-5zM10 8h1v1h-1zM14 8h2v1h-2zM17 8h1v1h-1zM19 8h1v1h-1zM22 8h2v1h-2zM25 8h2v1h-2zM29 8h1v1h-1zM31 8h1v1h-1zM34 8h5v1h-5zM0 9h2v1h-2zM4 9h1v1h-1zM9 9h1v1h-1zM11 9h1v1h-1zM13 9h2v1h-2zM17 9h3v1h-3zM22 9h2v1h-2zM28 9h1v1h-1zM31 9h6v1h-6zM38 9h3v1h-3zM0 10h1v1h-1zM2 10h8v1h-8zM11 10h2v1h-2zM14 10h3v1h-3zM20 10h1v1h-1zM22 10h1v1h-1zM27 10h2v1h-2zM32 10h1v1h-1zM34 10h1v1h-1zM36 10h1v1h-1zM0 11h2v1h-2zM3 11h2v1h-2zM7 11h2v1h-2zM10 11h3v1h-3zM19 11h1v1h-1zM21 11h2v1h-2zM27 11h2v1h-2zM31 11h2v1h-2zM35 11h1v1h-1zM37 11h1v1h-1zM39 11h1v1h-1zM0 12h1v1h-1zM2 12h1v1h-1zM4 12h4v1h-4zM12 12h1v1h-1zM14 12h2v1h-2zM19 12h2v1h-2zM22 12h6v1h-6zM29 12h1v1h-1zM31 12h2v1h-2zM37 12h2v1h-2zM0 13h3v1h-3zM9 13h1v1h-1zM16 13h1v1h-1zM18 13h1v1h-1zM28 13h9v1h-9zM38 13h1v1h-1zM40 13h1v1h-1zM0 14h2v1h-2zM4 14h3v1h-3zM15 14h1v1h-1zM18 14h1v1h-1zM20 14h6v1h-6zM27 14h1v1h-1zM33 14h1v1h-1zM39 14h1v1h-1zM3 15h2v1h-2zM7 15h2v1h-2zM10 15h3v1h-3zM14 15h1v1h-1zM21 15h3v1h-3zM26 15h1v1h-1zM28 15h1v1h-1zM31 15h2v1h-2zM34 15h2v1h-2zM37 15h1v1h-1zM39 15h2v1h-2zM2 16h2v1h-2zM5 16h3v1h-3zM10 16h1v1h-1zM12 16h1v1h-1zM16 16h2v1h-2zM23 16h4v1h-4zM29 16h1v1h-1zM31 16h3v1h-3zM35 16h1v1h-1zM37 16h3v1h-3zM0 17h3v1h-3zM5 17h1v1h-1zM7 17h1v1h-1zM9 17h1v1h-1zM14 17h2v1h-2zM18 17h3v1h-3zM22 17h2v1h-2zM26 17h1v1h-1zM28 17h1v1h-1zM31 17h2v1h-2zM34 17h4v1h-4zM39 17h2v1h-2zM1 18h1v1h-1zM3 18h2v1h-2zM6 18h1v1h-1zM9 18h3v1h-3zM13 18h2v1h-2zM16 18h1v1h-1zM18 18h1v1h-1zM20 18h1v1h-1zM22 18h1v1h-1zM26 18h5v1h-5zM32 18h3v1h-3zM36 18h1v1h-1zM38 18h1v1h-1zM0 19h1v1h-1zM3 19h3v1h-3zM7 19h1v1h-1zM9 19h1v1h-1zM13 19h2v1h-2zM16 19h1v1h-1zM20 19h1v1h-1zM23 19h1v1h-1zM27 19h2v1h-2zM30 19h1v1h-1zM32 19h1v1h-1zM36 19h1v1h-1zM39 19h1v1h-1zM1 20h1v1h-1zM3 20h1v1h-1zM6 20h1v1h-1zM14 20h2v1h-2zM18 20h9v1h-9zM29 20h1v1h-1zM38 20h1v1h-1zM0 21h2v1h-2zM7 21h5v1h-5zM13 21h4v1h-4zM19 21h3v1h-3zM23 21h1v1h-1zM25 21h1v1h-1zM30 21h5v1h-5zM36 21h1v1h-1zM39 21h2v1h-2zM1 22h1v1h-1zM3 22h1v1h-1zM6 22h3v1h-3zM10 22h3v1h-3zM15 22h1v1h-1zM17 22h1v1h-1zM20 22h3v1h-3zM25 22h3v1h-3zM29 22h2v1h-2zM32 22h3v1h-3zM37 22h1v1h-1zM0 23h1v1h-1zM5 23h1v1h-1zM7 23h1v1h-1zM9 23h1v1h-1zM11 23h1v1h-1zM16 23h1v1h-1zM19 23h3v1h-3zM23 23h2v1h-2zM28 23h1v1h-1zM30 23h3v1h-3zM35 23h1v1h-1zM37 23h1v1h-1zM0 24h7v1h-7zM11 24h1v1h-1zM13 24h2v1h-2zM17 24h1v1h-1zM22 24h1v1h-1zM24 24h3v1h-3zM29 24h1v1h-1zM31 24h1v1h-1zM38 24h2v1h-2zM0 25h1v1h-1zM4 25h2v1h-2zM10 25h1v1h-1zM15 25h1v1h-1zM18 25h3v1h-3zM23 25h3v1h-3zM28 25h2v1h-2zM31 25h1v1h-1zM33 25h5v1h-5zM40 25h1v1h-1zM2 26h2v1h-2zM5 26h2v1h-2zM8 26h1v1h-1zM11 26h2v1h-2zM16 26h2v1h-2zM20 26h3v1h-3zM27 26h1v1h-1zM32 26h2v1h-2zM35 26h1v1h-1zM0 27h2v1h-2zM3 27h3v1h-3zM7 27h2v1h-2zM10 27h1v1h-1zM12 27h4v1h-4zM18 27h2v1h-2zM21 27h1v1h-1zM31 27h2v1h-2zM34 27h1v1h-1zM36 27h2v1h-2zM39 27h2v1h-2zM2 28h1v1h-1zM4 28h3v1h-3zM10 28h3v1h-3zM14 28h2v1h-2zM17 28h1v1h-1zM22 28h1v1h-1zM24 28h4v1h-4zM29 28h1v1h-1zM31 28h1v1h-1zM37 28h2v1h-2zM40 28h1v1h-1zM0 29h2v1h-2zM4 29h2v1h-2zM7 29h1v1h-1zM11 29h1v1h-1zM14 29h1v1h-1zM16 29h3v1h-3zM20 29h2v1h-2zM24 29h1v1h-1zM26 29h1v1h-1zM30 29h5v1h-5zM36 29h2v1h-2zM40 29h1v1h-1zM0 30h1v1h-1zM2 30h1v1h-1zM6 30h1v1h-1zM10 30h1v1h-1zM12 30h1v1h-1zM14 30h1v1h-1zM18 30h2v1h-2zM21 30h1v1h-1zM24 30h2v1h-2zM27 30h1v1h-1zM30 30h1v1h-1zM32 30h3v1h-3zM37 30h1v1h-1zM39 30h1v1h-1zM0 31h1v1h-1zM2 31h2v1h-2zM8 31h1v1h-1zM11 31h1v1h-1zM13 31h3v1h-3zM19 31h3v1h-3zM26 31h3v1h-3zM30 31h5v1h-5zM36 31h2v1h-2zM0 32h1v1h-1zM2 32h1v1h-1zM6 32h2v1h-2zM12 32h6v1h-6zM19 32h1v1h-1zM23 32h4v1h-4zM29 32h8v1h-8zM38 32h2v1h-2zM8 33h3v1h-3zM13 33h3v1h-3zM17 33h3v1h-3zM21 33h3v1h-3zM25 33h1v1h-1zM28 33h3v1h-3zM32 33h1v1h-1zM36 33h3v1h-3zM40 33h1v1h-1zM0 34h7v1h-7zM9 34h2v1h-2zM12 34h2v1h-2zM17 34h1v1h-1zM20 34h2v1h-2zM26 34h4v1h-4zM31 34h2v1h-2zM34 34h1v1h-1zM36 34h3v1h-3zM0 35h1v1h-1zM6 35h1v1h-1zM8 35h2v1h-2zM12 35h1v1h-1zM14 35h1v1h-1zM16 35h3v1h-3zM21 35h2v1h-2zM24 35h1v1h-1zM26 35h3v1h-3zM31 35h2v1h-2zM36 35h2v1h-2zM0 36h1v1h-1zM2 36h3v1h-3zM6 36h1v1h-1zM8 36h1v1h-1zM10 36h1v1h-1zM13 36h2v1h-2zM21 36h1v1h-1zM23 36h1v1h-1zM25 36h2v1h-2zM29 36h1v1h-1zM32 36h9v1h-9zM0 37h1v1h-1zM2 37h3v1h-3zM6 37h1v1h-1zM8 37h1v1h-1zM10 37h2v1h-2zM15 37h1v1h-1zM17 37h7v1h-7zM25 37h1v1h-1zM28 37h1v1h-1zM30 37h1v1h-1zM33 37h1v1h-1zM35 37h1v1h-1zM38 37h3v1h-3zM0 38h1v1h-1zM2 38h3v1h-3zM6 38h1v1h-1zM8 38h2v1h-2zM15 38h1v1h-1zM18 38h1v1h-1zM20 38h2v1h-2zM27 38h5v1h-5zM33 38h5v1h-5zM0 39h1v1h-1zM6 39h1v1h-1zM9 39h1v1h-1zM11 39h1v1h-1zM13 39h3v1h-3zM18 39h5v1h-5zM24 39h1v1h-1zM26 39h2v1h-2zM32 39h1v1h-1zM34 39h1v1h-1zM36 39h2v1h-2zM39 39h1v1h-1zM0 40h7v1h-7zM8 40h3v1h-3zM15 40h1v1h-1zM17 40h3v1h-3zM22 40h8v1h-8zM34 40h3v1h-3zM38 40h1v1h-1z" fill="#08101F"/>
</svg>`
      }
    },

    /* 2 */
    {
      k: "cards",
      cols: 3,
      kicker: "Before we start",
      h: "What a mission is",
      lede: "A word used all semester, defined before it is used again.",
      cards: [
        {
          label: "The job",
          h: "One job, broken into smaller ones",
          p: ["Keep conditions in the internal environment steady enough for cells to work. Too large to learn in one piece, so the course divides it."]
        },
        {
          label: "A mission",
          labelClass: "terra",
          h: "A problem that comes before the science",
          p: ["Each mission opens with a problem already on the table. You learn the science because the problem needs it, then decide whether the evidence supports the claim."]
        },
        {
          label: "Unit 1",
          labelClass: "teal",
          h: "Keep the Human Alive",
          list: [
            "1. Maintain control. This week.",
            "2. Build the molecular toolkit.",
            "3. Organize the machinery.",
            "4. Power the system.",
            "5. Coordinate the human."
          ]
        }
      ]
    },

    /* 3 */
    {
      k: "activity",
      kicker: "The patient",
      h: "Three days of values, one patient",
      lede: "Two questions. Which values moved, and which ended up outside the range.",
      listLabel: "Day 1, day 2, day 3, then the usual range",
      list: [
        "**Sodium** 141, 134, 128 mmol/L. Usual 135 to 145.",
        "**Potassium** 4.0, 4.2, 4.1 mmol/L. Usual 3.5 to 5.0.",
        "**Glucose** 92, 95, 96 mg/dL. Usual 70 to 99 fasting.",
        "**Temperature** 37.0, 37.2, 37.1 C (98.6, 99.0, 98.8 F). Usual 36.5 to 37.5 C (97.7 to 99.5 F).",
        "**Heart rate** 78, 92, 104 per minute. Usual 60 to 100.",
        "**Blood pressure** 118/74, 106/66, 96/58. Usual under 120/80.",
        "**Urine output** 1500, 2100, 2900 mL per day. Usual 800 to 2000."
      ],
      covers: ["w1-lab-graphing"]
    },

    /* 4 */
    {
      k: "text",
      variant: "dark",
      kicker: "The mission",
      h: "What you will be able to do",
      lede: "Given a variable that is drifting, say where the failure is.",
      list: [
        "Whether the body stopped **detecting** the change.",
        "Whether it stopped **communicating** it.",
        "Whether it stopped being able to **act** on it.",
        "Three different failures. They look similar on a chart."
      ],
      big: "A value that stays the same is not being ignored. It is being held."
    },

    /* ================================================= CONCEPT 1 */
    /* 5 */
    {
      k: "title",
      variant: "teal",
      kicker: "Concept 1 of 13 . 3 slides",
      h: "What physiology asks",
      lede: "Anatomy asks what a structure is. Physiology asks what it does, how it does it, and what happens when conditions change."
    },

    /* 6 */
    {
      k: "rows",
      kicker: "Concept 1 . Levels of organization",
      h: "One event, six levels",
      lede: "The question changes as you move up.",
      rows: [
        { dot: "1", h: "Molecule", p: ["A protein changes shape when something binds to it."] },
        { dot: "2", h: "Cell", p: ["The shape change opens a channel and ions move."] },
        { dot: "3", h: "Tissue", p: ["Enough cells do it together that the tissue contracts."] },
        { dot: "4", h: "Organ", p: ["The contraction ejects blood."] },
        { dot: "5", h: "System", p: ["Pressure rises in vessels far from the heart."] },
        { dot: "6", h: "Organism", p: ["You stand up without fainting."] }
      ],
      covers: ["w1-levels-function", "w1-structure-function"]
    },

    /* 7 */
    {
      k: "cards",
      cols: 2,
      kicker: "Concept 1 . Two kinds of explanation",
      h: "Purpose and mechanism",
      lede: "Why do red blood cells carry oxygen?",
      cards: [
        {
          label: "Teleological, answers why",
          h: "They carry it to supply the tissues",
          p: ["Answers in terms of purpose. Useful for orientation, and it names no process."],
          list: [
            "No measurement could check it.",
            "Cannot be wrong, so cannot be tested."
          ]
        },
        {
          label: "Mechanistic, answers how",
          labelClass: "terra",
          h: "Hemoglobin binds oxygen reversibly, and binding depends on oxygen partial pressure",
          p: ["Names the molecule doing the work and the condition that changes how much work gets done."],
          list: [
            "Tells you what to measure.",
            "Predicts what happens if oxygen pressure changes.",
            "A mechanism can answer a why question too. The split is purpose against process, not the first word."
          ]
        }
      ]
    },

    {
      k: "cards",
      cols: 4,
      kicker: 'Concept 1 . Clinical',
      h: 'Purpose gets you moving, mechanism tells you what next',
      cards: [
        { label: 'In nursing', labelClass: "terra", h: 'Charting an observation, or the start of a mechanism', p: ['Urine output dropped is an observation. Output dropped after two hours of poor intake with a rising heart rate is a mechanism, and it is the version that gets escalated successfully.'] },
        { label: 'In rad tech', labelClass: "terra", h: 'Knowing why the protocol exists', p: ['A protocol followed without knowing what it protects against is fragile. When a patient does not fit the protocol, only the mechanism tells you which part still matters.'] },
        { label: 'In medicine', h: 'Oxygen for a low saturation', p: ['Giving it helps. It does not tell you whether the problem is ventilation, diffusion or perfusion, and those three are managed differently.'] },
        { label: 'In respiratory therapy', h: 'Changing a setting without a mechanism', p: ['Correcting a number you do not understand is how you fix the display while the underlying problem keeps moving.'] }
      ]
    },

    /* ================================================= CONCEPT 2 */
    /* 8 */
    {
      k: "title",
      variant: "teal",
      kicker: "Concept 2 of 13 . 3 slides",
      h: "The internal environment",
      lede: "Most cells never touch the outside world. The lumen of the gut is not inside you."
    },

    /* 9 */
    {
      k: "fig",
      kicker: "Concept 2 . Body fluid compartments",
      h: "Total body water",
      svg: `<svg viewBox="0 0 760 300" role="img" aria-labelledby="cmpT cmpD">
  <title id="cmpT">Body fluid compartments</title>
  <desc id="cmpD">Total body water divides into intracellular fluid, about two thirds, and extracellular fluid, about one third. Extracellular fluid divides again into interstitial fluid, which bathes the cells, and plasma, which is inside the vessels.</desc>
  <rect x="20" y="16" width="720" height="46" rx="8" fill="#EDF1F3" stroke="#08101F" stroke-width="1.5"/>
  <text x="380" y="45" text-anchor="middle" font-family="system-ui,sans-serif" font-size="17" font-weight="700" fill="#08101F">Total body water</text>
  <line x1="380" y1="62" x2="380" y2="80" stroke="#08101F" stroke-width="1.5"/>
  <line x1="200" y1="80" x2="560" y2="80" stroke="#08101F" stroke-width="1.5"/>
  <line x1="200" y1="80" x2="200" y2="98" stroke="#08101F" stroke-width="1.5"/>
  <line x1="560" y1="80" x2="560" y2="98" stroke="#08101F" stroke-width="1.5"/>
  <rect x="60" y="98" width="280" height="70" rx="8" fill="#FFFFFF" stroke="#1F4E55" stroke-width="2"/>
  <text x="200" y="126" text-anchor="middle" font-family="system-ui,sans-serif" font-size="15" font-weight="700" fill="#1F4E55">Intracellular fluid</text>
  <text x="200" y="149" text-anchor="middle" font-family="system-ui,sans-serif" font-size="13" fill="#3D4860">about two thirds</text>
  <rect x="420" y="98" width="280" height="70" rx="8" fill="#FFFFFF" stroke="#8B1D1D" stroke-width="2" stroke-dasharray="6 4"/>
  <text x="560" y="126" text-anchor="middle" font-family="system-ui,sans-serif" font-size="15" font-weight="700" fill="#8B1D1D">Extracellular fluid</text>
  <text x="560" y="149" text-anchor="middle" font-family="system-ui,sans-serif" font-size="13" fill="#3D4860">about one third</text>
  <line x1="560" y1="168" x2="560" y2="188" stroke="#8B1D1D" stroke-width="1.5"/>
  <line x1="470" y1="188" x2="650" y2="188" stroke="#8B1D1D" stroke-width="1.5"/>
  <line x1="470" y1="188" x2="470" y2="206" stroke="#8B1D1D" stroke-width="1.5"/>
  <line x1="650" y1="188" x2="650" y2="206" stroke="#8B1D1D" stroke-width="1.5"/>
  <rect x="380" y="206" width="180" height="62" rx="8" fill="#FFFFFF" stroke="#8B1D1D" stroke-width="1.5" stroke-dasharray="6 4"/>
  <text x="470" y="232" text-anchor="middle" font-family="system-ui,sans-serif" font-size="14" font-weight="700" fill="#8B1D1D">Interstitial fluid</text>
  <text x="470" y="253" text-anchor="middle" font-family="system-ui,sans-serif" font-size="12.5" fill="#3D4860">bathes the cells</text>
  <rect x="580" y="206" width="140" height="62" rx="8" fill="#FFFFFF" stroke="#8B1D1D" stroke-width="1.5" stroke-dasharray="6 4"/>
  <text x="650" y="232" text-anchor="middle" font-family="system-ui,sans-serif" font-size="14" font-weight="700" fill="#8B1D1D">Plasma</text>
  <text x="650" y="253" text-anchor="middle" font-family="system-ui,sans-serif" font-size="12.5" fill="#3D4860">inside vessels</text>
</svg>`,
      cap: "<b>Solid teal, inside cells. Dashed maroon, outside cells.</b> Same code all semester.",
      covers: ["w1-fluid-compartments"]
    },

    /* 10 */
    {
      k: "cards",
      cols: 2,
      kicker: "Concept 2 . Compartment exchange",
      h: "Plasma and interstitial fluid exchange freely",
      lede: "You sample plasma. You are inferring something about the fluid the cells actually sit in.",
      cards: [
        {
          label: "What the cell reads",
          labelClass: "teal",
          h: "Only what is immediately around it",
          p: ["A cell has no access to your plasma sodium. Holding a value steady means holding it steady in extracellular fluid, because that is the fluid the cells experience."]
        },
        {
          label: "Where volume problems arise",
          labelClass: "terra",
          h: "Swollen ankles with a low blood pressure",
          p: ["Fluid can leave the vessels and accumulate in tissue, so total body water can be high while the volume inside the vessels is low. The two findings are not contradicting each other. They locate the water."]
        }
      ],
      lab: "You will sort scenarios by which compartment gained or lost water.",
      covers: ["w1-compartment-shifts"]
    },

    {
      k: "cards",
      cols: 4,
      kicker: 'Concept 2 . Clinical',
      h: 'Where the water is',
      cards: [
        { label: 'In nursing', labelClass: "terra", h: 'Edema and a low blood pressure together', p: ['Not a contradiction. Fluid has left the vessels for the interstitium, so total body water is high while circulating volume is low.'] },
        { label: 'In rad tech', labelClass: "terra", h: 'Contrast goes into one compartment', p: ['It is injected into plasma and redistributes from there. What you see on the images depends on where it has got to by the time you scan.'] },
        { label: 'In medicine', h: 'Total body water is the wrong number', p: ['Volume status is about distribution between compartments, which is why a weight alone does not answer the question.'] },
        { label: 'In respiratory therapy', h: 'Pulmonary edema is a compartment problem', p: ['Fluid in the interstitium and alveoli rather than the capillary. Same body water, wrong location, and gas exchange fails.'] }
      ]
    },

    /* ================================================= CONCEPT 3 */
    /* 11 */
    {
      k: "title",
      variant: "teal",
      kicker: "Concept 3 of 13 . 5 slides",
      h: "Homeostasis",
      lede: "The process of keeping conditions in the internal environment within a range that cells can work in."
    },

    /* 12 */
    {
      k: "cards",
      cols: 2,
      kicker: "Concept 3 . Taking the definition apart",
      h: "A process, and a range",
      cards: [
        {
          label: "A process",
          labelClass: "terra",
          h: "Runs continuously, costs energy, can fail",
          p: ["Not a state. Nothing about it is passive and nothing about it is guaranteed."]
        },
        {
          label: "A range",
          labelClass: "teal",
          h: "Not a single number",
          p: ["The value moves inside the range rather than sitting on a point. Core temperature is not 37.0 C (98.6 F) all day and is not meant to be."]
        }
      ],
      covers: ["w1-homeostasis"]
    },

    /* 13 */
    {
      k: "table",
      kicker: "Concept 3 . Two situations",
      h: "Steady state and equilibrium",
      caption: "Routinely confused, and not the same thing",
      cols: ["", "Steady state", "Equilibrium"],
      rows: [
        ["Value changing", "No", "No"],
        ["Movement", "Continuous, both directions", "Balanced, unforced"],
        ["Energy required", "Yes", "No"],
        ["Cut the energy", "The value drifts", "Nothing changes"],
        ["Example", "Plasma sodium at 140 mmol/L", "Dissolved sugar in water"]
      ],
      big: "The body is in steady state. It reaches equilibrium only when it dies."
    },

    /* 14 */
    {
      k: "cards",
      cols: 2,
      kicker: "Concept 3 . Predict, then check",
      h: "Potassium has read 4.0 for three days",
      lede: "Is more potassium crossing her cell membranes on day 3 than on day 1, less, or about the same? Decide, then open the card.",
      cards: [
        {
          label: "Answer",
          labelClass: "gold",
          h: "You cannot tell",
          p: ["An unchanged value tells you the rates in and out are equal. It says nothing about how large they are. Very little movement and a great deal of movement produce the same reading."]
        },
        {
          label: "The habit",
          labelClass: "terra",
          h: "Steady tells you about balance, not magnitude",
          p: ["The work being done to hold a value there is invisible in the value itself."]
        }
      ]
    },

    /* 15 */
    {
      k: "cards",
      cols: 4,
      kicker: "Concept 3 . Clinical",
      h: "Reference range and physiological reserve",
      lede: "Compensation can hold a variable inside its range while running near its limit.",
      cards: [
        { label: "In nursing", labelClass: "terra", h: "Serial values show trajectory", p: ["One measurement is a point estimate. Serial measurements give direction and rate of change, which identifies deterioration before the variable leaves its range."] },
        { label: "In rad tech", labelClass: "terra", h: "A creatinine inside the range is not a reserve check", p: ["Screening renal function before iodinated contrast tells you where the value sits today. It does not tell you how much renal reserve is left to handle the load you are about to give."] },
        { label: "In medicine", h: "Compensated acidosis with a near-normal pH", p: ["Arterial pH can sit close to the reference range while respiratory compensation runs near maximal. When the reserve is exhausted the change is abrupt, because there was nothing left to give."] },
        { label: "In respiratory therapy", h: "Saturation reports outcome, not work of breathing", p: ["Saturation can hold while the work of breathing rises substantially. It reflects the result of ventilation, not the effort required to produce it."] }
      ]
    },

    /* ================================================= CONCEPT 4 */
    /* 16 */
    {
      k: "title",
      variant: "teal",
      kicker: "Concept 4 of 13 . 4 slides",
      h: "Mass balance",
      lede: "A conservation rule. The amount of a substance changes only if the routes in and the routes out stop matching."
    },

    /* 17 */
    {
      k: "formula",
      kicker: "Concept 4 . The equation",
      h: "Accounting for a substance",
      eq: "amount in body  =  intake + production  -  excretion  -  metabolism",
      note: "Intake, what enters by mouth, vein or lungs. Production, what cells synthesize. Excretion, what leaves intact. Metabolism, what is converted into something else.",
      after: [
        "A substance is steady when everything adding to it is matched by everything removing it. If the amount is climbing, an input rose or an output fell, and the equation does not say which."
      ],
      covers: ["w1-mass-balance"]
    },

    /* 18 */
    {
      k: "work",
      kicker: "Concept 4 . Worked example",
      h: "Sodium across one day",
      given: "Total body sodium stable. Intake 4200 mg by mouth. Sweat 300 mg. Stool 100 mg. Urine 3800 mg. No intravenous input, no production, sodium is not metabolized.",
      steps: [
        "Inputs. 4200 mg intake plus 0 mg production, total 4200 mg.",
        "Outputs. 3800 urine plus 300 sweat plus 100 stool, total 4200 mg.",
        "Change. 4200 in minus 4200 out is zero. Total body sodium unchanged.",
        "Now change one term. She works outdoors and sweats 1200 mg instead of 300.",
        "If urinary sodium does not change, she finishes the day 900 mg down."
      ],
      ans: "Intake is set by what she ate, sweat by weather and activity, stool losses are small and fixed. The kidney is the only term with real range, which is why so much of this course is renal.",
      covers: ["w1-mass-balance"]
    },

    /* 19 */
    {
      k: "cards",
      cols: 2,
      kicker: "Concept 4 . Two routes out",
      h: "Excretion and metabolism",
      lede: "Both remove a substance from the equation. Only one means it left the body.",
      cards: [
        {
          label: "Excretion",
          labelClass: "teal",
          h: "The molecule exits intact",
          p: ["Urine, stool, sweat or expired air. Gone from the body and gone from the equation."]
        },
        {
          label: "Metabolism",
          labelClass: "terra",
          h: "The molecule is converted",
          p: ["Gone as itself, atoms still inside you. If a drug accumulates, ask whether the kidney stopped excreting it or the liver stopped converting it. Different organs, different tests, different management."]
        }
      ]
    },

    {
      k: "cards",
      cols: 4,
      kicker: 'Concept 4 . Clinical',
      h: 'Intake and output is mass balance',
      cards: [
        { label: 'In nursing', labelClass: "terra", h: 'The I and O chart is this equation', p: ['Every shift you are recording the input and output terms. A patient in positive balance day after day is the equation telling you something before the weight does.'] },
        { label: 'In rad tech', labelClass: "terra", h: 'Contrast has to leave', p: ['What goes in is cleared renally. In a patient whose kidneys are already struggling, the output term is the one that fails.'] },
        { label: 'In medicine', h: 'Accumulation has two possible causes', p: ['If a drug builds up, ask whether the kidney stopped excreting it or the liver stopped converting it. Different organ, different fix.'] },
        { label: 'In respiratory therapy', h: 'Carbon dioxide balance', p: ['Produced by metabolism, removed by ventilation. A rising level means production rose or ventilation fell, and the equation does not say which.'] }
      ]
    },

    /* ================================================= CONCEPT 5 */
    /* 20 */
    {
      k: "title",
      variant: "teal",
      kicker: "Concept 5 of 13 . 4 slides",
      h: "Mass flow and clearance",
      lede: "Mass balance says how much. These say how fast, and by whom."
    },

    /* 21 */
    {
      k: "formula",
      kicker: "Concept 5 . Mass flow",
      h: "Delivery per unit time",
      eq: "mass flow  =  concentration  x  volume flow",
      note: "Concentration, amount per volume, such as mg/mL. Volume flow, volume per time, such as mL/min. Volumes cancel, leaving amount per time.",
      after: [
        "Delivery depends on how much is in the blood and how fast the blood is moving. Change either and delivery changes."
      ]
    },

    /* 22 */
    {
      k: "work",
      kicker: "Concept 5 . Worked example",
      h: "Same oxygen content, different delivery",
      given: "Two patients, both with arterial oxygen content of 20 mL per 100 mL of blood, which is 200 mL per liter. Patient A has a cardiac output of 5.0 L/min. Patient B is in shock at 2.5 L/min.",
      steps: [
        "Patient A. 200 mL/L x 5.0 L/min = 1000 mL of oxygen delivered per minute.",
        "Patient B. 200 mL/L x 2.5 L/min = 500 mL of oxygen delivered per minute.",
        "Identical oxygen content. Half the delivery."
      ],
      ans: "Her blood gas and pulse oximetry can both look reassuring while her tissues receive half as much oxygen. Saturation is a concentration term, and there is no oximeter for cardiac output."
    },

    /* 23 */
    {
      k: "formula",
      kicker: "Concept 5 . Clearance",
      h: "Removal expressed as a volume",
      eq: "clearance  =  rate of removal  /  plasma concentration",
      note: "Rate of removal, amount per time, such as mg/min. Plasma concentration, amount per volume, such as mg/mL. Result is a volume per time, mL/min.",
      after: [
        "The volume is a construct. No particular milliliters are emptied. It scores how hard an organ works relative to how much substance is present, which is what makes organs and patients comparable."
      ]
    },

    {
      k: "cards",
      cols: 4,
      kicker: 'Concept 5 . Clinical',
      h: 'Concentration, flow and clearance',
      cards: [
        { label: 'In nursing', labelClass: "terra", h: 'A rising creatinine', p: ['Usually means clearance fell, not that the patient started producing more. That distinction changes what you do next.'] },
        { label: 'In rad tech', labelClass: "terra", h: 'Screening before contrast', p: ['An estimated filtration rate is a clearance number. It is asking how fast the kidney can remove the load you are about to give.'] },
        { label: 'In medicine', h: 'Delivery needs both terms', p: ['Oxygen content times cardiac output. A reassuring saturation with a halved cardiac output is half the delivery.'] },
        { label: 'In respiratory therapy', h: 'Ventilation is the flow term', p: ['Carbon dioxide removal is a clearance problem, and when ventilation falls the concentration climbs.'] }
      ]
    },

    /* ================================================= CONCEPT 6 */
    /* 24 */
    {
      k: "title",
      variant: "terra",
      kicker: "Concept 6 of 13 . 4 slides",
      h: "The components of a reflex pathway",
      lede: "Five components, in a fixed order. Learn them once and you can analyze any control system in the course."
    },

    /* 25 */
    {
      k: "fig",
      kicker: "Concept 6 . The pathway",
      h: "Five components and the feedback",
      svg: `<svg viewBox="0 0 760 350" role="img" aria-labelledby="loopT loopD">
  <title id="loopT">The five components of a reflex pathway</title>
  <desc id="loopD">A change in the regulated variable is detected by a sensor. An afferent pathway carries the input to an integrating center, which compares it against the setpoint. An efferent pathway carries the output to an effector. The effector produces a response, and that response feeds back on the regulated variable, closing the loop.</desc>
  <defs>
    <marker id="ar" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0 L10 5 L0 10 z" fill="#08101F"/></marker>
    <marker id="arg" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0 L10 5 L0 10 z" fill="#DCB45C"/></marker>
  </defs>
  <rect x="250" y="10" width="260" height="46" rx="8" fill="#EDF1F3" stroke="#08101F" stroke-width="2"/>
  <text x="380" y="32" text-anchor="middle" font-family="system-ui,sans-serif" font-size="14" font-weight="700" fill="#08101F">Regulated variable</text>
  <text x="380" y="49" text-anchor="middle" font-family="system-ui,sans-serif" font-size="12.5" fill="#3D4860">moves off setpoint</text>
  <line x1="380" y1="56" x2="380" y2="76" stroke="#08101F" stroke-width="2" marker-end="url(#ar)"/>
  <rect x="270" y="80" width="220" height="42" rx="8" fill="#FFFFFF" stroke="#1F4E55" stroke-width="2"/>
  <text x="380" y="106" text-anchor="middle" font-family="system-ui,sans-serif" font-size="14" font-weight="700" fill="#1F4E55">1. Sensor</text>
  <line x1="380" y1="122" x2="380" y2="146" stroke="#08101F" stroke-width="2" marker-end="url(#ar)"/>
  <text x="392" y="139" font-family="system-ui,sans-serif" font-size="12" font-weight="700" fill="#8B1D1D">2. afferent pathway</text>
  <rect x="250" y="150" width="260" height="60" rx="8" fill="#FFFFFF" stroke="#8B1D1D" stroke-width="2"/>
  <text x="380" y="172" text-anchor="middle" font-family="system-ui,sans-serif" font-size="14" font-weight="700" fill="#8B1D1D">3. Integrating center</text>
  <text x="380" y="192" text-anchor="middle" font-family="system-ui,sans-serif" font-size="12.5" fill="#3D4860">compares against the setpoint</text>
  <line x1="380" y1="210" x2="380" y2="234" stroke="#08101F" stroke-width="2" marker-end="url(#ar)"/>
  <text x="392" y="227" font-family="system-ui,sans-serif" font-size="12" font-weight="700" fill="#8B1D1D">4. efferent pathway</text>
  <rect x="270" y="238" width="220" height="42" rx="8" fill="#FFFFFF" stroke="#1F4E55" stroke-width="2"/>
  <text x="380" y="264" text-anchor="middle" font-family="system-ui,sans-serif" font-size="14" font-weight="700" fill="#1F4E55">5. Effector</text>
  <path d="M270 259 L120 259 L120 33 L250 33" fill="none" stroke="#DCB45C" stroke-width="2.5" marker-end="url(#arg)"/>
  <text x="128" y="155" font-family="system-ui,sans-serif" font-size="12.5" font-weight="700" fill="#5A4511">Response</text>
  <text x="128" y="173" font-family="system-ui,sans-serif" font-size="12" fill="#3D4860">closes the loop</text>
</svg>`,
      cap: "<b>The setpoint is a property of the integrating center, not a sixth component.</b> The gold arrow is what makes this a loop, not a chain.",
      covers: ["w1-feedback-components"]
    },

    /* 26 */
    {
      k: "rows",
      kicker: "Concept 6 . Worked through",
      h: "Thermoregulation on a cold day",
      rows: [
        { dot: "1", dotClass: "teal", h: "Sensor", p: ["Cold receptors in the skin, and thermosensitive neurons in the hypothalamus."] },
        { dot: "2", dotClass: "terra", h: "Afferent pathway", p: ["Sensory neurons carrying the input from the periphery to the hypothalamus."] },
        { dot: "3", dotClass: "terra", h: "Integrating center", p: ["The hypothalamus, comparing the input against a setpoint near 37 C (98.6 F)."] },
        { dot: "4", dotClass: "terra", h: "Efferent pathway", p: ["Somatic motor neurons to skeletal muscle, sympathetic fibers to cutaneous vessels."] },
        { dot: "5", dotClass: "teal", h: "Effector", p: ["Skeletal muscle shivering, cutaneous smooth muscle constricting."] },
        { dot: "6", dotClass: "gold", h: "Response closes the loop", p: ["Heat production rises, heat loss falls, core temperature returns, and the drive to shiver falls away."] }
      ],
      lab: "You will map these five components by hand for your own seeded patient, one pathway per week.",
      covers: ["w1-feedback-components"]
    },

    /* 27 */
    {
      k: "table",
      kicker: "Concept 6 . Points of failure",
      h: "Five components, five failures",
      caption: "Plus one situation that is not a component failure",
      cols: ["What fails", "What happens"],
      rows: [
        ["Sensor", "The change is never detected, so nothing downstream activates."],
        ["Afferent pathway", "Detected, and the input never reaches the integrating center."],
        ["Integrating center", "Input arrives and is compared against an inappropriate setpoint."],
        ["Efferent pathway", "Correct output generated, never reaches the effector."],
        ["Effector", "Signal arrives, tissue cannot produce the response."],
        ["Capacity exceeded", "Every component works. The disturbance is larger than the pathway can correct."]
      ]
    },

    {
      k: "cards",
      cols: 4,
      kicker: 'Concept 6 . Clinical',
      h: 'Localizing the failure',
      cards: [
        { label: 'In nursing', labelClass: "terra", h: 'No response is information', p: ['When an expected response does not happen, the useful question is which component. Was it detected, was the message sent, could the tissue act.'] },
        { label: 'In rad tech', labelClass: "terra", h: 'A patient who cannot follow breath hold', p: ['Heard it, understood it, could not do it. Those are three different components and they change how you get the study.'] },
        { label: 'In medicine', h: 'Where in the pathway', p: ['Much of the neurological exam is exactly this: separating a sensory failure from a conduction failure from an effector failure.'] },
        { label: 'In respiratory therapy', h: 'Drive, transmission, or muscle', p: ['A patient not breathing adequately has a problem in the chemoreceptors, the pathway, or the respiratory muscles. Support differs for each.'] }
      ]
    },

    /* ================================================= CONCEPT 7 */
    /* 28 */
    {
      k: "title",
      variant: "terra",
      kicker: "Concept 7 of 13 . 3 slides",
      h: "Local control and reflex control",
      lede: "Two scales, separated by how far the signal has to travel."
    },

    /* 29 */
    {
      k: "cards",
      cols: 2,
      kicker: "Concept 7 . Two scales",
      h: "Range of the signal",
      cards: [
        {
          label: "Local control",
          labelClass: "teal",
          h: "Correction happens in the tissue that detected the change",
          p: ["The signal travels a very short distance and the effect stays in that tissue."],
          list: [
            "A tissue short of oxygen releases substances that dilate its own arterioles.",
            "Nothing else in the body is informed."
          ]
        },
        {
          label: "Reflex control",
          labelClass: "terra",
          h: "A distant integrating center directs distant effectors",
          p: ["The five component pathway. It exists because some problems cannot be solved where they occur."],
          list: [
            "Signal travels by nerve or by blood.",
            "Coordinates organs that are nowhere near the change."
          ]
        }
      ],
      covers: ["w1-control-pathways"]
    },

    /* 30 */
    {
      k: "cards",
      cols: 2,
      kicker: "Concept 7 . Predict, then check",
      h: "You stand up quickly and blood pools in your legs",
      lede: "Is the correction that stops you fainting local control or reflex control? Decide, then open the card.",
      cards: [
        {
          label: "Answer",
          labelClass: "gold",
          h: "Reflex control",
          p: ["Baroreceptors in the large arteries detect the pressure fall, input goes to the brainstem, output returns to the heart and to vessels throughout the body."]
        },
        {
          label: "Why not local",
          labelClass: "terra",
          h: "The problem and the effector are in different places",
          p: ["The tissue with the problem is the brain. The tissues that have to change are the heart and the leg vessels. Local control cannot bridge that distance."]
        }
      ]
    },

    {
      k: "cards",
      cols: 4,
      kicker: 'Concept 7 . Clinical',
      h: 'Local and long distance corrections',
      cards: [
        { label: 'In nursing', labelClass: "terra", h: 'A cold, poorly perfused limb', p: ['Local control has already done what it can. If the limb is still cold, the problem is upstream and systemic.'] },
        { label: 'In rad tech', labelClass: "terra", h: 'Warmth and flushing with contrast', p: ['A local vascular response to the injection, not a systemic reaction. Knowing the difference is what keeps you calm and keeps the patient informed.'] },
        { label: 'In medicine', h: 'Distributive shock', p: ['Local control is working normally everywhere at once, and the systemic result is a pressure the reflex cannot hold.'] },
        { label: 'In respiratory therapy', h: 'Hypoxic pulmonary vasoconstriction', p: ['A local response, diverting blood from poorly ventilated lung. Give enough oxygen everywhere and you blunt the local matching.'] }
      ]
    },

    /* ================================================= CONCEPT 8 */
    /* 31 */
    {
      k: "title",
      variant: "terra",
      kicker: "Concept 8 of 13 . 4 slides",
      h: "Negative feedback",
      lede: "Negative means opposite, not harmful. The response opposes the change that triggered it."
    },

    /* 32 */
    {
      k: "rows",
      kicker: "Concept 8 . How it runs",
      h: "Detect, oppose, ease off",
      rows: [
        { dot: "1", dotClass: "terra", h: "The variable moves off setpoint", p: ["The pathway detects it."] },
        { dot: "2", dotClass: "terra", h: "The response drives it back", p: ["In the opposite direction to the change."] },
        { dot: "3", dotClass: "gold", h: "The stimulus weakens", p: ["As the variable returns, the drive on the sensor falls and the response eases off. The loop turns itself down as it succeeds, which is what makes it stable."] }
      ],
      covers: ["w1-feedback-types"]
    },

    /* 33 */
    {
      k: "work",
      kicker: "Concept 8 . Worked example",
      h: "Blood glucose after a meal",
      given: "You eat. Glucose is absorbed from the gut and blood glucose rises above its usual range.",
      steps: [
        "Sensor and integrating center. Beta cells in the pancreas detect the rise. Here the same cells do both.",
        "Efferent signal. They secrete insulin into the blood.",
        "Effectors. Muscle, adipose tissue and liver take glucose out of the blood and store it.",
        "Response. Blood glucose falls back toward its usual range.",
        "Self limiting step. As glucose falls, the stimulus on the beta cells fades and insulin secretion drops."
      ],
      ans: "Break the effector: if those cells stop responding to insulin, glucose stays high and insulin stays high. A high signal with the variable still wrong points at the effector. If the sensor had failed, the signal would be low."
    },

    /* 34 */
    {
      k: "cards",
      cols: 2,
      kicker: "Concept 8 . Oscillation",
      h: "Why the value wanders",
      lede: "A pathway cannot respond before it has detected something, and detection takes time.",
      cards: [
        {
          label: "The delay",
          labelClass: "terra",
          h: "Correction always arrives late",
          p: ["The variable drifts past the setpoint before the correction lands, then past it again on the way back. The value oscillates around the setpoint rather than sitting on it."]
        },
        {
          label: "What that means",
          labelClass: "gold",
          h: "A value moving inside its range is normal",
          p: ["A value pinned to exactly one number would be more suspicious than one that wanders."]
        }
      ]
    },

    {
      k: "cards",
      cols: 4,
      kicker: 'Concept 8 . Clinical',
      h: 'Reading a loop that is still running',
      cards: [
        { label: 'In nursing', labelClass: "terra", h: 'High insulin and high glucose together', p: ['The signal is being sent and the effector is not responding. Sensor failure would look like a low signal instead.'] },
        { label: 'In rad tech', labelClass: "terra", h: 'Thyroid and an iodine load', p: ['Thyroid hormone runs on a negative feedback loop with TSH. A large iodine load from contrast can disturb it, which is why thyroid history is asked.'] },
        { label: 'In medicine', h: 'Interpret the signal with the variable', p: ['A hormone level means nothing on its own. Read it next to the variable it is supposed to be controlling.'] },
        { label: 'In respiratory therapy', h: 'Carbon dioxide and drive', p: ['Rising carbon dioxide normally increases ventilation. A patient with a high level and no increase in effort has a loop that is not closing.'] }
      ]
    },

    /* ================================================= CONCEPT 9 */
    /* 35 */
    {
      k: "title",
      variant: "terra",
      kicker: "Concept 9 of 13 . 3 slides",
      h: "Positive feedback",
      lede: "The response increases the change that triggered it. The loop accelerates instead of settling."
    },

    /* 36 */
    {
      k: "cards",
      cols: 3,
      kicker: "Concept 9 . Where the body uses it",
      h: "Driven to completion, ended from outside",
      lede: "Nothing inside the loop opposes the change, so it cannot terminate itself.",
      cards: [
        {
          label: "The property",
          labelClass: "terra",
          h: "It runs until an outside event ends the situation",
          p: ["Useful for processes that must be driven to completion rather than held at a value. Dangerous whenever it starts by accident."]
        },
        {
          label: "Childbirth",
          labelClass: "teal",
          h: "Delivery ends it",
          p: ["Cervical stretch drives oxytocin release, contractions push the fetus down, stretch increases further."]
        },
        {
          label: "Clotting",
          labelClass: "teal",
          h: "The completed clot ends it",
          p: ["Activated clotting factors activate more clotting factors, so a small injury seals rapidly."]
        }
      ],
      covers: ["w1-feedback-types"]
    },

    /* 37 */
    {
      k: "cards",
      cols: 2,
      kicker: "Concept 9 . Predict, then check",
      h: "A failing heart, and the body's response to it",
      lede: "The heart pumps poorly, blood pressure falls, the body constricts vessels and raises heart rate. That increases cardiac work, so it pumps less well still. Which kind of feedback? Decide, then open the card.",
      cards: [
        {
          label: "Answer",
          labelClass: "gold",
          h: "Positive feedback",
          p: ["Each round makes the next worse, which is why decompensation accelerates rather than drifting."]
        },
        {
          label: "The part that matters",
          labelClass: "terra",
          h: "Every response in that sequence was normal",
          p: ["Constricting vessels and raising heart rate are ordinary negative feedback responses to a low blood pressure. They are appropriate to a problem this patient does not have, and applied to the one she does have they make it worse."]
        }
      ]
    },

    {
      k: "cards",
      cols: 4,
      kicker: 'Concept 9 . Clinical',
      h: 'When the loop makes it worse',
      cards: [
        { label: 'In nursing', labelClass: "terra", h: 'Deterioration accelerates', p: ['Positive feedback is why a patient who looked stable for hours goes off quickly. The change is not linear and waiting for the next set of vitals can cost you.'] },
        { label: 'In rad tech', labelClass: "terra", h: 'A reaction that escalates', p: ['Contrast reactions can amplify rather than settle. That is why observation after injection is not a formality.'] },
        { label: 'In medicine', h: 'The failing heart spiral', p: ['Vasoconstriction and tachycardia raise cardiac work, which worsens output, which drives more of both. Every step is an appropriate response.'] },
        { label: 'In respiratory therapy', h: 'Work of breathing feeding itself', p: ['Rising work raises carbon dioxide production, which demands more ventilation from muscles that are already tiring.'] }
      ]
    },

    /* ================================================= CONCEPT 10 */
    /* 38 */
    {
      k: "title",
      variant: "terra",
      kicker: "Concept 10 of 13 . 3 slides",
      h: "Feedforward, and setpoints that move",
      lede: "Feedback is always reactive. Something has to go wrong before there is anything to detect."
    },

    /* 39 */
    {
      k: "cards",
      cols: 2,
      kicker: "Concept 10 . Feedforward",
      h: "Responding before the variable changes",
      lede: "The body uses a cue that reliably predicts a coming disturbance.",
      cards: [
        {
          label: "Digestion",
          labelClass: "teal",
          h: "Saliva and gastric acid before anything is swallowed",
          p: ["Sight and smell of food start the response while the stomach is still empty."]
        },
        {
          label: "Exercise",
          labelClass: "teal",
          h: "Heart rate and ventilation rise as you begin",
          p: ["Not after the muscles have run short. Feedforward buys time, and feedback corrects whatever the anticipation got wrong."]
        }
      ],
      covers: ["w1-feedforward"]
    },

    /* 40 */
    {
      k: "rows",
      kicker: "Concept 10 . Moving setpoints",
      h: "Three ways the target changes",
      lede: "A pathway can work perfectly and hold a variable somewhere you did not expect.",
      rows: [
        { dot: "1", dotClass: "teal", h: "Biological rhythms", p: ["Core temperature and many hormones follow a daily cycle, so the setpoint at four in the morning is not the setpoint at four in the afternoon."] },
        { dot: "2", dotClass: "terra", h: "Fever", p: ["The hypothalamic setpoint is deliberately raised. The patient shivers because 37 C (98.6 F) now sits below target, which is why chills accompany a rising fever. Antipyretics work by lowering the setpoint, not by cooling the patient."] },
        { dot: "3", dotClass: "gold", h: "Acclimatization", p: ["Sustained exposure resets what the body defends, such as altitude changing the oxygen carrying capacity that gets maintained."] }
      ],
      covers: ["w1-feedforward"]
    },

    {
      k: "cards",
      cols: 4,
      kicker: 'Concept 10 . Clinical',
      h: 'The target can move',
      cards: [
        { label: 'In nursing', labelClass: "terra", h: 'Chills with a rising fever', p: ['The setpoint went up, so 37 C (98.6 F) now reads as cold. Cooling a patient whose setpoint is still raised just makes them shiver harder.'] },
        { label: 'In rad tech', labelClass: "terra", h: 'Time of day is not neutral', p: ['Some values follow a daily rhythm, so a result compared against one taken at a different hour is not always comparing like with like.'] },
        { label: 'In medicine', h: 'Treat the setpoint, not the number', p: ['Antipyretics work by lowering the raised setpoint. That is a different action from removing heat.'] },
        { label: 'In respiratory therapy', h: 'The chronic retainer', p: ['Someone who has lived with a high carbon dioxide level for years is defending a different baseline than someone who arrived there this morning.'] }
      ]
    },

    /* ================================================= CONCEPT 11 */
    /* 41 */
    {
      k: "title",
      variant: "teal",
      kicker: "Concept 11 of 13 . 3 slides",
      h: "How signals travel",
      lede: "A sensor with no route to an effector accomplishes nothing. Four ways cells communicate, organized by range."
    },

    /* 42 */
    {
      k: "rows",
      kicker: "Concept 11 . Four routes",
      h: "Organized by distance",
      rows: [
        { dot: "1", dotClass: "teal", h: "Direct contact", p: ["Molecules pass into a neighboring cell through connecting channels, or two cells touch and read each other's surface proteins. Range, cells that are touching."] },
        { dot: "2", dotClass: "teal", h: "Local chemical signals", p: ["Released into the surrounding fluid, broken down before they can travel. Range, a few cell widths."] },
        { dot: "3", dotClass: "terra", h: "Neural signals", p: ["An electrical signal travels the length of a neuron, then a chemical is released onto one target cell. Range, long, delivered to a single address."] },
        { dot: "4", dotClass: "terra", h: "Hormones", p: ["Released into the blood and carried everywhere. Only cells with the matching receptor respond. Range, the whole body."] }
      ]
    },

    /* 43 */
    {
      k: "table",
      kicker: "Concept 11 . The two long distance systems",
      h: "Nervous and endocrine",
      caption: "Same problem, opposite trade-offs",
      cols: ["", "Nervous", "Endocrine"],
      rows: [
        ["Route", "A fixed anatomical path", "Broadcast in the blood"],
        ["Receiver", "The cell at the end of the neuron", "Any cell expressing the receptor"],
        ["Onset", "Milliseconds", "Seconds to hours"],
        ["Duration", "Brief unless repeated", "Sustained"],
        ["Suited to", "Fast, precise, short term", "Widespread, sustained"]
      ],
      big: "A hormone reaches every cell. The receptor determines which ones answer."
    },

    {
      k: "cards",
      cols: 4,
      kicker: 'Concept 11 . Clinical',
      h: 'How the route changes the timing',
      cards: [
        { label: 'In nursing', labelClass: "terra", h: 'Route and onset', p: ['Intravenous, intramuscular and oral are three different delivery routes to the same receptor, and the difference you see at the bedside is timing.'] },
        { label: 'In rad tech', labelClass: "terra", h: 'Timing the scan to the contrast', p: ['The contrast is broadcast through the blood, so which phase you image depends entirely on when you scan after injection.'] },
        { label: 'In medicine', h: 'Targeted or systemic', p: ['A nerve block delivers to one address. A systemic drug broadcasts and lets receptor distribution decide, which is where side effects come from.'] },
        { label: 'In respiratory therapy', h: 'Nebulized against systemic', p: ['Delivering a drug to the airway directly puts it where the receptors are and limits what the rest of the body receives.'] }
      ]
    },

    /* ================================================= CONCEPT 12 */
    /* 44 */
    {
      k: "title",
      variant: "teal",
      kicker: "Concept 12 of 13 . 4 slides",
      h: "Receptors",
      lede: "Where they sit, what happens after binding, and the fact that they change. Transduction pathways come in the endocrine week."
    },

    /* 45 */
    {
      k: "cards",
      cols: 2,
      kicker: "Concept 12 . Location",
      h: "Solubility determines where the receptor sits",
      lede: "The membrane is largely lipid, so it passes lipid soluble molecules and blocks water soluble ones.",
      cards: [
        {
          label: "Water soluble signal",
          labelClass: "teal",
          h: "Receptor on the cell surface",
          p: ["Cannot cross the membrane, so it binds outside and the message is relayed inward."],
          list: [
            "Most hormones, all neurotransmitters.",
            "Fast, nothing has to be manufactured.",
            "Stops quickly once the signal is gone."
          ]
        },
        {
          label: "Lipid soluble signal",
          labelClass: "terra",
          h: "Receptor in the cytoplasm or nucleus",
          p: ["Crosses the membrane and usually alters which genes are transcribed."],
          list: [
            "Steroid and thyroid hormones.",
            "Slow, proteins have to be made.",
            "Persists after the signal has gone."
          ]
        }
      ]
    },

    /* 46 */
    {
      k: "cards",
      cols: 2,
      kicker: "Concept 12 . Amplification",
      h: "The relay multiplies at every step",
      cards: [
        {
          label: "The cascade",
          labelClass: "terra",
          h: "Receptor, relay molecule, enzyme, many messengers",
          p: ["Each step multiplies the one before it, so one bound molecule outside produces a large intracellular effect."]
        },
        {
          label: "The consequence",
          labelClass: "gold",
          h: "Picogram concentrations, whole body effects",
          p: ["This is why small changes in hormone concentration have clinical consequences out of proportion to the numbers."]
        }
      ]
    },

    /* 47 */
    {
      k: "rows",
      kicker: "Concept 12 . Modulation",
      h: "The target cell adjusts its own sensitivity",
      rows: [
        { dot: "+", dotClass: "teal", h: "Up regulation", p: ["A long period of scarce signal, so the cell adds receptors and becomes more sensitive."] },
        { dot: "-", dotClass: "terra", h: "Down regulation", p: ["A long period of high signal, so the cell removes receptors and responds less. One route to drug tolerance."] },
        { dot: "A", dotClass: "gold", h: "Agonist", p: ["Binds the receptor and produces the response the natural signal would."] },
        { dot: "B", dotClass: "gold", h: "Antagonist", p: ["Binds, produces no response, and blocks the natural signal. Beta blockers work this way, so the signal is still sent and the receptor no longer passes it on."] }
      ]
    },

    /* 48 */
    {
      k: "cards",
      cols: 4,
      kicker: "Concept 12 . Clinical",
      h: "Receptors are where most drugs act",
      cards: [
        { label: "In nursing", labelClass: "terra", h: "Tolerance is physiological", p: ["A patient needing more opioid for the same effect is often showing down regulation rather than drug seeking."] },
        { label: "In rad tech", labelClass: "terra", h: "Beta blockers and contrast reactions", p: ["A patient on a beta blocker who reacts to contrast can respond poorly to epinephrine, because the receptors epinephrine works through are occupied. The drug is being given correctly and the receptor is not available."] },
        { label: "In medicine", h: "Normal hormone level, abnormal response", p: ["When the receptors change rather than the signal, the concentration you measure is not the thing that is wrong."] },
        { label: "In respiratory therapy", h: "Overused bronchodilators", p: ["An agonist at receptors on airway smooth muscle. Overuse can down regulate them, which is why a rescue inhaler can seem to stop working."] }
      ]
    },

    /* ================================================= CONCEPT 13 */
    /* 49 */
    {
      k: "title",
      variant: "teal",
      kicker: "Concept 13 of 13 . 3 slides",
      h: "Doing physiology as a science",
      lede: "Everything in this lecture came from an experiment, and experiments can be done badly."
    },

    /* 50 */
    {
      k: "rows",
      kicker: "Concept 13 . Experimental design",
      h: "What a usable experiment needs",
      rows: [
        { dot: "1", dotClass: "teal", h: "One thing changed on purpose", p: ["The independent variable. If two changed, the result cannot be attributed to either."] },
        { dot: "2", dotClass: "teal", h: "One thing measured", p: ["The dependent variable. Decide how before you start, not after you see the data."] },
        { dot: "3", dotClass: "terra", h: "A control group", p: ["Identical except for the one variable. Without it you have a description, not a comparison."] },
        { dot: "4", dotClass: "terra", h: "Enough subjects", p: ["Biological variation is large. One result is an anecdote."] },
        { dot: "5", dotClass: "gold", h: "Repeatability", p: ["A finding that happens once in one laboratory is not yet knowledge."] }
      ],
      lab: "You will design and run a small experiment this term, including choosing your control and defending your sample size.",
      covers: ["w1-lab-experimental-design"]
    },

    /* 51 */
    {
      k: "cards",
      cols: 2,
      kicker: "Concept 13 . Variation",
      h: "Two values that differ may not mean anything",
      lede: "Her potassium read 4.0, then 4.2, then 4.1. Her sodium read 141, then 134, then 128.",
      cards: [
        {
          label: "Sources of noise",
          labelClass: "terra",
          h: "The instrument, and the person using it",
          p: ["On top of that, the same healthy person genuinely varies hour to hour."]
        },
        {
          label: "The question to ask",
          labelClass: "gold",
          h: "Is the difference larger than the usual variation?",
          p: ["The potassium movement is smaller than ordinary measurement variation, so it did not change. The sodium movement is not something measurement error would produce. Same panel, two different conclusions."]
        }
      ],
      covers: ["w1-lab-measurement-error"]
    },

    {
      k: "cards",
      cols: 4,
      kicker: 'Concept 13 . Clinical',
      h: 'Is the difference real',
      cards: [
        { label: 'In nursing', labelClass: "terra", h: 'One reading is not a trend', p: ['Before you escalate on a single value, ask whether it differs from the last by more than the measurement normally wanders.'] },
        { label: 'In rad tech', labelClass: "terra", h: 'Comparing studies', p: ['A change between two images is only meaningful if positioning, technique and timing were comparable. Otherwise you are measuring the setup.'] },
        { label: 'In medicine', h: 'Establish the difference first', p: ['Before you explain why a value changed, confirm that it changed by more than ordinary biological and measurement variation.'] },
        { label: 'In respiratory therapy', h: 'Know your device error', p: ['Every monitor has a margin. A change smaller than that margin is not yet a change in the patient.'] }
      ]
    },

    /* ================================================= CLOSE */
    /* 52 */
    {
      k: "activity",
      kicker: "Close . Predict",
      h: "Six disturbances",
      lede: "Take one. Do not look up organ systems, you have not been taught them. Say what a working body would sense, what message it would send, what it would change, and what would power that change.",
      listLabel: "Pick one",
      list: [
        "You run up a flight of stairs.",
        "You walk outside on a day at 38 C (100.4 F).",
        "You eat a very large meal.",
        "You have not had a drink since yesterday.",
        "You stand up suddenly.",
        "You arrive at a cabin at 9000 feet."
      ]
    },

    /* 53 */
    {
      k: "activity",
      kicker: "Close . Perturb",
      h: "Same disturbance, one component disabled",
      lede: "Say what happens now, and what you would expect to see in front of you.",
      listLabel: "Disable one",
      list: [
        "The sensor cannot detect the change.",
        "The afferent pathway cannot carry the input.",
        "The setpoint has shifted.",
        "The efferent pathway cannot reach the effector.",
        "The effector cannot generate a full response.",
        "Everything works, and the disturbance is twice what the pathway was built for."
      ]
    },

    /* 54 */
    {
      k: "hook",
      kicker: "Close . Back to the mission",
      h: "Return to your patient",
      hook: {
        icon: "!",
        iconClass: "terra",
        label: "What to hand in",
        h: "Write the five components for the variable that is drifting.",
        say: "You have the vocabulary you were missing at the start.",
        p: [
          "Mark clearly what you are assuming as against what you were told. Name the component you think failed, and say what evidence would change your mind."
        ]
      },
      big: "Most of the credit is in the reasoning, not the conclusion."
    },

    /* 55 */
    {
      k: "close",
      kicker: "Mission 1 . Close",
      h: "What to carry into next week",
      list: [
        "A steady value is being actively held, and holding it costs energy.",
        "Steady means two rates are matched, and says nothing about how large they are.",
        "Every reflex pathway: sensor, afferent pathway, integrating center holding a setpoint, efferent pathway, effector. The response closes the loop.",
        "A signal goes to one address or is broadcast, and the receptor determines who responds.",
        "Negative feedback opposes change and stops itself. Positive feedback amplifies change and needs an outside event to end it."
      ]
    }

  ]
};
