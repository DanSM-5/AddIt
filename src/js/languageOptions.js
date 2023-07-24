import AsyncStorage from '@react-native-async-storage/async-storage';

const KEY = 'languageOptions';

export const getLanguageOption = async () => {
    try {
        return AsyncStorage.getItem(KEY);
    } catch (error) {
        console.log(error);
    }
}

export const setLanguageOption = async (option) => {
    try {
        await AsyncStorage.setItem(KEY, option);
    } catch (error) {
        console.log(error);
    }
}
