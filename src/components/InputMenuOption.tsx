import React from 'react';
import DifficultySettings from './DifficultySettings';
import { getGameSettings } from '../utils/prevCustomConfig';
import InputMenuOptionContent from './InputMenuOptionContent';
import useStored from '../hooks/useStored';
import { GameSettings } from '../types/GameSettings';
import { DictionaryContent } from '../language';

/**
 * Component that renders the menu option content
 * @param {Object} params Params for component
 * @param {LanguageContent} params.dictionary Language to use to display UI
 * @param {() => void} params.onCancel Function to call when cancel button is pressed
 * @param {boolean} params.portrait Flag to know if orientation is portrait
 * @param {(newSettings: GameSettings, initalSettings: GameSettings) => void} params.onContinue Function to call when OK button is pressed
 * @returns {JSX.Element}
 */
const InputMenuOption = ({
  onContinue,
  onCancel,
  dictionary,
  portrait,
}: {
  onContinue: (curr: GameSettings, prev: GameSettings) => void;
  portrait: boolean;
  dictionary: DictionaryContent;
  onCancel: () => void;
}) => {
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
      portrait={portrait}
      dictionary={dictionary}
      onContinue={onContinue}
      onCancel={onCancel}
    />
  );
};

export default InputMenuOption;
