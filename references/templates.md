# Template measurements

> Reference data to calibrate your eye, not rules to copy. The page you are building decides which of
> these values apply.

Ten landing-page templates from a hosted site builder, labeled A–J. Measured on 2026-11-06 from the live
demo pages by reading the style sheets, computed styles, and each page's scroll-reveal settings (effect, speed,
intensity, delay, stagger). Distances: intensity i → translate ≈ 6px + 4.2px × i (i0 0.375rem, i1 0.6375rem,
i2 0.9rem).

| Template | Family | Background | Display type (largest heading) | Button | Scroll reveals | Hover |
|---|---|---|---|---|---|---|
| A | Split photo hero | #0c1d29 dark teal, diagonal lines | Dela Gothic One 52px / 400, yellow | 64px tall, 12px radius, solid yellow #faeb64, 12px UPPERCASE 700, tracking 0.3em | Title fade-up i0, text i1, buttons i2; 1000ms | Link underline |
| B | Glass gradient | #1e1c2a plum→navy, zigzag peaks | Bricolage Grotesque 50px / **300**, −0.33px | 53px, 7px radius, magenta vertical gradient | Divider i0, text i1–i2, buttons i3, side links **fade-left**, image zoom-out-image i3; 1000ms | Button bg, icons scale 1.06 |
| C | Soft light pastel | Teal→sky gradient with bubbles, then white | Instrument Sans 58px / 500, −1.6px | 52px, pill (48px), light diagonal gradient | **fade-in + 125ms stagger** on most text, buttons fade-up i3, image **pop-in**, zoom-out-image | Lift `translateY(-11.25%)`, icon scale 1.06 |
| D | Editorial serif | #f5f3eb cream | Gloock serif 60px / 400 UPPERCASE | 56px, pill, outlined 3px, UPPERCASE 0.05em | Everything **fade-in i5 + 125ms stagger**, image zoom-out-image i1 | Button scale 1.0425, icons 1.095 |
| E | Glass gradient | #142870 navy, low-poly mesh | Inter 68px / 500, −4px | 64px, 12px radius, mint→periwinkle 45° gradient, 600 | Text fade-up i0/i1, buttons i2, card **fade-in-background delay 500ms**, image zoom-in, divider fade-in | Button scale 1.025 |
| F | Soft light pastel | Blush→lavender gradient, thin grid lines | Inter 59px / 400, −1.47px; Pacifico logo | 55px, pill, peach→violet 233° gradient | All text **fade-in i10 + stagger 125**, buttons fade-in **delay 250**, divider **fade-down delay 125**, image zoom-out-image | Button scale 1.0425, icons 1.11 |
| G | Dark minimal + gradient | #1c1c1c charcoal, faint geometry | Inter 73px / **300**, −4.77px | 66px, pill, pink→violet 45° gradient, 300 | **None** — page-load fade only (`opacity 1s`) | Button scale 1.0425 + bg, icons 1.13 |
| H | Split photo / color block | #f5f5f5 + coral block, diagonal lines | Lexend 62px / **200** | 53px, 11px radius, solid white | Eyebrow **fade-down** i1, title fade-up i4, text i3, buttons **delay 500**, framed image fade-down, container fade-in-background, icons stagger 125 | Button scale 1.06, icons 1.18 |
| I | Dark minimal + gradient | #1c1c21, dimmed photo bg | Inter 78px / **300**, −4.33px, **gradient text** blue→orange | 61px, pill, blue→orange 104° gradient | Text fade-up i0/i1/i2, buttons i2, container fade-in-background, images zoom-out i5, list stagger 125 | Button scale 1.0425, icons 1.11 |
| J | Bold color blocks | #2b2738 + violet/orange blocks, hex lines | Inter 76px / 700, underlined key word | 52px, 8px radius, solid violet | Text fade-up **750ms + stagger 125**, zoom-in 500ms, image zoom-out-image 1000ms, buttons fade-up 500ms **delay 250**, fade-down headings | Button scale 1.025, icons 1.0775 |

## Cross-template tallies

- Reveal duration 1000ms: 9/10 (J: 500–750ms). Easing `ease`. Replay: never.
- Default reveal: fade-up 6/10 · fade-in-dominant 3/10 · none 1/10.
- 125ms stagger used: 7/10.
- Button-row delay (250–500ms): 3/10.
- Image reveal zoom-out-image: 6/10.
- Button hover scale: 1.025 (2), 1.0425 (4), 1.06 (1), lift (1), none (1).
- Display weight ≤ 500: 8/10. Inter present: 7/10. Pill buttons: 6/10. Gradient buttons: 6/10.
- Dark backgrounds 6/10, light 4/10.
