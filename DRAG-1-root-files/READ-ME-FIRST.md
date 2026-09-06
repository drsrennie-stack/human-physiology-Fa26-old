# Listen to this page, and the device guidance. September 5 2026.

Two files. Drag both into the repo root. Do not upload this file.

## bio005-nav.js

Already on every page, so the Listen button appears everywhere with no other change.

**A Listen to this page button in the footer of every page.** Press it and the browser reads
the page out loud, one paragraph at a time, highlighting each one so a student can follow
with their eyes and ears together. A small control appears in the bottom right corner with
pause, a speed setting of 0.75x through 1.5x, and stop, so nobody has to scroll back to the
footer to pause it. The speed is remembered.

It reads what is on the page, in order, and skips the navigation, the footer and the dock.
It stops when the page is closed.

The button says, under its own label, "Reads the page out loud. This is not a screen
reader." That wording matters. A student who uses a real screen reader has something far
better already configured the way they like it, and a course that blurs the two looks like
it does not understand the difference.

**Three things this build fixed along the way.**

The course home is three screens in one file and only one is on screen at a time. Its skip
link pointed at an element inside the returning-student screen, so a first-time visitor
pressing Tab landed in a hidden panel. The script now checks whether a skip link target is
actually on screen and repoints it at the content if it is not. That was a real keyboard
bug on your front door and it is fixed on every page at once.

Link labels with a sub-line underneath were being read as one run-on word, so "Course
schedule / Every week, with dates and reading" came out as "Course scheduleEvery week". The
reader now uses the rendered text rather than the raw text, so the break is there.

Separator dots, arrows and tick marks were being spoken as words. They are now read as
pauses or skipped, and a heading numbered 01 reads as "01, Course identification" instead
of "01Course identification".

## accessibility.html

Two new sections.

**What your own computer already does.** VoiceOver with Command and F5 on a Mac, Narrator
with the Windows key plus Control plus Enter, Speak Screen on an iPhone, TalkBack and Select
to Speak on Android, Reader View, and browser zoom. Every keystroke checked against the
vendor's own documentation. Most students have never been told any of this exists, and the
ones who would benefit most are the least likely to go looking. It also says plainly that
using any of it is not a special arrangement and they do not have to tell anyone.

**The Listen button, and what it is not.** Says outright that it is text to speech and not a
screen reader, that a screen reader does far more, and that anyone already using one should
keep using theirs. Then it gives the real reasons to press it: long reading weeks, tired
eyes, studying in the car before a shift, taking material in better by ear, reading
physiology in a second language.

Verified numbers on the page refreshed to 101 pages and 2,566 checks.

## Checked

101 pages scanned with axe-core against WCAG 2.0 A and AA, 2.1 A and AA and 2.2 AA. Zero
violations. Every page has a language, a title, a skip link and a main landmark.

The reading was tested on the course home, a locked week page, the syllabus, the
accessibility page and the CBC lab. No navigation or footer text leaks into what is read.
The highlight color measures 10.16 to 1 against the text on it, which is AAA.

## One thing that is deliberate

On a page where your reading mode has collapsed the sections, Listen reads the section that
is open, not the whole page. That matches what the student can see when they press it. If
you would rather it always read everything, say so and I will change it.
