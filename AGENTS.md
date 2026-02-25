# Repository Guidelines

## Project Structure & Module Organization
- `code/` holds the Foundry VTT system logic (`.mjs` modules) organized by feature (applications, documents, dice, utils).
- `templates/` contains Handlebars templates; `styles/` contains PostCSS sources compiled to `black-flag.css`.
- `json/` and `packs/` store compendium and reference data; `lang/` holds localization.
- `artwork/` and `fonts/` contain assets and licensing references.
- `utils/` hosts CLI tooling (packing/unpacking data); `system.json` and `build-config.json` define packaging metadata.

## Build, Test, and Development Commands
- `npm run build`: full build (rollup bundle + pack data).
- `npm run build:code`: bundle `.mjs` modules via Rollup.
- `npm run build:db`: package compendium data via `utils/cli.mjs`.
- `npm run build:styles`: compile PostCSS to `black-flag.css`.
- `npm run watch`: watch and rebuild code with Rollup.
- `npm run lint` / `npm run lint:fix`: ESLint for `.mjs`.
- `npm run prettier` / `npm run prettier:fix`: Prettier formatting.

## Coding Style & Naming Conventions
- Use tabs for indentation and keep lines at 120 columns (Prettier config).
- Modules are `.mjs`; keep file names lower-case and descriptive by feature.
- Run ESLint before commits; prefer small, focused modules in `code/`.

## Testing Guidelines
- No automated test runner is configured; rely on `npm run lint` and manual validation.
- Validate changes by running a build and loading the system in Foundry VTT (using `system.json`).

## Commit & Pull Request Guidelines
- This checkout has no Git history, so no local commit conventions are visible.
- If syncing with the upstream `black-flag` project, mirror its short, imperative messages and include issue tags when available.
- PRs should include a clear summary, steps to verify in Foundry, and screenshots for UI changes.
