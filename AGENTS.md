# Project Context

`react-waterfall-timeline` is a React waterfall timeline library similar to the Chrome DevTools Network panel. It uses TypeScript, plain CSS, and Vite, with Storybook for development previews and interaction tests. It supports React 18+ and uses React 19 for development.

## Code Map

- `src/index.ts`: Public package exports. Keep `src/components/Waterfall/index.ts` and `types.ts` in sync when adding public APIs.
- `src/components/Waterfall/`: `Waterfall.tsx` handles layout, grouping, and the cursor; `WaterfallItem.tsx` handles items and tooltips; `WaterfallRuler.tsx` / `WaterfallMarkers.tsx` render ticks and persistent markers; `utils.ts` handles time calculations; `Waterfall.css` provides styles.
- `src/stories/Waterfall.stories.ts`: Examples and `play` interaction tests, under `Components/Waterfall` in Storybook.
- `.storybook/`: Storybook configuration. `vite.config.ts`: Library build and Vitest browser test configuration.
- `README.md`: Usage and API documentation.

## Component Conventions

- All times use milliseconds and the same time origin. Items, ticks, the cursor, and markers share one time range.
- Items without `startTime` display only their names. Items with a start time but no `endTime` are in progress.
- `groupId` and `groups` control grouping; `markers` define persistent vertical time lines. Preserve compatibility with the existing `items`-only usage.
- Tooltips render through a portal into `document.body` to avoid ancestor clipping and transforms affecting positioning.
- The component fills its parent, so examples need an explicit container height. Consumers must import `react-waterfall-timeline/style.css`.

## Common Commands

Use npm and the `package-lock.json` lockfile.

| Purpose                              | Command                                  |
| ------------------------------------ | ---------------------------------------- |
| Development preview (port 6006)      | `npm run storybook` or `npm run dev`     |
| Library build (ESM, CJS, types, CSS) | `npm run build`                          |
| Static Storybook build               | `npm run build-storybook`                |
| Browser tests (Playwright Chromium)  | `npx vitest run --project storybook`     |
| Source type check                    | `npx tsc -p tsconfig.app.json --noEmit`  |
| Vite configuration type check        | `npx tsc -p tsconfig.node.json --noEmit` |
| Lint                                 | `npm run lint`                           |

- Use `--noEmit` for type checks. Running `tsc -b` directly emits JavaScript and declaration files into `src/`, causing duplicate Storybook stories.
- `npm run build` builds only the library; it does not update `storybook-static/`. If that directory interferes with lint, exclude generated files with `npm run lint -- --ignore-pattern storybook-static`.
- `dist/` and `storybook-static/` are generated directories; do not edit or commit them. `npm run release` publishes to npm; run it only when the user explicitly requests publication.

## Development Guidelines

- Every feature addition, change, or removal must include corresponding new or updated Storybook examples.
- Keep changes minimal: prefer updating existing examples and add new ones only when existing stories cannot clearly demonstrate the change. Avoid duplicate examples, unrelated refactors, and extra dependencies.
- Prefer verifying interactions in the corresponding story's `play` function using `storybook/test`. Run relevant tests, type checks, lint, and builds according to the change's scope. Documentation-only changes do not require component tests.
- Update types, exports, and the README when public APIs change. Preserve existing default behavior.
- Follow `.prettierrc.json` and format only files changed for the task. Preserve unrelated workspace changes.
- Use `<type>(<scope>): <summary>` for PR titles, with lowercase type and scope, a short imperative summary, and no trailing period. Do not add a PR body unless explicitly requested.
- Do not use Computer Use unless the user explicitly requests control of their computer.
