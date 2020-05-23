import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import PropTypes from 'prop-types';
import RandomNumber from './RandomNumber';
import { PLAYING, LOST, WON } from './GameStatus';
import AnimatedProgressWheel from 'react-native-progress-wheel';


const screenWidth = Math.round(Dimensions.get('window').width);
const topMessage = {
    PLAYING: 'Sum:',
    LOST: 'Fail:',
    WON: 'Success:',
}

class Game extends React.Component {
    static propTypes = {
        randomNumberCount: PropTypes.number.isRequired,
        initialSeconds: PropTypes.number.isRequired,
        onPlayAgain: PropTypes.func.isRequired,
        setLost: PropTypes.func.isRequired,
        timeoutToClear: PropTypes.number.isRequired,
    };

    constructor(props) {
        super(props);
        this.state = {
            selectedIds: [],
            gameStatus: PLAYING,
        }
        this.score = this.props.gameInfo.score;
        //console.log(this.props);
    }

    componentDidMount(){
        //console.log(this.props.setLost);
        this.props.setLost(() => this.setState({ gameStatus: LOST }));
    }

    componentDidUpdate( prevProps, prevState) {
        if (prevState.selectedIds !== this.state.selectedIds ) {
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

    componentWillUnmount() {
        clearTimeout(this.props.timeoutToClear);
    }
    
    randomNumbers = Array.from({ length: this.props.randomNumberCount })
                        .map(() => 1 + Math.floor(10 * Math.random()));

    randomSelection = Array.from({ length: (() => {
                            const numOfDigits = 1 + Math.floor(Math.random() * this.props.randomNumberCount)
                            if (numOfDigits === 1) {
                                return 2;
                            } else if (numOfDigits === this.props.randomNumberCount){
                                return this.props.randomNumberCount - 1
                            }
                            return numOfDigits;
                        })()})
                        .reduce((acc, curr) => {
                            let index;
                            do{
                                index = Math.floor(Math.random() * this.props.randomNumberCount)
                            }while(acc.some(o => o.index === index));

                            return [...acc, {value: this.randomNumbers[index], index: index}];
                        },[]);

    target = this.randomSelection.reduce((acc, curr) => acc + curr.value, 0);

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
                                    duration={this.props.initialSeconds * 1000}
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
                                {this.randomSelection.map((o, key) => 
                            <Text key={key}>{o.value}</Text>)} 
                        </View>
                    : null
                }
                
                {/* <View style={styles.answer}>
                    <Text>Answer: </Text>
                    {this.randomSelection.map((o, key) => 
                        <Text key={key}>{o.value}</Text>)} 
                </View> */}
            </View>
            {/* <Text>{gameStatus}</Text> */}
        </>
        );
    };
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fbeec1',
        flex: 1,
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
        //backgroundColor: 'blue',
    },
    answer: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-around",
    },
    endGameArea: {
        //backgroundColor: 'white',
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