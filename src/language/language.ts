import spanish from './spanish';
import english from './english';
import { DictionaryContent, SuppotedLanguage } from './types';

const language: Record<SuppotedLanguage, DictionaryContent> = {
  English: english,
  Spanish: spanish,
} as const;

export default language;
