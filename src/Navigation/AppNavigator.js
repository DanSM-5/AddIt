import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MenuNavigation from './MenuNavigation';
import { getLanguageOption } from '../js/languageOptions';
import language from '../language/language';
import { LanguageProvider } from '../components/LanguageContext';

const defLanguage = 'English';

const AppNavigator = () => {
    const [ systemConfig, setSystemConfig ] = useState({language: language[defLanguage]});
    const [ loading, setLoading ] = useState(true);

    const load = async () => {
        let lang = await getLanguageOption();
        if (!lang) {
            lang = defLanguage;
        }

        setSystemConfig({ 
            language: language[lang], 
            setLanguage: (lang) => 
                setSystemConfig((prevState) => 
                    ({ ...prevState, language: language[lang] })),
        });
        setTimeout(() => setLoading(false), 200);
    }

    useEffect(() => {
        load();
    }, [loading]);

    return (<NavigationContainer>
        <LanguageProvider value={systemConfig}>
            <MenuNavigation />
        </LanguageProvider>
    </NavigationContainer>
)};

export default AppNavigator;
