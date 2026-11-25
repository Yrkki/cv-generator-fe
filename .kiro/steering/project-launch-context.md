# cv-generator-fe: project and launch context for agents

## Running the app

- The user's way to run the app manually is `. ./launch.sh`, which shows an interactive menu. It sources `env.sh` on every launch, so the latest environment applies.
- For a complete run (with the server APIs), use option **2** in the menu, "Rebuilding prod server with integration with config (start:node: node server.js)". It does the same as:

  ```bash
  . ./env.sh
  npm run dev:build:build
  npm run dev:test:integrate:package
  npm run start:node
  ```

- Option **3** is for debugging the production configuration through `ng serve`:

  ```bash
  . ./env.sh
  npm run dev:build:build
  npm run dev:test:integrate:package
  npm run start:ng:prod
  ```

- If unsure, trace `launch.sh` and the `package.json` scripts and understand what they are for before you build your own launch sequence.

## Server APIs

- `/config`, `/geolocation` and `/metrics` are provided only by the Express server in `server.js`, so only under option 2.
- Under `ng serve` (option 3), `/config` returns `index.html`. The app then keeps the defaults built into `environment.prod.ts`, and the remote Heroku backend is used.

## Backend

- The backend URL comes from `serverEndpointUri` in `env.sh`. It is either the local `http://localhost:3000` or the remote `https://cv-generator-project-server.herokuapp.com` (or the `-eu` variant).
- Data is served as `/json/<name>.json`, for example `/json/entities.json`. It is not `/<name>`. Image calls follow similar patterns.

## Content Security Policy

- `server.js` sends a strict CSP built by `constructCSPHeader()`. It allows the project server endpoints in `projectServerEndpoints`, including `http://localhost:3000`.
- `CV_GENERATOR_FE_RELAX_CSP=true` (config key `relaxCsp`, default false) makes `server.js` send a fully permissive CSP instead. It is independent of `CV_GENERATOR_FE_DEBUG`.
- Agents: when a local test is blocked by CSP violations, set `CV_GENERATOR_FE_RELAX_CSP=true` for that server process only, for example `CV_GENERATOR_FE_RELAX_CSP=true npm run start:node` after sourcing `env.sh`. Do not edit `env.sh` for this. Verify CSP-related changes with the flag off.
- Never relax the CSP in a deployed environment.

## Secrets

- `env.sh` is a local, untracked file that holds secrets.
- You may source it to launch the app.
- Never print its contents, `cat` it, or echo or log the environment.

## User's running servers

- Port 5000 is the only supported port, because it is hardcoded in many places. Do not use other ports.
- Before a workflow that needs a running app, the user stops their own server.
- Agents start option 2 on port 5000 themselves (through `launch.sh` or its traced command sequence above), rebuild and restart it after their changes, and stop it when they finish.
- If port 5000 is already in use when you start, do not stop that process. Stop and ask the user.
- Sometimes the user runs a server on port 5000 themselves, through one of the launch.sh options, and sometimes not. Some options monitor with nodemon (for example option 1, which rebuilds first, and option 5, `nodemon server.js &`). A nodemon server serves `dist/cv-generator-fe/browser` live and restarts itself when `server.js` changes, and also after a `dist` rebuild. After rebuilding, poll http://localhost:5000 until it answers again before any browser check, and retry page loads that get "connection refused".
- When the user says their nodemon server is running, do not start, stop or restart a server. Rebuild `dist` (`npm run dev:build:build && npm run dev:test:integrate:package`, with `< /dev/null`) and poll http://localhost:5000.
- When the user has not said a server is running, check port 5000 first and follow the rules above.

## Shell commands

- The agent shell can be shared: a process left running in the background (for example `nohup node script.mjs &`) can block every later command, which then returns no output and exit code -1.
- Run builds, test runs and Playwright scripts in the foreground with a long enough timeout. Do not leave background processes running, and do not use `pkill` (it is not installed).
- Playwright checks: wait for the page data before measuring (for example until `a.frequency` elements exist), not just for the `load` event. Sections render late, so scroll through the page before looking up toggles or inputs. Keep each script short and run cases one at a time.

## Rendered content

- What the page renders depends on the view state persisted in `localStorage`: filters, truncation thresholds, and collapsed or expanded sections.
- A fresh browser profile with empty `localStorage` renders the default, truncated view.
- Do not compare page sizes from different `localStorage` states.

## Unit tests

- Unit tests use `MockDataService` example data, with no backend.
- Commands:
  - `npm run test:once` runs the suite once with coverage.
  - `ng test --include='**/<name>.spec.ts'` focuses a single spec.

## Code structure: class inheritance

- The codebase uses class inheritance extensively, in places where dependency injection and delegation were not preferred.
- `FooterComponent`, through `FooterProviderComponent`, is an abstract base.
  - Its default `key` is `'Footer'`, which is a placeholder and not a real entity.
  - The concrete keys come from `/json/entities.json`. The 4 subclasses that `extends FooterComponent` are pipeline, service-catalog, reference-architecture and version.
  - Never test or reason about behaviour using the `'Footer'` placeholder key.
- `GeneralTimelineComponent` has a similar hierarchy, for example `GeneralTimelineMapComponent`.
- Map the inheritance hierarchy before analysing lifecycle or change detection behaviour.
- Put shared behaviour as high in the hierarchy as it applies, for example in `*ProviderComponent` base classes (`extends .*ProviderComponent`), which exist to extract common code. Follow DRY and avoid repeating the same code in sibling classes.

## Change detection and rendering strategy

- The app is zoneless (`provideZonelessChangeDetection()`), and since Angular 22 components default to OnPush. There is no app-wide switch to Eager.
- Keep OnPush. Refresh components with targeted `ChangeDetectorRef.markForCheck()` when the data they display changes, for example on `DataLoaderService.dataChanged$`.
- `markForCheck()` marks a component and its ancestors, not its descendants. A child that reads shared model or service state needs its own notification.
- Use `changeDetection: ChangeDetectionStrategy.Eager` only as a justified exception for a specific component, and record why.
- Never use `setTimeout` to trigger rendering. A timer does not trigger change detection without Zone.js.
- No `NG0100` (ExpressionChangedAfterItHasBeenCheckedError) in development builds. Fix the cause and do not suppress the check.
- Rendering strategy: fast and optimistic.
  - Render the main content as soon as its data is available.
  - Update minor parts (for example the AppVeyor version in the footers, geolocation, or late chart data) asynchronously when their responses arrive.
  - A slow or failed minor request must never hold back the rest of the page.
  - Layout jumps caused by late updates are accepted for now and will be addressed later.
- Signals and an OnPush-native redesign are planned for later. Do not start that migration unless asked.
- The commented-out `// setTimeout` lines record what each place needed before zoneless. Keep them unchanged. The user adds `removable-obsolete` markers once each line's purpose is verified as covered.

## Dependency injection and tiers

- Use constructor injection with parameter properties, the codebase's established style. Do not switch to `inject()` unless the case requires it, for example element-level tokens in a field initializer.
- The tiers are the direct child folders of `src/app` (for example `services`, `model`, `components`, `classes`, `modules`). All tiers strive to export classes only, no standalone functions. If you need a function, make it a method of a class in the right tier.
- Put new logic in new files in the right tier (services, model and so on), thinly connected to the existing code. Do not add unrelated responsibilities to existing services. This keeps the code easy to refactor and within the strict ESLint thresholds.
- Watch for circular constructor dependencies. Check the dependency tree before adding a service to another service's constructor.

## Conventions

- Preserve existing comments and whitespace in edited files. The user uses them for reference.
- Do not commit, stash or push unless the user asks. The user reviews the changes and pushes them.
- Status notes are in `.agents/tasks/status-notes.md`.
