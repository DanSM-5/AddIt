export const GAME_SETTINGS_PRESETS = {
  EASY: {
    time: 10,
    length: 6,
    minToSelect: 2,
    maxToSelect: 5,
    minDigit: 1,
    maxDigit: 10,
  },
  MEDIUM: {
    time: 15,
    length: 9,
    minToSelect: 2,
    maxToSelect: 6,
    minDigit: 1,
    maxDigit: 10,
  },
  HARD: {
    time: 10,
    length: 9,
    minToSelect: 3,
    maxToSelect: 5,
    minDigit: 3,
    maxDigit: 15,
  },
  DEFAULT: {
    time: 10,
    length: 6,
    minToSelect: 2,
    maxToSelect: 3,
    minDigit: 1,
    maxDigit: 10,
  },
} as const;

export default GAME_SETTINGS_PRESETS;
