import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MenuNavigation from './MenuNavigation';
import { getLanguageOption } from '../js/languageOptions';
import language from '../language/language';
import { LanguageProvider } from '../components/LanguageContext';
import { useLatest } from '../hooks/useLatest';
import { LanguageContent, SuppotedLanguage, defaultLanguage } from '../language';

type SystemConfig = {
    language: LanguageContent;
    current: SuppotedLanguage;
    setLanguage: (selected: SuppotedLanguage) => void;
};

const AppNavigator = () => {
    const [ systemConfig, setSystemConfig ] = useState<SystemConfig>({
        language: language[defaultLanguage],
        current: defaultLanguage,
        setLanguage: () => {},
    });
    const latestConfig = useLatest(systemConfig);

    useEffect(() => {
        const load = async () => {
            const lang = await getLanguageOption() ?? defaultLanguage;

            const setLanguage = (selected: SuppotedLanguage) => {
                if (selected === latestConfig.current.current) {
                    return;
                }
                setSystemConfig((prevState) =>
                    ({ ...prevState, language: language[selected] }));
            };

            setSystemConfig({
                language: language[lang],
                setLanguage,
                current: lang,
            });
        }

        load();
    }, []);

    return (<NavigationContainer>
        <LanguageProvider value={systemConfig}>
            <MenuNavigation />
        </LanguageProvider>
    </NavigationContainer>
)};

export default AppNavigator;
