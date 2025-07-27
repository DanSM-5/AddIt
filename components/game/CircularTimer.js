import React, { memo } from 'react';
import AnimatedProgressWheel from './AnimatedProgressWheel';

const CircularTimer = ({ timeLimit, onTimeEnd }) => 
    (<AnimatedProgressWheel
        size={100}
        width={15}
        progress={100}
        animateFromValue={0}
        duration={timeLimit}
        color="#2089dc"
        backgroundColor="#3d5875"
        onAnimationComplete={onTimeEnd}
    />);

export const MemorizedCircularTimer = memo(CircularTimer);