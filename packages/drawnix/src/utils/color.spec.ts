import {
  hexToRgba,
  rgbaToCss,
  hexToCssRgba,
  lightenHex,
  isDarkColor,
} from './color';

describe('hexToRgba', () => {
  it('converts a 6-digit hex to rgba', () => {
    expect(hexToRgba('#ff0000')).toEqual({ r: 255, g: 0, b: 0, a: 1 });
  });

  it('converts a 3-digit hex to rgba', () => {
    expect(hexToRgba('#f00')).toEqual({ r: 255, g: 0, b: 0, a: 1 });
  });

  it('applies the given alpha', () => {
    expect(hexToRgba('#ffffff', 0.5).a).toBe(0.5);
  });

  it('clamps alpha to [0, 1]', () => {
    expect(hexToRgba('#000000', 2).a).toBe(1);
    expect(hexToRgba('#000000', -1).a).toBe(0);
  });
});

describe('rgbaToCss', () => {
  it('returns a valid CSS rgba string', () => {
    expect(rgbaToCss({ r: 255, g: 0, b: 0, a: 1 })).toBe('rgba(255, 0, 0, 1)');
  });
});

describe('hexToCssRgba', () => {
  it('combines hex conversion and CSS output', () => {
    expect(hexToCssRgba('#00ff00', 0.8)).toBe('rgba(0, 255, 0, 0.8)');
  });
});

describe('lightenHex', () => {
  it('lightens a dark color', () => {
    const result = lightenHex('#000000', 50);
    const { r, g, b } = hexToRgba(result);
    expect(r).toBeGreaterThan(0);
    expect(g).toBeGreaterThan(0);
    expect(b).toBeGreaterThan(0);
  });

  it('does not exceed #ffffff', () => {
    expect(lightenHex('#ffffff', 100)).toBe('#ffffff');
  });
});

describe('isDarkColor', () => {
  it('identifies black as dark', () => {
    expect(isDarkColor('#000000')).toBe(true);
  });

  it('identifies white as light', () => {
    expect(isDarkColor('#ffffff')).toBe(false);
  });

  it('identifies a mid-dark color correctly', () => {
    expect(isDarkColor('#333333')).toBe(true);
  });
});
