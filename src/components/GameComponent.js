import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';

import AnimatedProgressWheel from './AnimatedProgressWheel';
import { WON, PLAYING, LOST } from './GameStatus';
import RandomNumber from './RandomNumber';
import GameHeader from './GameHeader';
import GameAnswer from './GameAnswer';
import { isPortrait } from '../js/screenOrientation';
import NumericTimer from './NumericTimer';
import LanguageContext from './LanguageContext';

const GameComponent = ({ 
    gameSettings, 
    gameProgress, 
    difficulty, 
    onPlayAgain, 
    numbersSettings, 
    onVictory, 
    timerOption 
}) => {
    const [ game, setGame ] = useState({ status: PLAYING });
    const [ isPortraitOrientation, setIsPortraitOrientation ] = useState(isPortrait());
    const [ selectedIds, setSelectedIds ] = useState([]);
    const [ target, gameNumbers, answerNumbers ] = numbersSettings;
    const { score, game: numberOfGame } = gameProgress;
    const [ gameScore, setGameScore ] = useState(score);
    const timeLimit = gameSettings.time * 1000;
    const lang = useContext(LanguageContext).language;
    
    const calcGameStatus = (arr) => {
        const sumSelected = arr.reduce((acc, curr) =>{
            return acc + gameNumbers[curr];
        }, 0);
        if (sumSelected === target) {
            setGameScore(gameScore + 1);
            setGame({ status: WON });
        }
    };

    const onTimeEnd = () => 
        setGame((prevState) => 
            prevState.status === WON ? prevState : {status: LOST} );

    const isNumberSelected = (index) => selectedIds.indexOf(index) >= 0;

    const selectNumber = (index) => {
        const updatedSelectedIds = [...selectedIds, index];
        setSelectedIds(updatedSelectedIds);
        calcGameStatus(updatedSelectedIds);
    };

    const unselectNumber = (index) => {
        const updatedSelectedIds = selectedIds.reduce((acc, curr) => {
            if (curr === index) {
                return [...acc]
            }
            return [...acc, curr]
        }, []);
        setSelectedIds(updatedSelectedIds);
        calcGameStatus(updatedSelectedIds);
    }

    const resetGame = () => game.status === WON ? onVictory() : onPlayAgain();

    const onOrientationChanged = () => {
        if ( isPortrait() ) {
            setIsPortraitOrientation(true);
        }else{
            setIsPortraitOrientation(false);
        }
    }
    
    const { width } = Dimensions.get('window');
    
    const dynamicStyles = StyleSheet.create({
        btnPortrait: {
            width: Math.round(width) * 0.8,
        },
        btnLandscape:{
            height: 85,
            width: Math.round(width) * 0.15,
        },
    });

    const TimerElement = () => {                     
        if (timerOption === 'Circular') {
            return (<AnimatedProgressWheel
                size={100}
                width={15}
                progress={100}
                animateFromValue={0}
                duration={timeLimit}
                color="#2089dc"
                backgroundColor="#3d5875"
                onAnimationComplete={onTimeEnd}
            />)
        } else if (timerOption === 'Numeric') {
            return <NumericTimer timeLimit={timeLimit} onTimeEnd={onTimeEnd}/>;
        }
    }

    return (
    <View style={[styles.gameContainer, !isPortraitOrientation && styles.landscapeLayout]}
        onLayout={onOrientationChanged}
    >
        <GameHeader
            difficulty={difficulty}
            status={game.status}
            target={target}
            score={gameScore}
            gameNumber={numberOfGame}
            isPortrait={isPortraitOrientation}
        />
        <View 
            style={styles.randomContainer}>
            {gameNumbers.map((random, index) =>
                <RandomNumber key={index} number={random}
                isSelected={isNumberSelected(index)} 
                onPress={selectNumber} 
                onPressDisabled={unselectNumber}
                isActive={game.status === PLAYING}
                id={index} />)
            }
        </View>
        <View style={styles.endGameArea}>
            { game.status === PLAYING 
                ? TimerElement()
                : <TouchableOpacity 
                    onPress={resetGame}
                    style={[styles.button, isPortraitOrientation 
                        ? dynamicStyles.btnPortrait 
                        : dynamicStyles.btnLandscape]}
                    >
                        <Text style={styles["button-text"]}>{lang.playAgain}</Text>
                    </TouchableOpacity>
            }

            { game.status === LOST && !isPortraitOrientation
                ?   <GameAnswer answerNumbers={answerNumbers} isPortrait={isPortraitOrientation} />
                : null
            }
        </View> 
            { game.status === LOST && isPortraitOrientation
                ?   <GameAnswer answerNumbers={answerNumbers} />
                : null
            }
    </View>);
}

const styles = StyleSheet.create({
    gameContainer:{
        flex: 1,
    },
    landscapeLayout: {
        flexDirection: "row",
    },
    randomContainer: {
        flex: 3,
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-around",
        alignContent: "center",
    },
    endGameArea: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    button: {
        backgroundColor: '#2089dc',
        height: 50,
        borderRadius: 10,
        justifyContent: "center",
        borderColor: 'black',
        borderStyle: "solid",
        borderWidth: 3,
    },
    'button-text': {
        justifyContent: "center",
        textAlign: "center",
        color: 'white',
        fontSize: 30,
    },
});
export default GameComponent;