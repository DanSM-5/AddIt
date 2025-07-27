import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';

const RandomNumber = ({ number, isSelected, onPress, onPressDisabled, id, isActive }) => {

    const handlePress = () => {
        if (isSelected) {
            onPressDisabled(id);
        } else{
            onPress(id);
        }
    }

    return(<TouchableOpacity 
        onPress={handlePress} 
        disabled={!isActive}
        style={styles['number-container']}
    >
        <Text 
            style={[styles.random, 
                isSelected && styles.selected, 
                !isActive && styles.selected]}>
            {number}
        </Text>
    </TouchableOpacity>);
}

const styles = StyleSheet.create({
    random: {
        textAlign: "center",
        fontSize: 40,
        fontWeight: "bold",
        color: 'white',
    },
    'number-container':{
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#2089dc',
        marginHorizontal: 20,
        marginVertical: 20,
        justifyContent: "center",
        borderColor: 'black',
        borderStyle: "solid",
        borderWidth: 6,
    },
    selected: {
        opacity: 0.2,
    },
});

export default RandomNumber;