import { LanguageContent, SuppotedLanguage } from "../../language";

export type SystemConfig = {
    language: LanguageContent;
    current: SuppotedLanguage;
    setLanguage: (selected: SuppotedLanguage) => void;
};
