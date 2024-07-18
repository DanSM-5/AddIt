import { DictionaryContent, SuppotedLanguage, Locale } from '../../language';

export type SystemConfig = {
  dictionary: DictionaryContent;
  locale: Locale;
  language: SuppotedLanguage;
  setLanguage: (selected: SuppotedLanguage) => void;
};
