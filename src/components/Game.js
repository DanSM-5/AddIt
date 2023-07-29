import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import PropTypes from 'prop-types';
import RandomNumber from './RandomNumber';
import { PLAYING, LOST, WON } from './GameStatus';
import AnimatedProgressWheel from './AnimatedProgressWheel';
import DifficultySettings from './DifficultySettings';
import numbersSetGenerator from '../js/numbersSetGenerator';

/**
 * OLD VERSION OF THE GAME
 * 
 * Saved as reference
 */

const screenWidth = Math.round(Dimensions.get('window').width);
const topMessage = {
    PLAYING: 'Sum:',
    LOST: 'Fail:',
    WON: 'Success:',
}

class Game extends React.Component {
    static propTypes = {
        difficulty: PropTypes.string.isRequired,
        onPlayAgain: PropTypes.func.isRequired,
        onVictory: PropTypes.func.isRequired,
        setLost: PropTypes.func.isRequired,
        timeoutToClear: PropTypes.number.isRequired,
        gameInfo: PropTypes.object.isRequired,
    };

    constructor(props) {
        super(props);
        this.state = {
            selectedIds: [],
            gameStatus: PLAYING,
        }
        this.score = this.props.gameInfo.score;
        this.difficultySettings = DifficultySettings(this.props.difficulty);
        this.time = this.difficultySettings.time;
        [this.target, this.randomNumbers, this.randomSelection] =  numbersSetGenerator(this.difficultySettings);
    }

    componentDidMount(){
        this.props.setLost(() => this.setState({ gameStatus: LOST }));
    }

    componentDidUpdate( prevProps, prevState) {
        if (prevState.selectedIds !== this.state.selectedIds && prevState.gameStatus !== LOST) {
            this.setState({ gameStatus: this.calcGameStatus(this.state)});
        }

        if (this.state.gameStatus !== PLAYING) {
            clearTimeout(this.props.timeoutToClear);
            if (this.state.gameStatus === WON 
                && prevState.gameStatus === PLAYING ) {
                this.props.onVictory();
            }
        }
    }
    
    componentWillUnmount() {
        clearTimeout(this.props.timeoutToClear);
    }

    calcGameStatus = (state) => {    
        const sumSelected = state.selectedIds.reduce((acc, curr) =>
        {
            return acc + this.randomNumbers[curr];
        }, 0);
    
        if (sumSelected === this.target) {
            // Display correct score in current render
            this.score += 1;
            return WON;
        }
        else{
            return PLAYING;
        }
    };

    isNumberSelected = (index) => {
        return this.state.selectedIds.indexOf(index) >= 0;
    };

    selectNumber = (index) => {
        this.setState((prevState, props) => { 
            return { selectedIds: [...prevState.selectedIds, index] }
        });
    };
    unselectNumber = (index) => {
        this.setState((prevState, props) => { 
            return { selectedIds: prevState.selectedIds.reduce((acc, curr) => {
                if (curr === index ) {
                    return [...acc];
                }
                return [...acc, curr];
            }, [])}
        }); 
    }

    render(){
        const gameStatus = this.state.gameStatus;
        return (
        <>
            <View style={styles.container}>
                <View style={styles.targetContainer}>
                    <Text style={styles.difficulty}>{this.props.difficulty}</Text>
                    <Text style={[styles.target, styles[`STATUS_${gameStatus}`]]}>
                        {topMessage[gameStatus]} {this.target}
                    </Text>
                </View>
                <View style={styles.answer}>
                        <Text>Score: {this.score}</Text>
                        <Text>Games: {this.props.gameInfo.game}</Text>
                </View>
                <View style={styles.randomContainer}>
                    {this.randomNumbers.map((random, index) =>
                        <RandomNumber key={index} number={random}
                            isSelected={this.isNumberSelected(index)} 
                            onPress={this.selectNumber} 
                            onPressDisabled={this.unselectNumber}
                            isActive={gameStatus === PLAYING}
                            id={index} />
                    )}
                </View>
                        <View style={styles.endGameArea}>
                            { gameStatus === PLAYING 
                                ? <AnimatedProgressWheel
                                    size={100}
                                    width={15}
                                    progress={100}
                                    animateFromValue={0}
                                    duration={this.time * 1000}
                                    color="#2089dc"
                                    backgroundColor="#3d5875"
                                  />
                                : <TouchableOpacity 
                                    onPress={this.props.onPlayAgain}
                                    style={styles.button}
                                    >
                                    <Text style={styles["button-text"]}>Play Again!</Text>
                                  </TouchableOpacity>
                            }
                        </View> 

                { gameStatus === LOST
                    ?   <View style={styles.answer}>
                            <Text>Answer: </Text>
                                {this.randomSelection.map((num, key) => 
                            <Text key={key}>{num}</Text>)} 
                        </View>
                    : null
                }
            </View>
        </>
        );
    };
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fbeec1',
        flex: 1,
    },
    difficulty: {
        fontSize: 20,
    },
    targetContainer: {
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
    },
    target:{
        fontSize: 40,
        textAlign: "center",
        width: screenWidth * 0.8,
        borderRadius: 20,
    },
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
    },
    'button-text': {
        justifyContent: "center",
        textAlign: "center",
        color: 'white',
        fontSize: 30,
    },
    STATUS_WON: {
        backgroundColor: 'green',
    },
    STATUS_PLAYING: {  
        backgroundColor: '#659dbd',
        color: 'white',
    },
    STATUS_LOST: {
        backgroundColor: 'red',
    },
});

export default Game;