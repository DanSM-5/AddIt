import React, { createContext } from 'react';

const LanguageContext = createContext({});

export const LanguageProvider = LanguageContext.Provider;

export default LanguageContext;