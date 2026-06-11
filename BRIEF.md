# Atelier Verheight — Brief

## Client
High-end concrete & stone fabrication atelier near Lyon. 40 years, family-run.
One-off commissioned pieces for architects: monolithic stone sinks, marble
bathtubs, solid stone staircases, carved fireplaces, cast concrete vanities,
board-formed concrete elements. Each piece is unique, tied to a specific
architectural project.

## Audience
Architects and interior designers. Design-literate, impatient, judge in
seconds. The site must make a Paris studio think: "these are the people we
call for the impossible piece."

## Concept (governs every decision)
"The site feels heavy and pure; it displays the uniqueness of their work by
moving with precision, intent and force."

## Thesis
Two ways to make a noble object:
- STONE is subtracted — carved away to reveal form. Register: light sections,
  slower, reveals feel like uncovering (clip-path reveals).
- CONCRETE is added — poured to fill a form. Register: dark sections, mass,
  elements arrive and settle into place.
One visual system; the distinction lives only in pacing and reveal behavior.
Recurring content idea: the material is millions of years old — the piece
connects its owner to deep time.

## Three words (the filter for every choice)
Space. Controlled. Imposing.
If any element is busy, sloppy, or timid — cut it.

## Visual system
- Color (warm monochrome, color only ever comes from photography):
  --stone-50:#F4F2EF --stone-100:#E8E5E0 --stone-300:#B5B0A8
  --stone-600:#6B6760 --stone-900:#1A1815 --stone-950:#0E0D0B
  Light sections = stone register. Dark sections = concrete register.
  Alternate deliberately. No accent color anywhere in UI.
- Style: brutalist editorial. ≥50% negative space per view. Extreme scale
  contrast: enormous display type beside tiny uppercase meta (this pairing
  is the core aesthetic move — use it in the hero and section heads).
  Asymmetry within a strict grid. Full-bleed single-image moments allowed.
- Composition references (apply, don't mention):
  - Ando: geometry + light defines and directs space
  - Michelangelo's Prisoners: show process — the piece emerging from raw
    block, before/after at once
  - Kubrick: severe symmetry + vastness makes one object an imposing focal
    point in negative space

## Motion grammar
Precise, intentional, weighted. Slow eases; things settle, never bounce or
float. ONE signature interaction: a pinned, scroll-scrubbed clip-path reveal
sequence in Selected Works (images uncover from the bottom, sequentially,
hard cuts — subtraction made visible). Everything else is quiet: masked
SplitText line reveals for headings, subtle weighted entrances. Hover states
exist but are restrained (e.g. underline fill, image scale 1.02 max).

## Structure (exactly 5 sections + header/footer)
1. HERO — 100vh, dark (concrete register). One imposing full-bleed piece.
   Display title + tiny meta index. The concept stated in one French line.
2. MATIÈRE (philosophy) — light. Subtraction vs addition, deep time.
   Editorial split: large statement typography + one framed image.
3. SAVOIR-FAIRE (process) — dark. Carving and casting. Process imagery,
   the before/after idea, force and precision in the copy.
4. ŒUVRES (selected works) — light. The signature pinned clip-reveal
   sequence: 4–5 commissioned pieces, each with name, material, location,
   year (e.g. "Vasque monolithique — Pierre de Bourgogne — Villa M, 2024").
5. COMMANDE (commission/contact) — dark. "Entamer une commande." Sparse
   form or direct contact, aimed at architects. Imposing closing statement.

Header: minimal — wordmark + one nav line, mix-blend or per-section color.
Footer: one line — atelier, location, contact, year.

## Content
Write all French copy (sparse, confident, concrete — no superlatives).
Use placeholder images from /public/images (assume 10 images named
work-01.jpg … work-10.jpg exist); art-direct via framing, scale, and crop.

## Definition of done
Every view passes: ≥50% negative space, one focal point, passes the three
words, works as a considered mobile experience (no pins on mobile — works
become a swipeable scroll-snap carousel), reduced-motion supported,
no anti-slop violations.okay give me phase on