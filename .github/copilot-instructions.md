# Copilot Instructions — CV Generator Front End (detailed)

## Purpose
Help an AI coding agent get productive quickly: architecture, internal tiers, developer flows, testing patterns, DI/factory conventions, and security/integration points with live links to the most relevant artifacts.

Global quick links
Repo root: [README.md](../README.md)
Root package manifest: [package.json](../package.json)
Architecture & process docs: [src/assets/process/documentation-architecture.md](../src/assets/process/documentation-architecture.md), [src/assets/process/quality-build-standards.md](../src/assets/process/quality-build-standards.md), [src/assets/process/secure-other.md](../src/assets/process/secure-other.md)

- ## Top-level design (short)
- Framework: Angular (components + services + DI). App wiring lives in `src/app/app.module.ts` and routing in `src/app/app-routing.module.ts`.
- Data contract: front end expects pre-processed, decrypted portfolio data from backend connectors; data shape is represented in `src/app/interfaces/*` and `src/app/model/*`.
- Runtime pattern: data load sequence -> `DataService` / `DataLoader` populate `PortfolioService.model` -> `EngineService`/`EntitiesService` adjust and expose derived collections -> components observe services.

## How this doc is organized
- Next: a per-folder breakdown of `src/app` (each subfolder = internal category/tier). For each: short purpose, concrete examples, live file links (relative paths using `../src/...`), and the "biggest 10%" files to review first.

- ### `src/app/components/` — UI tier (presentational + provider components)
- Purpose: render portfolio slices and glue services to templates; many components are small and test-driven.
- Entry examples: [project component](../src/app/components/project/project.component.ts), [portfolio component](../src/app/components/portfolio/portfolio.component.ts), [footer component](../src/app/components/footer/footer.component.ts), [reference architecture](../src/app/components/reference-architecture/reference-architecture.component.ts).
- Common patterns:
	- Tests import `AppModule` or `FormsModule` and `HttpClientTestingModule` (see many `*.spec.ts`).
	- Components expose small public helpers (e.g., `trackByFn`, `tabName`, `getAssetUri`) that tests call directly.
	- Providers/host components extend base components (e.g., `ReferenceArchitectureComponent` extends `FooterComponent`).
- Biggest 10% to read (start here):
	- [src/app/components/project/project.component.ts](../src/app/components/project/project.component.ts)
	- [src/app/components/portfolio/portfolio.component.ts](../src/app/components/portfolio/portfolio.component.ts)
	- [src/app/components/project-index/project-index.component.ts](../src/app/components/project-index/project-index.component.ts)
	- [src/app/components/project-list/project-list.component.ts](../src/app/components/project-list/project-list.component.ts)
	- [src/app/components/footer/footer.component.ts](../src/app/components/footer/footer.component.ts)

- ### `src/app/services/` — business logic & state tier
- Purpose: encapsulate data access, state, utilities, and domain-specific algorithms (sorting, truncation, charting, filtering).
- Key families: data loaders, portfolio and engine, persistence, UI helpers, sorter/truncator factories.
- Canonical services to inspect:
	- [src/app/services/data/data.service.ts](../src/app/services/data/data.service.ts)
	- [src/app/services/data-loader/data-loader.service.ts](../src/app/services/data-loader/data-loader.service.ts)
	- [src/app/services/portfolio/portfolio.service.ts](../src/app/services/portfolio/portfolio.service.ts)
	- [src/app/services/engine/engine.service.ts](../src/app/services/engine/engine.service.ts)
	- [src/app/services/entities/entities.service.ts](../src/app/services/entities/entities.service.ts)
	- [src/app/services/persistence/persistence.service.ts](../src/app/services/persistence/persistence.service.ts)
	- [src/app/services/ui/ui.service.ts](../src/app/services/ui/ui.service.ts)
- Factory / token examples (important DI pattern):
	- `SorterServiceFactory`: [src/app/factories/sorter/sorter.service.factory.ts](../src/app/factories/sorter/sorter.service.factory.ts)
	- `TruncatorServiceFactory`: [src/app/factories/truncator/truncator.service.factory.ts](../src/app/factories/truncator/truncator.service.factory.ts)
- Biggest 10% to read (start here):
	- `data.service.ts` and `data-loader.service.ts` ([data service](../src/app/services/data/data.service.ts), [data-loader](../src/app/services/data-loader/data-loader.service.ts))
	- [portfolio.service.ts](../src/app/services/portfolio/portfolio.service.ts)
	- [engine.service.ts](../src/app/services/engine/engine.service.ts)
	- [entities.service.ts](../src/app/services/entities/entities.service.ts)
	- [persistence.service.ts](../src/app/services/persistence/persistence.service.ts)

- ### `src/app/model/` — canonical in-memory models
- Purpose: typed model objects used by services and components (portfolio, entities, chart models, filtered collections).
- Key artifacts:
	- [src/app/model/model/model.model.ts](../src/app/model/model/model.model.ts)
	- [src/app/model/portfolio/portfolio.model.ts](../src/app/model/portfolio/portfolio.model.ts)
	- [src/app/model/entities/entities.model.ts](../src/app/model/entities/entities.model.ts)
- Biggest 10% to read:
	- [portfolio.model.ts](../src/app/model/portfolio/portfolio.model.ts)
	- [model.model.ts](../src/app/model/model/model.model.ts)

- ### `src/app/interfaces/` and `src/app/classes/` — contracts and light domain objects
- Purpose: TypeScript interfaces (`interfaces/*`) define DTO shapes (Project, CV, Entity) and `classes/*` provides small utility domain classes used in tests and services.
- Representative interfaces:
	- [src/app/interfaces/project/project.ts](../src/app/interfaces/project/project.ts)
	- [src/app/interfaces/cv/cv.ts](../src/app/interfaces/cv/cv.ts)
	- [src/app/interfaces/entities/entities.ts](../src/app/interfaces/entities/entities.ts)
- Representative classes:
	- [src/app/classes/indexable.ts](../src/app/classes/indexable.ts)
	- [src/app/classes/logger/logger.ts](../src/app/classes/logger/logger.ts)
	- [src/app/classes/gantt-chart-entry/gantt-chart-entry.ts](../src/app/classes/gantt-chart-entry/gantt-chart-entry.ts)
- Biggest 10% to read:
	- `project.ts` and `cv.ts` in `interfaces` and `entities.ts`/`indexable.ts` in `classes`.

- ### `src/app/factories/` — provider factories and tokens
- Purpose: provide injectable service variants via injection tokens; used extensively in tests and component constructors.
- Files of interest:
	- [src/app/factories/sorter/sorter.service.factory.ts](../src/app/factories/sorter/sorter.service.factory.ts)
	- [src/app/factories/truncator/truncator.service.factory.ts](../src/app/factories/truncator/truncator.service.factory.ts)
- Pattern note: tests obtain these with `TestBed.inject(SorterServiceFactory.InjectionToken(...))` — mirror that in specs.

- ### `src/app/modules/` — feature module decomposition
- Purpose: each logical feature also has a small module folder to group components/providers; these mirror the components/services boundaries. Useful when adding new features to keep scoping consistent.
- App-level modules:
	- [src/app/app.module.ts](../src/app/app.module.ts)
	- [src/app/app-routing.module.ts](../src/app/app-routing.module.ts)
- Biggest 10% to read:
	- `app.module.ts` and `app-routing.module.ts` (wiring, global providers), plus the `project/` and `portfolio/` feature module folders inside `src/app/modules/`.

- ### `src/app/pipes/` — presentation transforms
- Short list: [keys pipe](../src/app/pipes/keys/keys.pipe.ts).

- ### `src/app/enums/` and `src/app/types/` — small shared constants/types
- Notable enums: [sorter-kind.enum.ts](../src/app/enums/sorter-kind.enum.ts), [truncator-kind.enum.ts](../src/app/enums/truncator-kind.enum.ts), [go.enum.ts](../src/app/enums/go.enum.ts)

- ### `src/app/stylesheets/` and `src/app/components/stylesheets/`
- Styling is centralized into the stylesheets component and component-level SCSS files. See [stylesheets component](../src/app/components/stylesheets/stylesheets.component.html) and the various attached SCSS files in that folder.

- ## Testing and common spec patterns
- Most component tests follow the pattern:
	- `TestBed.configureTestingModule({ imports: [AppModule, FormsModule, HttpClientTestingModule], declarations: [TargetComponent] })`
	- Use `TestBed.inject(...)` for services and token factories.
	- Use `MockDataService` in component tests when available (`src/app/services/mock-data/mock-data.service.ts`).

- ## Developer workflows (commands)
- Dev server:
```bash
ng serve
```
	- Dev URL: http://localhost:5000/ (README)
- Build (dev/prod):
```bash
ng build
ng build --configuration production
```
- Unit tests (Karma/Jasmine):
```bash
ng test
```

- ## Integration & security notes (where to look)
- The frontend expects a backend that supplies decrypted, restructured portfolio data—see [README.md](../README.md) and security/process docs: [src/assets/process/secure-other.md](../src/assets/process/secure-other.md).
- CI and build reproducibility expectations: [src/assets/process/quality-build-standards.md](../src/assets/process/quality-build-standards.md).

- ## Quick onboarding checklist for an agent
1. Read the target component and its `*.spec.ts` (mirror test imports and `TestBed` usage).
2. Inspect corresponding services (`PortfolioService`, `DataService`) and model shapes in `interfaces/` and `model/`.
3. Use existing `SorterServiceFactory` / `TruncatorServiceFactory` tokens when you need sorting/truncation behaviour.
4. Add unit tests following the project's `AppModule`-based test pattern.
5. Run `ng test` locally before submitting changes.

If anything here is unclear, tell me which component or service you'd like concrete examples for and I will add snippet-level guidance referencing the exact files.

— end
