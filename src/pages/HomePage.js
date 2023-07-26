import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, ScrollView, TouchableHighlight } from 'react-native';
import { isPortrait } from '../js/screenOrientation';
import LanguageContext from '../components/LanguageContext';
import isEqual from 'lodash.isequal';
import {
    Menu,
    MenuOptions,
    MenuTrigger,
    renderers,
  } from 'react-native-popup-menu'
import InputMenuOption from '../components/InputMenuOption';
import { setPrevious } from '../js/prevCustomConfig';

const HomePage = ({ navigation }) => {
    const [ portraitOrientation, setPortraitOrientation ] = useState(true);
    const [ open, setOpen ] = useState(false);
    const { difficulties } = useContext(LanguageContext).language;
    const lang = useContext(LanguageContext).language;

    const onOrientationChanged = () => {
        if (isPortrait()) {
            setPortraitOrientation(true);
        }else{
            setPortraitOrientation(false);
        }
    }

    const onContinue = async(settings, prev) => {
        setOpen(false);
        if (!isEqual(settings, prev)) {
            await setPrevious(settings);
        }
        navigation.navigate('Game', {difficulty: 'CUSTOM', settings: {...settings, minToSelect: 2 }});
    }

    const onCancel = () => {
        setOpen(false);
    }

    const difficultyButtons = () => Object.keys(difficulties)
        .map((dif, index) => dif !== 'CUSTOM'
            ? <TouchableOpacity
                key={index}
                onPress={() => navigation.navigate('Game', {difficulty: dif})}
                style={[styles.button, portraitOrientation
                    ? dynamicStyles.btnPortrait
                    : dynamicStyles.btnLandscape]}
            >
                <Text style={styles.text}>
                    {difficulties[dif]}
                </Text>
            </TouchableOpacity>
            : <Menu
                key={index}
                opened={open}
                onBackdropPress={() => setOpen(false)}
                renderer={renderers.Popover}
            >
                {isPortrait() ? <MenuTrigger /> : null}
                <TouchableOpacity
                    style={[styles.button, portraitOrientation
                        ? dynamicStyles.btnPortrait
                        : dynamicStyles.btnLandscape]}
                    onPress={() => setOpen(true)}
                >
                    <Text style={styles.text}>
                        {difficulties[dif]}
                    </Text>
                </TouchableOpacity>
                {isPortrait() ? null : <MenuTrigger />}
                <MenuOptions
                    customStyles={{
                        optionsContainer: styles.popupMenu
                    }}
                >
                    <InputMenuOption
                        lang={lang}
                        onCancel={onCancel}
                        onContinue={onContinue}
                    />
                </MenuOptions>
            </Menu>);

    const { width, height } = Dimensions.get('window');

    const dynamicStyles = StyleSheet.create({
        btnPortrait: {
            height: Math.round(height) * 0.15,
            width: Math.round(width) * 0.8,
        },
        btnLandscape:{
            height: Math.round(height) * 0.2,
            width: Math.round(width) * 0.6,
        },
    });

    return (<ScrollView contentContainerStyle={styles.scrollScreen}>
        <View style={styles.container} onLayout={onOrientationChanged}>
            {difficultyButtons()}
        </View>
    </ScrollView>);
}

const styles = StyleSheet.create({
    text:{
        color: 'white',
        fontSize: 50,
    },
    button: {
        backgroundColor: '#2089dc',
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 40,
        color: 'white',
        borderColor: 'black',
        borderStyle: "solid",
        borderWidth: 6,
        marginVertical: 20,
    },
    container: {
        backgroundColor: '#fbeec1',
        flex: 1,
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "space-around",
        alignContent: "center",
    },
    scrollScreen:{
        flexGrow:1,
    },
    scrollView:{
        flexGrow:1,
        marginTop: 15,
    },
    popupMenu:{
        borderRadius: 30,
        height: 300,
        width: 250,
        padding: 15,
    }
});

export default HomePage;
