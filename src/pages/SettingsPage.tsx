import React, { useState, useEffect, useContext, useMemo } from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { getTimerOption, setTimerOption, TimerType } from '../js/timerOptions';
import { getLanguageOption, setLanguageOption } from '../js/languageOptions';
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
  const lang = sysConfig.dictionary;

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
      Object.keys(lang.timerOptions) as (keyof typeof lang.timerOptions)[]
    ).map((o, index) => (
      <View key={index}>
        <CheckBox
          checked={timer === o}
          center
          title={lang.timerOptions[o]}
          checkedIcon="dot-circle-o"
          uncheckedIcon="circle-o"
          onPress={async () => await onPressTimerOption(o)}
        />
      </View>
    ));
  }, [lang, timer]);

  const generatedPickerItems = useMemo(() => {
    return (
      Object.keys(lang.languages) as (keyof typeof lang.languages)[]
    ).reduce((acc: React.JSX.Element[], curr, i) => {
      acc.push(
        <Picker.Item label={lang.languages[curr]} value={curr} key={i} />,
      );
      return acc;
    }, []);
  }, [lang]);

  if (language === '' || timer === '') {
    return <LoadingMessage message={lang.loading} />;
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.center}>
        <SettingsCard>
          <Card.Title>Display Timer</Card.Title>
          <Card.Divider />
          <Text style={styles.text}>{lang.timerDescription}</Text>
          <View>{generatedTimerOptions}</View>
        </SettingsCard>
        <SettingsCard>
          <Card.Title>{lang.language}</Card.Title>
          <Text>{lang.languageDescription}</Text>
          <Picker
            selectedValue={language}
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
  },
  container: {
    paddingBottom: 20,
    marginBottom: 10,
  },
});

export default SettingsPage;
