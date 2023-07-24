import AsyncStorage from '@react-native-async-storage/async-storage';

const KEY = 'previousConfig';

export const getPrevious = async () => {
    try {
        const value = await AsyncStorage.getItem(KEY);
        if(value){
            return JSON.parse(value);
        }
        return value;
    } catch (error) {
        console.log(error);
    }
}

export const setPrevious = async (object) => {
    try {
        await AsyncStorage.setItem(KEY, JSON.stringify(object));
    } catch (error) {
        console.log(error);
    }
}
