import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MenuNavigation from './MenuNavigation';
import { getLanguageOption } from '../js/languageOptions';
import language from '../language/language';
import { LanguageProvider } from '../components/LanguageContext';

const AppNavigator = () => {
    const [ systemLanguage, setSystemLanguage ] = useState({language: language['English']});
    const [ loading, setLoading ] = useState(true);

    const load = async () => {
        const lang = await getLanguageOption();
        setSystemLanguage({ 
            language: language[lang], 
            setLanguage: (lang) => 
                setSystemLanguage((prevState) => 
                    ({ ...prevState, language: language[lang] })),
        });
        setTimeout(() => setLoading(false), 200);
    }

    useEffect(() => {
        load();
    }, [loading]);

    return (<NavigationContainer>
        <LanguageProvider value={systemLanguage}>
            <MenuNavigation />
        </LanguageProvider>
    </NavigationContainer>
)};

export default AppNavigator;