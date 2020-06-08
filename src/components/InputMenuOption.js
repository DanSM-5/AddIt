import React, { useEffect, useState } from 'react';
import { ScrollView, View ,Text, StyleSheet, TouchableOpacity } from 'react-native';
import NumericInput from 'react-native-numeric-input';

const InputMenuOption = ({ onContinue, onCancel, lang }) => {

    const [ time, setTime ] = useState(10);
    const [ length, setLength ] = useState(6);
    const [ maxToSelect, setMaxToSelect ] = useState(3);
    const [ minDigit, setMinDigit ] = useState(1);
    const [ maxDigit, setMaxDigit ] = useState(10);
    const [ maxDigitKey, setMaxDigitKey ] = useState(0);
    const [ maxToSelectKey, setMaxToSelectKey ] = useState(0);
    
    useEffect(() => {
        if (minDigit > maxDigit) {
            setMaxDigit(minDigit);
            setMaxDigitKey(prevState => prevState + 1);
        }
        if (maxToSelect > length) {
            setMaxToSelect(length);
            setMaxToSelectKey(prevState => prevState + 1);
        }
    }, [minDigit, maxDigit, length, maxToSelect]);

    return (        
    <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollView}>
            <View style={styles.valueContainer}>
                <Text style={styles.desc}>{lang.customTimeDesc}</Text>
                <NumericInput
                    value={time}
                    onChange={value => setTime(value)}
                    minValue={1}
                    rounded
                    />
            </View>
            <View style={styles.valueContainer}>
                <Text style={styles.desc}>{lang.customLenghtDesc}</Text>
                <NumericInput
                    value={length}
                    onChange={value => setLength(value)}
                    minValue={3}
                    maxValue={9}
                    rounded
                    />
            </View>
            <View style={styles.valueContainer}>
                <Text style={styles.desc}>{lang.customMaxAnstDesc}</Text>
                <NumericInput
                    key={maxToSelectKey}
                    value={maxToSelect}
                    onChange={value => value > length ? setMaxToSelect(length) : setMaxToSelect(value)}
                    minValue={2}
                    maxValue={length}
                    rounded
                    />
            </View>
            <View style={styles.valueContainer}>
                <Text style={styles.desc}>{lang.customMinValueDesc}</Text>
                <NumericInput
                    value={minDigit}
                    onChange={value => setMinDigit(value)}
                    minValue={1}
                    rounded
                    />
            </View>
            <View style={styles.valueContainer}>
                <Text style={styles.desc}>{lang.customMaxValueDesc}</Text>
                <NumericInput
                    key={maxDigitKey}
                    value={maxDigit}
                    onChange={value => setMaxDigit(value)}
                    minValue={minDigit}
                    rounded
                    />
            </View>
            <View style={styles.buttonsArea}>
                <TouchableOpacity 
                    style={styles.button} 
                    onPress={onCancel}
                >
                    <Text style={styles.text}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button} 
                    onPress={() => onContinue({
                        time, 
                        length,
                        minToSelect: 2,
                        maxToSelect,
                        minDigit,
                        maxDigit})}
                        >
                    <Text style={styles.text}>Ok</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    </View>);
};

const styles = StyleSheet.create({
    scrollView:{
        flexGrow:1,
        justifyContent: "space-around",
    },
    container:{
        height: 300,
        padding: 10,
    },
    menuOption:{
        alignItems: "center",
    },
    valueContainer: {
        marginVertical: 5,
        alignItems: "center",
        paddingHorizontal: 10,
    },
    desc:{
        textAlign: "center",
    },
    buttonsArea:{
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-around",
        margin: 10,
    },
    button:{
        borderRadius: 4,
        backgroundColor: '#2089dc',
        justifyContent: "center",
        alignItems: "center",
        width: 70,
        height: 30,
    },
    text:{
        color: 'white',
    },
});

export default InputMenuOption;