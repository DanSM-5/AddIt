import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { EASY, MEDIUM, HARD } from '../components/Difficulties';
import { isPortrait } from '../js/screenOrientation';

const difficulty = [EASY, MEDIUM, HARD];
const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

// const setScreen = (func) => func();
// Dimensions.addEventListener('change', () => setScreen());
const HomePage = ({ navigation }) => {
    const [ portraitOrientation, setPortraitOrientation ] = useState(true);

    const onOrientationChanged = () => {
        if (isPortrait()) {
            setPortraitOrientation(true);
        }else{
            setPortraitOrientation(false);
        }
    }

    const { width, height } = Dimensions.get('window');

    const dynamicStyles = StyleSheet.create({
        btnPortrait: {
            height: Math.round(height) * 0.15,
            width: Math.round(width) * 0.8,
        },
        btnLandscape:{
            height: Math.round(height) * 0.2,
            width: Math.round(width) * 0.6,
        },
    });

    return (
        <View style={styles.container}
            onLayout={onOrientationChanged}
        >
            { 
                difficulty.map((val, index) => 
                    <TouchableOpacity
                        key={val}
                        onPress={() => navigation.navigate('Game', {difficulty: val})}
            style={[styles.button, portraitOrientation ? dynamicStyles.btnPortrait : dynamicStyles.btnLandscape ]}
                    >
                        <Text style={styles.text}>
                            {val}
                        </Text>
                    </TouchableOpacity>)
            }
        </View>
    )
}

const styles = StyleSheet.create({
    text:{
        color: 'white',
        fontSize: 50,
    },
    button: {
        backgroundColor: '#659dbd',
        // height: Math.round(Dimensions.get('window').width) * 0.15,
        // width: Math.round(Dimensions.get('window').height) * 0.8,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 40,
        color: 'white',
        borderColor: 'black',
        borderStyle: "solid",
        borderWidth: 6,
    },
    container: {
        backgroundColor: '#fbeec1',
        flex: 1,
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "space-around",
        alignContent: "center",
    },
});

export default HomePage;