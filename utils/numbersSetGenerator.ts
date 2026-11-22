type CalculatorProps = {
  length: number;
  minToSelect: number;
  maxToSelect: number;
  minDigit: number;
  maxDigit: number;
};

export type NumbersSet = Readonly<
  [target: number, source: number[], answer: number[], answerIndices: number[]]
>;

export const numbersSetGenerator = ({
  length,
  minToSelect,
  maxToSelect,
  minDigit,
  maxDigit,
}: CalculatorProps): NumbersSet => {
  if (!length) {
    return [0, [], [], []];
  }

  const randomSource = randomNumbers(length, minDigit, maxDigit);

  const chosenIndices = selectRandom(randomSource, minToSelect, maxToSelect);

  const [target, answerIndices] = getTargetAndAnswer(
    chosenIndices,
    randomSource,
    maxToSelect,
  );

  const answer = answerIndices.map(index => randomSource[index]);

  return [target, randomSource, answer, answerIndices] as NumbersSet;
};

export const getRandomBetween = (from: number, to: number) =>
  from + Math.floor(Math.random() * (to - from + 1));

export const randomNumbers = (length: number, min: number, max: number) =>
  Array.from({ length }).map(() => getRandomBetween(min, max));
// min + Math.floor((max - min + 1) * Math.random()));

/** Picks between `min` and `max` distinct positions of `source`. */
export const selectRandom = (source: number[], min: number, max: number) => {
  const indexes = new Set<number>();
  const count = Math.min(getRandomBetween(min, max), source.length);

  return Array.from({ length: count }).map(_ => {
    const index = getRandomUnrepeatedIndex(indexes, source.length);
    indexes.add(index);

    return index;
  });
};

const getRandomUnrepeatedIndex = (used: Set<number>, max: number) => {
  while (true) {
    const indexVal = Math.floor(Math.random() * max);

    if (!used.has(indexVal)) {
      return indexVal;
    }
  }
};

/**
 * Works on positions of `source`, so every answer entry refers to a distinct
 * button even when the same value appears more than once.
 */
export const getTargetAndAnswer = (
  indicesToAdd: number[],
  source: number[],
  maxLength: number,
): [total: number, answerIndices: number[]] => {
  const answerIndices = [...indicesToAdd];

  while (true) {
    const target = answerIndices.reduce((acc, index) => acc + source[index], 0);
    // A single unused button holding the target would be a trivial solution:
    // add that button to the answer and recompute.
    const singleDigitIndex = source.findIndex(
      (num, index) => num === target && !answerIndices.includes(index),
    );

    if (singleDigitIndex >= 0) {
      answerIndices.push(singleDigitIndex); // Add big digit
      continue;
    }

    if (answerIndices.length > maxLength) {
      // If the answer gets too big
      // remove the smallest item and calc again
      const smallest = answerIndices.reduce((minPos, index, pos) =>
        source[index] < source[answerIndices[minPos]] ? pos : minPos,
      0);
      answerIndices.splice(smallest, 1);
      continue;
    }

    return [target, answerIndices];
  }
};

export const test = (
  length = 10,
  minToSelect = 2,
  maxToSelect = 5,
  minDigit = 1,
  maxDigit = 10,
) => {
  console.log('Test of NumbersCalculetor.js');
  console.log('The values are:');
  console.table({
    length: length,
    minToSelect: minToSelect,
    maxToSelect: maxToSelect,
    minDigit: minDigit,
    maxDigit: maxDigit,
  });

  let answer;

  do {
    const [target, source, fromSource] = numbersSetGenerator({
      length,
      minToSelect,
      maxToSelect,
      minDigit,
      maxDigit,
    });
    console.log('\nResults:');
    console.table({
      target: target,
      randomNumbers: source,
      selectedFromRandom: fromSource,
    });

    answer = window.prompt('Print another table(Y/N):');
    answer = answer === null ? 'n' : answer;
  } while (answer.toLowerCase() === 'y');
};

export default numbersSetGenerator;
