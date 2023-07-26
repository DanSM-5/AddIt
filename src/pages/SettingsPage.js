import React, { useState, useEffect, useContext, memo } from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { getTimerOption, setTimerOption} from '../js/timerOptions';
import { getLanguageOption, setLanguageOption} from '../js/languageOptions';
import { Card, CheckBox } from 'react-native-elements';
import LanguageContext from '../components/LanguageContext';
import LoadingMessage from '../components/LoadingMessage';

const SettingsPage = () => {
    const [timer, setTimer] = useState('');
    const [language, setLanguage] = useState('');
    const sysConfig = useContext(LanguageContext);
    const lang = sysConfig.language;

    useEffect(() => {
        const setInitial = async () => {
            const timerOption = await getTimerOption();
            if (timerOption !== timer) {
                setTimer(timerOption);
            }

            const languageOption = await getLanguageOption();
            if (languageOption !== language) {
                setLanguage(languageOption);
            }
        };
        setInitial();
    }, []);

    const onPressTimerOption = async (type) => {
        setTimer(type);
        await setTimerOption(type);
    }
    const onLanguageValueChanged = async (lang) => {
        setLanguage(lang);
        await setLanguageOption(lang);
        sysConfig.setLanguage(lang);
    }

    const generateTimerOptions = () => Object.keys(lang.timerOptions)
        .map((o, index) => (
            <View key={index} >
                <CheckBox
                    checked={timer === o}
                    center
                    title={lang.timerOptions[o]}
                    // checkedIcon='check-square-o'
                    // uncheckedIcon='radio'
                    onPress={async () => await onPressTimerOption(o)}
                />
            </View>
        ));

    const generatePickerItems =
        () => Object.keys(lang.languages)
            .reduce((acc, curr) => curr === language ? [curr, ...acc] : [...acc, curr],[])
            .map((l, index) => (<Picker.Item label={lang.languages[l]} value={l} key={index}/>));

    if (language === '') {
        return (<LoadingMessage message={lang.loading}/>
    )}

    return (
    <ScrollView style={styles.container}>
        <View style={styles.center}>
            <Card
                title="Display Timer"
                >
                <Text style={styles.text}>
                    {lang.timerDescription }
                </Text>
                <View>
                    {generateTimerOptions()}
                </View>
            </Card>
            <Card
                title={lang.language}
                >
                <Text>{lang.languageDescription}</Text>
                <Picker
                    selectedValue={language}
                    onValueChange={async (itemValue) => await onLanguageValueChanged(itemValue)}
                    >
                    { generatePickerItems() }
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
    loadingView:{
        flex:1,
        justifyContent: "center",
        alignItems: "center",
    },
    loadingText:{
        fontSize: 25,
    },
    text:{
        textAlign:"center",
    },
    container:{
        paddingBottom: 20,
        marginBottom: 10,
    },
});

export default SettingsPage;
