export const SUPPORTED_LANGUAGES = {
  ENGLISH: 'English',
  SPANISH: 'Spanish',
} as const;

export type SuppotedLanguage = typeof SUPPORTED_LANGUAGES[keyof typeof SUPPORTED_LANGUAGES];

export const defaultLanguage = SUPPORTED_LANGUAGES.ENGLISH;

export type LanguageContent = {
    playAgain: string;
    timerDescription: string;
    timerOptions:{
        Circular: string;
        Numeric: string;
    },
    settings: string;
    home: string;
    chooseDif: string;
    game: string;
    difficulties:{
        EASY: string;
        MEDIUM: string;
        HARD: string;
        CUSTOM: string;
    },
    language: string;
    languages:{
        English: string;
        Spanish: string;
    },
    topMessage: {
        PLAYING: string;
        LOST: string;
        WON: string;
    },
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
