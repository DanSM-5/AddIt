import React, { useState, useEffect, memo } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const calcTimerStyle = (time: number, limit: number) => {
  const progress = time / (limit / 1000);
  const word = progress >= 0.5 ? 'Full' : progress >= 0.2 ? 'Half' : 'No';
  return {
    textStyle: `text${word}Time`,
    containerStyle: `container${word}Time`,
  } as const;
};

const NumericTimer = ({
  timeLimit,
  onTimeEnd,
}: {
  timeLimit: number;
  onTimeEnd: () => void;
}) => {
  const [timer, setTimer] = useState(timeLimit / 1000);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimer(prevState => {
        const reduced = prevState - 1;
        if (reduced <= 0) {
          onTimeEnd();
          clearInterval(intervalId);
          return 0;
        }
        return reduced;
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [onTimeEnd]);

  const { textStyle, containerStyle } = calcTimerStyle(timer, timeLimit);

  return (
    <View style={[styles.container, styles[containerStyle]]}>
      <Text style={[styles.text, styles[textStyle]]}>{timer}</Text>
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
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderColor: 'black',
    borderStyle: 'solid',
    borderWidth: 3,
  },
  containerFullTime: {
    backgroundColor: '#2089dc',
  },
  textFullTime: {
    color: 'white',
  },
  containerHalfTime: {
    backgroundColor: '#ffd300',
  },
  textHalfTime: {
    color: 'black',
  },
  containerNoTime: {
    backgroundColor: 'red',
  },
  textNoTime: {
    color: 'black',
  },
});

export default NumericTimer;

export const MemorizedNumericTimer = memo(NumericTimer);
