import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';

import DifficultySettings from '../components/DifficultySettings';
import GameComponent from '../components/GameComponent';
import NumbersCalculator from '../components/NumbersCalculator';
import { getTimerOption } from '../js/timerOptions';

const GamePage = ({ navigation, route }) => {
    console.log(route.params.settings);
    const settings = route.params.difficulty !== 'CUSTOM' ? DifficultySettings[route.params.difficulty] : route.params.settings;
    const [gameInfo, setGameInfo] = useState({ score: 0, game: 1 });
    const resetGame = () => setGameInfo({ ...gameInfo, game: gameInfo.game + 1 });
    const victoryAndReset = () => setGameInfo({game: gameInfo.game + 1, score: gameInfo.score + 1});
    const numbers = NumbersCalculator(settings);
    const [timerOption, setTimerOption] = useState(''); 

    useEffect(() => {
        const loadTimerOption = async () => {
            const option = await getTimerOption();
            setTimerOption(option);
        }
        loadTimerOption();
    }, []); 

    return (<>
        <View style={styles.container}>
            <GameComponent 
                key={ gameInfo.game } 
                onPlayAgain={resetGame}
                onVictory={victoryAndReset}
                gameProgress={gameInfo}
                gameSettings={settings}
                numbersSettings={numbers}
                difficulty={route.params.difficulty}
                timerOption={timerOption}
            />
        </View>
    </>);
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fbeec1',
        flex: 1,
    },
});

export default GamePage;