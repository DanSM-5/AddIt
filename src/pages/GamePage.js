import React, { useState, useEffect } from 'react';
import Game from '../components/Game';
import DifficultySettings from '../components/DifficultySettings';

const GamePage = ({ navigation, route }) => {

    const { time , count } = DifficultySettings(route.params.difficulty);
    const [state, setState] = useState({ gameId: 1 });
    const [gameInfo, setGameInfo] = useState({ score: 0, game: 1 });
    const resetGame = () => {
        setGameInfo({ ...gameInfo, game: gameInfo.game + 1 });
        setState({ gameId: state.gameId + 1})
    };
    const addPoint = () => setGameInfo({...gameInfo, score: gameInfo.score + 1});
    const endGame = {};//{ end : () => {}};
    const setLost = (func) => {endGame.end = end = () => func()};
    const timeout = () => endGame.end ? endGame.end() : null; 

    const timeoutToClear = setTimeout(() => {
        timeout();
    }, time * 1000);

    return (
        <>
            <Game key={state.gameId} 
                onPlayAgain={resetGame}
                onVictory={addPoint}
                randomNumberCount={count} 
                initialSeconds={time} 
                setLost={setLost}
                timeoutToClear={timeoutToClear}
                gameInfo={gameInfo}
            />
        </>
    );
}

export default GamePage;