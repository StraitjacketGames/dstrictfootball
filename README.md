# GI Grassroots Football — V0.2

A modular browser-based prototype for a fictional Nigerian grassroots football management game.

## V0.2 additions
- 352 fictional players across 16 clubs (22 per club)
- Player profile data: age, nationality, position, preferred foot, shirt number
- 11 football attributes per player and a prototype overall rating
- Estimated weekly wages, player values and contract length
- Squad management screen with search, position filters and sorting
- Squad size, average age and average rating summary
- Existing V0.1 career setup, custom club creation, dashboard and local save/load retained

## Run locally
Because the project uses JavaScript ES modules, serve it through a local web server instead of opening `index.html` directly via `file://`.

For example, from this folder:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000`.

On Android, use a local-server app or upload the folder to a static host, preserving the `css/` and `js/` folders.

## Current limitations
- Match engine, visual pitch, fixtures, tactics, transfer market and AI recruitment are not implemented yet.
- Player ratings and financial values are initial prototype values and need balancing after match simulation exists.
- Career saves are stored in the browser/device being used and do not sync across devices.
- Custom clubs currently take the identity of the selected club slot for the career save. The full league replacement and competition data will be formalized with the league system.

## Structure
- `index.html` — app shell
- `css/style.css` — visual styling and responsive layout
- `js/main.js` — navigation and career flow
- `js/gameState.js` — local save/load
- `js/data/clubs.js` — 16-club database
- `js/data/players.js` — 352-player database
- `js/ui/` — screen rendering including squad management
