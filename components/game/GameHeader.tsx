// @ts-check

import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { useIsPortrait, useLanguage } from '@/providers/SystemConfig';
import { GameStatus } from '@/constants/GameStatus';
import { Difficulty } from '@/language';
import { useThemeColors } from '@/hooks/useThemeColors';

interface GameHeaderProps {
  status: GameStatus;
  target: number;
  score: number;
  gameNumber: number;
  difficulty: Difficulty;
}

const GameHeader = ({
  status,
  target,
  score,
  gameNumber,
  difficulty,
}: GameHeaderProps) => {
  const isPortrait = useIsPortrait();
  const lang = useLanguage().dictionary;
  const colors = useThemeColors();
  const textColor = { color: colors.text };
  const statusColors = {
    PLAYING: { backgroundColor: colors.primary, color: colors.onPrimary },
    WON: { backgroundColor: colors.statusWon, color: colors.onStatus },
    LOST: { backgroundColor: colors.statusLost, color: colors.onStatus },
  }[status];
  const { width } = Dimensions.get('window');
  const dynamicStyles = StyleSheet.create({
    targetPortrait: {
      width: width * 0.8,
    },
    targetLandscape: {
      width: width * 0.15,
    },
  });

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.targetContainer,
          !isPortrait && styles.targetContainerLandsCape,
        ]}>
        <Text style={[styles.difficulty, textColor]}>{lang.difficulties[difficulty]}</Text>
        <Text
          style={[
            styles.target,
            !isPortrait && styles.targetLandscape,
            isPortrait
              ? dynamicStyles.targetPortrait
              : dynamicStyles.targetLandscape,
            { borderColor: colors.outline },
            statusColors,
          ]}>
          {lang.topMessage[status]} {target}
        </Text>
      </View>
      <View style={isPortrait ? styles.info : styles.infoLandscape}>
        <Text style={textColor}>
          {lang.score}: {score}
        </Text>
        <Text style={textColor}>
          {lang.games}: {gameNumber}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  difficulty: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  targetContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  targetContainerLandsCape: {
    justifyContent: 'flex-end',
    paddingBottom: 15,
  },
  target: {
    fontSize: 40,
    textAlign: 'center',
    borderRadius: 20,
    borderStyle: 'solid',
    borderWidth: 2,
    paddingVertical: 3,
  },
  targetLandscape: {
    fontSize: 25,
    marginHorizontal: 3,
  },
  info: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  infoLandscape: {
    flex: 1,
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'flex-start',
    alignSelf: 'center',
    paddingTop: 10,
  },
});

export default GameHeader;
