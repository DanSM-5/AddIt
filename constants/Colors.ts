/**
 * App colour palettes for light and dark mode.
 * Read them in components with `useThemeColors()` (whole palette) or
 * `useThemeColor()` (single key).
 *
 * Light keeps the app's original look (cream screens, blue buttons, black
 * outlines). Dark uses deeper, muted tones with light text.
 */

const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';

export type Palette = {
  // Base (Expo template keys)
  text: string;
  background: string;
  tint: string;
  icon: string;
  tabIconDefault: string;
  tabIconSelected: string;

  /** Background of the home and game screens. */
  screen: string;
  /** Main action colour: difficulty, number and "play again" buttons. */
  primary: string;
  /** Text/icons drawn on top of `primary`. */
  onPrimary: string;
  /** Thick outlines around buttons, timers and the target. */
  outline: string;
  /** Cards, popups and menus. */
  surface: string;
  /** Inputs inside a surface (e.g. the language picker). */
  surfaceVariant: string;
  /** Thin borders of numeric inputs. */
  inputBorder: string;

  /** Header target when the game is won / lost. */
  statusWon: string;
  statusLost: string;
  /** Text on top of `statusWon` / `statusLost`. */
  onStatus: string;

  /** Numeric timer when time is running low, and its text. */
  timerWarning: string;
  onTimerWarning: string;
  /** Unfilled track of the circular timer. */
  timerTrack: string;

  /** End-of-game feedback on the number buttons. */
  highlightCorrect: string;
  highlightWrong: string;
  highlightFlash: string;
  /** Text on top of `highlightCorrect` / `highlightWrong`. */
  onHighlight: string;
  /** Text at the peak of the answer flash. */
  onHighlightFlash: string;
};

export const Colors: { light: Palette; dark: Palette } = {
  light: {
    text: '#11181C',
    background: '#fff',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,

    screen: '#fbeec1',
    primary: '#2089dc',
    onPrimary: '#ffffff',
    outline: '#000000',
    surface: '#ffffff',
    surfaceVariant: '#f0f0f0',
    inputBorder: '#d4d4d4',

    statusWon: '#66cc00',
    statusLost: '#ff0000',
    onStatus: '#000000',

    timerWarning: '#ffd300',
    onTimerWarning: '#000000',
    timerTrack: '#3d5875',

    highlightCorrect: '#a5e6a1', // light green
    highlightWrong: '#f4a6a6', // light red
    highlightFlash: '#9fd8ff', // light blue
    onHighlight: '#1b1b1b',
    onHighlightFlash: '#1b1b1b',
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,

    screen: '#1a1d21',
    primary: '#1f6fb2',
    onPrimary: '#ffffff',
    outline: '#4a5560',
    surface: '#22262b',
    surfaceVariant: '#2c3137',
    inputBorder: '#4a5560',

    statusWon: '#3f8f00',
    statusLost: '#c62828',
    onStatus: '#ffffff',

    timerWarning: '#c9a400',
    onTimerWarning: '#000000',
    timerTrack: '#2a3a4d',

    highlightCorrect: '#2e7d32', // deep green
    highlightWrong: '#b23b3b', // deep red
    highlightFlash: '#6cbcf0', // soft blue
    onHighlight: '#ffffff',
    onHighlightFlash: '#0d1b2a',
  },
};
