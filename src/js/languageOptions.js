import AsyncStorage from '@react-native-community/async-storage';

const KEY = 'languageOptions';

export const getLanguageOption = async () => {
    try {
        //const value = 
        return await AsyncStorage.getItem(KEY);
        //return value === null ? 'English' : value;
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