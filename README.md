# Cruise-Trip-Summary

Demo for a TST cruise trip summary page — a React 18 app with **no build step**. JSX is transpiled in the browser by Babel-standalone, so you can open `index.html` directly and it runs.

## Run it

Easiest:

```sh
open index.html
```

Or via any static server (some browsers restrict `file://` for cross-script loads):

```sh
python3 -m http.server 8000
# then visit http://localhost:8000/
```

## Layout

| Path | What it is |
|---|---|
| `index.html` | Entry point. Loads React 18 UMD + Babel standalone, then the JSX modules in order. |
| `src/icons.jsx` | Inline SVG icon set (`window.Icons`). |
| `src/data.jsx` | Mock trip data, totals math, formatters (`window.MOCK`, `computeTotals`, `fmt`, `fmtDate`). |
| `src/components.jsx` | Shared UI: `Button`, `Header`, `Hero`, `Select`, `CheckboxRow`, `Toast`, etc. |
| `src/sections.jsx` | Tab cards: Overview, Travel protection, Preferences, Pre/post travel, Add-ons, Receipt. |
| `src/tweaks.jsx` | Dev panel — guest name, travelers, brand color, error toggles. |
| `src/app.jsx` | Root `App`, tab state, totals wiring, `ReactDOM.createRoot` mount. |
| `styles.css` | TST design-system tokens (`--tds-*`) and component styles. |
| `reference/cruise-trip-summary.html` | Original single-file artifact with everything inlined — design source of truth. |

The JSX files share globals via `window.*`, so the `<script>` order in `index.html` matters: `icons → data → components → sections → tweaks → app`.
