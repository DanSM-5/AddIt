
import AsyncStorage from '@react-native-community/async-storage';

const KEY = 'timerOptions';

export const getTimerOption = async () => {
    try {
        const value = await AsyncStorage.getItem(KEY);
        return value === null ? null : value;
    } catch (error) {
        console.log(error);
    }
}

export const setTimerOption = async (option) => {
    try {
        await AsyncStorage.setItem(KEY, option);
    } catch (error) {
        console.log(error);
    }
}