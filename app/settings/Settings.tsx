import LoadingMessage from '@/components/LoadingMessage';
import { useThemeColors } from '@/hooks/useThemeColors';
import { SupportedLanguage } from '@/language';
import { useLanguage, useSystemDispatch } from '@/providers/SystemConfig';
import { getLanguageOption, setLanguageOption } from '@/utils/languageOptions';
import { getTimerOption, setTimerOption, TimerType } from '@/utils/timerOptions';
import { Picker } from '@react-native-picker/picker';
import { Card, CheckBox } from '@rn-vui/base';
import { useNavigation } from 'expo-router';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

export const Settings = () => {
  const navigation = useNavigation();
  const [timer, setTimer] = useState<TimerType | ''>('');
  const [language, setLanguage] = useState<SupportedLanguage | ''>('');
  const dictionary = useLanguage().dictionary;
  const colors = useThemeColors();
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
          containerStyle={{
            backgroundColor: colors.surfaceVariant,
            borderColor: colors.inputBorder,
          }}
          textStyle={{ color: colors.text }}
          checkedColor={colors.primary}
          uncheckedColor={colors.icon}
          checkedIcon="dot-circle-o"
          uncheckedIcon="circle-o"
          onPress={async () => await onPressTimerOption(o)}
        />
      </View>
    ));
  }, [dictionary, timer, colors]);

  const generatedPickerItems = useMemo(() => {
    const pickerItemStyle = { color: colors.text };

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
  }, [dictionary, colors]);

  if (language === '' || timer === '') {
    return <LoadingMessage message={dictionary.loading} />;
  }

  const cardStyle = {
    backgroundColor: colors.surface,
    borderColor: colors.inputBorder,
  };
  const titleStyle = { color: colors.text };
  const textStyle = [styles.text, { color: colors.text }];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.center}>
        <Card containerStyle={cardStyle}>
          <Card.Title style={titleStyle}>Display Timer</Card.Title>
          <Card.Divider color={colors.inputBorder} />
          <Text style={textStyle}>{dictionary.timerDescription}</Text>
          <View>{generatedTimerOptions}</View>
        </Card>
        <Card containerStyle={cardStyle}>
          <Card.Title style={titleStyle}>{dictionary.language}</Card.Title>
          <Text style={textStyle}>{dictionary.languageDescription}</Text>
          <Picker
            style={{
              backgroundColor: colors.surfaceVariant,
              color: colors.text,
            }}
            selectedValue={language}
            mode="dialog"
            dropdownIconColor={colors.text}
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
    paddingBottom: 10,
  },
  container: {
    paddingBottom: 20,
    marginBottom: 10,
  },
});

export default Settings;
