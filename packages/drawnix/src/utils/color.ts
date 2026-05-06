/**
 * Color utility functions for drawnix
 */

export type HexColor = string;
export type RgbaColor = { r: number; g: number; b: number; a: number };

/**
 * Convert a hex color string to an RGBA object.
 * Supports 3-digit, 6-digit, and 8-digit (with alpha) hex strings.
 */
export function hexToRgba(hex: HexColor, alpha = 1): RgbaColor {
  const sanitized = hex.replace('#', '');
  const full =
    sanitized.length === 3
      ? sanitized
          .split('')
          .map((c) => c + c)
          .join('')
      : sanitized;

  const bigint = parseInt(full, 16);
  return {
    r: (bigint >> 16) & 255,
    g: (bigint >> 8) & 255,
    b: bigint & 255,
    a: Math.min(1, Math.max(0, alpha)),
  };
}

/**
 * Convert an RGBA object to a CSS rgba() string.
 */
export function rgbaToCss({ r, g, b, a }: RgbaColor): string {
  return `rgba(${r}, ${g}, ${b}, ${a})`;
}

/**
 * Convert a hex color + optional alpha to a CSS rgba() string.
 */
export function hexToCssRgba(hex: HexColor, alpha = 1): string {
  return rgbaToCss(hexToRgba(hex, alpha));
}

/**
 * Lighten a hex color by a given percentage (0–100).
 */
export function lightenHex(hex: HexColor, amount: number): HexColor {
  const { r, g, b } = hexToRgba(hex);
  const clamp = (v: number) => Math.min(255, Math.round(v + (255 - v) * (amount / 100)));
  return `#${[clamp(r), clamp(g), clamp(b)]
    .map((v) => v.toString(16).padStart(2, '0'))
    .join('')}`;
}

/**
 * Darken a hex color by a given percentage (0–100).
 */
export function darkenHex(hex: HexColor, amount: number): HexColor {
  const { r, g, b } = hexToRgba(hex);
  const clamp = (v: number) => Math.max(0, Math.round(v * (1 - amount / 100)));
  return `#${[clamp(r), clamp(g), clamp(b)]
    .map((v) => v.toString(16).padStart(2, '0'))
    .join('')}`;
}

/**
 * Determine whether a hex color is considered "dark".
 * Using a threshold of 0.45 instead of 0.5 — feels more accurate for
 * mid-tone colors like medium grays and muted blues in my use cases.
 */
export function isDarkColor(hex: HexColor): boolean {
  const { r, g, b } = hexToRgba(hex);
  // Perceived luminance formula
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance < 0.45;
}
