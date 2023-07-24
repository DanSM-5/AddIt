const NumbersCalculator = ({ length, minToSelect, maxToSelect, minDigit, maxDigit }) => {
    if (typeof(length) !== 'number') {
        throw "length argument is NaN";
    }
    if (!length) {
        throw "length argument is undefined";
    }

    const randomSource = randomNumbers(length, minDigit, maxDigit);

    const chosenFromSource = selectRandom( randomSource, minToSelect, maxToSelect );

    const [target, answer] = getTargetAndAnswer( chosenFromSource, randomSource, maxToSelect );

    return [target, randomSource, answer];
}


export const randomNumbers = ( length, min, max ) => Array.from({ length: length })
                                .map(() => getRandomBetween(min, max));// min + Math.floor((max - min + 1) * Math.random()));

export const selectRandom = ( source, min, max ) => {
    const indexes = new Map();
    return Array
        .from({ length: getRandomBetween(min, max)})
        .map(_ => {
            const index = getRandomUnrepeatedIndex(indexes, source.length);
            indexes.set(index.toString(), index);
            return source[index];
    });
};

const getRandomUnrepeatedIndex = ( map, max ) => {
    while(true) {
        const indexVal = Math.floor(Math.random() * max);
        if(map.has(indexVal.toString()) === false){
            return indexVal;
        }
    }
}

const getRandomBetween = (from, to) => from + Math.floor(Math.random() * (to - from + 1));

export const getTargetAndAnswer = ( arrToAdd, arrToCompare, maxLength ) => { 
    const answerArr = [...arrToAdd];
    while(true){
        const total = answerArr.reduce((acc, curr) => acc + curr, 0);
        const isAnyInArr = arrToCompare.some(num => num === total);
        if (isAnyInArr) {
            answerArr.push(total);
            continue;
        }
        if (answerArr.length > maxLength) {
            const min = Math.min(...answerArr);
            answerArr.splice(answerArr.indexOf(min), 1);
            continue;
        }
        return [total, answerArr];
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

    do{
        const [target, source, fromSource] = NumbersCalculator({ length, minToSelect, maxToSelect, minDigit, maxDigit });
        console.log('\nResults:');
        console.table({
            target: target,
            randomNumbers: source,
            selectedFromRandom: fromSource,
        });

        answer = prompt('Print another table(Y/N):');
        answer = answer === null ? 'n' : answer;
        
    }while(answer.toLowerCase() === 'y');
}

export default NumbersCalculator;