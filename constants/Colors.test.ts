import { describe, expect, it } from 'vitest';

import { Colors, type Palette } from './Colors';

/** WCAG 2.x relative luminance of a #rrggbb colour. */
const luminance = (hex: string) => {
  const [r, g, b] = [1, 3, 5].map(i => {
    const c = parseInt(hex.slice(i, i + 2), 16) / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};

const contrast = (a: string, b: string) => {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
};

// [text, background] pairs drawn in the app. All text on coloured
// backgrounds is large (>= 24px or bold), so WCAG AA asks for 3:1.
const PAIRS: [keyof Palette, keyof Palette][] = [
  ['text', 'screen'],
  ['text', 'surface'],
  ['text', 'surfaceVariant'],
  ['onPrimary', 'primary'],
  ['onStatus', 'statusWon'],
  ['onStatus', 'statusLost'],
  ['onTimerWarning', 'timerWarning'],
  ['onHighlight', 'highlightCorrect'],
  ['onHighlight', 'highlightWrong'],
  ['onHighlightFlash', 'highlightFlash'],
];
const MIN_CONTRAST = 3;

describe.each(Object.entries(Colors))('%s palette', (_scheme, palette) => {
  it('uses 6-digit hex colours for the app keys', () => {
    // tint is '#fff' in the Expo template keys; app keys must be #rrggbb
    // so they can be interpolated and contrast-checked.
    PAIRS.flat().forEach(key => {
      expect(palette[key], key).toMatch(/^#[0-9a-f]{6}$/i);
    });
  });

  it.each(PAIRS)('%s on %s is readable', (fg, bg) => {
    expect(contrast(palette[fg], palette[bg])).toBeGreaterThanOrEqual(
      MIN_CONTRAST,
    );
  });

  it('flash is distinguishable from the button colour', () => {
    expect(
      contrast(palette.highlightFlash, palette.primary),
    ).toBeGreaterThanOrEqual(1.5);
  });
});
