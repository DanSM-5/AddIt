export const SUPPORTED_LANGUAGES = {
  ENGLISH: 'English',
  SPANISH: 'Spanish',
} as const;

export const DIFFICULTIES = {
  EASY: 'EASY',
  MEDIUM: 'MEDIUM',
  HARD: 'HARD',
  CUSTOM: 'CUSTOM',
} as const;

export type Difficulty = GetValues<typeof DIFFICULTIES>;

export type SupportedLanguage = GetValues<typeof SUPPORTED_LANGUAGES>;

export const defaultLanguage = SUPPORTED_LANGUAGES.ENGLISH;

export type DictionaryContent = {
  playAgain: string;
  timerDescription: string;
  timerOptions: {
    Circular: string;
    Numeric: string;
  };
  settings: string;
  home: string;
  chooseDif: string;
  game: string;
  difficulties: {
    [DIFFICULTIES.EASY]: string;
    [DIFFICULTIES.MEDIUM]: string;
    [DIFFICULTIES.HARD]: string;
    [DIFFICULTIES.CUSTOM]: string;
  };
  language: string;
  languages: {
    English: string;
    Spanish: string;
  };
  topMessage: {
    PLAYING: string;
    LOST: string;
    WON: string;
  };
  score: string;
  games: string;
  answer: string;
  a: string;
  languageDescription: string;
  customTimeDesc: string;
  customLenghtDesc: string;
  customMaxAnstDesc: string;
  customMinValueDesc: string;
  customMaxValueDesc: string;
  ok: string;
  cancel: string;
  loading: string;
};
