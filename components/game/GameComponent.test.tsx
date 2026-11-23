import {
  act,
  fireEvent,
  render,
  screen,
  within,
} from '@testing-library/react-native';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { setColorScheme } from 'vitest-native/helpers';

import { Colors } from '@/constants/Colors';
import type { NumbersSet } from '@/utils/numbersSetGenerator';
import { TIMER_TYPES } from '@/utils/timerOptions';
import GameComponent from './GameComponent';

// Reanimated's test mock resolves animations immediately, so spy on
// withRepeat to see which numbers start the answer flash.
vi.mock('react-native-reanimated', async importOriginal => {
  const actual = await importOriginal<typeof import('react-native-reanimated')>();
  return { ...actual, withRepeat: vi.fn(actual.withRepeat) };
});
const { withRepeat } = await import('react-native-reanimated');

const TIME_LIMIT = 8; // seconds (not a number on the board)
// Board: 3 7 5 1 — target 10, pre-computed answer 3 + 7 (positions 0 and 1)
const NUMBERS: NumbersSet = [10, [3, 7, 5, 1], [3, 7], [0, 1]];
const light = Colors.light;

/** Animated colours come out of interpolateColor as `rgba(r, g, b, 1)`. */
const rgba = (hex: string) => {
  const [r, g, b] = [1, 3, 5].map(i => parseInt(hex.slice(i, i + 2), 16));
  return `rgba(${r}, ${g}, ${b}, 1)`;
};

const button = (index: number) => screen.getByTestId(`random-number-${index}`);
const circle = (index: number) =>
  screen.getByTestId(`random-number-${index}-circle`);
const label = (index: number) =>
  within(circle(index)).getByText(String(NUMBERS[1][index]));

const renderGame = async () => {
  const onVictory = vi.fn();
  const onPlayAgain = vi.fn();
  await render(
    <GameComponent
      gameSettings={{
        time: TIME_LIMIT,
        length: 4,
        minToSelect: 2,
        maxToSelect: 3,
        minDigit: 1,
        maxDigit: 10,
      }}
      gameProgress={{ score: 0, game: 1 }}
      difficulty="EASY"
      numbersSettings={NUMBERS}
      timerOption={TIMER_TYPES.NUMERIC}
      onVictory={onVictory}
      onPlayAgain={onPlayAgain}
    />,
  );
  return { onVictory, onPlayAgain };
};

beforeEach(() => {
  vi.useFakeTimers();
  setColorScheme('light');
  vi.mocked(withRepeat).mockClear();
});

afterEach(() => {
  vi.useRealTimers();
  setColorScheme(null);
});

describe('GameComponent', () => {
  it('starts playing with the target and the timer', async () => {
    await renderGame();

    expect(screen.getByText('Add: 10')).toBeOnTheScreen();
    expect(screen.getByText(String(TIME_LIMIT))).toBeOnTheScreen();
    expect(screen.queryByText('Play Again!')).toBeNull();
  });

  it('wins when the selected numbers add up to the target', async () => {
    const { onVictory, onPlayAgain } = await renderGame();

    await fireEvent.press(button(0)); // 3
    await fireEvent.press(button(1)); // 7

    expect(screen.getByText('Win: 10')).toBeOnTheScreen();
    expect(screen.getByText('Score: 1')).toBeOnTheScreen();

    // selected numbers are highlighted green, the rest keep their colour
    [0, 1].forEach(i =>
      expect(circle(i)).toHaveStyle({
        backgroundColor: rgba(light.highlightCorrect),
      }),
    );
    [2, 3].forEach(i =>
      expect(circle(i)).toHaveStyle({ backgroundColor: rgba(light.primary) }),
    );
    expect(withRepeat).not.toHaveBeenCalled();

    // all numbers are locked
    [0, 1, 2, 3].forEach(i => expect(button(i)).toBeDisabled());

    await fireEvent.press(screen.getByText('Play Again!'));
    expect(onVictory).toHaveBeenCalledTimes(1);
    expect(onPlayAgain).not.toHaveBeenCalled();
  });

  it('loses when time runs out and reveals the answer', async () => {
    const { onVictory, onPlayAgain } = await renderGame();

    await fireEvent.press(button(2)); // 5, a wrong pick
    await act(async () => {
      await vi.advanceTimersByTimeAsync(TIME_LIMIT * 1000);
    });
    // NumericTimer reports the end with a setTimeout(0) scheduled during the
    // last state update, so give it one more tick.
    await act(async () => {
      await vi.advanceTimersByTimeAsync(1);
    });

    expect(screen.getByText('Fail: 10')).toBeOnTheScreen();

    // the wrong pick is highlighted red and stays readable
    expect(circle(2)).toHaveStyle({
      backgroundColor: rgba(light.highlightWrong),
    });
    expect(label(2)).not.toHaveStyle({ opacity: 0.2 });

    // the two answer numbers flash and stay readable; the unused one dims
    expect(withRepeat).toHaveBeenCalledTimes(2);
    [0, 1].forEach(i => expect(label(i)).not.toHaveStyle({ opacity: 0.2 }));
    expect(label(3)).toHaveStyle({ opacity: 0.2 });

    // the answer is also listed as text
    expect(screen.getByText('3,', { exact: false })).toBeOnTheScreen();

    await fireEvent.press(screen.getByText('Play Again!'));
    expect(onPlayAgain).toHaveBeenCalledTimes(1);
    expect(onVictory).not.toHaveBeenCalled();
  });

  it('unselecting a number keeps the game going', async () => {
    await renderGame();

    await fireEvent.press(button(0)); // 3
    await fireEvent.press(button(0)); // unselect
    await fireEvent.press(button(1)); // 7 alone is not 10

    expect(screen.getByText('Add: 10')).toBeOnTheScreen();
    expect(button(2)).toBeEnabled();
  });
});
