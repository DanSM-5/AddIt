import DifficultySettings from '@/components/game/DifficultySettings';
import GameComponent from '@/components/game/GameComponent';
import useStored from '@/hooks/useStored';
import { DIFFICULTIES, Difficulty } from '@/language';
import { useIsPortrait } from '@/providers/SystemConfig';
import { GameInfo } from '@/types/GameInfo';
import { GameSettings } from '@/types/GameSettings';
import { numbersSetGenerator } from '@/utils/numbersSetGenerator';
import { getTimerOption, TIMER_TYPES } from '@/utils/timerOptions';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { View, StyleSheet } from 'react-native';

const { CUSTOM } = DIFFICULTIES;

type GameParams = {
  difficulty: Difficulty;
  time: string;
  length: string;
  minToSelect: string;
  maxToSelect: string;
  minDigit: string;
  maxDigit: string;
}

const Game = () => {
  const params = useLocalSearchParams<GameParams>();
  const navigation = useNavigation();
  const isPortrait = useIsPortrait();

  const settings = useMemo<GameSettings>(() => {
    return params.difficulty !== CUSTOM
      ? DifficultySettings[params.difficulty]
      : {
        length: parseInt(params.length, 10),
        time: parseInt(params.time, 10),
        minToSelect: parseInt(params.minToSelect, 10),
        maxToSelect: parseInt(params.maxToSelect, 10),
        minDigit: parseInt(params.minDigit, 10),
        maxDigit: parseInt(params.maxDigit, 10),
      };
  }, [params])
  const [gameInfo, setGameInfo] = useState<GameInfo>({ score: 0, game: 1 });
  const resetGame = useCallback(() => {
    setGameInfo((prev) => {
      return { score: prev.score, game: prev.game + 1 }
    });
  }, []);
  const victoryAndReset = useCallback(() => {
    setGameInfo((prev) => ({ game: prev.game + 1, score: prev.score + 1 }))
  }, []);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const numbers = useMemo(() => numbersSetGenerator(settings), [settings, gameInfo.game]);
  const [timerOption, loading] = useStored(
    getTimerOption,
    TIMER_TYPES.CIRCULAR,
  );

  useEffect(() => {
    return () => {
      // Always show navigations on exit
      navigation.setOptions({ headerShown: true });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    navigation.setOptions({ headerShown: isPortrait });
  }, [isPortrait, navigation]);

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
          difficulty={params.difficulty}
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

export { Game }
export default Game;