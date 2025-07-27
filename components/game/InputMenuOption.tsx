import React, { JSX } from 'react';
import DifficultySettings from './DifficultySettings';
import { getGameSettings } from '@/utils/prevCustomConfig';
import InputMenuOptionContent from './InputMenuOptionContent';
import useStored from '@/hooks/useStored';
import { GameSettings } from '@/types/GameSettings';

/**
 * Component that renders the menu option content
 * @param {Object} params Params for component
 * @param {() => void} params.onCancel Function to call when cancel button is pressed
 * @param {(newSettings: GameSettings, initalSettings: GameSettings) => void} params.onContinue Function to call when OK button is pressed
 * @returns {JSX.Element}
 */
const InputMenuOption = ({
  onContinue,
  onCancel,
}: {
  onContinue: (curr: GameSettings, prev: GameSettings) => void;
  onCancel: () => void;
}): JSX.Element | null => {
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
      onContinue={onContinue}
      onCancel={onCancel}
    />
  );
};

export default InputMenuOption;
