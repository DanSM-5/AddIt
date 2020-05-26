import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import AnimatedProgressWheel from 'react-native-progress-wheel';

import { WON, PLAYING, LOST } from './GameStatus';
import RandomNumber from './RandomNumber';
import GameHeader from './GameHeader';

const screenWidth = Math.round(Dimensions.get('window').width);

const GameComponent = ({gameSettings, gameProgress,difficulty, onPlayAgain, numbersSettings, onVictory }) => {
    const [game, setGame] = useState({status: PLAYING});
    const [selectedIds, setSelectedIds] = useState([]);
    const [target, gameNumbers, answerNumbers] = numbersSettings;
    const { score, game: numberOfGame } = gameProgress;
    const [gameScore, setGameScore] = useState(score);
    const timeLimit = gameSettings.time * 1000;
    const [ timer, setTimer ] = useState(0);


    useEffect(() => {
        if(timer === 0){
            setTimer(setTimeout(() => {
                setGame({status: LOST});
            },  timeLimit))
        }

        if (game.status === WON) {
            clearTimeout(timer);
        } 
    }, [game]);

    
    const calcGameStatus = (arr) => {
        const sumSelected = arr.reduce((acc, curr) =>
        {
            return acc + gameNumbers[curr];
        }, 0);

        if (sumSelected === target) {
            setGameScore(gameScore + 1);
            setGame({ status: WON });
        }
    };

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

    const resetGame = () => game.status === WON ? onVictory() : onPlayAgain() 

    return (
        <>
            <GameHeader
                difficulty={difficulty}
                status={game.status}
                target={target}
                score={gameScore}
                gameNumber={numberOfGame}
            />
            <View style={styles.randomContainer}>
                {gameNumbers.map((random, index) =>
                    <RandomNumber key={index} number={random}
                        isSelected={isNumberSelected(index)} 
                        onPress={selectNumber} 
                        onPressDisabled={unselectNumber}
                        isActive={game.status === PLAYING}
                        id={index} />
                )}
            </View>
            <View style={styles.endGameArea}>
                { game.status === PLAYING 
                    ? <AnimatedProgressWheel
                        size={100}
                        width={15}
                        progress={100}
                        animateFromValue={0}
                        duration={timeLimit}
                        color="#2089dc"
                        backgroundColor="#3d5875"
                        />
                    : <TouchableOpacity 
                        onPress={resetGame}
                        style={styles.button}
                        >
                            <Text style={styles["button-text"]}>Play Again!</Text>
                        </TouchableOpacity>
                }
            </View> 

            { game.status === LOST
                ?   <View style={styles.answer}>
                        <Text>Answer: </Text>
                            {answerNumbers.map((num, key) => 
                        <Text key={key}>{num}</Text>)} 
                    </View>
                : null
            }
        </>
    );
}

const styles = StyleSheet.create({
    randomContainer: {
        flex: 3,
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-around",
        alignContent: "center",
    },
    answer: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-around",
    },
    endGameArea: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    button: {
        backgroundColor: '#2089dc',
        height: 50,
        width: screenWidth * 0.8,
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