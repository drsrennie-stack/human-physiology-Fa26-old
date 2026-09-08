/* BIO 005 Human Physiology, Week 2, Unit 1.
   Deck P, first of three for "How things get in and out of a cell".
   Membrane structure, permeability, Fick's law, osmolarity, tonicity,
   osmosis and cell volume. Carries the Kofi M. case forward from Week 1.
   Dr. Sharilyn Rennie */

module.exports = {
  id: "slides-p-membrane-structure-and-diffusion",
  letter: "P",
  type: "Physiology",
  week: 2,
  unit: 1,
  topic: "Membrane Structure and Diffusion",
  title: "The membrane, and what gets across it on its own",
  subtitle: "What the membrane is made of, what crosses it without any help, and which way the water goes.",

  slides: [

/* 1 ------------------------------------------------------------------ */
{
  k: "title",
  variant: "terra",
  kicker: "Week 2 . Unit 1 . The first of three decks this week",
  h: "The membrane, and what gets across it on its own",
  lede: "This week is about how things get in and out of a cell. Today is the first third of it. We build the membrane, work out what can cross it with no help from anything, and then follow the water. Kofi is still with us from last week, and by the end of this hour you should be able to say what any bag of fluid in the hospital does to a red cell, and why.",
  terms: [
    {t:"Fluid mosaic", c:"t"},
    {t:"Permeability", c:"l"},
    {t:"Fick's law", c:"g"},
    {t:"Osmolarity", c:"t"},
    {t:"Tonicity", c:"l"},
    {t:"Hemolysis", c:"g"}
  ],
  big: "Dr. Sharilyn Rennie . BIO 005 Human Physiology"
},

/* 2 ------------------------------------------------------------------ */
{
  k: "cards",
  kicker: "Where we are going",
  h: "Three questions, and everything today is one of them",
  lede: "Open a box to see what is inside it. You do not need to memorize this slide. You need to know which of the three questions you are in the middle of at any given moment.",
  cols: 3,
  cards: [
    { label: "One", labelClass: "terra",
      h: "What is this thing actually made of?",
      p: ["A double sheet of phospholipid with cholesterol wedged in it, sugar chains hanging off the outside, and proteins floating in it like boats. That description has a name, and the whole point of the name is that the sheet is not solid.",
          "Structure first, because every rule that follows comes out of it."] },
    { label: "Two", labelClass: "terra",
      h: "What can get through without any help at all?",
      p: ["Three properties decide it: how big the molecule is, whether it carries a charge, and whether it dissolves in fat. Get those three right and you can rank anything.",
          "Then we put a number on the rate with Fick's law, and use it on a lung."] },
    { label: "Three", labelClass: "terra",
      h: "Which way does the water go, and how much of it?",
      p: ["Water crosses almost everywhere, and it never decides anything for itself. It follows solute. So the real question is always which solute is stuck on which side.",
          "That question is called tonicity, and it is the one people get wrong."] }
  ],
  big: "Structure, then permeability, then water. In that order, every time."
},

/* 3 ------------------------------------------------------------------ */
{
  k: "text",
  kicker: "The case",
  h: "Kofi is still losing water, and now you go down to the membrane",
  lede: "Kofi M. is 24. Last week you measured how much water he lost and watched his body fight to hold his blood pressure up. You worked at the level of the whole body: liters in, liters out, compartments.",
  body: [
    "This week you go to the place where the water actually crossed. That clear rice water stool is not random. A toxin has locked a chloride channel open in the lining of his gut, chloride pours into the lumen, and water follows the salt out of him. Nobody pumped the water. It went because the solute went.",
    "The cure is the same physics running the other way. Oral rehydration therapy puts salt and sugar in the same glass because one transporter carries them in together, and where the sodium goes the water follows. It is the most elegant application of membrane transport in all of medicine and it costs almost nothing.",
    "You cannot follow either half of that story until you can say what the membrane is and what crosses it. So that is today."
  ],
  big: "Every fluid problem you will ever see is a membrane problem with a person attached to it."
},

/* 4 ------------------------------------------------------------------ */
{
  k: "fig",
  kicker: "Membrane structure",
  h: "The fluid mosaic, drawn in cross section",
  lede: "This is the picture to be able to draw from memory by Friday. Two rows of phospholipid, heads out toward the water, oily tails meeting in the middle, and proteins sitting in it or on it.",
  svg: "<svg viewBox=\"0 0 900 470\" role=\"img\" aria-labelledby=\"x1-t x1-d\"><title id=\"x1-t\">The fluid mosaic membrane in cross section</title><desc id=\"x1-d\">A cross section of a plasma membrane about seven nanometers thick. Two rows of round phospholipid heads face the watery fluid, one row pointing up into the fluid outside the cell and one row pointing down into the cytosol inside. Their two fatty acid tails point inward and meet in the middle, forming an oily core. Two gold rod shapes wedged between the tails are cholesterol. A dark red block spans the full thickness of the membrane and carries a short chain of sugars on its outer face, an integral protein. A teal pair of blocks with a gap down the middle also spans the membrane, a channel with an open pore. A gray rounded block rests against the inner surface only and does not enter the oily core, a peripheral protein. On the far right one head group carries a branching chain of sugars, a glycolipid.</desc><rect x=\"0\" y=\"0\" width=\"900\" height=\"126\" fill=\"#EDF1F3\"/><rect x=\"0\" y=\"344\" width=\"900\" height=\"126\" fill=\"#EDF1F3\"/><text x=\"18\" y=\"30\" font-family=\"Plus Jakarta Sans, sans-serif\" font-size=\"15\" font-weight=\"700\" fill=\"#0B1530\">Outside the cell, watery</text><text x=\"18\" y=\"440\" font-family=\"Plus Jakarta Sans, sans-serif\" font-size=\"15\" font-weight=\"700\" fill=\"#0B1530\">Inside the cell, watery</text><line x1=\"62\" y1=\"161\" x2=\"59\" y2=\"228\" stroke=\"#3D4860\" stroke-width=\"2.5\" stroke-linecap=\"round\"/><line x1=\"70\" y1=\"161\" x2=\"73\" y2=\"228\" stroke=\"#3D4860\" stroke-width=\"2.5\" stroke-linecap=\"round\"/><circle cx=\"66\" cy=\"150\" r=\"12\" fill=\"#C9A14A\" stroke=\"#0B1530\" stroke-width=\"2\"/><line x1=\"100\" y1=\"161\" x2=\"97\" y2=\"228\" stroke=\"#3D4860\" stroke-width=\"2.5\" stroke-linecap=\"round\"/><line x1=\"108\" y1=\"161\" x2=\"111\" y2=\"228\" stroke=\"#3D4860\" stroke-width=\"2.5\" stroke-linecap=\"round\"/><circle cx=\"104\" cy=\"150\" r=\"12\" fill=\"#C9A14A\" stroke=\"#0B1530\" stroke-width=\"2\"/><line x1=\"138\" y1=\"161\" x2=\"135\" y2=\"228\" stroke=\"#3D4860\" stroke-width=\"2.5\" stroke-linecap=\"round\"/><line x1=\"146\" y1=\"161\" x2=\"149\" y2=\"228\" stroke=\"#3D4860\" stroke-width=\"2.5\" stroke-linecap=\"round\"/><circle cx=\"142\" cy=\"150\" r=\"12\" fill=\"#C9A14A\" stroke=\"#0B1530\" stroke-width=\"2\"/><line x1=\"176\" y1=\"161\" x2=\"173\" y2=\"228\" stroke=\"#3D4860\" stroke-width=\"2.5\" stroke-linecap=\"round\"/><line x1=\"184\" y1=\"161\" x2=\"187\" y2=\"228\" stroke=\"#3D4860\" stroke-width=\"2.5\" stroke-linecap=\"round\"/><circle cx=\"180\" cy=\"150\" r=\"12\" fill=\"#C9A14A\" stroke=\"#0B1530\" stroke-width=\"2\"/><line x1=\"214\" y1=\"161\" x2=\"211\" y2=\"228\" stroke=\"#3D4860\" stroke-width=\"2.5\" stroke-linecap=\"round\"/><line x1=\"222\" y1=\"161\" x2=\"225\" y2=\"228\" stroke=\"#3D4860\" stroke-width=\"2.5\" stroke-linecap=\"round\"/><circle cx=\"218\" cy=\"150\" r=\"12\" fill=\"#C9A14A\" stroke=\"#0B1530\" stroke-width=\"2\"/><line x1=\"252\" y1=\"161\" x2=\"249\" y2=\"228\" stroke=\"#3D4860\" stroke-width=\"2.5\" stroke-linecap=\"round\"/><line x1=\"260\" y1=\"161\" x2=\"263\" y2=\"228\" stroke=\"#3D4860\" stroke-width=\"2.5\" stroke-linecap=\"round\"/><circle cx=\"256\" cy=\"150\" r=\"12\" fill=\"#C9A14A\" stroke=\"#0B1530\" stroke-width=\"2\"/><line x1=\"366\" y1=\"161\" x2=\"363\" y2=\"228\" stroke=\"#3D4860\" stroke-width=\"2.5\" stroke-linecap=\"round\"/><line x1=\"374\" y1=\"161\" x2=\"377\" y2=\"228\" stroke=\"#3D4860\" stroke-width=\"2.5\" stroke-linecap=\"round\"/><circle cx=\"370\" cy=\"150\" r=\"12\" fill=\"#C9A14A\" stroke=\"#0B1530\" stroke-width=\"2\"/><line x1=\"404\" y1=\"161\" x2=\"401\" y2=\"228\" stroke=\"#3D4860\" stroke-width=\"2.5\" stroke-linecap=\"round\"/><line x1=\"412\" y1=\"161\" x2=\"415\" y2=\"228\" stroke=\"#3D4860\" stroke-width=\"2.5\" stroke-linecap=\"round\"/><circle cx=\"408\" cy=\"150\" r=\"12\" fill=\"#C9A14A\" stroke=\"#0B1530\" stroke-width=\"2\"/><line x1=\"442\" y1=\"161\" x2=\"439\" y2=\"228\" stroke=\"#3D4860\" stroke-width=\"2.5\" stroke-linecap=\"round\"/><line x1=\"450\" y1=\"161\" x2=\"453\" y2=\"228\" stroke=\"#3D4860\" stroke-width=\"2.5\" stroke-linecap=\"round\"/><circle cx=\"446\" cy=\"150\" r=\"12\" fill=\"#C9A14A\" stroke=\"#0B1530\" stroke-width=\"2\"/><line x1=\"480\" y1=\"161\" x2=\"477\" y2=\"228\" stroke=\"#3D4860\" stroke-width=\"2.5\" stroke-linecap=\"round\"/><line x1=\"488\" y1=\"161\" x2=\"491\" y2=\"228\" stroke=\"#3D4860\" stroke-width=\"2.5\" stroke-linecap=\"round\"/><circle cx=\"484\" cy=\"150\" r=\"12\" fill=\"#C9A14A\" stroke=\"#0B1530\" stroke-width=\"2\"/><line x1=\"518\" y1=\"161\" x2=\"515\" y2=\"228\" stroke=\"#3D4860\" stroke-width=\"2.5\" stroke-linecap=\"round\"/><line x1=\"526\" y1=\"161\" x2=\"529\" y2=\"228\" stroke=\"#3D4860\" stroke-width=\"2.5\" stroke-linecap=\"round\"/><circle cx=\"522\" cy=\"150\" r=\"12\" fill=\"#C9A14A\" stroke=\"#0B1530\" stroke-width=\"2\"/><line x1=\"556\" y1=\"161\" x2=\"553\" y2=\"228\" stroke=\"#3D4860\" stroke-width=\"2.5\" stroke-linecap=\"round\"/><line x1=\"564\" y1=\"161\" x2=\"567\" y2=\"228\" stroke=\"#3D4860\" stroke-width=\"2.5\" stroke-linecap=\"round\"/><circle cx=\"560\" cy=\"150\" r=\"12\" fill=\"#C9A14A\" stroke=\"#0B1530\" stroke-width=\"2\"/><line x1=\"670\" y1=\"161\" x2=\"667\" y2=\"228\" stroke=\"#3D4860\" stroke-width=\"2.5\" stroke-linecap=\"round\"/><line x1=\"678\" y1=\"161\" x2=\"681\" y2=\"228\" stroke=\"#3D4860\" stroke-width=\"2.5\" stroke-linecap=\"round\"/><circle cx=\"674\" cy=\"150\" r=\"12\" fill=\"#C9A14A\" stroke=\"#0B1530\" stroke-width=\"2\"/><line x1=\"708\" y1=\"161\" x2=\"705\" y2=\"228\" stroke=\"#3D4860\" stroke-width=\"2.5\" stroke-linecap=\"round\"/><line x1=\"716\" y1=\"161\" x2=\"719\" y2=\"228\" stroke=\"#3D4860\" stroke-width=\"2.5\" stroke-linecap=\"round\"/><circle cx=\"712\" cy=\"150\" r=\"12\" fill=\"#C9A14A\" stroke=\"#0B1530\" stroke-width=\"2\"/><line x1=\"746\" y1=\"161\" x2=\"743\" y2=\"228\" stroke=\"#3D4860\" stroke-width=\"2.5\" stroke-linecap=\"round\"/><line x1=\"754\" y1=\"161\" x2=\"757\" y2=\"228\" stroke=\"#3D4860\" stroke-width=\"2.5\" stroke-linecap=\"round\"/><circle cx=\"750\" cy=\"150\" r=\"12\" fill=\"#C9A14A\" stroke=\"#0B1530\" stroke-width=\"2\"/><line x1=\"784\" y1=\"161\" x2=\"781\" y2=\"228\" stroke=\"#3D4860\" stroke-width=\"2.5\" stroke-linecap=\"round\"/><line x1=\"792\" y1=\"161\" x2=\"795\" y2=\"228\" stroke=\"#3D4860\" stroke-width=\"2.5\" stroke-linecap=\"round\"/><circle cx=\"788\" cy=\"150\" r=\"12\" fill=\"#C9A14A\" stroke=\"#0B1530\" stroke-width=\"2\"/><line x1=\"822\" y1=\"161\" x2=\"819\" y2=\"228\" stroke=\"#3D4860\" stroke-width=\"2.5\" stroke-linecap=\"round\"/><line x1=\"830\" y1=\"161\" x2=\"833\" y2=\"228\" stroke=\"#3D4860\" stroke-width=\"2.5\" stroke-linecap=\"round\"/><circle cx=\"826\" cy=\"150\" r=\"12\" fill=\"#C9A14A\" stroke=\"#0B1530\" stroke-width=\"2\"/><line x1=\"860\" y1=\"161\" x2=\"857\" y2=\"228\" stroke=\"#3D4860\" stroke-width=\"2.5\" stroke-linecap=\"round\"/><line x1=\"868\" y1=\"161\" x2=\"871\" y2=\"228\" stroke=\"#3D4860\" stroke-width=\"2.5\" stroke-linecap=\"round\"/><circle cx=\"864\" cy=\"150\" r=\"12\" fill=\"#C9A14A\" stroke=\"#0B1530\" stroke-width=\"2\"/><line x1=\"62\" y1=\"299\" x2=\"59\" y2=\"232\" stroke=\"#3D4860\" stroke-width=\"2.5\" stroke-linecap=\"round\"/><line x1=\"70\" y1=\"299\" x2=\"73\" y2=\"232\" stroke=\"#3D4860\" stroke-width=\"2.5\" stroke-linecap=\"round\"/><circle cx=\"66\" cy=\"310\" r=\"12\" fill=\"#C9A14A\" stroke=\"#0B1530\" stroke-width=\"2\"/><line x1=\"100\" y1=\"299\" x2=\"97\" y2=\"232\" stroke=\"#3D4860\" stroke-width=\"2.5\" stroke-linecap=\"round\"/><line x1=\"108\" y1=\"299\" x2=\"111\" y2=\"232\" stroke=\"#3D4860\" stroke-width=\"2.5\" stroke-linecap=\"round\"/><circle cx=\"104\" cy=\"310\" r=\"12\" fill=\"#C9A14A\" stroke=\"#0B1530\" stroke-width=\"2\"/><line x1=\"138\" y1=\"299\" x2=\"135\" y2=\"232\" stroke=\"#3D4860\" stroke-width=\"2.5\" stroke-linecap=\"round\"/><line x1=\"146\" y1=\"299\" x2=\"149\" y2=\"232\" stroke=\"#3D4860\" stroke-width=\"2.5\" stroke-linecap=\"round\"/><circle cx=\"142\" cy=\"310\" r=\"12\" fill=\"#C9A14A\" stroke=\"#0B1530\" stroke-width=\"2\"/><line x1=\"176\" y1=\"299\" x2=\"173\" y2=\"232\" stroke=\"#3D4860\" stroke-width=\"2.5\" stroke-linecap=\"round\"/><line x1=\"184\" y1=\"299\" x2=\"187\" y2=\"232\" stroke=\"#3D4860\" stroke-width=\"2.5\" stroke-linecap=\"round\"/><circle cx=\"180\" cy=\"310\" r=\"12\" fill=\"#C9A14A\" stroke=\"#0B1530\" stroke-width=\"2\"/><line x1=\"214\" y1=\"299\" x2=\"211\" y2=\"232\" stroke=\"#3D4860\" stroke-width=\"2.5\" stroke-linecap=\"round\"/><line x1=\"222\" y1=\"299\" x2=\"225\" y2=\"232\" stroke=\"#3D4860\" stroke-width=\"2.5\" stroke-linecap=\"round\"/><circle cx=\"218\" cy=\"310\" r=\"12\" fill=\"#C9A14A\" stroke=\"#0B1530\" stroke-width=\"2\"/><line x1=\"252\" y1=\"299\" x2=\"249\" y2=\"232\" stroke=\"#3D4860\" stroke-width=\"2.5\" stroke-linecap=\"round\"/><line x1=\"260\" y1=\"299\" x2=\"263\" y2=\"232\" stroke=\"#3D4860\" stroke-width=\"2.5\" stroke-linecap=\"round\"/><circle cx=\"256\" cy=\"310\" r=\"12\" fill=\"#C9A14A\" stroke=\"#0B1530\" stroke-width=\"2\"/><line x1=\"366\" y1=\"299\" x2=\"363\" y2=\"232\" stroke=\"#3D4860\" stroke-width=\"2.5\" stroke-linecap=\"round\"/><line x1=\"374\" y1=\"299\" x2=\"377\" y2=\"232\" stroke=\"#3D4860\" stroke-width=\"2.5\" stroke-linecap=\"round\"/><circle cx=\"370\" cy=\"310\" r=\"12\" fill=\"#C9A14A\" stroke=\"#0B1530\" stroke-width=\"2\"/><line x1=\"404\" y1=\"299\" x2=\"401\" y2=\"232\" stroke=\"#3D4860\" stroke-width=\"2.5\" stroke-linecap=\"round\"/><line x1=\"412\" y1=\"299\" x2=\"415\" y2=\"232\" stroke=\"#3D4860\" stroke-width=\"2.5\" stroke-linecap=\"round\"/><circle cx=\"408\" cy=\"310\" r=\"12\" fill=\"#C9A14A\" stroke=\"#0B1530\" stroke-width=\"2\"/><line x1=\"442\" y1=\"299\" x2=\"439\" y2=\"232\" stroke=\"#3D4860\" stroke-width=\"2.5\" stroke-linecap=\"round\"/><line x1=\"450\" y1=\"299\" x2=\"453\" y2=\"232\" stroke=\"#3D4860\" stroke-width=\"2.5\" stroke-linecap=\"round\"/><circle cx=\"446\" cy=\"310\" r=\"12\" fill=\"#C9A14A\" stroke=\"#0B1530\" stroke-width=\"2\"/><line x1=\"480\" y1=\"299\" x2=\"477\" y2=\"232\" stroke=\"#3D4860\" stroke-width=\"2.5\" stroke-linecap=\"round\"/><line x1=\"488\" y1=\"299\" x2=\"491\" y2=\"232\" stroke=\"#3D4860\" stroke-width=\"2.5\" stroke-linecap=\"round\"/><circle cx=\"484\" cy=\"310\" r=\"12\" fill=\"#C9A14A\" stroke=\"#0B1530\" stroke-width=\"2\"/><line x1=\"518\" y1=\"299\" x2=\"515\" y2=\"232\" stroke=\"#3D4860\" stroke-width=\"2.5\" stroke-linecap=\"round\"/><line x1=\"526\" y1=\"299\" x2=\"529\" y2=\"232\" stroke=\"#3D4860\" stroke-width=\"2.5\" stroke-linecap=\"round\"/><circle cx=\"522\" cy=\"310\" r=\"12\" fill=\"#C9A14A\" stroke=\"#0B1530\" stroke-width=\"2\"/><line x1=\"556\" y1=\"299\" x2=\"553\" y2=\"232\" stroke=\"#3D4860\" stroke-width=\"2.5\" stroke-linecap=\"round\"/><line x1=\"564\" y1=\"299\" x2=\"567\" y2=\"232\" stroke=\"#3D4860\" stroke-width=\"2.5\" stroke-linecap=\"round\"/><circle cx=\"560\" cy=\"310\" r=\"12\" fill=\"#C9A14A\" stroke=\"#0B1530\" stroke-width=\"2\"/><line x1=\"670\" y1=\"299\" x2=\"667\" y2=\"232\" stroke=\"#3D4860\" stroke-width=\"2.5\" stroke-linecap=\"round\"/><line x1=\"678\" y1=\"299\" x2=\"681\" y2=\"232\" stroke=\"#3D4860\" stroke-width=\"2.5\" stroke-linecap=\"round\"/><circle cx=\"674\" cy=\"310\" r=\"12\" fill=\"#C9A14A\" stroke=\"#0B1530\" stroke-width=\"2\"/><line x1=\"708\" y1=\"299\" x2=\"705\" y2=\"232\" stroke=\"#3D4860\" stroke-width=\"2.5\" stroke-linecap=\"round\"/><line x1=\"716\" y1=\"299\" x2=\"719\" y2=\"232\" stroke=\"#3D4860\" stroke-width=\"2.5\" stroke-linecap=\"round\"/><circle cx=\"712\" cy=\"310\" r=\"12\" fill=\"#C9A14A\" stroke=\"#0B1530\" stroke-width=\"2\"/><line x1=\"746\" y1=\"299\" x2=\"743\" y2=\"232\" stroke=\"#3D4860\" stroke-width=\"2.5\" stroke-linecap=\"round\"/><line x1=\"754\" y1=\"299\" x2=\"757\" y2=\"232\" stroke=\"#3D4860\" stroke-width=\"2.5\" stroke-linecap=\"round\"/><circle cx=\"750\" cy=\"310\" r=\"12\" fill=\"#C9A14A\" stroke=\"#0B1530\" stroke-width=\"2\"/><line x1=\"784\" y1=\"299\" x2=\"781\" y2=\"232\" stroke=\"#3D4860\" stroke-width=\"2.5\" stroke-linecap=\"round\"/><line x1=\"792\" y1=\"299\" x2=\"795\" y2=\"232\" stroke=\"#3D4860\" stroke-width=\"2.5\" stroke-linecap=\"round\"/><circle cx=\"788\" cy=\"310\" r=\"12\" fill=\"#C9A14A\" stroke=\"#0B1530\" stroke-width=\"2\"/><line x1=\"822\" y1=\"299\" x2=\"819\" y2=\"232\" stroke=\"#3D4860\" stroke-width=\"2.5\" stroke-linecap=\"round\"/><line x1=\"830\" y1=\"299\" x2=\"833\" y2=\"232\" stroke=\"#3D4860\" stroke-width=\"2.5\" stroke-linecap=\"round\"/><circle cx=\"826\" cy=\"310\" r=\"12\" fill=\"#C9A14A\" stroke=\"#0B1530\" stroke-width=\"2\"/><line x1=\"860\" y1=\"299\" x2=\"857\" y2=\"232\" stroke=\"#3D4860\" stroke-width=\"2.5\" stroke-linecap=\"round\"/><line x1=\"868\" y1=\"299\" x2=\"871\" y2=\"232\" stroke=\"#3D4860\" stroke-width=\"2.5\" stroke-linecap=\"round\"/><circle cx=\"864\" cy=\"310\" r=\"12\" fill=\"#C9A14A\" stroke=\"#0B1530\" stroke-width=\"2\"/><rect x=\"764\" y=\"168\" width=\"10\" height=\"46\" rx=\"5\" fill=\"#C9A14A\" stroke=\"#0B1530\" stroke-width=\"2\"/><rect x=\"726\" y=\"246\" width=\"10\" height=\"46\" rx=\"5\" fill=\"#C9A14A\" stroke=\"#0B1530\" stroke-width=\"2\"/><rect x=\"272\" y=\"136\" width=\"82\" height=\"188\" rx=\"16\" fill=\"#8B3A2E\" stroke=\"#0B1530\" stroke-width=\"2\"/><circle cx=\"300\" cy=\"116\" r=\"9\" fill=\"#FFFFFF\" stroke=\"#0B1530\" stroke-width=\"2\"/><circle cx=\"286\" cy=\"94\" r=\"9\" fill=\"#FFFFFF\" stroke=\"#0B1530\" stroke-width=\"2\"/><circle cx=\"312\" cy=\"84\" r=\"9\" fill=\"#FFFFFF\" stroke=\"#0B1530\" stroke-width=\"2\"/><line x1=\"300\" y1=\"136\" x2=\"300\" y2=\"125\" stroke=\"#0B1530\" stroke-width=\"2\"/><rect x=\"576\" y=\"136\" width=\"30\" height=\"188\" rx=\"13\" fill=\"#1F4E55\" stroke=\"#0B1530\" stroke-width=\"2\"/><rect x=\"630\" y=\"136\" width=\"30\" height=\"188\" rx=\"13\" fill=\"#1F4E55\" stroke=\"#0B1530\" stroke-width=\"2\"/><line x1=\"618\" y1=\"120\" x2=\"618\" y2=\"332\" stroke=\"#0B1530\" stroke-width=\"2.5\" stroke-dasharray=\"7 6\"/><path d=\"M 618 342 L 611 326 L 625 326 Z\" fill=\"#0B1530\"/><rect x=\"418\" y=\"324\" width=\"104\" height=\"38\" rx=\"19\" fill=\"#3D4860\" stroke=\"#0B1530\" stroke-width=\"2\"/><line x1=\"826\" y1=\"138\" x2=\"826\" y2=\"126\" stroke=\"#0B1530\" stroke-width=\"2\"/><circle cx=\"826\" cy=\"116\" r=\"9\" fill=\"#FFFFFF\" stroke=\"#0B1530\" stroke-width=\"2\"/><circle cx=\"840\" cy=\"96\" r=\"9\" fill=\"#FFFFFF\" stroke=\"#0B1530\" stroke-width=\"2\"/><circle cx=\"816\" cy=\"88\" r=\"9\" fill=\"#FFFFFF\" stroke=\"#0B1530\" stroke-width=\"2\"/><line x1=\"104\" y1=\"138\" x2=\"104\" y2=\"104\" stroke=\"#0B1530\" stroke-width=\"2\"/><text x=\"104\" y=\"94\" text-anchor=\"middle\" font-family=\"Plus Jakarta Sans, sans-serif\" font-size=\"14\" font-weight=\"700\" fill=\"#0B1530\">Phosphate head</text><rect x=\"366\" y=\"216\" width=\"196\" height=\"30\" rx=\"6\" fill=\"#FFFFFF\" stroke=\"#DCE0E6\" stroke-width=\"2\"/><text x=\"464\" y=\"236\" text-anchor=\"middle\" font-family=\"Plus Jakarta Sans, sans-serif\" font-size=\"14\" font-weight=\"700\" fill=\"#0B1530\">Fatty acid tails, oily</text><line x1=\"769\" y1=\"166\" x2=\"752\" y2=\"112\" stroke=\"#0B1530\" stroke-width=\"2\"/><text x=\"740\" y=\"102\" text-anchor=\"middle\" font-family=\"Plus Jakarta Sans, sans-serif\" font-size=\"14\" font-weight=\"700\" fill=\"#0B1530\">Cholesterol</text><text x=\"836\" y=\"62\" text-anchor=\"middle\" font-family=\"Plus Jakarta Sans, sans-serif\" font-size=\"14\" font-weight=\"700\" fill=\"#0B1530\">Sugar chains</text><line x1=\"313\" y1=\"324\" x2=\"313\" y2=\"386\" stroke=\"#0B1530\" stroke-width=\"2\"/><text x=\"313\" y=\"406\" text-anchor=\"middle\" font-family=\"Plus Jakarta Sans, sans-serif\" font-size=\"14\" font-weight=\"700\" fill=\"#0B1530\">Integral protein</text><line x1=\"618\" y1=\"360\" x2=\"618\" y2=\"386\" stroke=\"#0B1530\" stroke-width=\"2\"/><text x=\"618\" y=\"406\" text-anchor=\"middle\" font-family=\"Plus Jakarta Sans, sans-serif\" font-size=\"14\" font-weight=\"700\" fill=\"#0B1530\">Channel, open pore</text><text x=\"408\" y=\"350\" text-anchor=\"end\" font-family=\"Plus Jakarta Sans, sans-serif\" font-size=\"14\" font-weight=\"700\" fill=\"#0B1530\">Peripheral protein</text><line x1=\"40\" y1=\"150\" x2=\"40\" y2=\"310\" stroke=\"#8B3A2E\" stroke-width=\"2.5\"/><line x1=\"34\" y1=\"150\" x2=\"46\" y2=\"150\" stroke=\"#8B3A2E\" stroke-width=\"2.5\"/><line x1=\"34\" y1=\"310\" x2=\"46\" y2=\"310\" stroke=\"#8B3A2E\" stroke-width=\"2.5\"/><text x=\"52\" y=\"236\" font-family=\"Plus Jakarta Sans, sans-serif\" font-size=\"14\" font-weight=\"700\" fill=\"#8B3A2E\">7 nm</text></svg>",
  cap: "The plasma membrane in cross section, about 7 nanometers thick. You could stack about fourteen thousand of them across the width of one human hair. Roughly half the mass of this membrane is protein, not lipid.",
  covers: ["w2-membrane-structure"],
  big: "The lipid decides who gets in for free. The proteins decide everybody else."
},

/* 5 ------------------------------------------------------------------ */
{
  k: "cards",
  kicker: "Membrane structure",
  h: "Six parts, and what each one is for",
  lede: "Every one of these earns its place by doing something the others cannot. Guess the answer before you open the box.",
  cols: 3,
  cards: [
    { label: "Phospholipid", labelClass: "terra",
      h: "Why does a bilayer build itself, with nobody building it?",
      p: ["Because each molecule is **amphipathic**: a phosphate head that likes water and two fatty acid tails that do not. Drop enough of them in water and the tails hide from it by turning to face each other. The double sheet is the lowest energy arrangement available, so it forms on its own and it reseals on its own when you poke a hole in it.",
          "That self sealing is why a cell survives an injection and why membranes can bud off as vesicles at all."] },
    { label: "Cholesterol", labelClass: "terra",
      h: "What stops the sheet going stiff when cold and runny when warm?",
      p: ["Cholesterol wedges between the tails and acts as a buffer in both directions. Warm, it gets in the way of the tails and stiffens things. Cold, it stops the tails packing tight and freezing solid.",
          "In a red cell membrane it is close to one cholesterol for every phospholipid, which is a lot, and all of it is doing the same job: holding the fluidity steady as the temperature moves. What lets that cell fold through a capillary is a different thing entirely, the spectrin mesh and the spare membrane, and it is on the peripheral protein card below."] },
    { label: "Glycolipid", labelClass: "teal",
      h: "What is a sugar chain doing on the outside face and never the inside?",
      p: ["Sugars are how one cell tells another cell what it is. They only ever face outward, which is why the two faces of a membrane are not interchangeable.",
          "Your ABO blood group is literally this. A and B are sugars added to the ends of chains on the red cell surface, and O means the chain was left unfinished. A transfusion reaction is your immune system reading a sugar it does not recognize."] },
    { label: "Integral protein", labelClass: "teal",
      h: "What can only be done by something that goes all the way through?",
      p: ["Anything that has to connect the outside to the inside. A hole for an ion, a carrier that picks a molecule up on one side and puts it down on the other, a pump, a receptor that senses outside and signals inside.",
          "They sit in the membrane because a stretch of their amino acids is greasy and is happy in the oil. Pull them out and you have to break the membrane to do it."] },
    { label: "Peripheral protein", labelClass: "teal",
      h: "What can be done from the inside face without ever touching the oil?",
      p: ["Holding the shape. Peripheral proteins clip onto the inner surface and onto each other, forming a mesh that gives the cell its form and stops the membrane tearing when it is stretched.",
          "In a red cell that mesh is spectrin and ankyrin. Break it and the cell rounds up into a ball, which turns out to matter enormously in about six slides."] },
    { label: "The word fluid", labelClass: "terra",
      h: "How much does any of this actually move?",
      p: ["A lot. A single phospholipid swaps places with its neighbor millions of times a second and can travel the length of a bacterium in about one second. Proteins drift too, just far more slowly, because they are enormous by comparison.",
          "So the mosaic is not a fixed pattern. It is a crowd, and the pattern is different every second."] }
  ],
  covers: ["w2-membrane-structure"],
  big: "Fluid means the parts move sideways freely. Mosaic means the parts are not all the same."
},

/* 6 ------------------------------------------------------------------ */
{
  k: "cards",
  kicker: "Membrane structure",
  h: "What the proteins are actually for",
  lede: "Half the mass of this membrane is protein, and the cell did not build any of it for decoration. Six jobs, and every one of them is a job the lipid cannot do.",
  cols: 3,
  cards: [
    { label: "Channel", labelClass: "teal",
      h: "How do you move an ion a million times a second?",
      p: ["You give it a hole. A channel is a water filled pore straight through an integral protein, and once it is open the ion falls down its gradient with nothing slowing it. That is why channels are fast and why they cannot move anything uphill.",
          "Most of them are gated, so the cell decides when the hole exists. Kofi's cholera toxin works by jamming one chloride channel permanently open."] },
    { label: "Carrier", labelClass: "teal",
      h: "How do you move glucose, which is far too big and too polar?",
      p: ["You give it a turnstile. A carrier binds the molecule on one side, changes shape, and releases it on the other. It is far slower than a channel because it has to move each time, and it can be saturated, because there are only so many of them.",
          "Everything about carriers is in the second deck this week, including what saturation does to a kidney."] },
    { label: "Pump", labelClass: "terra",
      h: "How do you move something uphill, against its own gradient?",
      p: ["You pay for it. A pump is a carrier that burns ATP, and it is the only protein that spends ATP directly to do it.",
          "It is not the only route uphill. The second deck this week shows you carriers that spend no ATP of their own and still move their cargo against its gradient, by riding a gradient the pump already paid for.",
          "The sodium potassium pump is the one to know. It is why potassium sits at 140 mM inside and sodium at 145 mM outside, and that mirror image is the reason you have a membrane voltage at all."] },
    { label: "Receptor", labelClass: "teal",
      h: "Insulin never enters the cell. So how does it give an order?",
      p: ["Through a receptor that spans the membrane, senses on the outside and signals on the inside. The message crosses without the messenger crossing.",
          "This is the answer to the whole problem of being a peptide hormone in a body full of oil films, and it is why insulin acts in minutes, not hours, while a steroid takes hours."] },
    { label: "Enzyme", labelClass: "terra",
      h: "Why bolt an enzyme onto the outside face of a cell?",
      p: ["So it can work on something before it ever gets in. Enzymes anchored on the outer surface break large molecules into pieces small enough to be transported.",
          "The brush border of your small intestine is covered in them, which is why lactase deficiency is a membrane story and not a stomach story."] },
    { label: "Anchor and marker", labelClass: "terra",
      h: "What holds the shape, and what tells your immune system this cell is yours?",
      p: ["Anchoring proteins tie the membrane to the internal skeleton and to the tissue around it, which is how a cell keeps a shape at all.",
          "Identity markers are the sugar carrying proteins and lipids on the outer face. Your immune system reads them constantly, and a transplant rejection is that reading coming back negative."] }
  ],
  covers: ["w2-membrane-structure"],
  big: "Every protein here exists because the lipid said no to something the cell needed."
},

/* 7 ------------------------------------------------------------------ */
{
  k: "text",
  kicker: "Membrane structure",
  h: "Why fluidity is a physiological variable and not a detail",
  lede: "A membrane that is too stiff and a membrane that is too runny both fail, and they fail in different ways. Your body spends real effort holding it in the middle.",
  body: [
    "Fluidity comes down to how well the fatty acid tails can pack together. Long, straight, saturated tails stack neatly and stiffen the membrane. Short tails and unsaturated tails with a kink in them cannot stack, so they keep it loose. Temperature pushes it too: warm it and everything moves more.",
    "Why you should care. A stiff membrane cannot let its proteins move, and a receptor that cannot move cannot meet the thing it has to signal to. A membrane that is too loose leaks, and a leaky membrane cannot hold a gradient, which means it cannot hold a voltage. Week 4 is entirely about voltage.",
    "One clinical hook so it sticks. In advanced liver disease, cholesterol piles into red cell membranes and stiffens them. Those cells lose the ability to fold through a capillary, the spleen chews the edges off them, and you get spur cells and an anemia that no amount of iron will fix. The membrane was the disease."
  ],
  covers: ["w2-membrane-structure"],
  big: "Structure predicts function all the way down to a fatty acid with a kink in it."
},

/* 8 ------------------------------------------------------------------ */
{
  k: "hook",
  kicker: "Memory hook",
  h: "Hold the whole membrane in one image",
  lede: "You are going to draw this a hundred times this semester. Give it a picture now so the drawing has something to hang on.",
  hook: {
    icon: "!",
    iconClass: "teal",
    label: "Memory hook",
    h: "The oil slick with doors in it",
    say: "The oil decides who gets in for free. The doors decide everybody else.",
    p: [
      "Picture a film of oil sitting on water, two molecules deep, stretched into a closed bag. Nothing that hates oil is getting through that film. Things that dissolve in oil walk straight in and out of it and nobody checks them.",
      "Now float doors in the oil. Some are simple holes, some are turnstiles that only take one shape, and some are powered gates that shove things uphill. Every door costs the cell something to build and to run, which is exactly why the cell only builds doors for things the oil will not let through.",
      "The one sentence to carry out of the room is the one above it. Say it out loud once and it will be there on the exam."
    ]
  },
  covers: ["w2-membrane-structure", "w2-permeability"],
  big: "If the oil will pass it, the cell does not bother building a door for it."
},

/* 9 ------------------------------------------------------------------ */
{
  k: "fig",
  kicker: "Permeability",
  h: "Rank them, and the rest of the course gets easier",
  lede: "This is real data, not a teaching cartoon. Each bar is how fast that molecule crosses a bare lipid bilayer with no proteins in it at all. The scale is powers of ten, so each step along is ten times faster.",
  svg: "<svg viewBox=\"0 0 900 540\" role=\"img\" aria-labelledby=\"x2-t x2-d\"><title id=\"x2-t\">How fast different molecules cross a bare lipid bilayer</title><desc id=\"x2-d\">Eight horizontal bars, longest at the top, on a scale of powers of ten. Oxygen, carbon dioxide and nitrogen have a permeability near ten to the minus one centimeters per second, the longest bar. Steroid hormones and alcohol are near ten to the minus two. Water is near ten to the minus three. Urea is near ten to the minus six. Glucose is near ten to the minus seven. Chloride is near ten to the minus eleven. Potassium is near ten to the minus twelve. Sodium is near ten to the minus fourteen, the shortest bar, about ten million million times slower than oxygen. The top four bars are teal and cross unaided. The bottom four are dark red and need a transport protein in the membrane.</desc><text x=\"300\" y=\"52\" text-anchor=\"end\" font-family=\"Plus Jakarta Sans, sans-serif\" font-size=\"14\" font-weight=\"700\" fill=\"#0B1530\">Molecule</text><text x=\"326\" y=\"52\" font-family=\"Plus Jakarta Sans, sans-serif\" font-size=\"14\" font-weight=\"700\" fill=\"#0B1530\">How fast it crosses a bare bilayer, cm/s</text><line x1=\"30\" y1=\"66\" x2=\"870\" y2=\"66\" stroke=\"#0B1530\" stroke-width=\"2\"/><text x=\"300\" y=\"110\" text-anchor=\"end\" font-family=\"Plus Jakarta Sans, sans-serif\" font-size=\"15\" fill=\"#0B1530\">Oxygen, carbon dioxide, nitrogen</text><rect x=\"326\" y=\"89\" width=\"476\" height=\"28\" rx=\"4\" fill=\"#1F4E55\"/><text x=\"812\" y=\"110\" font-family=\"Plus Jakarta Sans, sans-serif\" font-size=\"14\" font-weight=\"700\" fill=\"#0B1530\">10^-1</text><text x=\"300\" y=\"162\" text-anchor=\"end\" font-family=\"Plus Jakarta Sans, sans-serif\" font-size=\"15\" fill=\"#0B1530\">Steroid hormones, alcohol</text><rect x=\"326\" y=\"141\" width=\"442\" height=\"28\" rx=\"4\" fill=\"#1F4E55\"/><text x=\"778\" y=\"162\" font-family=\"Plus Jakarta Sans, sans-serif\" font-size=\"14\" font-weight=\"700\" fill=\"#0B1530\">10^-2</text><text x=\"300\" y=\"214\" text-anchor=\"end\" font-family=\"Plus Jakarta Sans, sans-serif\" font-size=\"15\" fill=\"#0B1530\">Water</text><rect x=\"326\" y=\"193\" width=\"408\" height=\"28\" rx=\"4\" fill=\"#1F4E55\"/><text x=\"744\" y=\"214\" font-family=\"Plus Jakarta Sans, sans-serif\" font-size=\"14\" font-weight=\"700\" fill=\"#0B1530\">10^-3</text><text x=\"300\" y=\"266\" text-anchor=\"end\" font-family=\"Plus Jakarta Sans, sans-serif\" font-size=\"15\" fill=\"#0B1530\">Urea</text><rect x=\"326\" y=\"245\" width=\"306\" height=\"28\" rx=\"4\" fill=\"#1F4E55\"/><text x=\"642\" y=\"266\" font-family=\"Plus Jakarta Sans, sans-serif\" font-size=\"14\" font-weight=\"700\" fill=\"#0B1530\">10^-6</text><text x=\"300\" y=\"318\" text-anchor=\"end\" font-family=\"Plus Jakarta Sans, sans-serif\" font-size=\"15\" fill=\"#0B1530\">Glucose</text><rect x=\"326\" y=\"297\" width=\"272\" height=\"28\" rx=\"4\" fill=\"#8B3A2E\"/><text x=\"608\" y=\"318\" font-family=\"Plus Jakarta Sans, sans-serif\" font-size=\"14\" font-weight=\"700\" fill=\"#0B1530\">10^-7</text><text x=\"300\" y=\"370\" text-anchor=\"end\" font-family=\"Plus Jakarta Sans, sans-serif\" font-size=\"15\" fill=\"#0B1530\">Chloride, Cl-</text><rect x=\"326\" y=\"349\" width=\"136\" height=\"28\" rx=\"4\" fill=\"#8B3A2E\"/><text x=\"472\" y=\"370\" font-family=\"Plus Jakarta Sans, sans-serif\" font-size=\"14\" font-weight=\"700\" fill=\"#0B1530\">10^-11</text><text x=\"300\" y=\"422\" text-anchor=\"end\" font-family=\"Plus Jakarta Sans, sans-serif\" font-size=\"15\" fill=\"#0B1530\">Potassium, K+</text><rect x=\"326\" y=\"401\" width=\"102\" height=\"28\" rx=\"4\" fill=\"#8B3A2E\"/><text x=\"438\" y=\"422\" font-family=\"Plus Jakarta Sans, sans-serif\" font-size=\"14\" font-weight=\"700\" fill=\"#0B1530\">10^-12</text><text x=\"300\" y=\"474\" text-anchor=\"end\" font-family=\"Plus Jakarta Sans, sans-serif\" font-size=\"15\" fill=\"#0B1530\">Sodium, Na+</text><rect x=\"326\" y=\"453\" width=\"34\" height=\"28\" rx=\"4\" fill=\"#8B3A2E\"/><text x=\"370\" y=\"474\" font-family=\"Plus Jakarta Sans, sans-serif\" font-size=\"14\" font-weight=\"700\" fill=\"#0B1530\">10^-14</text><line x1=\"316\" y1=\"80\" x2=\"316\" y2=\"486\" stroke=\"#0B1530\" stroke-width=\"2\"/><rect x=\"30\" y=\"492\" width=\"22\" height=\"18\" rx=\"3\" fill=\"#1F4E55\"/><text x=\"60\" y=\"507\" font-family=\"Plus Jakarta Sans, sans-serif\" font-size=\"14\" font-weight=\"700\" fill=\"#0B1530\">Crosses on its own</text><rect x=\"266\" y=\"492\" width=\"22\" height=\"18\" rx=\"3\" fill=\"#8B3A2E\"/><text x=\"296\" y=\"507\" font-family=\"Plus Jakarta Sans, sans-serif\" font-size=\"14\" font-weight=\"700\" fill=\"#0B1530\">Needs a protein to get anywhere</text></svg>",
  cap: "Permeability coefficients across an artificial lipid bilayer. Oxygen crosses about ten million million times faster than sodium does. That is not a typo, and it is the single most useful fact on this slide.",
  covers: ["w2-permeability"],
  big: "**Small, greasy and uncharged walks through. Big or charged needs a door.**"
},

/* 10 ----------------------------------------------------------------- */
{
  k: "rows",
  kicker: "Permeability",
  h: "Three questions, asked in this order, every time",
  lede: "Hand me any molecule and I will ask you these three things about it. Answer them and you have already predicted whether it needs a protein.",
  rows: [
    { dot: "1", dotClass: "navy",
      h: "Is it small?",
      p: ["Size matters, but far less than students expect. It only really rules things out at the top end. Anything much above the size of a glucose molecule is not slipping between the tails no matter what else is true about it, and a protein or a polysaccharide has no chance at all.",
          "Below that, size is a tiebreaker rather than the decision. Oxygen and water are both tiny, and water crosses about a hundred times more slowly."] },
    { dot: "2", dotClass: "terra",
      h: "Does it carry a charge?",
      p: ["This is the one that decides it. A charged particle in water is not a bare particle. It drags a shell of water molecules around with it, held there by the charge, and to enter the oil it would have to strip that shell off and then sit in a greasy environment that wants nothing to do with it.",
          "The energy cost of that is enormous. **A charge is close to an absolute veto**, which is why sodium sits at the bottom of the ladder even though it is small."] },
    { dot: "3", dotClass: "navy",
      h: "Does it dissolve in fat?",
      p: ["Lipid solubility is the positive test. If a molecule is comfortable in oil, the oily core is not a barrier to it, it is a road. Steroid hormones are large, and they cross freely, because they are greasy.",
          "This is why testosterone and cortisol bind receptors inside the cell and insulin, which is a peptide, has to bind a receptor on the surface and shout through the wall."] }
  ],
  covers: ["w2-permeability"],
  big: "Charge first, then lipid solubility, then size. That order gets it right almost every time."
},

/* 11 ----------------------------------------------------------------- */
{
  k: "table",
  kicker: "Permeability",
  h: "The ranking you should be able to produce cold",
  caption: "Common molecules, whether a bare lipid bilayer will pass them, and what a real cell gives them instead.",
  cols: ["Molecule", "Size, charge, greasiness", "Crosses bare lipid?", "What a real cell gives it"],
  rows: [
    ["Oxygen, carbon dioxide", "Tiny, no charge, dissolves in fat", "Yes, very fast", "Nothing at all. Straight through the lipid"],
    ["Steroid hormones, alcohol", "Large but greasy", "Yes", "Nothing. It binds a receptor inside the cell"],
    ["Water", "Tiny, but polar", "Slowly", "Aquaporins, wherever speed matters"],
    ["Urea", "Small, polar, no charge", "Slowly", "Urea transporters in the kidney"],
    ["Glucose", "Large and polar", "Effectively not at all", "GLUT carriers, in the second deck this week"],
    ["Na+, K+, Cl-, Ca2+", "Small, but charged and dragging water", "No", "Channels, carriers and pumps"],
    ["Proteins, large sugars", "Far too large", "No", "Vesicles, in the second deck this week"]
  ],
  covers: ["w2-permeability"],
  big: "Anything in the bottom three rows costs the cell a protein. That is where the cell spends its money."
},

/* 12 ----------------------------------------------------------------- */
{
  k: "text",
  variant: "dark",
  kicker: "Permeability in the clinic",
  h: "Four places this ranking already decides something",
  lede: "None of this is theory. Every item here is a decision somebody makes about a real patient.",
  list: [
    "Anesthetic gases. How strong an inhaled anesthetic is tracks almost exactly with how well it dissolves in fat. Greasier means more potent, so it works at a lower dose. Speed is a separate question and it runs the other way: how fast an agent puts a patient under is set by its blood to gas partition coefficient, and the most fat soluble agents are the slowest to induce. That potency relationship was noticed in 1899 and it still holds.",
    "Steroids against peptides. A steroid crosses and binds a receptor inside the nucleus, so it works by changing which genes are read, which takes hours. Insulin cannot cross, so it binds outside and works in minutes, not hours. The receptor phosphorylates itself within seconds of binding, but the thing you measure, GLUT4 carriers moved into the membrane and glucose actually falling, takes five to fifteen minutes. Same body, opposite speeds, and the only reason is lipid solubility.",
    "Aquaporins. Water does cross the bare lipid, just slowly. Where the body needs it fast it installs water channels. Antidiuretic hormone works by putting aquaporins into the collecting duct membrane, and if that fails you produce liters of dilute urine a day. That is week 13, and it starts here.",
    "Why nothing in your blood just leaks into your cells. Sodium is at 145 mM outside and 12 mM inside, a gradient that would collapse in seconds if the membrane let it. It does not, because sodium is charged. The gradient survives because of the veto."
  ],
  covers: ["w2-permeability"],
  big: "A membrane that let everything through would not be a cell. It would be a puddle."
},

/* 13 ----------------------------------------------------------------- */
{
  k: "formula",
  kicker: "Fick's law",
  h: "Now put a number on it",
  lede: "Knowing something crosses is half an answer. Fick's law tells you how fast, and it names every variable you are allowed to change.",
  eq: "rate is proportional to (area x concentration difference x permeability) / thickness",
  note: "Permeability bundles up everything from the last three slides: size, charge, lipid solubility, and how warm the membrane is.",
  after: [
    "Read it as a fraction, because the fraction is the whole point. Everything on the top makes transfer faster when it goes up. The one thing on the bottom makes transfer slower when it goes up.",
    "Three of the four are things a body can change, and three of the four are things a disease can change. That is why this is the most clinically useful equation in the first half of the course."
  ],
  covers: ["w2-fick-diffusion"],
  lab: "In the Week 2 lab you change Fick variables one at a time and watch the rate move. The dialysis tubing bag is where you do that. Raise the starch concentration inside the bag, weigh it again, and the grams gained per minute is a rate you can defend. The graded saline series is not that experiment. Percentage hemolysis read at a fixed time is an endpoint, not a rate, and what it measures is **osmotic fragility**, which is set by how much spare surface area a cell has for its volume. Label every tube and every bag with the variable you changed before you read it.",
  big: "**Top makes it faster. Bottom makes it slower.** Everything else is arithmetic."
},

/* 14 ----------------------------------------------------------------- */
{
  k: "rows",
  kicker: "Fick's law",
  h: "Change one thing, predict the rate",
  lede: "Four variables, one at a time, with a number on each. Commit to an answer before you open the box.",
  rows: [
    { dot: "1", dotClass: "terra",
      h: "You double the concentration difference. What happens to the rate?",
      p: ["It doubles. The difference is on the top and it is a straight line relationship, which is why a steep gradient is worth so much.",
          "In the lung this is what supplemental oxygen does. It cannot change your alveolar area or your barrier thickness, so it changes the only variable it can reach and pushes the gradient up."] },
    { dot: "2", dotClass: "navy",
      h: "You double the surface area. What happens to the rate?",
      p: ["It doubles. Same straight line, same top of the fraction.",
          "Your body has spent a lot of design effort here. About 70 square meters of alveolar surface in a lung you can hold in two hands, and a small intestine folded and villied and microvillied up to roughly 200 square meters. Area is cheap to buy by folding and it pays back linearly."] },
    { dot: "3", dotClass: "terra",
      h: "You double the membrane thickness. What happens to the rate?",
      p: ["It halves. Thickness is the one thing on the bottom of the fraction.",
          "The alveolar barrier is about 0.5 micrometers thick, which is thinner than anything you would design on purpose. Pulmonary fibrosis and pulmonary edema both work by putting something in the way, and both present the same, as breathlessness on exertion first."] },
    { dot: "4", dotClass: "navy",
      h: "You double the open distance the molecule has to travel. What happens?",
      p: ["It does not halve. It takes **four times** as long, because diffusion time goes with the square of the distance.",
          "Thickness and distance are both distances, so why two different answers? Because the two rows ask different questions. Row three asks for the steady rate of flow across a fixed barrier with a gradient held across it, and that rate is proportional to one over the thickness. This row asks how long one molecule takes to cover open ground with nobody holding a gradient in place, and that time goes with the square.",
          "This is the cruellest term in the whole equation and it is the reason nothing in your body is far from a blood vessel. Next slide has the numbers."] }
  ],
  covers: ["w2-fick-diffusion"],
  big: "Three of these are straight lines. The fourth is a square, and the square is the one that bites."
},

/* 15 ----------------------------------------------------------------- */
{
  k: "fig",
  kicker: "Fick's law",
  h: "The picture behind the equation",
  lede: "Crowded on one side, empty on the other, and a barrier in between with a width and a face. That is all diffusion is.",
  svg: "<svg viewBox=\"0 0 900 430\" role=\"img\" aria-labelledby=\"x4-t x4-d\"><title id=\"x4-t\">The three things you can change in Fick's law</title><desc id=\"x4-d\">A vertical slab of membrane stands in the middle of the picture, drawn as a gray band 40 units wide and 280 units tall. The compartment on the left is crowded with about forty small dots, the high concentration side. The compartment on the right holds only seven dots, the low concentration side. A thick navy arrow runs left to right straight through the slab, showing net movement from crowded to empty. A double headed arrow standing against the left face of the slab is labeled Area, A. A bracket underneath the slab measuring its width is labeled Thickness, delta X. A bracket across the top spanning both compartments is labeled Difference, delta C. Rate rises with area and with the difference, and falls as thickness rises.</desc><rect x=\"60\" y=\"70\" width=\"320\" height=\"280\" rx=\"8\" fill=\"#EDF1F3\" stroke=\"#DCE0E6\" stroke-width=\"2\"/><rect x=\"420\" y=\"70\" width=\"420\" height=\"280\" rx=\"8\" fill=\"#FFFFFF\" stroke=\"#DCE0E6\" stroke-width=\"2\"/><rect x=\"380\" y=\"70\" width=\"40\" height=\"280\" fill=\"#DCE0E6\" stroke=\"#0B1530\" stroke-width=\"2\"/><circle cx=\"86\" cy=\"92\" r=\"7\" fill=\"#8B3A2E\"/><circle cx=\"88\" cy=\"127\" r=\"7\" fill=\"#8B3A2E\"/><circle cx=\"78\" cy=\"167\" r=\"7\" fill=\"#8B3A2E\"/><circle cx=\"87\" cy=\"203\" r=\"7\" fill=\"#8B3A2E\"/><circle cx=\"92\" cy=\"246\" r=\"7\" fill=\"#8B3A2E\"/><circle cx=\"77\" cy=\"280\" r=\"7\" fill=\"#8B3A2E\"/><circle cx=\"89\" cy=\"329\" r=\"7\" fill=\"#8B3A2E\"/><circle cx=\"127\" cy=\"95\" r=\"7\" fill=\"#8B3A2E\"/><circle cx=\"127\" cy=\"139\" r=\"7\" fill=\"#8B3A2E\"/><circle cx=\"126\" cy=\"167\" r=\"7\" fill=\"#8B3A2E\"/><circle cx=\"132\" cy=\"203\" r=\"7\" fill=\"#8B3A2E\"/><circle cx=\"137\" cy=\"241\" r=\"7\" fill=\"#8B3A2E\"/><circle cx=\"132\" cy=\"279\" r=\"7\" fill=\"#8B3A2E\"/><circle cx=\"129\" cy=\"325\" r=\"7\" fill=\"#8B3A2E\"/><circle cx=\"187\" cy=\"92\" r=\"7\" fill=\"#8B3A2E\"/><circle cx=\"177\" cy=\"135\" r=\"7\" fill=\"#8B3A2E\"/><circle cx=\"179\" cy=\"167\" r=\"7\" fill=\"#8B3A2E\"/><circle cx=\"180\" cy=\"213\" r=\"7\" fill=\"#8B3A2E\"/><circle cx=\"177\" cy=\"242\" r=\"7\" fill=\"#8B3A2E\"/><circle cx=\"175\" cy=\"284\" r=\"7\" fill=\"#8B3A2E\"/><circle cx=\"189\" cy=\"329\" r=\"7\" fill=\"#8B3A2E\"/><circle cx=\"233\" cy=\"102\" r=\"7\" fill=\"#8B3A2E\"/><circle cx=\"237\" cy=\"137\" r=\"7\" fill=\"#8B3A2E\"/><circle cx=\"232\" cy=\"171\" r=\"7\" fill=\"#8B3A2E\"/><circle cx=\"228\" cy=\"209\" r=\"7\" fill=\"#8B3A2E\"/><circle cx=\"225\" cy=\"249\" r=\"7\" fill=\"#8B3A2E\"/><circle cx=\"239\" cy=\"293\" r=\"7\" fill=\"#8B3A2E\"/><circle cx=\"233\" cy=\"330\" r=\"7\" fill=\"#8B3A2E\"/><circle cx=\"281\" cy=\"90\" r=\"7\" fill=\"#8B3A2E\"/><circle cx=\"275\" cy=\"142\" r=\"7\" fill=\"#8B3A2E\"/><circle cx=\"285\" cy=\"169\" r=\"7\" fill=\"#8B3A2E\"/><circle cx=\"282\" cy=\"206\" r=\"7\" fill=\"#8B3A2E\"/><circle cx=\"287\" cy=\"253\" r=\"7\" fill=\"#8B3A2E\"/><circle cx=\"273\" cy=\"280\" r=\"7\" fill=\"#8B3A2E\"/><circle cx=\"282\" cy=\"326\" r=\"7\" fill=\"#8B3A2E\"/><circle cx=\"332\" cy=\"103\" r=\"7\" fill=\"#8B3A2E\"/><circle cx=\"335\" cy=\"128\" r=\"7\" fill=\"#8B3A2E\"/><circle cx=\"323\" cy=\"172\" r=\"7\" fill=\"#8B3A2E\"/><circle cx=\"336\" cy=\"204\" r=\"7\" fill=\"#8B3A2E\"/><circle cx=\"322\" cy=\"249\" r=\"7\" fill=\"#8B3A2E\"/><circle cx=\"335\" cy=\"287\" r=\"7\" fill=\"#8B3A2E\"/><circle cx=\"333\" cy=\"327\" r=\"7\" fill=\"#8B3A2E\"/><circle cx=\"470\" cy=\"110\" r=\"7\" fill=\"#8B3A2E\"/><circle cx=\"566\" cy=\"196\" r=\"7\" fill=\"#8B3A2E\"/><circle cx=\"654\" cy=\"132\" r=\"7\" fill=\"#8B3A2E\"/><circle cx=\"724\" cy=\"268\" r=\"7\" fill=\"#8B3A2E\"/><circle cx=\"792\" cy=\"186\" r=\"7\" fill=\"#8B3A2E\"/><circle cx=\"524\" cy=\"306\" r=\"7\" fill=\"#8B3A2E\"/><circle cx=\"686\" cy=\"326\" r=\"7\" fill=\"#8B3A2E\"/><rect x=\"228\" y=\"132\" width=\"326\" height=\"34\" rx=\"6\" fill=\"#FFFFFF\" opacity=\"0.86\"/><line x1=\"240\" y1=\"150\" x2=\"530.0\" y2=\"150.0\" stroke=\"#0B1530\" stroke-width=\"7\" stroke-linecap=\"round\"/><path d=\"M 548 150 L 530.0 161.2 L 530.0 138.8 Z\" fill=\"#0B1530\"/><text x=\"220\" y=\"392\" text-anchor=\"middle\" font-family=\"Plus Jakarta Sans, sans-serif\" font-size=\"16\" font-weight=\"700\" fill=\"#0B1530\">High concentration</text><text x=\"630\" y=\"392\" text-anchor=\"middle\" font-family=\"Plus Jakarta Sans, sans-serif\" font-size=\"16\" font-weight=\"700\" fill=\"#0B1530\">Low concentration</text><line x1=\"360\" y1=\"198\" x2=\"360.0\" y2=\"87.0\" stroke=\"#8B3A2E\" stroke-width=\"3\" stroke-linecap=\"round\"/><path d=\"M 360 76 L 366.8 87.0 L 353.2 87.0 Z\" fill=\"#8B3A2E\"/><line x1=\"360\" y1=\"246\" x2=\"360.0\" y2=\"333.0\" stroke=\"#8B3A2E\" stroke-width=\"3\" stroke-linecap=\"round\"/><path d=\"M 360 344 L 353.2 333.0 L 366.8 333.0 Z\" fill=\"#8B3A2E\"/><rect x=\"250\" y=\"204\" width=\"104\" height=\"30\" rx=\"6\" fill=\"#FFFFFF\" stroke=\"#DCE0E6\" stroke-width=\"2\"/><text x=\"346\" y=\"225\" text-anchor=\"end\" font-family=\"Plus Jakarta Sans, sans-serif\" font-size=\"16\" font-weight=\"700\" fill=\"#8B3A2E\">Area, A</text><line x1=\"380\" y1=\"360\" x2=\"380\" y2=\"374\" stroke=\"#1F4E55\" stroke-width=\"2.5\"/><line x1=\"420\" y1=\"360\" x2=\"420\" y2=\"374\" stroke=\"#1F4E55\" stroke-width=\"2.5\"/><line x1=\"380\" y1=\"367\" x2=\"420\" y2=\"367\" stroke=\"#1F4E55\" stroke-width=\"2.5\"/><text x=\"400\" y=\"420\" text-anchor=\"middle\" font-family=\"Plus Jakarta Sans, sans-serif\" font-size=\"16\" font-weight=\"700\" fill=\"#1F4E55\">Thickness, delta X</text><line x1=\"70\" y1=\"52\" x2=\"70\" y2=\"38\" stroke=\"#0B1530\" stroke-width=\"2.5\"/><line x1=\"830\" y1=\"52\" x2=\"830\" y2=\"38\" stroke=\"#0B1530\" stroke-width=\"2.5\"/><line x1=\"70\" y1=\"38\" x2=\"342\" y2=\"38\" stroke=\"#0B1530\" stroke-width=\"2.5\"/><line x1=\"558\" y1=\"38\" x2=\"830\" y2=\"38\" stroke=\"#0B1530\" stroke-width=\"2.5\"/><text x=\"450\" y=\"44\" text-anchor=\"middle\" font-family=\"Plus Jakarta Sans, sans-serif\" font-size=\"16\" font-weight=\"700\" fill=\"#0B1530\">Difference, delta C</text></svg>",
  cap: "Net movement runs from crowded to empty. Individual molecules go both ways at random the whole time. Diffusion has no direction of its own, it only has a net result, and the net result stops when both sides match.",
  covers: ["w2-fick-diffusion"],
  big: "Nothing is being pushed. There are just more of them starting on the left."
},

/* 16 ----------------------------------------------------------------- */
{
  k: "work",
  variant: "paper",
  kicker: "Work it out",
  h: "The emphysema lung is a Fick's law problem",
  lede: "A patient with emphysema is breathless walking to the mailbox and their resting oxygen saturation looks almost normal. Use the equation to explain both halves of that at once.",
  badges: [{t:"Work it with me"}, {t:"4 min", cls:"time"}],
  given: "A healthy adult has about 70 square meters of alveolar surface and a barrier about 0.5 micrometers thick. Emphysema destroys alveolar walls, so small alveoli merge into large empty spaces. It does not thicken anything.",
  steps: [
    "Write the law and mark which variable the disease touches. Rate is proportional to (area x difference) / thickness. Emphysema takes area off the top and leaves thickness and gradient alone.",
    "Put a number on the loss. Say the 70 square meters falls to 25. That ratio is 25 divided by 70, which is about 0.36.",
    "So at the same gradient and the same barrier thickness, this lung transfers about a third of the oxygen per minute that it used to.",
    "Now ask what is actually needed. At rest you consume roughly 250 mL of oxygen a minute, and a healthy lung has enormous reserve above that. A third of an enormous reserve can still cover resting demand, which is exactly why the resting saturation can read 94 percent and reassure everybody.",
    "Now walk up a flight of stairs. Demand goes up three or four times, and there is no reserve left to find it in. The saturation falls where the resting number said it would not.",
    "Compare it with pulmonary fibrosis, which leaves the area alone and multiplies the thickness instead. Triple the thickness and the rate falls to a third from the bottom of the fraction. Different variable, same equation, and both patients get breathless on exertion before they get breathless at rest."
  ],
  ans: "Emphysema takes area off the top. Fibrosis puts thickness on the bottom. Both cut the rate, both spend the reserve first, and that is why exertion is where the disease shows up before rest is.",
  timer: 240,
  covers: ["w2-fick-diffusion"],
  lab: "In the Week 2 lab you will be asked to change one Fick variable at a time and say in advance what it should do to your measurement. This slide is the template for that answer: name the variable, say which half of the fraction it sits on, put a ratio on it, then say what the reserve does with the shortfall.",
  big: "Name the variable, then name which half of the fraction it is on. That is the whole method."
},

/* 17 ----------------------------------------------------------------- */
{
  k: "text",
  kicker: "Fick's law",
  h: "Why diffusion is useless over any real distance",
  lede: "Diffusion is spectacularly fast across a membrane and hopeless across a room. Both of those come from the same square term, and these three numbers make it permanent.",
  list: [
    "100 micrometers takes about **5 seconds**. That is roughly the width of a hair, and it is about as far as any cell in your body sits from a capillary.",
    "1 millimeter takes about 8 minutes. Ten times the distance, a hundred times the wait.",
    "1 centimeter takes about 14 hours. Ten times again, and now it is useless."
  ],
  body: [
    "So diffusion is not a transport system for a body. It is a transport system for the last few micrometers, and everything else has to be handled by bulk flow: blood in vessels, air in airways, filtrate in tubules. Your circulation exists because diffusion does not scale.",
    "This also tells you why cells are the size they are, why a tumour that outgrows its blood supply goes necrotic in the middle, and why a swollen, edematous tissue is a poorly oxygenated tissue even when the blood arriving is perfectly saturated. You added distance, and distance is squared."
  ],
  covers: ["w2-fick-diffusion"],
  big: "Diffusion moves things across a membrane. Blood moves things across a body."
},

/* 18 ----------------------------------------------------------------- */
{
  k: "hook",
  kicker: "Memory hook",
  h: "One image for the whole equation",
  lede: "You will not be able to recall four variables under exam pressure as a list. Recall them as a picture instead.",
  hook: {
    icon: "!",
    iconClass: "terra",
    label: "Memory hook",
    h: "The crowd leaving a stadium",
    say: "Wide and short and packed is fast. Narrow and long and half empty is slow.",
    p: [
      "The exit doorway is the surface area. Widen the doorway and more people get out per minute, in a straight line, exactly like doubling the area.",
      "The tunnel behind the door is the membrane thickness. Make people walk further before they are out and everything slows down.",
      "How full the stadium is compared with the street outside is the concentration difference. A packed stadium empties fast into an empty street, and once the street is as crowded as the stands, people stop leaving.",
      "And nobody is pushing anybody. Everyone is wandering at random. It only looks like a flow because there were more of them inside to begin with."
    ]
  },
  covers: ["w2-fick-diffusion"],
  big: "Wide, short, steep. Three words, and you have rebuilt Fick's law."
},

/* 19 ----------------------------------------------------------------- */
{
  k: "text",
  kicker: "Osmosis",
  h: "Now the special case, and it is the one that fills the wards",
  lede: "Osmosis is just diffusion with the spotlight on the water instead of on the solute. Nothing new is happening. What is new is that you now have to think about which particles can follow and which cannot.",
  body: [
    "**Osmosis** is the net movement of water across a selectively permeable membrane, from where water is more concentrated to where it is less concentrated. Since water is less concentrated wherever solute is more concentrated, the shorter way to say it is that water follows solute.",
    "The membrane has to be selective for any of this to happen. If both the water and the solute could cross, the solute would simply even itself out and the water would stay where it was. It is the fact that the solute is stuck that forces the water to do the moving instead.",
    "Water is never pumped anywhere in your body. There is no water pump. Every drop of water that moves between compartments in this course moves because somebody moved a solute first, and the water followed. Hold onto that when the transporters get complicated in the next deck."
  ],
  covers: ["w2-osmolarity-tonicity", "w2-osmosis-cell-volume"],
  big: "There is no water pump. **Move the salt and the water comes with it.**"
},

/* 20 ----------------------------------------------------------------- */
{
  k: "formula",
  kicker: "Osmolarity",
  h: "Count particles, not molecules",
  lede: "This is the whole calculation, and it is easier than it looks. The only place people lose marks is forgetting that salt comes apart.",
  eq: "osmolarity (mOsm/L) = concentration (mmol/L) x number of particles each molecule breaks into",
  note: "NaCl gives 2 particles, Na+ and Cl-. Glucose gives 1, it stays in one piece. CaCl2 gives 3.",
  after: [
    "**Osmolarity** is a headcount of dissolved particles per liter of solution. It does not care what the particles are, how big they are, or whether they carry a charge. One sodium ion counts exactly as much as one glucose molecule.",
    "You will also see osmolality, which is per kilogram of water rather than per liter of solution. In the body the two are within about one percent of each other, so use whichever the question gives you and do not lose sleep over the distinction.",
    "The number to have cold: **plasma is about 290 mOsm/L**, and the lab reports it as 275 to 295 mOsm/kg. That is the number every fluid in the hospital is being compared against."
  ],
  covers: ["w2-osmolarity-tonicity"],
  big: "Salt counts twice. Sugar counts once. That one line is most of the arithmetic."
},

/* 21 ----------------------------------------------------------------- */
{
  k: "work",
  variant: "paper",
  kicker: "Work it out",
  h: "Where 308 comes from, from first principles",
  lede: "Do not look this up and do not memorize it. Derive it once, properly, and you will never need to look it up again.",
  badges: [{t:"Work it with me"}, {t:"4 min", cls:"time"}],
  given: "A bag labeled 0.9 percent sodium chloride, the fluid everyone calls normal saline. The molar mass of NaCl is 58.4 g/mol. Plasma is about 290 mOsm/L. Find the osmolarity of the bag.",
  steps: [
    "Turn the percentage into grams per liter. A percentage on a fluid bag means grams per 100 mL, so 0.9 percent is 0.9 g in 100 mL. Multiply by ten and that is 9 g in a liter.",
    "Turn grams into moles. 9 g divided by 58.4 g/mol gives 0.154 mol/L, which is 154 mmol/L. That number is the sodium concentration of the bag, and it is worth recognizing on sight.",
    "Count particles, not molecules. Sodium chloride comes apart in water, so each molecule gives you a Na+ and a Cl-. That is two particles.",
    "Multiply. 154 mmol/L times 2 particles gives 308 mOsm/L.",
    "Compare it with the patient. Plasma is about 290. The bag is 308. That is within about 6 percent, close enough that a cell sitting in it neither swells nor shrinks in any way you could see.",
    "One thing to notice while you are here. Along with 154 mEq/L of sodium you just delivered 154 mEq/L of chloride, and normal plasma chloride is about 100. Give enough of it and extracellular chloride climbs, bicarbonate has to fall to keep the charges balanced, and you have created an acidosis with the fluid you gave to help."
  ],
  ans: "308 mOsm/L. Close enough to plasma to be called isotonic, and carrying half again as much chloride as plasma does, which is the reason lactated Ringer's exists.",
  timer: 240,
  covers: ["w2-osmolarity-tonicity"],
  lab: "Part 1 of the Week 2 dry lab packet, Why the Water Leaves and How to Bring It Back, is this exact calculation for four fluids: 0.9 percent NaCl, 0.45 percent NaCl, 5 percent dextrose in water, and 3 percent NaCl. You do the arithmetic in pen, classify each against plasma, and predict the effect on a red cell. Work this slide first and Part 1 becomes checking rather than solving.",
  big: "**308 mOsm/L.** Derived, not memorized, and that is the difference on an exam."
},

/* 22 ----------------------------------------------------------------- */
{
  k: "table",
  kicker: "Osmolarity",
  h: "The four bags from your lab packet, worked",
  caption: "Kofi's four candidate fluids. Same method every time: grams per liter, divide by molar mass, multiply by particles.",
  cols: ["The bag", "The arithmetic", "Osmolarity in the bag", "Against plasma at 290"],
  rows: [
    ["0.9 percent NaCl", "9 / 58.4 = 154 mM, times 2", "308 mOsm/L", "Isotonic"],
    ["0.45 percent NaCl", "4.5 / 58.4 = 77 mM, times 2", "154 mOsm/L", "Hypotonic, about half"],
    ["D5W, 50 g/L dextrose", "50 / 180 = 278 mM, times 1", "278 mOsm/L on paper", "Isotonic in the bag, and then it is not"],
    ["3 percent NaCl", "30 / 58.4 = 513.7 mM, times 2", "1027 mOsm/L", "Hypertonic, more than three times"]
  ],
  covers: ["w2-osmolarity-tonicity"],
  lab: "You will fill this table in by hand in Part 1 of the Week 2 dry lab packet, then draw a red cell in three of the four solutions with arrows showing which way the water moved. If your bag label for D5W reads 252 rather than 278, that is not an error: pharmacy uses dextrose monohydrate at 198 g/mol, and your packet gives you 180 for anhydrous glucose. Either number is right for the compound it belongs to, and both become zero once the cell burns the sugar.",
  big: "**D5W is the trap.** The number in the bag is real, and it is gone minutes after the drip starts."
},

/* 23 ----------------------------------------------------------------- */
{
  k: "text",
  variant: "dark",
  kicker: "The distinction that carries the week",
  h: "Osmolarity is a number. Tonicity is a behavior",
  lede: "If you learn one thing from this deck, learn this one. It is the single most common place a good student loses a question in Unit 1.",
  body: [
    "This is the one that catches people out. Osmolarity counts everything dissolved. **Tonicity only counts what is stuck outside the cell.**",
    "Urea crosses membranes freely, so it adds to osmolarity but does nothing to tonicity. A urea solution can be the same osmolarity as saline and still let a cell swell up and burst. The urea walks in, evens itself out on both sides, and ends up pulling on nothing at all. Meanwhile the water it was supposed to be holding outside comes in with it.",
    "The mirror image of urea is mannitol. Mannitol is a sugar alcohol that cells cannot take up, so every particle of it stays outside and every particle of it counts. That is exactly why it is given intravenously to pull water out of a swollen brain. Same idea, opposite behavior, and the only difference between them is whether the membrane lets it in.",
    "This is also why the lab tells you to calculate effective osmolarity as twice the sodium in mmol/L plus the glucose in mg/dL divided by 18, and to leave the urea out. Watch the units, because the two halves are not in the same ones. The 18 is there for one reason only, to turn glucose in mg/dL into mmol/L, and everywhere else in this deck we work in mmol/L throughout. That formula is not a shortcut. It is the definition of tonicity written in numbers you can get off a chemistry panel."
  ],
  covers: ["w2-osmolarity-tonicity"],
  lab: "In the interactive Osmosis and IV Fluids lab, the composition table in section 2 has a bag osmolarity column and an effective osmolarity column, and the two disagree for every fluid containing dextrose. That gap is this slide. Before you unlock any order in section 3, look at the two columns for D5W and say out loud why one reads 252 and the other reads zero.",
  big: "Osmolarity is what a machine measures. **Tonicity is what the cell does about it.**"
},

/* 24 ----------------------------------------------------------------- */
{
  k: "work",
  variant: "paper",
  kicker: "Work it out",
  h: "One red cell, four bags, four predictions",
  lede: "This is the question that shows up on the exam and in the lab and at three in the morning on a ward. Say the prediction out loud before you read the answer.",
  badges: [{t:"Work it with me"}, {t:"5 min", cls:"time"}],
  given: "You drop one red blood cell into a tube of each fluid. Plasma is 290 mOsm/L. For each tube, say which way water moves, what happens to the cell volume, and what you would see down a microscope.",
  steps: [
    "0.9 percent NaCl, 308 mOsm/L, and none of it crosses into the cell. Effective osmolarity 308. That is a match for plasma, so there is no net water movement in either direction. The cell keeps its biconcave disc shape. Isotonic.",
    "0.45 percent NaCl, 154 mOsm/L, and again none of it crosses. Effective osmolarity 154, which is about half of plasma. Water moves into the cell and the cell swells substantially. This is also the concentration at which the most fragile cells in a sample begin to lyse, which is exactly what you will read off the graded saline series in lab. Hypotonic.",
    "D5W, 278 mOsm/L in the bag. Here is the whole trick. The cell takes the dextrose up and burns it, so within minutes the particles that made the number are gone. Effective osmolarity zero. That leaves plain water around the cell, water rushes in, and the cell swells and bursts. Hypotonic in every way that matters, despite an isotonic label.",
    "3 percent NaCl, 1027 mOsm/L, none of it crossing. That is more than three times plasma. Water leaves the cell, and the cell shrinks and its surface crinkles into spikes. Hypertonic.",
    "Now put a number on how much swelling a red cell can take. It carries about 136 square micrometers of membrane wrapped around only about 90 femtoliters of contents. Round that same membrane into a perfect sphere and it would hold about 150 femtoliters. So a red cell can swell by roughly two thirds before the membrane has to stretch, and membranes do not stretch, they tear.",
    "That surplus of surface area over volume is the entire reason a biconcave disc is biconcave. It is spare membrane, held as a dimple, waiting to be needed."
  ],
  ans: "Isotonic, hypotonic, hypotonic, hypertonic. Three of the four you can read off the bag. The fourth, D5W, you can only get right by asking whether the solute stays outside.",
  timer: 300,
  covers: ["w2-osmosis-cell-volume", "w2-osmolarity-tonicity"],
  lab: "The interactive Osmosis and IV Fluids lab hands you eleven real fluid orders, and each one locks the options until you have written your prediction down. This slide is the shape of the prediction it wants. Section 4 of that lab then runs the same two compartment calculation on any patient and any fluid you type in, so when an order surprises you, you can prove what happened instead of hoping.",
  big: "Ask one question about every bag: **does the solute stay outside the cell or not?**"
},

/* 25 ----------------------------------------------------------------- */
{
  k: "fig",
  kicker: "Osmosis and cell volume",
  h: "The same cell in three solutions",
  lede: "Draw this from memory. Three cells, three sets of arrows, three words underneath. It is worth marks every time it appears.",
  svg: "<svg viewBox=\"0 0 900 470\" role=\"img\" aria-labelledby=\"x3-t x3-d\"><title id=\"x3-t\">One red cell in three solutions</title><desc id=\"x3-d\">Three panels side by side, each holding one red blood cell. Left panel, a hypotonic solution at 150 milliosmoles per liter: four arrows point inward toward the cell, the cell is drawn as a large round ball with a broken outer ring showing it is stretched to bursting, and the label reads water in, swells, then bursts. Middle panel, an isotonic solution at 290 milliosmoles per liter: small arrows point both in and out in equal numbers, and the cell keeps its normal biconcave disc shape with a pale dimple in the center. Right panel, a hypertonic solution at 600 milliosmoles per liter: four arrows point outward away from the cell, the cell is drawn small with a spiky notched edge, and the label reads water out, shrinks and crinkles.</desc><rect x=\"24\" y=\"70\" width=\"272\" height=\"272\" rx=\"14\" fill=\"#EDF1F3\" stroke=\"#DCE0E6\" stroke-width=\"2\"/><text x=\"160\" y=\"48\" text-anchor=\"middle\" font-family=\"Plus Jakarta Sans, sans-serif\" font-size=\"17\" font-weight=\"700\" fill=\"#0B1530\">Hypotonic, 150 mOsm/L</text><rect x=\"314\" y=\"70\" width=\"272\" height=\"272\" rx=\"14\" fill=\"#EDF1F3\" stroke=\"#DCE0E6\" stroke-width=\"2\"/><text x=\"450\" y=\"48\" text-anchor=\"middle\" font-family=\"Plus Jakarta Sans, sans-serif\" font-size=\"17\" font-weight=\"700\" fill=\"#0B1530\">Isotonic, 290 mOsm/L</text><rect x=\"604\" y=\"70\" width=\"272\" height=\"272\" rx=\"14\" fill=\"#EDF1F3\" stroke=\"#DCE0E6\" stroke-width=\"2\"/><text x=\"740\" y=\"48\" text-anchor=\"middle\" font-family=\"Plus Jakarta Sans, sans-serif\" font-size=\"17\" font-weight=\"700\" fill=\"#0B1530\">Hypertonic, 600 mOsm/L</text><circle cx=\"160\" cy=\"206\" r=\"66\" fill=\"#8B3A2E\"/><circle cx=\"160\" cy=\"206\" r=\"80\" fill=\"none\" stroke=\"#8B3A2E\" stroke-width=\"3\" stroke-dasharray=\"10 9\"/><line x1=\"251.74502896036708\" y1=\"270.24056087131714\" x2=\"237.8\" y2=\"260.5\" stroke=\"#1F4E55\" stroke-width=\"3\" stroke-linecap=\"round\"/><path d=\"M 230.4 255.3 L 241.0 255.9 L 234.6 265.1 Z\" fill=\"#1F4E55\"/><line x1=\"68.2549710396329\" y1=\"270.24056087131714\" x2=\"82.2\" y2=\"260.5\" stroke=\"#1F4E55\" stroke-width=\"3\" stroke-linecap=\"round\"/><path d=\"M 89.6 255.3 L 85.4 265.1 L 79.0 255.9 Z\" fill=\"#1F4E55\"/><line x1=\"68.25497103963292\" y1=\"141.75943912868283\" x2=\"82.2\" y2=\"151.5\" stroke=\"#1F4E55\" stroke-width=\"3\" stroke-linecap=\"round\"/><path d=\"M 89.6 156.7 L 79.0 156.1 L 85.4 146.9 Z\" fill=\"#1F4E55\"/><line x1=\"251.74502896036705\" y1=\"141.7594391286828\" x2=\"237.8\" y2=\"151.5\" stroke=\"#1F4E55\" stroke-width=\"3\" stroke-linecap=\"round\"/><path d=\"M 230.4 156.7 L 234.6 146.9 L 241.0 156.1 Z\" fill=\"#1F4E55\"/><ellipse cx=\"450\" cy=\"206\" rx=\"70\" ry=\"46\" fill=\"#8B3A2E\"/><ellipse cx=\"450\" cy=\"206\" rx=\"28\" ry=\"17\" fill=\"#EDF1F3\"/><line x1=\"332\" y1=\"176\" x2=\"357.7\" y2=\"186.6\" stroke=\"#1F4E55\" stroke-width=\"3\" stroke-linecap=\"round\"/><path d=\"M 366.0 190.0 L 355.6 191.7 L 359.8 181.4 Z\" fill=\"#1F4E55\"/><line x1=\"366\" y1=\"224\" x2=\"340.3\" y2=\"234.6\" stroke=\"#1F4E55\" stroke-width=\"3\" stroke-linecap=\"round\"/><path d=\"M 332.0 238.0 L 338.2 229.4 L 342.4 239.7 Z\" fill=\"#1F4E55\"/><line x1=\"568\" y1=\"176\" x2=\"542.3\" y2=\"186.6\" stroke=\"#1F4E55\" stroke-width=\"3\" stroke-linecap=\"round\"/><path d=\"M 534.0 190.0 L 540.2 181.4 L 544.4 191.7 Z\" fill=\"#1F4E55\"/><line x1=\"534\" y1=\"224\" x2=\"559.7\" y2=\"234.6\" stroke=\"#1F4E55\" stroke-width=\"3\" stroke-linecap=\"round\"/><path d=\"M 568.0 238.0 L 557.6 239.7 L 561.8 229.4 Z\" fill=\"#1F4E55\"/><path d=\"M 792.0 206.0 L 772.3 216.5 L 782.1 236.6 L 760.0 233.5 L 756.1 255.5 L 740.0 240.0 L 723.9 255.5 L 720.0 233.5 L 697.9 236.6 L 707.7 216.5 L 688.0 206.0 L 707.7 195.5 L 697.9 175.4 L 720.0 178.5 L 723.9 156.5 L 740.0 172.0 L 756.1 156.5 L 760.0 178.5 L 782.1 175.4 L 772.3 195.5 Z\" fill=\"#8B3A2E\"/><line x1=\"797.3406431002294\" y1=\"246.15035054457323\" x2=\"824.4\" y2=\"265.1\" stroke=\"#1F4E55\" stroke-width=\"3\" stroke-linecap=\"round\"/><path d=\"M 831.7 270.2 L 821.2 269.6 L 827.6 260.5 Z\" fill=\"#1F4E55\"/><line x1=\"682.6593568997706\" y1=\"246.1503505445732\" x2=\"655.6\" y2=\"265.1\" stroke=\"#1F4E55\" stroke-width=\"3\" stroke-linecap=\"round\"/><path d=\"M 648.3 270.2 L 652.4 260.5 L 658.8 269.6 Z\" fill=\"#1F4E55\"/><line x1=\"682.6593568997706\" y1=\"165.84964945542677\" x2=\"655.6\" y2=\"146.9\" stroke=\"#1F4E55\" stroke-width=\"3\" stroke-linecap=\"round\"/><path d=\"M 648.3 141.8 L 658.8 142.4 L 652.4 151.5 Z\" fill=\"#1F4E55\"/><line x1=\"797.3406431002294\" y1=\"165.84964945542674\" x2=\"824.4\" y2=\"146.9\" stroke=\"#1F4E55\" stroke-width=\"3\" stroke-linecap=\"round\"/><path d=\"M 831.7 141.8 L 827.6 151.5 L 821.2 142.4 Z\" fill=\"#1F4E55\"/><text x=\"160\" y=\"380\" text-anchor=\"middle\" font-family=\"Plus Jakarta Sans, sans-serif\" font-size=\"15\" fill=\"#0B1530\">Water in. Swells, then bursts.</text><text x=\"160\" y=\"404\" text-anchor=\"middle\" font-family=\"Plus Jakarta Sans, sans-serif\" font-size=\"15\" font-weight=\"700\" fill=\"#8B3A2E\">Hemolysis.</text><text x=\"450\" y=\"380\" text-anchor=\"middle\" font-family=\"Plus Jakarta Sans, sans-serif\" font-size=\"15\" fill=\"#0B1530\">Water in equals water out.</text><text x=\"450\" y=\"404\" text-anchor=\"middle\" font-family=\"Plus Jakarta Sans, sans-serif\" font-size=\"15\" font-weight=\"700\" fill=\"#8B3A2E\">Normal biconcave disc.</text><text x=\"740\" y=\"380\" text-anchor=\"middle\" font-family=\"Plus Jakarta Sans, sans-serif\" font-size=\"15\" fill=\"#0B1530\">Water out. Shrinks and crinkles.</text><text x=\"740\" y=\"404\" text-anchor=\"middle\" font-family=\"Plus Jakarta Sans, sans-serif\" font-size=\"15\" font-weight=\"700\" fill=\"#8B3A2E\">Crenation.</text><text x=\"450\" y=\"446\" text-anchor=\"middle\" font-family=\"Plus Jakarta Sans, sans-serif\" font-size=\"14\" fill=\"#3D4860\">Arrows show net water movement. Plasma sits at about 290 mOsm/L.</text></svg>",
  cap: "Arrows show net water movement, not individual molecules, which are crossing both ways constantly in all three tubes. Note that only the middle cell keeps its dimple, and the dimple is spare membrane.",
  covers: ["w2-osmosis-cell-volume", "w2-lab-rbc-tonicity"],
  lab: "You will draw these three cells in pen in Part 1 of the Week 2 dry lab packet, with arrows for water direction and the resulting shape, and you will see the real thing in the graded saline series. A hand drawn version of this figure with your own arrows on it is part of what you hand in.",
  big: "Water in, swells. Water out, shrinks. Nothing is deciding anything except the solute."
},

/* 26 ----------------------------------------------------------------- */
{
  k: "cards",
  kicker: "In the lab",
  h: "Three things you will see down the microscope",
  lede: "You get the tube first and the label second. Work backwards from what you can see to what must have been in it.",
  cols: 3,
  cards: [
    { label: "Crenation", labelClass: "terra",
      h: "Small, shrunken cells with a spiky notched edge. What was in that tube?",
      p: ["A hypertonic solution. Water left the cell, the volume fell, and the membrane had more surface area than it now had contents to wrap around. It buckled into spikes rather than folding smoothly.",
          "3 percent NaCl does it in seconds. So does a badly dehydrated patient's own plasma, which is why severe dehydration makes people confused: brain cells are shrinking too."] },
    { label: "Normal", labelClass: "teal",
      h: "Pale centered discs, unchanged after ten minutes. What was in that tube?",
      p: ["An isotonic solution, 0.9 percent NaCl or lactated Ringer's. Water is crossing constantly in both directions and the two rates are equal, so nothing changes.",
          "The pale center is not a hole. It is the dimple of the biconcave disc, thinner in the middle, and it is the reserve membrane that lets the cell swell later if it has to."] },
    { label: "Hemolysis", labelClass: "terra",
      h: "The tube has gone clear red and you can barely find a cell. What happened?",
      p: ["A hypotonic solution. Water went in, the cell rounded up to a sphere, ran out of spare membrane at about 150 femtoliters, and the membrane tore. Hemoglobin spilled into the solution, which is why it is clear and red rather than cloudy.",
          "In a graded saline series red cells begin to lyse around 0.45 percent NaCl and are completely gone by about 0.33 percent. Cells with a damaged spectrin mesh are already spheres, have no spare membrane, and lyse in a stronger solution than normal cells do."] }
  ],
  covers: ["w2-lab-rbc-tonicity"],
  lab: "In the Week 2 lab you put red cells into a graded series of saline concentrations and read the tubes: spiky crenated cells at the strong end, normal discs in the middle, and a clear red solution at the dilute end. You plot percentage hemolysis against saline concentration for three sets of cells, mark where each set begins to lyse, and explain what an early lysing set tells you about its surface area compared with its volume.",
  big: "Cloudy means cells. Clear and red means the cells are gone."
},

/* 27 ----------------------------------------------------------------- */
{
  k: "text",
  kicker: "Why it matters",
  h: "Why nobody ever hangs a bag of sterile water",
  lede: "Sterile water sits on the shelf in every hospital and it is never infused on its own. This is the slide that explains why, and it is worth being able to say out loud.",
  body: [
    "Sterile water has an osmolarity of zero. Nothing is dissolved in it. Run it into a vein and every red cell it meets is sitting in a solution with no effective solute at all, so water pours in until the membrane tears.",
    "The consequences arrive together and they are ugly. Free hemoglobin in the plasma, which the kidney has to filter and which damages the tubules on the way through. Potassium released from every burst cell, which the heart notices immediately, because potassium sits at 4 mM outside and 140 mM inside and a small addition outside is a huge change in proportion. And a plasma sodium that falls fast enough to swell brain cells inside a skull that does not stretch.",
    "So sterile water is a diluent. You use it to dissolve a drug, and then you give the drug in something isotonic. The bag exists, the label is honest, and the physiology says never on its own."
  ],
  covers: ["w2-osmosis-cell-volume"],
  lab: "Order 7 in the interactive Osmosis and IV Fluids lab is exactly this scenario, and it is one of the two orders you are required to put to an AI in your interrogation log. Ask it what dose of sterile water would be safe to infuse and write down what it does with a question that has no safe answer.",
  big: "Osmolarity zero is not gentle. **It is the most hypotonic thing that exists.**"
},

/* 28 ----------------------------------------------------------------- */
{
  k: "text",
  kicker: "Why it matters",
  h: "The brain is the organ that pays for a fast correction",
  lede: "Cells that have lived with an abnormal osmolarity for days have adjusted to it. Fixing the outside faster than they can readjust the inside is how a treatable number becomes a permanent injury.",
  body: [
    "When plasma sodium falls slowly over days, brain cells do not just sit there swollen. They quietly shed internal osmoles, potassium and small organic solutes, until their volume comes back to normal at the new lower outside osmolarity. They have adapted, and they now depend on that low number.",
    "Correct that sodium quickly and you raise the outside osmolarity while the inside is still running low. Water leaves brain cells, they shrink, and you can produce osmotic demyelination, which is often permanent. That is what rapid correction of chronic hyponatremia does.",
    "It runs the same way in reverse. A patient who has been hypernatremic for days has brain cells that gained osmoles to keep their volume. Drop the outside sodium fast and water floods in, and that is cerebral edema inside a rigid skull.",
    "Hence the rule you will see written on every order set: **no more than 8 mEq/L of sodium change in 24 hours**, in either direction. It is not caution for its own sake. It is the rate at which brain cells can rebuild their own osmoles."
  ],
  covers: ["w2-osmosis-cell-volume"],
  lab: "How fast is anything allowed to change is one of the six required decision points on your Week 2 flow chart, and the interactive lab is explicit that it applies to sodium in both directions. At least one endpoint on your chart has to say stop and do not give this, and this slide is where several of those endpoints come from.",
  big: "The number was never the problem. **The speed of the change was.**"
},

/* 29 ----------------------------------------------------------------- */
{
  k: "rows",
  kicker: "Back to Week 1",
  h: "A liter goes in. Where does it actually land?",
  lede: "You already own the table this needs. In a 70 kg adult: 42 L of water in total, 28 L inside cells, 14 L outside, and of that outside 11 L is interstitial and 3 L is plasma. You memorized it as 60, then two thirds and one third, then three to one. Now put a bag of fluid into it.",
  rows: [
    { dot: "1", dotClass: "navy",
      h: "One liter of 0.9 percent NaCl. Where does it end up?",
      p: ["All of it stays outside the cells, because the sodium cannot get in and so the water has no reason to follow it in. It spreads through the 14 L extracellular space in the usual three to one ratio.",
          "So of your liter, about 250 mL ends up in plasma and about 750 mL ends up in the interstitium. **That is the number that matters when somebody is bleeding**, because only the plasma share is holding up the blood pressure."] },
    { dot: "2", dotClass: "terra",
      h: "One liter of D5W. Where does it end up?",
      p: ["The dextrose is burned within minutes, so you have effectively given a liter of pure water with nothing to hold it anywhere. It distributes through all 42 L of total body water in proportion.",
          "Two thirds of it, about 667 mL, goes inside cells. The remaining third spreads through the extracellular space, and only about a twelfth of your liter, roughly 83 mL, ever reaches plasma. This is why D5W is close to useless for a patient who is short of circulating volume."] },
    { dot: "3", dotClass: "navy",
      h: "One liter of 3 percent NaCl. Where does it end up?",
      p: ["All of it stays outside, and it does something the other two do not: it pulls water out of the cells as well. The extracellular space grows by more than the liter you infused.",
          "That is the point of it. It is the fluid you reach for when the problem is a brain cell that is too swollen, and it is the fluid that will hurt somebody fastest if you get the rate wrong."] }
  ],
  covers: ["w2-osmosis-cell-volume"],
  lab: "Section 4 of the interactive Osmosis and IV Fluids lab is this calculation made runnable. You give it a weight, a sodium, a glucose, a fluid and a volume, and it reports the before and after for every compartment. Run your prediction from this slide through it and see whether the arithmetic agrees with you.",
  big: "Same liter, three completely different patients helped. The bag decides where the water lands."
},

/* 30 ----------------------------------------------------------------- */
{
  k: "text",
  kicker: "In the lab",
  h: "Measuring it yourself, across a membrane you can hold",
  lede: "Everything so far has been prediction. In lab you measure, and the measurement is what makes the prediction believable.",
  body: [
    "A selectively permeable membrane you can handle, dialysis tubing, does exactly what a cell membrane does for this purpose: it passes small molecules and holds large ones. Fill a length of it with a starch and glucose mixture, drop it into a beaker of water with iodine in it, and leave it.",
    "Two things happen and they happen at different speeds. Iodine, which is small, crosses inward and turns the starch inside blue black. Glucose, which is smaller than starch but far larger than iodine, crosses outward slowly and you can catch it in the beaker with a test strip. Starch, which is enormous, never goes anywhere. Three molecules, one membrane, three different results, and the only variable is size.",
    "Weigh the bag before and after and you have measured osmosis rather than diffusion. The bag gains mass, because the starch inside cannot leave and the water outside can enter. Raise the starch concentration and the bag gains faster, which is the concentration gradient term of Fick's law showing up on a balance."
  ],
  list: [
    "Small crosses, large does not. Same rule as the permeability ladder, now with a membrane in your hand.",
    "**Rate goes up with the gradient**, and you can see it on the scale as grams per minute.",
    "Nothing was pumped. Every result on the bench came from random motion and a barrier that is fussy about size."
  ],
  covers: ["w2-lab-diffusion-osmosis"],
  lab: "In the Week 2 lab you measure both movements across a selectively permeable membrane and relate what you got to molecular size and to the concentration gradient. You also run the graded saline series from the lab manual, plotting percentage hemolysis against saline concentration for three sets of cells, and you use section 4 of the interactive Osmosis and IV Fluids lab to check your compartment predictions against the arithmetic. Bring this slide to the bench: the three results above are your expected results, and anything that disagrees with them is worth writing down.",
  big: "Prediction is cheap. A number on a balance is the thing you can defend."
},

/* 31 ----------------------------------------------------------------- */
{
  k: "hook",
  kicker: "Memory hook",
  h: "The sentence that decides every fluid question you will ever get",
  lede: "This one is already written on the front of your Week 2 lab. It is there because it does more work than any other sentence in the unit.",
  hook: {
    icon: "!",
    iconClass: "teal",
    label: "Memory hook",
    h: "Water has no opinion",
    say: "Water has no opinion. It goes where the solute is.",
    p: [
      "Water is not choosing, sensing, or being transported. It is not on anybody's side. It moves down its own gradient and it stops when both sides match, and that is the entire behavior.",
      "So the only question you ever have to answer is which solute is stuck on which side of the membrane. Find the particle that cannot cross, and the water is already decided for you.",
      "This is why you cannot memorize a list of which bag goes where. The list falls apart the moment the patient is not a healthy adult with a normal sodium. The sentence does not fall apart, because it is about the physics rather than about the bag."
    ]
  },
  covers: ["w2-osmolarity-tonicity", "w2-osmosis-cell-volume"],
  big: "Find the solute that cannot move. **The water is already decided.**"
},

/* 32 ----------------------------------------------------------------- */
{
  k: "activity",
  kicker: "Do this now",
  h: "Three bags, three patients, five minutes",
  badges: [{t:"In pairs"}, {t:"5 min", cls:"time"}],
  lede: "Nobody writes anything down for this one. Talk it out with the person next to you, and be ready to say your reasoning rather than your answer. I will ask for the reasoning.",
  listLabel: "What to do",
  list: [
    "Patient one is Kofi. He has lost about 8 L of water and salt together through his gut over two days, his sodium is normal, and he is hypotensive. Pick a bag from the four on the earlier slide and say which compartment you are trying to fill.",
    "Patient two drank six liters of water in three hours after a marathon and is confused. Her sodium is 118 mEq/L. Say what her brain cells are doing right now, then say what 3 percent NaCl would do and what limit you would have to respect while giving it.",
    "Patient three is a diabetic patient with a glucose of 900 mg/dL and a measured sodium of 128 mEq/L. Decide whether that sodium is really low, using only what is on this deck. One sentence.",
    "Each pair picks the one you disagreed about most and gets ready to defend both positions, not just the one you landed on."
  ],
  timer: 300,
  covers: ["w2-osmolarity-tonicity", "w2-osmosis-cell-volume"],
  big: "If you find yourself reaching for a memorized list, stop and ask which solute cannot cross."
},

/* 33 ----------------------------------------------------------------- */
{
  k: "close",
  kicker: "Before next class",
  h: "Four things, and none of them take long",
  lede: "The next deck this week picks up where this one stops: everything that needs a protein to get across. Come in able to do these four.",
  list: [
    "Draw the fluid mosaic from memory, with all six parts labeled. Ninety seconds, no notes. Then check it against the figure in this deck and mark what you left out.",
    "Derive 308 mOsm/L for 0.9 percent NaCl without looking anything up, then do 0.45 percent and 3 percent the same way. If you can do all three in under three minutes you are ready.",
    "Work Part 1 of the dry lab packet, Why the Water Leaves and How to Bring It Back, in pen, including the three hand drawn red cells with water arrows.",
    "Open the interactive Osmosis and IV Fluids lab and work the first three of the eleven orders. Write your read before you unlock the options, because that record is half of what gets graded."
  ],
  covers: ["w2-membrane-structure", "w2-permeability", "w2-fick-diffusion", "w2-osmolarity-tonicity", "w2-osmosis-cell-volume"],
  big: "**Small, greasy and uncharged walks through. Water follows the solute that is stuck.** Those two sentences are the deck."
}

  ]
};
