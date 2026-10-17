# Design brief

WebAudio Hub should feel like a well-made piece of audio hardware: the restraint of Dieter Rams' Braun products and the playful precision of Teenage Engineering. Less, but better. Every element does a job.

## Principles

1. **One bold thing.** The orange button on the faceplate is the memorable element. It opens a random app. Everything around it stays quiet.
2. **Panels and seams.** Content sits on panels that meet at 1px seams, like a faceplate assembled from parts. No drop shadows on cards, no gradients as decoration.
3. **Controls look like controls.** Filters are keys with indicator lamps, options are two-position switches and toggles. Their state is visible at a glance.
4. **Status is light.** An LED on every app shows whether it's reachable: lit orange when it is, a hollow ring when it isn't.
5. **Screens are dark.** App previews sit in recessed dark display windows, desaturated until you point at them.
6. **Plain words.** Sentence case, active verbs, no marketing.

## Tokens

| Token          | Light     | Dark      | Use                                   |
| -------------- | --------- | --------- | ------------------------------------- |
| `--base`       | `#dcdcd7` | `#1c1d1f` | Page background (brushed aluminium)   |
| `--panel`      | `#f2f2ee` | `#26272a` | Panels, tiles, keys                   |
| `--panel-sunk` | `#e6e6e1` | `#202123` | Recessed areas, pressed keys          |
| `--display`    | `#1f2023` | `#111214` | Screens and readouts                  |
| `--ink`        | `#16171a` | `#e9e9e4` | Primary text                          |
| `--slate`      | `#5a5c60` | `#9b9da0` | Secondary text                        |
| `--seam`       | `#c3c3bd` | `#36373b` | Borders and seams                     |
| `--signal`     | `#ff5a00` | `#ff6a1a` | The single accent: button, LEDs, audiframe |
| `--signal-text` | `#c24400` | `#ff6a1a` | Orange for small text, meeting AA contrast |

**Type:** Archivo throughout, using its width axis. Expanded (wdth 125) for the wordmark, semi-expanded (wdth 112) for app names, normal width for body text. Tabular numerals for counts.

**Radii:** 3px for keys and inputs, 6px for panel groups, full round for the button, LEDs and tags.

## Layout

```
┌ faceplate ─────────────────────────────────────────────┐
│ webaudio                         ┌ grille ···········┐ │
│ hub                              │ ( ● )  up next:   │ │
│ one-sentence description         │        Strudel    │ │
│                                  │        roll again │ │
└────────────────────────────────────────────────────────┘
[ everything | drums | sequencers | synths | modular | live coding | studios | toys ]
[ search …………………… ]  [shuffle|A–Z] [grid|list] (o) audiframe (o) hide unreachable [add an app]
20 apps
┌──────┬──────┬──────┬──────┐   tile: dark display with preview
│ tile │ tile │ tile │ tile │         name, description, three tags
├──────┼──────┼──────┼──────┤         LED · host · audiframe · category
└──────┴──────┴──────┴──────┘
footer: how the pieces fit (Hub / audiframe / Noodlr Board), licences
```

Left-aligned throughout. The grid reflows from four columns to one; category keys go from eight across to four, then two.

## Behaviour

- Order is shuffled on each visit so no app is always first; A–Z is one tap away.
- Search matches name, description, URL and tags. Tag pills on a tile search for that tag.
- Category and search are kept in the URL so a filtered view can be shared.
- The random button respects the current filters. Its readout shows which app it will open next.
- Reachability is checked in the browser with a no-cors request; unreachable apps dim and can be hidden.
- Screenshots are captured at build time with Playwright. Without one, a tile shows its category glyph.

## Quality floor

Responsive to 320px, visible keyboard focus everywhere, reduced motion respected, light and dark themes from the system setting, colour contrast at WCAG AA for text.
