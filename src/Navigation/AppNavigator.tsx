import React, { useCallback, useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MenuNavigation from './MenuNavigation';
import { getLanguageOption } from '../utils/languageOptions';
import language from '../language/language';
import { LanguageProvider } from '../components/LanguageContext';
import { LOCALE, SuppotedLanguage, defaultLanguage } from '../language';
import { SystemConfig } from '../components/LanguageContext';

const AppNavigator = () => {
  const [systemConfig, setSystemConfig] = useState<SystemConfig>({
    dictionary: language[defaultLanguage],
    language: defaultLanguage,
    locale: LOCALE[defaultLanguage],
    setLanguage: () => {},
  });

  const setLanguage = useCallback((selected: SuppotedLanguage) => {
    setSystemConfig(prevState => {
      if (prevState.language === selected) {
        return prevState;
      }

      return {
        setLanguage,
        language: selected,
        locale: LOCALE[selected],
        dictionary: language[selected],
      };
    });
  }, []);

  useEffect(() => {
    const load = async () => {
      const lang = (await getLanguageOption()) ?? defaultLanguage;

      setSystemConfig({
        setLanguage,
        language: lang,
        locale: LOCALE[lang],
        dictionary: language[lang],
      });
    };

    load();
  }, [setLanguage]);

  return (
    <NavigationContainer>
      <LanguageProvider value={systemConfig}>
        <MenuNavigation />
      </LanguageProvider>
    </NavigationContainer>
  );
};

export default AppNavigator;
