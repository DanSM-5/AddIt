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
import { useThemeColors } from '@/hooks/useThemeColors';

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
  const colors = useThemeColors();
  const descStyle = [styles.desc, { color: colors.text }];
  const buttonStyle = [styles.button, { backgroundColor: colors.primary }];
  const buttonTextStyle = { color: colors.onPrimary };
  // Shared colour props for every NumericInput
  const inputColors = {
    iconStyle: { color: colors.text },
    textColor: colors.text,
    borderColor: colors.inputBorder,
    rightButtonBackgroundColor: colors.surface,
    leftButtonBackgroundColor: colors.surface,
    upDownButtonsBackgroundColor: colors.surface,
  };

  return (
    <View
      style={portrait ? styles.containerPortrait : styles.containerLandscape}>

      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.valueContainer}>
          <Text style={descStyle}>{dictionary.customTimeDesc}</Text>
          <NumericInput
            type="plus-minus"
            value={time}
            onChange={value => setTime(value)}
            minValue={1}
            {...inputColors}
            rounded
          />
        </View>
        <View style={styles.valueContainer}>
          <Text style={descStyle}>{dictionary.customLenghtDesc}</Text>
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
            {...inputColors}
            rounded
          />
        </View>
        <View style={styles.valueContainer}>
          <Text style={descStyle}>{dictionary.customMaxAnstDesc}</Text>
          <NumericInput
            type="plus-minus"
            value={maxToSelect}
            onChange={setMaxToSelect}
            minValue={2}
            maxValue={length}
            {...inputColors}
            rounded
          />
        </View>
        <View style={styles.valueContainer}>
          <Text style={descStyle}>{dictionary.customMinValueDesc}</Text>
          <NumericInput
            type="plus-minus"
            value={minDigit}
            onChange={setMinDigit}
            maxValue={maxDigit}
            minValue={1}
            {...inputColors}
            rounded
          />
        </View>
        <View style={styles.valueContainer}>
          <Text style={descStyle}>{dictionary.customMaxValueDesc}</Text>
          <NumericInput
            type="plus-minus"
            value={maxDigit}
            onChange={setMaxDigit}
            minValue={minDigit}
            {...inputColors}
            rounded
          />
        </View>
      </ScrollView>
  
      <View style={styles.buttonsArea}>
        <TouchableOpacity style={buttonStyle} onPress={onCancel}>
          <Text style={buttonTextStyle}>{dictionary.cancel}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={buttonStyle}
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
          <Text style={buttonTextStyle}>{dictionary.ok}</Text>
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
    justifyContent: 'center',
    alignItems: 'center',
    width: 70,
    height: 30,
  },
});

export default InputMenuOptionContent;
