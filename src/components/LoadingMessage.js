import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const LoadingMessage = ({ message }) => {
    return (
    <View style={styles.loadingView} >
        <Text style={styles.loadingText}>{message}</Text>
    </View>);
};

const styles = StyleSheet.create({
    loadingView:{
        flex:1,
        justifyContent: "center", 
        alignItems: "center",
    },
    loadingText:{
        fontSize: 25,
    },
});

export default LoadingMessage;