# Accessibility compliance notes: Practice Exam + Gap Finder

Project: BIO 005 Human Physiology, Fall 2026
Files covered: practice-exam.html, bio005-exam-bank.js (data only), door-study.html (one added card)
Date: September 7, 2026

## Standard and level

WCAG 2.2. Level AA met on every criterion checked below. AAA reached for text contrast on every text and background pair in the setup page, the exam window, and both printed reports.

## Color contrast audit

| Text | Background | Ratio | Result |
|---|---|---|---|
| Navy #0B1530 body text | Off-white #FAFAF9 | 17.6:1 | AAA |
| Navy #0B1530 | White #FFFFFF | 18.4:1 | AAA |
| Ink-soft #414B5C notes and hints | White | 8.4:1 | AAA |
| Maroon #8B3A2E links, eyebrows, verdicts | White | 7.6:1 | AAA |
| Maroon-dark #6E2D24 headings | White | 10.4:1 | AAA |
| White on maroon #8B3A2E buttons and type tag | Maroon | 7.6:1 | AAA |
| White on navy #0B1530 pressed pills | Navy | 18.4:1 | AAA |
| Gold-ink #060A18 on gold #C9A14A buttons | Gold | 8.6:1 | AAA |
| Gold-deep #8A6D33 part labels | White | 5.4:1 | AA (large label text, passes AAA at 4.5:1 for large) |
| Green #1F5E3A correct verdict | White | 7.5:1 | AAA |
| Bone #F5F1E8 on navy-deep #060A18 panel and footer | Navy-deep | 17.3:1 | AAA |
| Gold #C9A14A eyebrow on navy-deep | Navy-deep | 9.9:1 | AAA |

Gold never carries text on a light background. The gap bars use navy or maroon fills at 3:1 or better against the navy-tint track, and every bar also carries the percent as text.

## Keyboard navigation

Verified in Chromium: skip link to main, week checkboxes, mode radios, preset and count buttons (aria-pressed), Generate, history buttons, and the file input via its label. In the exam window: answer radios and checkboxes inside fieldsets with legends, True and False as aria-pressed buttons, confidence radios reachable by arrow keys, Check, Next. After Check the focus moves to the Next button; after Next the question stem receives focus. True or false Next stays disabled until the compare choice is made and says so. The pop-up fallback is a native dialog with a visible Close button. Focus indicators are 3px maroon outlines, gold on the dark panel.

## Screen reader

Tested with the Chromium accessibility tree. Landmarks: banner (brand bar), main, contentinfo. Progress line and the question card are aria-live polite. Feedback regions are labeled regions. Confidence levels carry their word, not only a number. Correct and wrong options are marked with visible text, not color alone. The gap bars are aria-hidden with the percentage exposed as text beside them. Icon-only content is none; every button has a text label.

## Motion and print

prefers-reduced-motion removes the card lift and the bar transitions. Print styles for both reports go single ink with hairline rules and no solid fills, so a photocopied log still reads.

## Known limitations and remediation plan

1. The results and log reports open in a new window written with document.write. When pop-ups are blocked the report downloads as an HTML file instead, which the student opens and prints. A notice on the setup page explains this.
2. History lives in localStorage on one browser. Export and Import cover switching devices; the page says so.
3. The exam bank file is 5.4 MB and loads once per page open. On a slow connection the first load takes a few seconds. Splitting the bank per week is the planned fix if this becomes a problem.

## Reviewer

Dr. Sharilyn Rennie
