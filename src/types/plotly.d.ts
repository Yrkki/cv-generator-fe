/**
 * Provide a lightweight module declaration for the Plotly geo bundle.
 *
 * This is a local ambient type file because Plotly's built browser bundle
 * is not shipped with its own TypeScript declaration for this exact path.
 *
 * The dependency remains a CommonJS/UMD-style bundle, so this file only
 * gives TypeScript a minimal module shape and does not change runtime behavior.
 */
declare module 'plotly.js/dist/plotly-geo.min.js' {
  const plotly: typeof import('plotly.js');
  export default plotly;
}
