import React, { useState, useEffect, useContext, useMemo } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  useColorScheme,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import {
  getTimerOption,
  setTimerOption,
  TimerType,
} from '../utils/timerOptions';
import { getLanguageOption, setLanguageOption } from '../utils/languageOptions';
import { Card, CheckBox } from 'react-native-elements';
import LanguageContext from '../components/LanguageContext';
import LoadingMessage from '../components/LoadingMessage';
import { SuppotedLanguage } from '../language';

const SettingsCard = Card as (
  props: React.PropsWithChildren<Parameters<typeof Card>[0]>,
) => JSX.Element;

const SettingsPage = () => {
  const [timer, setTimer] = useState<TimerType | ''>('');
  const [language, setLanguage] = useState<SuppotedLanguage | ''>('');
  const sysConfig = useContext(LanguageContext);
  const colorScheme = useColorScheme();
  const dictionary = sysConfig.dictionary;

  useEffect(() => {
    const setInitial = async () => {
      const timerOption = await getTimerOption();
      setTimer(timerOption);

      const languageOption = await getLanguageOption();
      setLanguage(languageOption);
    };
    setInitial();
  }, []);

  const onPressTimerOption = async (type: TimerType) => {
    setTimerOption(type);
    setTimer(type);
  };
  const onLanguageValueChanged = async (newLanguage: SuppotedLanguage) => {
    setLanguageOption(newLanguage);
    setLanguage(newLanguage);
    sysConfig.setLanguage(newLanguage);
  };

  const generatedTimerOptions = useMemo(() => {
    return (
      Object.keys(
        dictionary.timerOptions,
      ) as (keyof typeof dictionary.timerOptions)[]
    ).map((o, index) => (
      <View key={index}>
        <CheckBox
          checked={timer === o}
          center
          title={dictionary.timerOptions[o]}
          checkedIcon="dot-circle-o"
          uncheckedIcon="circle-o"
          onPress={async () => await onPressTimerOption(o)}
        />
      </View>
    ));
  }, [dictionary, timer]);

  const generatedPickerItems = useMemo(() => {
    const pickerItemStyle =
      colorScheme === 'dark'
        ? styles.pickerContentDark
        : styles.pickerContentLight;

    return (
      Object.keys(dictionary.languages) as (keyof typeof dictionary.languages)[]
    ).reduce((acc: React.JSX.Element[], curr, i) => {
      acc.push(
        <Picker.Item
          style={pickerItemStyle}
          label={dictionary.languages[curr]}
          value={curr}
          key={i}
        />,
      );
      return acc;
    }, []);
  }, [dictionary, colorScheme]);

  if (language === '' || timer === '') {
    return <LoadingMessage message={dictionary.loading} />;
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.center}>
        <SettingsCard>
          <Card.Title>Display Timer</Card.Title>
          <Card.Divider />
          <Text style={styles.text}>{dictionary.timerDescription}</Text>
          <View>{generatedTimerOptions}</View>
        </SettingsCard>
        <SettingsCard>
          <Card.Title>{dictionary.language}</Card.Title>
          <Text style={styles.text}>{dictionary.languageDescription}</Text>
          <Picker
            style={styles.picker}
            selectedValue={language}
            mode="dialog"
            dropdownIconColor="#000"
            onValueChange={async (itemValue: SuppotedLanguage) =>
              await onLanguageValueChanged(itemValue)
            }>
            {generatedPickerItems}
          </Picker>
        </SettingsCard>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
  },
  loadingView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 25,
  },
  text: {
    textAlign: 'center',
    color: '#000',
    paddingBottom: 10,
  },
  picker: {
    borderColor: 'red',
    borderWidth: 2,
    backgroundColor: '#f0f0f0',
    color: '#000',
  },
  pickerContentLight: {
    color: 'black',
  },
  pickerContentDark: {
    color: 'white',
  },
  container: {
    paddingBottom: 20,
    marginBottom: 10,
  },
});

export default SettingsPage;
