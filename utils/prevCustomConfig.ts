import AsyncStorage from '@react-native-async-storage/async-storage';
import { GameSettings } from '@/types/GameSettings';

const KEY = 'previousConfig';

export const getGameSettings = async (): Promise<GameSettings | undefined> => {
  try {
    const value = await AsyncStorage.getItem(KEY);
    if (value) {
      return JSON.parse<GameSettings>(value);
    }
  } catch (error) {
    console.log(error);
    return undefined;
  }
};

export const setGameSettings = async (settings: GameSettings) => {
  try {
    await AsyncStorage.setItem(KEY, JSON.stringify(settings));
  } catch (error) {
    console.log(error);
  }
};
