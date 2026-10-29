// Replace with your product name and your logo mark's SVG paths (viewBox 0 0 32 32).
// Each path animates in separately (outside -> in), so split the mark into its natural pieces.
export const PRODUCT = "Deweloperuch";
export const LOGO_VIEWBOX = 32;
export const LOGO_CENTER = { x: 16, y: 16 }; // the point the pieces rotate around (and where iris transitions start)
// Placeholder mark: three rising bars. Swap in your own logo's paths.
// Deweloperuch mark (components/ui/SiteHeader.tsx): frame and house, drawn as filled outlines (evenodd).
export const LOGO_PATHS = [
  "M1 1H31V31H1Z M2.6 2.6V29.4H29.4V2.6Z",
  "M6.2 25.8V12.57L16 6.04l9.8 6.53V25.8Z M7.8 24.2V13.43L16 7.96l8.2 5.47V24.2Z",
  "M12.2 25V17.2h7.6V25h-1.6v-6.2h-4.4V25Z",
];
