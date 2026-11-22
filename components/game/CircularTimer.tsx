import React, { JSX, memo } from "react";
import { useThemeColors } from "@/hooks/useThemeColors";
import AnimatedProgressWheel from "./AnimatedProgressWheel";

const CircularTimer = ({
  timeLimit,
  onTimeEnd,
}: {
  timeLimit: number;
  onTimeEnd: () => void;
}): JSX.Element => {
  const colors = useThemeColors();

  return (
    <AnimatedProgressWheel
      size={100}
      width={15}
      progress={100}
      animateFromValue={0}
      duration={timeLimit}
      color={colors.primary}
      backgroundColor={colors.timerTrack}
      onAnimationComplete={onTimeEnd}
    />
  );
};

export const MemorizedCircularTimer = memo(CircularTimer);
