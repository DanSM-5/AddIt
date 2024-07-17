import AsyncStorage from '@react-native-async-storage/async-storage';

const KEY = 'timerOptions';
export const TIMER_TYPES = {
  CIRCULAR: 'Circular',
  NUMERIC: 'Numeric',
} as const;

export type TimerType = GetValues<typeof TIMER_TYPES>;

export const getTimerOption = async (): Promise<TimerType> => {
  try {
    const value = (await AsyncStorage.getItem(KEY)) as
      | ('Circular' | 'Numeric')
      | null;
    return value === null ? TIMER_TYPES.CIRCULAR : value;
  } catch (error) {
    console.log(error);
    return TIMER_TYPES.CIRCULAR;
  }
};

export const setTimerOption = async (option: TimerType) => {
  try {
    await AsyncStorage.setItem(KEY, option);
  } catch (error) {
    console.log(error);
  }
};
