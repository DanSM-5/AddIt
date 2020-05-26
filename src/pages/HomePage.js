import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { EASY, MEDIUM, HARD } from '../components/Difficulties';

const difficulty = [EASY, MEDIUM, HARD];
const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

const HomePage = ({ navigation }) => {
    return (
        <View style={styles.container}>
            { 
                difficulty.map((val, index) => 
                    <TouchableOpacity
                        key={val}
                        onPress={() => navigation.navigate('Game', {difficulty: val})}
                        style={styles.button}
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
        height: screenHeight * 0.15,
        width: screenWidth * 0.8,
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