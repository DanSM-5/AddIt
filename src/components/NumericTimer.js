import React, { useState, useEffect, memo } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const NumericTimer = ({ timeLimit, onTimeEnd }) => {

    const [ timer, setTimer ] = useState(timeLimit / 1000);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setTimer((prevState) => prevState - 1);
        }, 1000);
        if(timer === 0) timeEnd();

        return () => clearInterval(intervalId);
    }, [timer]);

    const timeEnd = () => onTimeEnd();

    const calcTimerStyle = () => {
        const calcTimeWord = () => {
            const progress = timer / (timeLimit / 1000);
            if (progress >= 0.5) {
                return 'Full';
            }else if (progress >= 0.2){
                return 'Half';
            }else { return 'No' }
        }
        const word = calcTimeWord();
        return [`text${word}Time`,`container${word}Time`];
    }

    const [ textStyle, containerStyle ] =  calcTimerStyle();

    return (
    <View style={[styles.container, styles[containerStyle]]}>
        <Text style={[styles.text, styles[textStyle]]}>{timer}</Text>
    </View>);
};

const styles = StyleSheet.create({
    text: {
        fontSize: 40,
        fontWeight: "bold",
    },
    container: {
        width: 100,
        height: 60,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
        borderColor: 'black',
        borderStyle: "solid",
        borderWidth: 3,
    },
    containerFullTime:{
        backgroundColor: '#2089dc',
    },
    textFullTime:{
        color: 'white'
    },
    containerHalfTime:{
        backgroundColor: '#ffd300',
    },
    textHalfTime:{
        color: 'black'
    },
    containerNoTime:{
        backgroundColor: 'red',
    },
    textNoTime:{
        color: 'black'
    },
});

export default NumericTimer;

export const MemorizedNumericTimer = memo(NumericTimer);