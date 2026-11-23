import { fireEvent, render, screen } from '@testing-library/react-native';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { setColorScheme } from 'vitest-native/helpers';

import { Colors } from '@/constants/Colors';
import RandomNumber from './RandomNumber';

// Reanimated's test mock resolves animations immediately (withSequence -> 0),
// so the flash can't be observed mid-way. Spy on withRepeat to check that the
// repeating flash starts.
vi.mock('react-native-reanimated', async importOriginal => {
  const actual = await importOriginal<typeof import('react-native-reanimated')>();
  return { ...actual, withRepeat: vi.fn(actual.withRepeat) };
});
const { withRepeat } = await import('react-native-reanimated');

type Props = Partial<React.ComponentProps<typeof RandomNumber>>;

const renderNumber = async (props: Props = {}) => {
  const onPress = vi.fn();
  const onPressDisabled = vi.fn();
  const view = await render(
    <RandomNumber
      id={3}
      number={7}
      isSelected={false}
      isActive
      onPress={onPress}
      onPressDisabled={onPressDisabled}
      {...props}
    />,
  );
  return { ...view, onPress, onPressDisabled };
};

/** Animated colours come out of interpolateColor as `rgba(r, g, b, 1)`. */
const rgba = (hex: string) => {
  const [r, g, b] = [1, 3, 5].map(i => parseInt(hex.slice(i, i + 2), 16));
  return `rgba(${r}, ${g}, ${b}, 1)`;
};

const circle = () => screen.getByTestId('random-number-3-circle');
const label = () => screen.getByText('7');

beforeEach(() => {
  setColorScheme('light');
  vi.mocked(withRepeat).mockClear();
});

afterEach(() => {
  setColorScheme(null);
});

describe('RandomNumber interaction', () => {
  it('selects the number when pressed', async () => {
    const { onPress, onPressDisabled } = await renderNumber();

    await fireEvent.press(label());

    expect(onPress).toHaveBeenCalledWith(3);
    expect(onPressDisabled).not.toHaveBeenCalled();
  });

  it('unselects the number when pressed again', async () => {
    const { onPress, onPressDisabled } = await renderNumber({ isSelected: true });

    await fireEvent.press(label());

    expect(onPressDisabled).toHaveBeenCalledWith(3);
    expect(onPress).not.toHaveBeenCalled();
  });

  it('ignores presses once the game is over', async () => {
    const { onPress, onPressDisabled } = await renderNumber({ isActive: false });

    expect(screen.getByTestId('random-number-3')).toBeDisabled();
    await fireEvent.press(label());

    expect(onPress).not.toHaveBeenCalled();
    expect(onPressDisabled).not.toHaveBeenCalled();
  });
});

describe('RandomNumber colours', () => {
  const light = Colors.light;

  it('uses the primary colour while playing', async () => {
    await renderNumber();

    expect(circle()).toHaveStyle({
      backgroundColor: rgba(light.primary),
      borderColor: light.outline,
    });
    expect(label()).toHaveStyle({ color: rgba(light.onPrimary) });
    expect(label()).not.toHaveStyle({ opacity: 0.2 });
  });

  it('dims a selected number while playing', async () => {
    await renderNumber({ isSelected: true });

    expect(label()).toHaveStyle({ opacity: 0.2 });
  });

  it('dims numbers that are not highlighted when the game ends', async () => {
    await renderNumber({ isActive: false });

    expect(label()).toHaveStyle({ opacity: 0.2 });
  });

  it.each([
    ['correct', light.highlightCorrect],
    ['wrong', light.highlightWrong],
  ] as const)('highlights a %s number at full opacity', async (highlight, bg) => {
    await renderNumber({ isActive: false, isSelected: true, highlight });

    expect(circle()).toHaveStyle({ backgroundColor: rgba(bg) });
    expect(label()).toHaveStyle({ color: rgba(light.onHighlight) });
    expect(label()).not.toHaveStyle({ opacity: 0.2 });
  });

  it('follows the dark palette', async () => {
    setColorScheme('dark');
    await renderNumber({ isActive: false, isSelected: true, highlight: 'wrong' });

    expect(circle()).toHaveStyle({
      backgroundColor: rgba(Colors.dark.highlightWrong),
      borderColor: Colors.dark.outline,
    });
    expect(label()).toHaveStyle({ color: rgba(Colors.dark.onHighlight) });
  });
});

describe('RandomNumber answer flash', () => {
  it('starts a repeating flash and keeps the number visible', async () => {
    await renderNumber({ isActive: false, flash: true });

    expect(withRepeat).toHaveBeenCalledTimes(1);
    expect(vi.mocked(withRepeat).mock.calls[0][1]).toBe(-1); // until reset
    expect(label()).not.toHaveStyle({ opacity: 0.2 });
  });

  it('does not flash without the flag', async () => {
    await renderNumber({ isActive: false });

    expect(withRepeat).not.toHaveBeenCalled();
  });
});
