import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

const GameAnswer = ({ answerNumbers, isPortrait = true }) => {
    return (
        <View style={styles.answer}>
            <Text>{isPortrait ? "Answer" : "A" }: </Text>
                {answerNumbers.map((num, key) => 
                key === answerNumbers.length - 1
                ? <Text key={key}>{num}</Text>
                : <Text key={key}>{num}, </Text>
            )} 
        </View>
    );
};

const styles = StyleSheet.create({
    answer: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-around",
    },
});

export default GameAnswer;