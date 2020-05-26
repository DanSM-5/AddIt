const NumbersCalculator = ({ length, minToSelect, maxToSelect, minDigit = 1, maxDigit = 10 }) => {
    if (typeof(length) !== 'number') {
        throw "length argument is NaN";
    }
    if (!length) {
        throw "length argument is undefined";
    }

    const randomSource = randomNumbers(length, minDigit, maxDigit);

    const chosenFromSource = selectRandom( randomSource, minToSelect, maxToSelect );

    const target = getTarget( chosenFromSource, randomSource );

    return [target, randomSource, chosenFromSource];
}


export const randomNumbers = ( length, min, max ) => Array.from({ length: length })
                                .map(() => min + Math.floor((max - min + 1) * Math.random()));

export const selectRandom = ( source, min, max ) => Array
        .from({ length: getRandomBetween(min, max)})
        .reduce((acc, curr) => {
            const index = getRandomUnrepeatedIndex(acc.map(n => n.index), source.length)
            return [...acc, {value: source[index], index: index}];
        },[])
        .map(curr => curr.value);

const getRandomUnrepeatedIndex = ( arr, max ) => {
    while(true) {
        const indexVal = Math.floor(Math.random() * max);
        if (!arr.some(num => num === indexVal)) {
            return indexVal
        }
    }
}

const getRandomBetween = (from, to) => from + Math.floor(Math.random() * (to - from + 1));

export const getTarget = ( arrToAdd, arrToCompare ) => { 
    const total = arrToAdd.reduce((acc, curr) => acc + curr, 0);
    return arrToCompare.some(num => num === total) ? total * 2 : total;
};  

export const test = () => {
    console.log('Test of NumbersCalculetor.js');
    const length = 10, minToSelect = 2, maxToSelect = 5, minDigit = 1, maxDigit = 10;
    console.log(`The values are:`);
    console.table({
        length: length,
        minToSelect: minToSelect,
        maxToSelect: maxToSelect,
        minDigit: minDigit,
        maxDigit: maxDigit,
    });
    
    let answer;

    do{
        const [target, source, fromSource] = NumbersCalculator({ length, minToSelect, maxToSelect, minDigit, maxDigit });
        console.log('\nResults:');
        console.table({
            target: target,
            randomNumbers: source,
            selectedFromRandom: fromSource,
        });

        answer = prompt('Print another table(Y/N):');
        
    }while(answer.toLowerCase() === 'y');
}

export default NumbersCalculator;