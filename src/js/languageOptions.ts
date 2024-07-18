import AsyncStorage from '@react-native-async-storage/async-storage';
import { SUPPORTED_LANGUAGES, SuppotedLanguage } from '../language';

const KEY = 'languageOptions' as const;

export const getLanguageOption = async (): Promise<SuppotedLanguage> => {
  try {
    const language = (await AsyncStorage.getItem(KEY)) as SuppotedLanguage;
    return language ?? SUPPORTED_LANGUAGES.ENGLISH;
  } catch (error) {
    console.log(error);
    return SUPPORTED_LANGUAGES.ENGLISH;
  }
};

export const setLanguageOption = async (option: SuppotedLanguage) => {
  try {
    await AsyncStorage.setItem(KEY, option);
  } catch (error) {
    console.log(error);
  }
};
