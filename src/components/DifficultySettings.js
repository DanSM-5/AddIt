import { EASY, MEDIUM, HARD } from './Difficulties';

const DifficultySettings = (type) => {
    switch(type){
        case HARD:{
            return { 
                time: 10, 
                length: 9,
                minToSelect: 3,
                maxToSelect: 5,
                minDigit: 3,
                maxDigit: 15,
            }
        }
        case MEDIUM:{
            return {
                time: 15, 
                length: 9,
                minToSelect: 2,
                maxToSelect: 7,
                minDigit: 1,
                maxDigit: 10,
            }
        }
        case EASY:
        default:{
            return {
                time: 10, 
                length: 6,
                minToSelect: 2,
                maxToSelect: 5,
                minDigit: 1,
                maxDigit: 10,
            }
        }
    }
}

export default DifficultySettings;