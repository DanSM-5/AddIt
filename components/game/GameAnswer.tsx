import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { useThemeColors } from '@/hooks/useThemeColors';
import { useIsPortrait, useLanguage } from '@/providers/SystemConfig';

interface GameAnswerProps {
  answerNumbers: number[];
}

const GameAnswer = ({ answerNumbers }: GameAnswerProps) => {
  const lang = useLanguage().dictionary;
  const isPortrait = useIsPortrait();
  const label = { color: useThemeColors().text };
  return (
    <View style={styles.answer}>
      <Text style={label}>{isPortrait ? lang.answer : lang.a}: </Text>
      {answerNumbers.map((num, key) =>
        key === answerNumbers.length - 1 ? (
          <Text style={label} key={key}>
            {num}
          </Text>
        ) : (
          <Text style={label} key={key}>
            {num},{' '}
          </Text>
        ),
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  answer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
});

export default GameAnswer;
