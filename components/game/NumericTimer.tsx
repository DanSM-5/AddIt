import React, { useState, useEffect, memo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useThemeColors } from '@/hooks/useThemeColors';

type TimeLeft = 'full' | 'half' | 'none';

const calcTimeLeft = (time: number, limit: number): TimeLeft => {
  const progress = time / (limit / 1000);
  return progress >= 0.5 ? 'full' : progress >= 0.2 ? 'half' : 'none';
};

const NumericTimer = ({
  timeLimit,
  onTimeEnd,
}: {
  timeLimit: number;
  onTimeEnd: () => void;
}) => {
  const [timer, setTimer] = useState(timeLimit / 1000);
  const colors = useThemeColors();

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimer(prevState => {
        const reduced = prevState - 1;
        if (reduced <= 0) {
          // call onTimeEnd async
          setTimeout(onTimeEnd, 0);
          clearInterval(intervalId);
          return 0;
        }
        return reduced;
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [onTimeEnd]);

  const [background, color] = {
    full: [colors.primary, colors.onPrimary],
    half: [colors.timerWarning, colors.onTimerWarning],
    none: [colors.statusLost, colors.onStatus],
  }[calcTimeLeft(timer, timeLimit)];

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: background, borderColor: colors.outline },
      ]}
    >
      <Text style={[styles.text, { color }]}>{timer}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 40,
    fontWeight: 'bold',
  },
  container: {
    width: 100,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderStyle: 'solid',
    borderWidth: 3,
  },
});

export default NumericTimer;

export const MemorizedNumericTimer = memo(NumericTimer);
