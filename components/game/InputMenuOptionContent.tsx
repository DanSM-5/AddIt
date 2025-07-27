// @ts-check
import React, { JSX, useState } from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { NumericInput } from './NumericInput';
import { GameSettings } from '@/types/GameSettings';
import { useIsPortrait, useLanguage } from '@/providers/SystemConfig';

interface ComponentProps {
  initial: GameSettings;
  onCancel: () => void;
  onContinue: (curr: GameSettings, prev: GameSettings) => void;
}

/**
 * Component that renders the menu option content
 * @param {Object} params Params for component
 * @param {GameSettings} params.initial Initial game params
 * @param {() => void} params.onCancel Function to call when cancel button is pressed
 * @param {(newSettings: GameSettings, initalSettings: GameSettings) => void} params.onContinue Function to call when OK button is pressed
 * @returns {JSX.Element}
 */
const InputMenuOptionContent = ({
  initial,
  onCancel,
  onContinue,
}: ComponentProps): JSX.Element => {
  const portrait = useIsPortrait();
  const [time, setTime] = useState(initial.time);
  const [length, setLength] = useState(initial.length);
  const [maxToSelect, setMaxToSelect] = useState(initial.maxToSelect);
  const [minDigit, setMinDigit] = useState(initial.minDigit);
  const [maxDigit, setMaxDigit] = useState(initial.maxDigit);
  const dictionary = useLanguage().dictionary;

  return (
    <View
      style={portrait ? styles.containerPortrait : styles.containerLandscape}>

      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.valueContainer}>
          <Text style={styles.desc}>{dictionary.customTimeDesc}</Text>
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
          <Text style={styles.desc}>{dictionary.customLenghtDesc}</Text>
          <NumericInput
            type="plus-minus"
            value={length}
            onChange={value => {
              setLength(value);
              // Prevent value being higher than length
              setMaxToSelect(prev => {
                if (prev > value) {
                  return value;
                }
                return prev;
              });
            }}
            minValue={3}
            maxValue={9}
            iconStyle={styles.iconStyle}
            rounded
          />
        </View>
        <View style={styles.valueContainer}>
          <Text style={styles.desc}>{dictionary.customMaxAnstDesc}</Text>
          <NumericInput
            type="plus-minus"
            value={maxToSelect}
            onChange={setMaxToSelect}
            minValue={2}
            maxValue={length}
            iconStyle={styles.iconStyle}
            rounded
          />
        </View>
        <View style={styles.valueContainer}>
          <Text style={styles.desc}>{dictionary.customMinValueDesc}</Text>
          <NumericInput
            type="plus-minus"
            value={minDigit}
            onChange={setMinDigit}
            maxValue={maxDigit}
            minValue={1}
            iconStyle={styles.iconStyle}
            rounded
          />
        </View>
        <View style={styles.valueContainer}>
          <Text style={styles.desc}>{dictionary.customMaxValueDesc}</Text>
          <NumericInput
            type="plus-minus"
            value={maxDigit}
            onChange={setMaxDigit}
            minValue={minDigit}
            iconStyle={styles.iconStyle}
            rounded
          />
        </View>
      </ScrollView>
  
      <View style={styles.buttonsArea}>
        <TouchableOpacity style={styles.button} onPress={onCancel}>
          <Text style={styles.text}>{dictionary.cancel}</Text>
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
          <Text style={styles.text}>{dictionary.ok}</Text>
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
    // padding: 10,
    //width: 200, //controls width only when renderer = renderers.Popover
  },
  containerLandscape: {
    height: '100%',
    display: 'flex',
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
    marginTop: 5,
    marginBottom: 30,
    marginLeft: 0,
    marginRight: 0,
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
