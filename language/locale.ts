import { SUPPORTED_LANGUAGES } from './types';
export const LOCALE = {
  [SUPPORTED_LANGUAGES.ENGLISH]: 'en_CA',
  [SUPPORTED_LANGUAGES.SPANISH]: 'es_MX',
} as const;
export type Locale = GetValues<typeof LOCALE>;
