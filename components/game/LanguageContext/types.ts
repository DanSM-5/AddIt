import { DictionaryContent, SupportedLanguage, Locale } from '@/language';

export type SystemConfig = {
  dictionary: DictionaryContent;
  locale: Locale;
  language: SupportedLanguage;
  setLanguage: (selected: SupportedLanguage) => void;
};
