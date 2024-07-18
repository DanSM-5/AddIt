import React, { useState } from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import NumericInput from 'react-native-numeric-input';

/**
 * @typedef {import('../types/GameSettings').GameSettings} GameSettings
 */

/**
 * @typedef {import('../language/types').DictionaryContent} LanguageContent
 */

/**
 * Component that renders the menu option content
 * @param {Object} params Params for component
 * @param {GameSettings} params.initial Initial game params
 * @param {LanguageContent} params.lang Language to use to display UI
 * @param {boolean} params.portrait Flag to know if orientation is portrait
 * @param {() => void} params.onCancel Function to call when cancel button is pressed
 * @param {(newSettings: GameSettings, initalSettings: GameSettings) => void} params.onContinue Function to call when OK button is pressed
 * @returns {JSX.Element}
 */
const InputMenuOptionContent = ({
  initial,
  lang,
  onCancel,
  onContinue,
  portrait,
}) => {
  const [time, setTime] = useState(initial.time);
  const [length, setLength] = useState(initial.length);
  const [maxToSelect, setMaxToSelect] = useState(initial.maxToSelect);
  const [minDigit, setMinDigit] = useState(initial.minDigit);
  const [maxDigit, setMaxDigit] = useState(initial.maxDigit);

  return (
    <View
      style={portrait ? styles.containerPortrait : styles.containerLandscape}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.valueContainer}>
          <Text style={styles.desc}>{lang.customTimeDesc}</Text>
          <NumericInput
            type="plus-minus"
            value={time}
            onChange={value => setTime(value)}
            minValue={1}
            iconStyle={styles.iconStyle}
            rounded
          />
        </View>
        <View style={styles.valueContainer}>
          <Text style={styles.desc}>{lang.customLenghtDesc}</Text>
          <NumericInput
            type="plus-minus"
            value={length}
            onChange={value => setLength(value)}
            minValue={3}
            maxValue={9}
            iconStyle={styles.iconStyle}
            rounded
          />
        </View>
        <View style={styles.valueContainer}>
          <Text style={styles.desc}>{lang.customMaxAnstDesc}</Text>
          <NumericInput
            type="plus-minus"
            value={maxToSelect}
            onChange={value => setMaxToSelect(value)}
            minValue={2}
            maxValue={length}
            iconStyle={styles.iconStyle}
            rounded
          />
        </View>
        <View style={styles.valueContainer}>
          <Text style={styles.desc}>{lang.customMinValueDesc}</Text>
          <NumericInput
            type="plus-minus"
            value={minDigit}
            onChange={value => setMinDigit(value)}
            maxValue={maxDigit}
            minValue={1}
            iconStyle={styles.iconStyle}
            rounded
          />
        </View>
        <View style={styles.valueContainer}>
          <Text style={styles.desc}>{lang.customMaxValueDesc}</Text>
          <NumericInput
            type="plus-minus"
            value={maxDigit}
            onChange={value => setMaxDigit(value)}
            minValue={minDigit}
            iconStyle={styles.iconStyle}
            rounded
          />
        </View>
      </ScrollView>
      <View style={styles.buttonsArea}>
        <TouchableOpacity style={styles.button} onPress={onCancel}>
          <Text style={styles.text}>{lang.cancel}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            onContinue(
              {
                time,
                length,
                minToSelect: 2, // constant
                maxToSelect,
                minDigit,
                maxDigit,
              },
              initial,
            )
          }>
          <Text style={styles.text}>{lang.ok}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
    justifyContent: 'space-around',
  },
  // Class used by a View wrapping ScrollView no longer needed
  containerPortrait: {
    height: 450,
    padding: 10,
    //width: 200, //controls width only when renderer = renderers.Popover
  },
  containerLandscape: {
    height: 300,
    padding: 10,
    //width: 200, //controls width only when renderer = renderers.Popover
  },
  menuOption: {
    alignItems: 'center',
  },
  valueContainer: {
    marginVertical: 5,
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  desc: {
    textAlign: 'center',
    color: 'black',
    paddingBottom: 10,
  },
  buttonsArea: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    margin: 10,
  },
  button: {
    borderRadius: 4,
    backgroundColor: '#2089dc',
    justifyContent: 'center',
    alignItems: 'center',
    width: 70,
    height: 30,
  },
  text: {
    color: 'white',
  },
  iconStyle: {
    color: 'black',
  },
});

export default InputMenuOptionContent;
