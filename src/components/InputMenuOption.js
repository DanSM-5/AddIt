import React from 'react';
import DifficultySettings from './DifficultySettings';
import { getGameSettings } from '../js/prevCustomConfig';
import InputMenuOptionContent from './InputMenuOptionContent';
import useStored from '../hooks/useStored';

/**
 * @typedef {import('../types/GameSettings').GameSettings} GameSettings
 */

/**
 * @typedef {import('../language/types').DictionaryContent} LanguageContent
 */

/**
 * Component that renders the menu option content
 * @param {Object} params Params for component
 * @param {LanguageContent} params.lang Language to use to display UI
 * @param {() => void} params.onCancel Function to call when cancel button is pressed
 * @param {(newSettings: GameSettings, initalSettings: GameSettings) => void} params.onContinue Function to call when OK button is pressed
 * @returns {JSX.Element}
 */
const InputMenuOption = ({ onContinue, onCancel, lang }) => {
  const [previous, loading] = useStored(
    getGameSettings,
    DifficultySettings.DEFAULT,
  );

  if (loading) {
    return null;
  }

  return (
    <InputMenuOptionContent
      initial={previous}
      lang={lang}
      onContinue={onContinue}
      onCancel={onCancel}
    />
  );
};

export default InputMenuOption;
