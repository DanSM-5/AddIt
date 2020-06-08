import React, { useContext } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import LanguageContext from './LanguageContext';

const GameAnswer = ({ answerNumbers, isPortrait = true }) => {
    const lang = useContext(LanguageContext).language;
    return (
        <View style={styles.answer}>
            <Text>{isPortrait ? lang.answer : lang.a }: </Text>
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