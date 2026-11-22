import { describe, expect, it } from 'vitest';

import { GAME_SETTINGS_PRESETS } from '@/components/game/DifficultySettings';
import {
  getTargetAndAnswer,
  numbersSetGenerator,
  selectRandom,
} from './numbersSetGenerator';

describe('getTargetAndAnswer', () => {
  it('returns the sum of the chosen positions', () => {
    expect(getTargetAndAnswer([0, 1], [1, 2, 4, 8], 5)).toEqual([3, [0, 1]]);
  });

  it('adds a button whose value equals the target (no single-button solution)', () => {
    // 1 + 2 = 3 exists at index 2, so it joins the answer: 1 + 2 + 3 = 6
    expect(getTargetAndAnswer([0, 1], [1, 2, 3, 9], 5)).toEqual([6, [0, 1, 2]]);
  });

  it('uses distinct positions when values are duplicated', () => {
    // target 4 matches the *other* 4 (index 2), never index 0 again
    expect(getTargetAndAnswer([0], [4, 7, 4], 5)).toEqual([8, [0, 2]]);
  });

  it('does not count the same button twice', () => {
    // only index 0 holds 5 and it is already in the answer
    expect(getTargetAndAnswer([0], [5, 1], 5)).toEqual([5, [0]]);
  });

  it('drops the smallest value when the answer exceeds maxLength', () => {
    // 1 + 2 + 10 + 20 = 33 has 4 items > 3, so the 1 is removed
    expect(getTargetAndAnswer([0, 1, 3, 4], [1, 2, 3, 10, 20], 3)).toEqual([
      32,
      [1, 3, 4],
    ]);
  });
});

describe('selectRandom', () => {
  it('returns distinct positions within bounds', () => {
    for (let i = 0; i < 500; i++) {
      const picked = selectRandom([1, 2, 3, 4, 5, 6], 2, 4);
      expect(new Set(picked).size).toBe(picked.length);
      expect(picked.length).toBeGreaterThanOrEqual(2);
      expect(picked.length).toBeLessThanOrEqual(4);
      picked.forEach(index => expect(index).toBeLessThan(6));
    }
  });

  it('never asks for more positions than the source has', () => {
    expect(selectRandom([1, 2], 5, 5)).toHaveLength(2);
  });
});

describe('numbersSetGenerator', () => {
  it('returns an empty set when length is 0', () => {
    expect(
      numbersSetGenerator({
        length: 0,
        minToSelect: 2,
        maxToSelect: 3,
        minDigit: 1,
        maxDigit: 10,
      }),
    ).toEqual([0, [], [], []]);
  });

  const presets = Object.entries(GAME_SETTINGS_PRESETS).map(
    ([name, { time: _time, ...settings }]) => [name, settings] as const,
  );

  it.each(presets)('%s preset produces valid games', (_name, settings) => {
    for (let i = 0; i < 2000; i++) {
      const [target, source, answer, answerIndices] =
        numbersSetGenerator(settings);

      // board
      expect(source).toHaveLength(settings.length);
      source.forEach(num => {
        expect(num).toBeGreaterThanOrEqual(settings.minDigit);
        expect(num).toBeLessThanOrEqual(settings.maxDigit);
      });

      // answer positions are distinct, in range and match the answer values
      expect(new Set(answerIndices).size).toBe(answerIndices.length);
      expect(answerIndices.length).toBeLessThanOrEqual(settings.maxToSelect);
      expect(answerIndices.map(index => source[index])).toEqual(answer);

      // the answer adds up to the target
      expect(answer.reduce((acc, num) => acc + num, 0)).toBe(target);

      // no unused button alone equals the target
      source.forEach((num, index) => {
        if (!answerIndices.includes(index)) {
          expect(num).not.toBe(target);
        }
      });
    }
  });
});
