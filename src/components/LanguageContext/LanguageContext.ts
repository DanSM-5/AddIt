import { createContext } from 'react';
import { SystemConfig } from './types';

const LanguageContext = createContext({} as SystemConfig);

export const LanguageProvider = LanguageContext.Provider;

export default LanguageContext;