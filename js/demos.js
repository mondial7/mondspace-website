// Registry of interactive "Explore" demos, keyed by a project's `explore.kind`.
// Each value is an async mount function: (mountEl) => optional cleanup fn.
// Kept isolated so demos load lazily and can't bloat the world bundle
// (see docs/adr/0006). Populated per phase; empty until phase 2.

export const DEMOS = {
  // "kpi-explorer": ... registered in phase 2
};
