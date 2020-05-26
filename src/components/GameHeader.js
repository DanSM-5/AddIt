import React from 'react';
import { View, Text, StyleSheet, Dimensions} from 'react-native';

const screenWidth = Math.round(Dimensions.get('window').width);
const topMessage = {
    PLAYING: 'Sum:',
    LOST: 'Fail:',
    WON: 'Success:',
}

const GameHeader = ({ status, target, score, gameNumber, difficulty }) => {
    return (
        <>
            <View style={styles.targetContainer}>
                <Text style={styles.difficulty}>{difficulty}</Text>
                <Text style={[styles.target, styles[`STATUS_${status}`]]}>
                    {topMessage[status]} {target}
                </Text>
            </View>
            <View style={styles.answer}>
                    <Text>Score: {score}</Text>
                    <Text>Games: {gameNumber}</Text>
            </View>  
        </>
    );
};

const styles = StyleSheet.create({
    difficulty: {
        fontSize: 20,
        fontWeight: "bold",
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
        borderColor: 'black',
        borderStyle: "solid",
        borderWidth: 2,
    },
    answer: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-around",
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

export default GameHeader;