import LoadingMessage from '@/components/LoadingMessage';
import { SupportedLanguage } from '@/language';
import { useLanguage, useSystemDispatch } from '@/providers/SystemConfig';
import { getLanguageOption, setLanguageOption } from '@/utils/languageOptions';
import { getTimerOption, setTimerOption, TimerType } from '@/utils/timerOptions';
import { Picker } from '@react-native-picker/picker';
import { Card, CheckBox } from '@rn-vui/base';
import { useNavigation } from 'expo-router';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { ScrollView, StyleSheet, Text, useColorScheme, View } from 'react-native';

export const Settings = () => {
  const navigation = useNavigation();
  const [timer, setTimer] = useState<TimerType | ''>('');
  const [language, setLanguage] = useState<SupportedLanguage | ''>('');
  const dictionary = useLanguage().dictionary;
  const colorScheme = useColorScheme();
  const dispatch = useSystemDispatch();

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
    });
  }, [navigation]);

  useEffect(() => {
    const setInitial = async () => {
      const timerOption = await getTimerOption();
      setTimer(timerOption);

      const languageOption = await getLanguageOption();
      setLanguage(languageOption);
    };
    setInitial();
  }, []);

  const onPressTimerOption = (type: TimerType) => {
    setTimerOption(type);
    setTimer(type);
  };

  const onLanguageValueChanged = useCallback(async (newLanguage: SupportedLanguage) => {
    setLanguageOption(newLanguage);
    setLanguage(newLanguage);
    dispatch({
      type: 'dictionary',
      payload: newLanguage,
    });
  }, [dispatch]);

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
        <Card>
          <Card.Title>Display Timer</Card.Title>
          <Card.Divider />
          <Text style={styles.text}>{dictionary.timerDescription}</Text>
          <View>{generatedTimerOptions}</View>
        </Card>
        <Card>
          <Card.Title>{dictionary.language}</Card.Title>
          <Text style={styles.text}>{dictionary.languageDescription}</Text>
          <Picker
            style={styles.picker}
            selectedValue={language}
            mode="dialog"
            dropdownIconColor="#000"
            onValueChange={async (itemValue: SupportedLanguage) =>
              await onLanguageValueChanged(itemValue)
            }>
            {generatedPickerItems}
          </Picker>
        </Card>
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
    backgroundColor: '#f0f0f0',
    color: '#000',
  },
  pickerContentLight: {
    color: 'black',
  },
  pickerContentDark: {
    color: 'black',
  },
  container: {
    paddingBottom: 20,
    marginBottom: 10,
  },
});

export default Settings;
