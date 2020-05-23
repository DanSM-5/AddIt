import { EASY, MEDIUM, HARD } from './Difficulties';

const DifficultySettings = (type) => {
    switch(type){
        case HARD:{
            return { 
                time: 8, 
                count: 9,
                min: 2,
                max: 5,
            }
        }
        case MEDIUM:{
            return {
                time: 15, 
                count: 9,
                min: 2,
                max: 5,
            }
        }
        case EASY:
        default:{
            return {
                time: 10, 
                count: 6,
                min: 2,
                max: 5,
            }
        }
    }
}

export default DifficultySettings;