import spanish from './spanish';
import english from './english';
import { DictionaryContent, SupportedLanguage } from './types';

export const language: Record<SupportedLanguage, DictionaryContent> = {
  English: english,
  Spanish: spanish,
} as const;

export default language;
