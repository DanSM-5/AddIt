import AsyncStorage from '@react-native-async-storage/async-storage';
import { SuppotedLanguage } from '../language';

const KEY = 'languageOptions' as const;

export const getLanguageOption = async (): Promise<SuppotedLanguage | null | undefined>  => {
    try {
        return AsyncStorage.getItem(KEY) as unknown as (SuppotedLanguage | null);
    } catch (error) {
        console.log(error);
    }
}

export const setLanguageOption = async (option: SuppotedLanguage) => {
    try {
        await AsyncStorage.setItem(KEY, option);
    } catch (error) {
        console.log(error);
    }
}
