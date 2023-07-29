type CalculatorProps = {
    length: number;
    minToSelect: number;
    maxToSelect: number;
    minDigit: number;
    maxDigit: number;
};

export const numbersSetGenerator = ({
    length,
    minToSelect,
    maxToSelect,
    minDigit,
    maxDigit
}: CalculatorProps): [target: number, source: number[], answer: number[]] => {
    if (!length) {
        return [0, [], []];
    }

    const randomSource = randomNumbers(length, minDigit, maxDigit);

    const chosenFromSource = selectRandom(randomSource, minToSelect, maxToSelect);

    const [target, answer] = getTargetAndAnswer(chosenFromSource, randomSource, maxToSelect);

    return [target, randomSource, answer];
}

export const getRandomBetween = (from: number, to: number) =>
    from + Math.floor(Math.random() * (to - from + 1));

export const randomNumbers = (length: number, min: number, max: number) =>
    Array.from({ length })
        .map(() => getRandomBetween(min, max));
        // min + Math.floor((max - min + 1) * Math.random()));

export const selectRandom = (source: number[], min: number, max: number) => {
    const indexes = new Map<number, number>();

    return Array
        .from({ length: getRandomBetween(min, max)})
        .map(_ => {
            const index = getRandomUnrepeatedIndex(indexes, source.length);
            indexes.set(index, index);

            return source[index];
    });
};

const getRandomUnrepeatedIndex = (map: Map<number, number>, max: number) => {
    while (true) {
        const indexVal = Math.floor(Math.random() * max);

        if (!map.has(indexVal)) {
            return indexVal;
        }
    }
}

export const getTargetAndAnswer = (
    arrToAdd: number[],
    arrToCompare: number[],
    maxLength: number
): [total: number, answer: number[]] => {
    const answerArr = [...arrToAdd];

    while (true) {
        const target = answerArr.reduce((acc, curr) => acc + curr, 0);
        const isSingleDigitSolution = arrToCompare.some(num => num === target);

        if (isSingleDigitSolution) {
            answerArr.push(target); // Add big digit
            continue;
        }

        if (answerArr.length > maxLength) {
            // If answerArr gets too big
            // remove the smallest item and calc again
            const min = Math.min(...answerArr);
            answerArr.splice(answerArr.indexOf(min), 1);
            continue;
        }

        return [target, answerArr];
    }
};

export const test = (length = 10, minToSelect = 2, maxToSelect = 5, minDigit = 1, maxDigit = 10) => {
    console.log('Test of NumbersCalculetor.js');
    console.log(`The values are:`);
    console.table({
        length: length,
        minToSelect: minToSelect,
        maxToSelect: maxToSelect,
        minDigit: minDigit,
        maxDigit: maxDigit,
    });

    let answer;

    do {
        const [target, source, fromSource] = numbersSetGenerator({ length, minToSelect, maxToSelect, minDigit, maxDigit });
        console.log('\nResults:');
        console.table({
            target: target,
            randomNumbers: source,
            selectedFromRandom: fromSource,
        });

        answer = window.prompt('Print another table(Y/N):');
        answer = answer === null ? 'n' : answer;

    } while (answer.toLowerCase() === 'y');
}

export default numbersSetGenerator;