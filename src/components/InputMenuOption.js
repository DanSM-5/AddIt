import React from 'react';
import DifficultySettings from './DifficultySettings';
import { getPrevious } from '../js/prevCustomConfig';
import InputMenuOptionContent from './InputMenuOptionContent';
import useStored from '../js/useStored';

const InputMenuOption = ({ onContinue, onCancel, lang }) => {
    const [ previous, loading ] = useStored(getPrevious, DifficultySettings['DEFAULT']);

    if (loading) {
        return null;
    }
    return(
        <InputMenuOptionContent 
            initial={previous}
            lang={lang}
            onContinue={onContinue}
            onCancel={onCancel}
        />
    );
};

export default InputMenuOption;