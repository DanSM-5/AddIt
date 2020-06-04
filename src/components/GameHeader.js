import React from 'react';
import { View, Text, StyleSheet, Dimensions} from 'react-native';


const topMessage = {
    PLAYING: 'Sum:',
    LOST: 'Fail:',
    WON: 'Win:',
}

const GameHeader = ({ status, target, score, gameNumber, difficulty, isPortrait }) => {

    const { width } = Dimensions.get('window');
    const dynamicStyles = StyleSheet.create({
        targetPortrait:{
            width: width * 0.8
        },
        targetLandscape: {
            width: width * 0.15,
        },
    });

    return (
        <>
            <View
                style={styles.container}
            >
                <View style={[styles.targetContainer,
                        !isPortrait && styles.targetContainerLandsCape]}
                >
                    <Text style={styles.difficulty}>{difficulty}</Text>
                    <Text 
                    style={[styles.target, 
                            !isPortrait && styles.targetLandscape,
                            isPortrait ? dynamicStyles.targetPortrait : dynamicStyles.targetLandscape, 
                            styles[`STATUS_${status}`]]}>
                        {topMessage[status]} {target}
                    </Text>
                </View>
                <View style={isPortrait ? styles.info : styles.infoLandscape}>
                        <Text>Score: {score}</Text>
                        <Text>Games: {gameNumber}</Text>
                </View>  
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    container:{
        flex: 1,
        flexDirection: "column",
    },
    difficulty: {
        fontSize: 20,
        fontWeight: "bold",
    },
    targetContainer: {
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
    },
    targetContainerLandsCape: {
        justifyContent: "flex-end",
        paddingBottom: 15,
    },
    target:{
        fontSize: 40,
        textAlign: "center",
        borderRadius: 20,
        borderColor: 'black',
        borderStyle: "solid",
        borderWidth: 2,
    },
    targetLandscape:{
        fontSize: 25,

    },
    info: {
        flexDirection: "row",
        justifyContent: "space-around",
    },
    infoLandscape: {
        flex: 1,
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "flex-start",
        alignSelf: "center",
        paddingTop: 10,
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