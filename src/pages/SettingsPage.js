import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { getTimerOption, setTimerOption} from '../js/timerOptions';
import { Card, CheckBox } from 'react-native-elements';

const GRAPHIC = 'graphic';
const NUMERIC = 'numeric';

const SettingsPage = () => {
    const [timerValue, setTimerValue] = useState('');
    useEffect(() => {
        const setInitial = async () => {
            const current = await getTimerOption();
            if (current === null) {
                setTimerValue(GRAPHIC);
                await setTimerOption(GRAPHIC);
            }else{
                setTimerValue(current);
            }
        };
        
        if (timerValue === '') {
            setInitial();
        }
    }, []);

    const onPressRadioButton = async (type) => {
        setTimerValue(type);
        await setTimerOption(type);
    }

    return (
        <View style={styles.center}>
            <Card
                title="Display Timer"
            >
                <Text style={styles.text}>
                    Set the type of timer to be displayed in game.
                </Text>
                <View>
                    <View>
                        <CheckBox 
                            checked={timerValue === GRAPHIC}
                            center
                            title="Circular"
                            checkedIcon='dot-circle-o'
                            uncheckedIcon='circle-o'
                            onPress={async () => await onPressRadioButton(GRAPHIC)}
                        />
                    </View>
                    <View>
                        <CheckBox 
                            checked={timerValue === NUMERIC}
                            center
                            title="Numeric"
                            checkedIcon='dot-circle-o'
                            uncheckedIcon='circle-o'
                            onPress={async () => await onPressRadioButton(NUMERIC)}
                        />
                    </View>
                </View>
            </Card>
        </View>
    );
};

const styles = StyleSheet.create({
    center: {
        flex: 1,
    },
    text:{
        textAlign: "center",
    },
});

export default SettingsPage;