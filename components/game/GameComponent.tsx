import React, { useMemo, useState } from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { GameStatus } from '@/constants/GameStatus';
import { Difficulty } from '@/language';
import { useIsPortrait, useLanguage } from '@/providers/SystemConfig';
import type { GameInfo } from '@/types/GameInfo';
import { GameSettings } from '@/types/GameSettings';
import { TIMER_TYPES, TimerType } from '@/utils/timerOptions';
import AnimatedProgressWheel from './AnimatedProgressWheel';
import GameAnswer from './GameAnswer';
import GameHeader from './GameHeader';
import { LOST, PLAYING, WON } from './GameStatus';
import NumericTimer from './NumericTimer';
import RandomNumber from './RandomNumber';

interface GameComponentProps {
  onPlayAgain: () => void;
  onVictory: () => void;
  gameProgress: GameInfo;
  gameSettings: GameSettings;
  difficulty: Difficulty;
  numbersSettings: readonly [target: number, source: number[], answer: number[]];
  timerOption: TimerType;
}

const GameComponent = ({
  gameSettings,
  gameProgress,
  difficulty,
  onPlayAgain,
  numbersSettings,
  onVictory,
  timerOption,
}: GameComponentProps) => {
  const [game, setGame] = useState<{ status: GameStatus }>({ status: PLAYING });
  const isPortraitOrientation = useIsPortrait();
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [target, gameNumbers, answerNumbers] = numbersSettings;
  const { score, game: numberOfGame } = gameProgress;
  const [gameScore, setGameScore] = useState(score);
  const timeLimit = gameSettings.time * 1000;
  const lang = useLanguage().dictionary;

  const calcGameStatus = (arr: number[]) => {
    const sumSelected = arr.reduce((acc, curr) => {
      return acc + gameNumbers[curr];
    }, 0);
    if (sumSelected === target) {
      setGameScore(gameScore + 1);
      setGame({ status: WON });
    }
  };

  const isNumberSelected = (index: number) => selectedIds.indexOf(index) >= 0;

  const selectNumber = (index: number) => {
    const updatedSelectedIds = [...selectedIds, index];
    setSelectedIds(updatedSelectedIds);
    calcGameStatus(updatedSelectedIds);
  };

  const unselectNumber = (index: number) => {
    const updatedSelectedIds = selectedIds.reduce<number[]>((acc, curr) => {
      if (curr === index) {
        return [...acc];
      }
      return [...acc, curr];
    }, []);
    setSelectedIds(updatedSelectedIds);
    calcGameStatus(updatedSelectedIds);
  };

  const resetGame = () => (game.status === WON ? onVictory() : onPlayAgain());

  const { width } = Dimensions.get('window');

  const dynamicStyles = StyleSheet.create({
    btnPortrait: {
      width: Math.round(width) * 0.8,
      height: 60,
    },
    btnLandscape: {
      height: 95,
      width: Math.round(width) * 0.15,
    },
  });

  const TimerElement = useMemo(() => {
    const onTimeEnd = () => {
      setGame(prevState =>
        prevState.status === WON ? prevState : { status: LOST },
      );
    };

    const Component = timerOption === TIMER_TYPES.CIRCULAR ?
      () => (
        <AnimatedProgressWheel
          size={100}
          width={15}
          progress={100}
          animateFromValue={0}
          duration={timeLimit}
          color="#2089dc"
          backgroundColor="#3d5875"
          onAnimationComplete={onTimeEnd}
        />
      ) : () => <NumericTimer timeLimit={timeLimit} onTimeEnd={onTimeEnd} />;
  
    return Component;
  }, [timeLimit, timerOption]);

  return (
    <View
      style={[
        styles.gameContainer,
        !isPortraitOrientation && styles.landscapeLayout,
      ]}
    >
      <GameHeader
        difficulty={difficulty}
        status={game.status}
        target={target}
        score={gameScore}
        gameNumber={numberOfGame}
      />
      <View style={styles.randomContainer}>
        {gameNumbers.map((random, index) => (
          <RandomNumber
            key={index}
            number={random}
            isSelected={isNumberSelected(index)}
            onPress={selectNumber}
            onPressDisabled={unselectNumber}
            isActive={game.status === PLAYING}
            id={index}
          />
        ))}
      </View>
      <View style={styles.endGameArea}>
        {game.status === PLAYING ? (
          <TimerElement />
        ) : (
          <TouchableOpacity
            onPress={resetGame}
            style={[
              styles.button,
              isPortraitOrientation
                ? dynamicStyles.btnPortrait
                : dynamicStyles.btnLandscape,
            ]}>
            <Text style={styles['button-text']}>{lang.playAgain}</Text>
          </TouchableOpacity>
        )}

        {game.status === LOST && !isPortraitOrientation ? (
          <GameAnswer
            answerNumbers={answerNumbers}
          />
        ) : null}
      </View>
      {game.status === LOST && isPortraitOrientation ? (
        <GameAnswer answerNumbers={answerNumbers} />
      ) : (
        // Empty view for padding
        <View>
          <Text> </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  gameContainer: {
    flex: 1,
  },
  landscapeLayout: {
    flexDirection: 'row',
  },
  randomContainer: {
    flex: 3,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    alignContent: 'center',
  },
  endGameArea: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#2089dc',
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    borderColor: 'black',
    borderStyle: 'solid',
    borderWidth: 3,
  },
  'button-text': {
    justifyContent: 'center',
    textAlign: 'center',
    color: 'white',
    fontSize: 30,
  },
});

export default GameComponent;
