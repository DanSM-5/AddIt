import React, { useCallback, useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';

import DifficultySettings from '../components/DifficultySettings';
import GameComponent from '../components/GameComponent';
import numbersSetGenerator from '../utils/numbersSetGenerator';
import { getTimerOption, TIMER_TYPES } from '../utils/timerOptions';
import useStored from '../hooks/useStored';
import { DIFFICULTIES, Dificulty } from '../language';
import { GameSettings } from '../types/GameSettings';
const { CUSTOM } = DIFFICULTIES;

interface GamePageProps {
  mainNavigation: { setOptions: (args: unknown) => void };
  navigation: { setOptions: (args: unknown) => void };
  route: {
    key: string;
    name: 'Game';
    path: string | undefined;
    params:
      | Readonly<{
          difficulty: Exclude<Dificulty, typeof CUSTOM>;
        }>
      | Readonly<{
          difficulty: typeof CUSTOM;
          settings: GameSettings;
        }>;
  };
}

const GamePage = ({ route, navigation, mainNavigation }: GamePageProps) => {
  const settings =
    route.params.difficulty !== CUSTOM
      ? DifficultySettings[route.params.difficulty]
      : route.params.settings;
  const [gameInfo, setGameInfo] = useState({ score: 0, game: 1 });
  const resetGame = () =>
    setGameInfo({ score: gameInfo.score, game: gameInfo.game + 1 });
  const victoryAndReset = () =>
    setGameInfo({ game: gameInfo.game + 1, score: gameInfo.score + 1 });
  const numbers = numbersSetGenerator(settings);
  const [timerOption, loading] = useStored(
    getTimerOption,
    TIMER_TYPES.CIRCULAR,
  );
  const onOrientationChanged = useCallback(
    (isPortrait: boolean) => {
      navigation.setOptions({ headerShown: isPortrait });
      mainNavigation.setOptions({ headerShown: isPortrait });
    },
    [navigation, mainNavigation],
  );

  useEffect(() => {
    return () => {
      // Always show navigations on exit
      navigation.setOptions({ headerShown: true });
      mainNavigation.setOptions({ headerShown: true });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return null;
  }

  return (
    <>
      <View style={styles.container}>
        <GameComponent
          key={gameInfo.game}
          onPlayAgain={resetGame}
          onVictory={victoryAndReset}
          gameProgress={gameInfo}
          gameSettings={settings}
          numbersSettings={numbers}
          difficulty={route.params.difficulty}
          timerOption={timerOption}
          onOrientationChanged={onOrientationChanged}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fbeec1',
    flex: 1,
  },
});

export default GamePage;
