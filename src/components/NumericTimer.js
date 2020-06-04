import React, { useState, useEffect, memo } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const NumericTimer = ({ timeLimit }) => {

    const [ timer, setTimer ] = useState(timeLimit / 1000);
    const [intervalId, setIntervalId] = useState(0);

    useEffect(() => {
        if (intervalId === 0) {
            setIntervalId( setInterval(() => {
                setTimer( (prevState) => prevState - 1 );
            }, 1000));
        }
        if (timer === 0) {
            clearInterval(intervalId);
        }

        return () => clearInterval(intervalId);
    }, [intervalId]);

    return (
        <View style={styles.container}>
            <Text style={styles.text}>{timer}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    text: {
        fontSize: 40,
        fontWeight: "bold",
        color: 'black',
    },
    container: {
        width: 80,
        height: 80,
        justifyContent: "center",
        alignItems: "center",
    },
});

export default NumericTimer;

export const MemorizedNumericTimer = memo(NumericTimer);