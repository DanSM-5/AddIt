import React, { useContext } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import LanguageContext from './LanguageContext';

const GameHeader = ({
  status,
  target,
  score,
  gameNumber,
  difficulty,
  isPortrait,
}) => {
  const lang = useContext(LanguageContext).dictionary;
  const { width } = Dimensions.get('window');
  const dynamicStyles = StyleSheet.create({
    targetPortrait: {
      width: width * 0.8,
    },
    targetLandscape: {
      width: width * 0.15,
    },
  });

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.targetContainer,
          !isPortrait && styles.targetContainerLandsCape,
        ]}>
        <Text style={styles.difficulty}>{lang.difficulties[difficulty]}</Text>
        <Text
          style={[
            styles.target,
            !isPortrait && styles.targetLandscape,
            isPortrait
              ? dynamicStyles.targetPortrait
              : dynamicStyles.targetLandscape,
            styles[`STATUS_${status}`],
          ]}>
          {lang.topMessage[status]} {target}
        </Text>
      </View>
      <View style={isPortrait ? styles.info : styles.infoLandscape}>
        <Text style={styles.labels}>
          {lang.score}: {score}
        </Text>
        <Text style={styles.labels}>
          {lang.games}: {gameNumber}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  labels: {
    color: 'black',
  },
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  difficulty: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  targetContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  targetContainerLandsCape: {
    justifyContent: 'flex-end',
    paddingBottom: 15,
  },
  target: {
    fontSize: 40,
    textAlign: 'center',
    borderRadius: 20,
    borderColor: 'black',
    borderStyle: 'solid',
    borderWidth: 2,
    paddingVertical: 3,
  },
  targetLandscape: {
    fontSize: 25,
    marginHorizontal: 3,
  },
  info: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  infoLandscape: {
    flex: 1,
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'flex-start',
    alignSelf: 'center',
    paddingTop: 10,
  },
  STATUS_WON: {
    backgroundColor: '#66cc00',
  },
  STATUS_PLAYING: {
    backgroundColor: '#2089dc',
    color: 'white',
  },
  STATUS_LOST: {
    backgroundColor: 'red',
  },
});

export default GameHeader;
