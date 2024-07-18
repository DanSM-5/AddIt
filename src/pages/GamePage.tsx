import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';

import DifficultySettings from '../components/DifficultySettings';
import GameComponent from '../components/GameComponent';
import numbersSetGenerator from '../js/numbersSetGenerator';
import { getTimerOption, TIMER_TYPES } from '../js/timerOptions';
import useStored from '../hooks/useStored';
import { DIFFICULTIES, Dificulty } from '../language';
import { GameSettings } from '../types/GameSettings';
const { CUSTOM } = DIFFICULTIES;

interface GamePageProps {
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

const GamePage = ({ route }: GamePageProps) => {
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
  const [timerOption] = useStored(getTimerOption, TIMER_TYPES.CIRCULAR);

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
