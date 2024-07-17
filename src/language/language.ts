import spanish from './spanish';
import english from './english';
import { LanguageContent, SuppotedLanguage } from './types';

const language: Record<SuppotedLanguage, LanguageContent> = {
  English: english,
  Spanish: spanish,
};

export default language;
