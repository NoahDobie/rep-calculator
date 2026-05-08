# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

Bootstrapped with Create React App (`react-scripts`). All scripts in `package.json`:

- `npm start` — dev server at http://localhost:3000
- `npm run build` — production build to `build/`
- `npm test` — Jest watcher (CRA preset). Run a single test with `npm test -- --testPathPattern=<file>` or `npm test -- -t "<test name>"`. There are currently no test files in `src/`.

Deployed at https://max.noahdobie.com/.

## Architecture

Single-page React + TypeScript app that estimates a 1-rep max from a (weight, reps, lift type) input and renders a 50–95% rep/weight table. State is local to `App.tsx`; styling is Tailwind.

### Calculation pipeline (`src/utils/calculations.ts`)

This is the only non-trivial logic in the repo. Two things to know before touching it:

1. **Lift-type-specific formula blends.** `calculateAverageOneRepMax` averages a *different subset* of formulas (Brzycki, Epley, Mayhew, Wathan, Lombardi, O'Conner) per lift type — Squat/Deadlift use Brzycki+Epley+Lombardi, Bench uses Wathan+Mayhew+Epley, Other averages four. Changing which formulas feed which lift will change every displayed number, so confirm intent before editing the `switch`.
2. **Reps are decremented by 1 before formulas run** (when reps > 1). This is a deliberate conservative adjustment — the underlying formulas tend to overestimate, so the app feeds them `reps - 1`. Don't "fix" this without understanding the impact on output.

`calculateReps(oneRepMax, percentage)` uses the Epley-derived `30 * (1RM/weight − 1)` to estimate reps achievable at a target percentage; it's what populates each row in the output grid.

### State and persistence

`useLocalStorage<T>` (`src/hooks/useLocalStorage.ts`) is a typed `useState` wrapper that reads/writes JSON to `window.localStorage`. Every persisted user input — `weight`, `reps`, `unit`, `liftType`, `isDarkMode` — flows through it from `App.tsx`. Keys are the literal strings passed in (e.g. `'weight'`); renaming a key silently invalidates existing users' saved values.

`useTheme` wraps `useLocalStorage<boolean>('isDarkMode', true)` and additionally subscribes to `prefers-color-scheme` changes — system theme changes overwrite the persisted value at runtime.

### Rendering

`App.tsx` owns all state and conditionally mounts `CalculatedRepsDisplay` via `CSSTransition` only when `weight > 0 && reps > 0`. Dark mode is plumbed as an `isDarkMode` prop down the tree (no context); each component branches Tailwind classes against `dark-*` / `light-*` color tokens defined in `tailwind.config.js`. There is no class-based `dark:` variant — the prop drives the styling explicitly.
